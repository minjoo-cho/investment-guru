// 투자자 데이터와 종목 데이터 저장 변수
let investors = [];
let lastUpdated = new Date();

// 투자자 지표 렌더링 함수
function renderInvestorMetrics() {
    console.log("투자자 지표 렌더링 완료");
}

// 초기 목 데이터 생성 (API 실패/지연 시 즉시 표시용)
function generateInitialMockStocks(symbol, name) {
    return {
        symbol: symbol || 'AAPL',
        name: name || 'Apple Inc.',
        price: 100 + Math.random() * 900,
        change: (Math.random() * 10 - 5).toFixed(2),
        roe: (Math.random() * 30).toFixed(1),
        debtToEquity: (Math.random() * 2).toFixed(2),
        pe: (Math.random() * 40 + 5).toFixed(1),
        score: Math.floor(Math.random() * 40 + 60),
        lastUpdated: new Date(),
        isMock: true
    };
}

// 주식 말풍선 HTML 생성 함수
function createStockBubble(stocks) {
    let bubbleHTML = `<div class="stock-bubble"><h4>추천 종목 Top 3</h4><ul>`;
    
    if (!stocks || stocks.length === 0) {
        bubbleHTML += `<li><div class="stock-name">데이터 로드 중...</div></li>`;
    } else {
        stocks.forEach(stock => {
            const changeClass = stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : '';
            const changeSymbol = stock.change > 0 ? '+' : '';
            
            bubbleHTML += `
                <li>
                    <div class="stock-name">${stock.symbol}: ${stock.name}</div>
                    <div class="stock-price">$${stock.price.toFixed(2)} 
                        <span class="${changeClass}">${changeSymbol}${stock.change}%</span>
                        ${stock.isMock ? '<small style="color:#d9534f;">[목]</small>' : ''}
                    </div>
                </li>
            `;
        });
    }
    
    bubbleHTML += `</ul></div>`;
    return bubbleHTML;
}

// 캐시에서 이전 데이터 불러오기
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

