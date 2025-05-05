// 투자자 데이터 (샘플)
let investors = [];

// 마지막 업데이트 시간을 저장하기 위한 전역 변수
let lastPriceUpdate = null;
let lastMetricsUpdate = null;

// 업데이트 간격 설정 (밀리초 단위)
const UPDATE_INTERVAL = {
    PRICE: 3 * 60 * 60 * 1000,  // 3시간
    METRICS: 24 * 60 * 60 * 1000 // 24시간
};

// 대가 카드의 말풍선 컴포넌트
function createStockBubble(stocks) {
    let stockBubbleHTML = `<div class="stock-bubble">
        <h4>추천 종목 Top 3</h4>
        <ul>`;
    
    if (stocks && stocks.length > 0) {
        stocks.forEach(stock => {
            const changeClass = stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : '';
            const changeSign = stock.change > 0 ? '+' : '';
            const changeArrow = stock.change > 0 ? '↑' : stock.change < 0 ? '↓' : '';
            
            stockBubbleHTML += `
                <li>
                    <div class="stock-details">
                        <span>${stock.name}</span>
                        <span class="symbol">${stock.symbol}</span>
                    </div>
                    <div>
                        <span class="${changeClass}">${changeSign}${stock.change}% ${changeArrow}</span>
                        <span class="price">$${stock.price ? stock.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '로딩중...'}</span>
                    </div>
                </li>`;
        });
    } else {
        stockBubbleHTML += `<li class="no-data">데이터 로딩 중...</li>`;
    }
    
    stockBubbleHTML += `</ul></div>`;
    
    return stockBubbleHTML;
}

// 투자자 카드 렌더링 함수
function renderInvestorCards() {
    const investorGrid = document.getElementById('investor-grid');
    
    // 요소가 존재하는지 확인
    if (!investorGrid) {
        console.error('investor-grid 요소를 찾을 수 없습니다.');
        return;
    }
    
    investorGrid.innerHTML = ''; // 기존 내용 삭제
    
    if (!investors || !Array.isArray(investors) || investors.length === 0) {
        investorGrid.innerHTML = '<div class="loading">데이터를 불러오는 중입니다...</div>';
        return;
    }
    
    investors.forEach(investor => {
        const card = document.createElement('div');
        card.className = 'investor-card';
        card.dataset.id = investor.id;
        
        // 주식 말풍선 HTML 생성
        const stockBubbleHTML = createStockBubble(investor.topStocks);
        
        // 카드 내용 HTML 생성
        card.innerHTML = `
            ${stockBubbleHTML}
            <img src="${investor.image}" alt="${investor.name}" loading="lazy">
            <h3>${investor.name}</h3>
            <p>${investor.philosophy}</p>
            <p class="quote">"${investor.quote}"</p>
            <button>상세 보기 <span>→</span></button>
        `;
        
        // 마우스 오버 이벤트 추가
        card.addEventListener('mouseenter', function() {
            const bubble = this.querySelector('.stock-bubble');
            if (bubble) bubble.style.display = 'block';
        });
        
        card.addEventListener('mouseleave', function() {
            const bubble = this.querySelector('.stock-bubble');
            if (bubble) bubble.style.display = 'none';
        });
        
        // 상세 보기 버튼 클릭 이벤트
        const button = card.querySelector('button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // 버블링 방지
                window.location.href = `investor/?id=${investor.id}`;
            });
        }
        
        investorGrid.appendChild(card);
    });
}

// 대가별 중요 지표 표시
function renderInvestorMetrics() {
    const metricsSection = document.getElementById('metrics-section');
    
    if (!metricsSection) {
        console.error('metrics-section 요소를 찾을 수 없습니다.');
        return;
    }
    
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'metrics-container';
    
    if (!investors || !Array.isArray(investors) || investors.length === 0) {
        metricsContainer.innerHTML = '<div class="loading">데이터를 불러오는 중입니다...</div>';
        metricsSection.appendChild(metricsContainer);
        return;
    }
    
    investors.forEach(investor => {
        // 각 투자자의 특화된 지표 표시
        if (investor.metrics && investor.metrics.length > 0) {
            const investorMetrics = document.createElement('div');
            investorMetrics.className = 'investor-metrics';
            
            const topMetrics = investor.metrics.slice(0, 5); // 상위 5개만 표시
            
            investorMetrics.innerHTML = `
                <h3>${investor.name}의 주요 투자 지표</h3>
                <ul>
                    ${topMetrics.map(metric => `
                        <li>
                            <span class="metric-name">${metric.name}</span>
                            <div class="metric-bar">
                                <div class="bar-fill" style="width: ${metric.weight}%;"></div>
                            </div>
                            <span class="metric-weight">${metric.weight}%</span>
                        </li>
                    `).join('')}
                </ul>
                <a href="investor/?id=${investor.id}" class="view-all">모든 지표 보기 →</a>
            `;
            
            metricsContainer.appendChild(investorMetrics);
        }
    });
    
    metricsSection.appendChild(metricsContainer);
}

