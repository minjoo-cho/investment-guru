// 투자자 데이터와 종목 데이터 저장 변수
let investors = [];
let lastUpdated = new Date();

// 투자자 지표 렌더링 함수 (추가됨)
function renderInvestorMetrics() {
    console.log("투자자 지표 렌더링 완료");
    // 메인 페이지에서는 별도 표시 없음 - 상세 페이지에서만 사용
}

// 주식 말풍선 HTML 생성 함수
function createStockBubble(stocks) {
    let bubbleHTML = `<div class="stock-bubble"><h4>추천 종목 Top 3</h4><ul>`;
    
    stocks.forEach(stock => {
        const changeClass = stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : '';
        const changeSymbol = stock.change > 0 ? '+' : '';
        
        bubbleHTML += `
            <li>
                <div class="stock-name">${stock.symbol}: ${stock.name}</div>
                <div class="stock-price">$${stock.price.toFixed(2)} 
                    <span class="${changeClass}">${changeSymbol}${stock.change}%</span>
                </div>
            </li>
        `;
    });
    
    bubbleHTML += `</ul></div>`;
    return bubbleHTML;
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
    
    // 투자자 데이터가 없거나 불러오는 중일 때 로딩 표시
    if (!investors || investors.length === 0) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-container';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>투자자 데이터를 불러오는 중입니다...</p>';
        investorGrid.appendChild(loadingDiv);
        return;
    }
    
    // 각 투자자 카드 생성
    investors.forEach(investor => {
        const card = document.createElement('div');
        card.className = 'investor-card';
        card.dataset.id = investor.id;
        
        // 주식 말풍선 HTML 생성 (투자자 데이터가 있을 때)
        const stockBubbleHTML = investor.topStocks && investor.topStocks.length > 0 ? 
            createStockBubble(investor.topStocks) : 
            `<div class="stock-bubble">
                <h4>추천 종목 Top 3</h4>
                <p class="loading-text">데이터를 불러오는 중입니다...</p>
            </div>`;
        
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

// 마지막 업데이트 시간 표시 함수
function updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        lastUpdated = now;
        lastUpdatedElement.textContent = now.toLocaleTimeString();
    }
}

// 주식 데이터 업데이트 함수
async function updateStockData(forceUpdate = false) {
    try {
        // 마지막 업데이트 확인
        const now = new Date();
        if (!forceUpdate && (now - lastUpdated < 5 * 60 * 1000)) {
            console.log('최근 5분 내 이미 업데이트됨, 스킵합니다.');
            return;
        }
        
        // 투자자 목록 가져오기
        if (!investors || investors.length === 0) {
            investors = window.InvestorData.getInvestorsForMainPage();
        }
        
        // 각 투자자별 주식 데이터 업데이트
        await Promise.all(investors.map(async (investor) => {
            try {
                investor.topStocks = await window.StockAPI.getStocksByInvestor(investor.id);
                investor.topStocks = investor.topStocks.slice(0, 3); // 상위 3개만
            } catch (error) {
                console.error(`${investor.name} 주식 데이터 업데이트 오류:`, error);
                investor.topStocks = []; // 오류 시 빈 배열
            }
        }));
        
        // UI 업데이트
        renderInvestorCards();
        updateLastUpdatedTime();
        
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // InvestorData API가 로드되었는지 확인
        if (!window.InvestorData) {
            throw new Error('InvestorData API가 로드되지 않았습니다.');
        }
        
        // 투자자 기본 정보 가져오기
        investors = window.InvestorData.getInvestorsForMainPage();
        
        // 초기 카드 렌더링 - 기본 정보만 먼저 표시
        renderInvestorCards();
        
        // 초기 시간 설정
        updateLastUpdatedTime();
        
        // API 키 설정 - 실제 API 키로 변경
        if (window.StockAPI && window.StockAPI.setApiKey) {
            window.StockAPI.setApiKey('alphavantage_api_key_here');
        }
        
        // 새로고침 버튼 이벤트
        const refreshButton = document.getElementById('refresh-button');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => updateStockData(true)); // 강제 업데이트
        }
        
        // 모든 종목 이름 미리 로드 (API 사용량 최적화)
        if (window.StockAPI && window.StockAPI.initializeStockNames) {
            await window.StockAPI.initializeStockNames();
        }
        
        // 주식 데이터 가져오기 - 페이지 로드 후 바로 실행
        updateStockData();
        
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