// 캐시에 데이터 저장
function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        sessionStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
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
        // undefined 체크 및 기본값 설정
        if (!investor || typeof investor !== 'object') {
            console.error('유효하지 않은 투자자 데이터:', investor);
            return;
        }
        
        const card = document.createElement('div');
        card.className = 'investor-card';
        card.dataset.id = investor.id || '';
        
        // 목 데이터가 없으면 기본 목 데이터 생성
        if (!investor.topStocks || investor.topStocks.length === 0) {
            investor.topStocks = [
                generateInitialMockStocks('AAPL', 'Apple Inc.'),
                generateInitialMockStocks('MSFT', 'Microsoft Corp'),
                generateInitialMockStocks('GOOGL', 'Alphabet Inc')
            ];
        }
        
        // 주식 말풍선 HTML 생성
        const stockBubbleHTML = createStockBubble(investor.topStocks);
        
        // 카드 내용 HTML 생성 (필드가 없는 경우 기본값 사용)
        card.innerHTML = `
            ${stockBubbleHTML}
            <img src="${investor.image || '/images/default-investor.png'}" alt="${investor.name || '투자자'}" loading="lazy">
            <h3>${investor.name || '투자자'}</h3>
            <p>${investor.philosophy || '투자 철학 정보가 없습니다.'}</p>
            <p class="quote">"${investor.quote || '인용구 정보가 없습니다.'}"</p>
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
                window.location.href = `investor/?id=${investor.id || ''}`;
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
        
        // 각 투자자별 캐시된 데이터 먼저 표시
        investors.forEach(investor => {
            if (!investor) return;
            
            // 캐시된 데이터 확인
            const cached = getCachedStocks(investor.id);
            if (cached && cached.length > 0) {
                investor.topStocks = cached.slice(0, 3);
                renderInvestorCards(); // 바로 UI 업데이트
            } else if (!investor.topStocks || investor.topStocks.length === 0) {
                // 캐시도 없고 기존 데이터도 없으면 목 데이터 생성
                investor.topStocks = [
                    generateInitialMockStocks('AAPL', 'Apple Inc.'),
                    generateInitialMockStocks('MSFT', 'Microsoft Corp'),
                    generateInitialMockStocks('GOOGL', 'Alphabet Inc')
                ];
                renderInvestorCards(); // 바로 UI 업데이트
            }
        });
        
        // 각 투자자별 주식 데이터 업데이트 (비동기)
        investors.forEach(async (investor) => {
            if (!investor) return;
            
            try {
                // 실제 API 호출은 비동기로 진행
                const stocks = await window.StockAPI.getStocksByInvestor(investor.id);
                if (stocks && stocks.length > 0) {
                    investor.topStocks = stocks.slice(0, 3); // 상위 3개만
                    setCachedStocks(investor.id, stocks); // 캐시 저장
                    renderInvestorCards(); // UI 업데이트
                }
            } catch (error) {
                console.error(`${investor?.name || 'Unknown'} 주식 데이터 업데이트 오류:`, error);
                // 오류 시에도 목 데이터 표시 유지
            }
        });
        
        // UI 업데이트
        updateLastUpdatedTime();
        
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 기본 목 데이터 준비
        const defaultMockData = {
            'warren-buffett': [
                { symbol: 'AAPL', name: 'Apple Inc.', price: 175.34, change: 2.3, roe: 45.6, debtToEquity: 0.3, pe: 28.7, score: 95, isMock: true, lastUpdated: new Date() },
                { symbol: 'KO', name: 'Coca-Cola Co', price: 65.82, change: 0.5, roe: 38.2, debtToEquity: 0.5, pe: 22.4, score: 88, isMock: true, lastUpdated: new Date() },
                { symbol: 'BRK.B', name: 'Berkshire Hathaway', price: 420.50, change: 1.2, roe: 12.8, debtToEquity: 0.2, pe: 18.5, score: 92, isMock: true, lastUpdated: new Date() }
            ]
        };
        
        // InvestorData API가 로드되었는지 확인
        if (!window.InvestorData) {
            throw new Error('InvestorData API가 로드되지 않았습니다.');
        }
        
        // 투자자 기본 정보 가져오기
        investors = window.InvestorData.getInvestorsForMainPage();
        
        // undefined 확인 및 보정
        investors = investors.map(investor => {
            if (!investor || typeof investor !== 'object') {
                return {
                    id: 'unknown',
                    name: '투자자',
                    philosophy: '정보가 없습니다.',
                    quote: '정보가 없습니다.',
                    image: '/images/default-investor.png',
                    topStocks: []
                };
            }
            
            // 기본값 설정
            return {
                id: investor.id || 'unknown',
                name: investor.name || '투자자',
                philosophy: investor.philosophy || '정보가 없습니다.',
                quote: investor.quote || '정보가 없습니다.',
                image: investor.image || '/images/default-investor.png',
                topStocks: investor.topStocks || [],
                ...investor
            };
        });
        
        // 기본 목 데이터 적용 (없는 경우만)
        investors.forEach(investor => {
            if (investor.id && defaultMockData[investor.id] && (!investor.topStocks || investor.topStocks.length === 0)) {
                investor.topStocks = defaultMockData[investor.id];
            }
            
            // 그래도 없으면 기본 목 데이터 생성
            if (!investor.topStocks || investor.topStocks.length === 0) {
                investor.topStocks = [
                    generateInitialMockStocks('AAPL', 'Apple Inc.'),
                    generateInitialMockStocks('MSFT', 'Microsoft Corp'),
                    generateInitialMockStocks('GOOGL', 'Alphabet Inc')
                ];
            }
        });
        
        // 초기 카드 렌더링 - 기본 정보/목 데이터 먼저 표시
        renderInvestorCards();
        
        // 초기 시간 설정
        updateLastUpdatedTime();
        
        // API 키 설정 - 실제 API 키로 변경
        if (window.StockAPI && window.StockAPI.setApiKey) {
            window.StockAPI.setApiKey('YOUR_API_KEY_HERE'); // 실제 키로 교체
        }
        
        // 새로고침 버튼 이벤트
        const refreshButton = document.getElementById('refresh-button');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => updateStockData(true)); // 강제 업데이트
        }
        
        // 주식 데이터 가져오기 (백그라운드에서 실행)
        setTimeout(() => {
            updateStockData();
        }, 100);
        
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
                    <p>잠시 후 다시 시도해주세요.</p>
                    <button onclick="location.reload()">다시 시도</button>
                </div>
            `;
        }
    }
});