// 주식 데이터 업데이트 함수
async function updateStockData(forceUpdate = false) {
    const refreshButton = document.getElementById('refresh-button');
    const refreshIcon = refreshButton ? refreshButton.querySelector('.refresh-icon') : null;
    
    // 리프레시 버튼이 존재하는지 확인
    if (refreshButton && refreshIcon) {
        refreshIcon.style.transform = 'rotate(360deg)';
        refreshButton.disabled = true;
    }
    
    try {
        const now = new Date();
        
        // 주가 업데이트 필요 여부 확인
        const needPriceUpdate = forceUpdate || !lastPriceUpdate || 
                               (now - lastPriceUpdate) > UPDATE_INTERVAL.PRICE;
        
        // 투자 지표 업데이트 필요 여부 확인
        const needMetricsUpdate = forceUpdate || !lastMetricsUpdate || 
                                 (now - lastMetricsUpdate) > UPDATE_INTERVAL.METRICS;
        
        if (needPriceUpdate || needMetricsUpdate || forceUpdate) {
            console.log(`데이터 업데이트 시작 - 주가: ${needPriceUpdate ? '예' : '아니오'}, 지표: ${needMetricsUpdate ? '예' : '아니오'}`);
            
            // API가 로드되었는지 확인
            if (!window.InvestorData) {
                throw new Error('InvestorData API가 로드되지 않았습니다.');
            }
            
            // 모든 투자자와 주식 데이터 가져오기
            const updatedInvestors = await window.InvestorData.loadAllInvestorsWithStocks();
            
            // 데이터 업데이트
            investors = updatedInvestors;
            
            // 마지막 업데이트 시간 기록
            if (needPriceUpdate || forceUpdate) {
                lastPriceUpdate = now;
                console.log(`주가 데이터가 업데이트되었습니다. 다음 업데이트: ${new Date(now.getTime() + UPDATE_INTERVAL.PRICE).toLocaleTimeString()}`);
            }
            
            if (needMetricsUpdate || forceUpdate) {
                lastMetricsUpdate = now;
                console.log(`투자 지표가 업데이트되었습니다. 다음 업데이트: ${new Date(now.getTime() + UPDATE_INTERVAL.METRICS).toLocaleTimeString()}`);
            }
        } else {
            console.log('최근에 업데이트되어 새로운 데이터를 가져오지 않았습니다.');
        }
        
        // UI 업데이트
        renderInvestorCards();
        updateLastUpdatedTime();
        
        console.log('주식 데이터가 성공적으로 업데이트되었습니다.');
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
        alert('주식 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 리프레시 버튼 복원
        if (refreshButton && refreshIcon) {
            setTimeout(() => {
                refreshIcon.style.transform = 'rotate(0deg)';
                refreshButton.disabled = false;
            }, 500);
        }
    }
}

// 마지막 업데이트 시간 표시
function updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('last-updated');
    
    if (!lastUpdatedElement) {
        console.error('last-updated 요소를 찾을 수 없습니다.');
        return;
    }
    
    const now = new Date();
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    };
    
    let timeText = `마지막 UI 업데이트: ${now.toLocaleTimeString(undefined, options)}`;
    
    if (lastPriceUpdate) {
        timeText += ` | 주가: ${lastPriceUpdate.toLocaleTimeString(undefined, options)}`;
    }
    
    if (lastMetricsUpdate) {
        timeText += ` | 지표: ${lastMetricsUpdate.toLocaleTimeString(undefined, options)}`;
    }
    
    lastUpdatedElement.textContent = timeText;
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    // 초기 로딩 표시 및 데이터 가져오기
    try {
        // InvestorData API가 로드되었는지 확인
        if (!window.InvestorData) {
            throw new Error('InvestorData API가 로드되지 않았습니다.');
        }
        
        // 투자자 기본 정보 가져오기
        investors = window.InvestorData.getInvestorsForMainPage();
        
        // 초기 카드 렌더링
        renderInvestorCards();
        
        // 투자자 지표 렌더링
        renderInvestorMetrics();
        
        // 초기 시간 설정
        updateLastUpdatedTime();
        
        // API 키 설정 (실제 API 키로 변경 필요)
        if (window.StockAPI) {
            window.StockAPI.setApiKey('YOUR_API_KEY_HERE');
            
            // 모든 종목 이름 미리 로드 (API 사용량 최적화)
            if (window.StockAPI.initializeStockNames) {
                await window.StockAPI.initializeStockNames();
            }
        }
        
        // 새로고침 버튼 이벤트
        const refreshButton = document.getElementById('refresh-button');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => updateStockData(true)); // 강제 업데이트
        }
        
        // 페이지 로드 후 데이터 가져오기
        setTimeout(() => {
            updateStockData();
        }, 1000);
        
        // 5분마다 자동 업데이트
        setInterval(updateStockData, 5 * 60 * 1000);
    } catch (error) {
        console.error('초기 로딩 중 오류 발생:', error);
        // 오류 메시지 표시
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-container">
                    <h2>데이터를 불러올 수 없습니다</h2>
                    <p>${error.message}</p>
                    <button onclick="location.reload()">다시 시도</button>
                </div>
            `;
        }
    }
});