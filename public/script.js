// 투자자 데이터 (샘플)
const investors = [
    {
        id: 'warren-buffett',
        name: '워렌 버핏',
        philosophy: '기업의 본질적 가치에 집중하는 가치투자의 대가',
        quote: '다른 사람들이 두려워할 때 욕심내고, 다른 사람들이 욕심낼 때 두려워하라.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'AAPL', name: '애플', score: 95 },
            { symbol: 'BRK-B', name: '버크셔 해서웨이', score: 92 },
            { symbol: 'KO', name: '코카콜라', score: 88 }
        ]
    },
    {
        id: 'peter-lynch',
        name: '피터 린치',
        philosophy: '일상에서 발견할 수 있는 성장 기업을 발굴하는 전략가',
        quote: '주식을 지금 사야 할지 고민 중이라면, 그건 안 사는 게 맞다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'SBUX', name: '스타벅스', score: 94 },
            { symbol: 'COST', name: '코스트코', score: 91 },
            { symbol: 'TGT', name: '타겟', score: 87 }
        ]
    },
    {
        id: 'benjamin-graham',
        name: '벤자민 그레이엄',
        philosophy: '안전마진을 중시하는 가치투자의 창시자',
        quote: '투자는 철저한 분석, 약속된 안전성, 적절한 수익을 동반한다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'PG', name: '프록터앤갬블', score: 93 },
            { symbol: 'JNJ', name: '존슨앤존슨', score: 90 },
            { symbol: 'JPM', name: 'JP모건', score: 88 }
        ]
    },
    {
        id: 'charlie-munger',
        name: '찰리 멍거',
        philosophy: '다학제적 사고모델을 바탕으로 한 가치투자의 실천가',
        quote: '당신이 무엇을 모르는지 아는 것이 중요하다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'COST', name: '코스트코', score: 95 },
            { symbol: 'BRK-B', name: '버크셔 해서웨이', score: 91 },
            { symbol: 'WFC', name: '웰스파고', score: 87 }
        ]
    },
    {
        id: 'ray-dalio',
        name: '레이 달리오',
        philosophy: '경제 사이클과 자산 배분에 기반한 투자 전략가',
        quote: '고통 + 성찰 = 진보',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'GLD', name: 'SPDR 골드', score: 96 },
            { symbol: 'TLT', name: 'iShares 20+ 채권', score: 94 },
            { symbol: 'VWO', name: '신흥국 ETF', score: 89 }
        ]
    },
    {
        id: 'phil-fisher',
        name: '필립 피셔',
        philosophy: '성장 잠재력이 높은 기업을 발굴하는 성장주 투자의 대가',
        quote: '적절한 기업을 매수한 후에는 성급한 매도는 최악의 실수다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'MSFT', name: '마이크로소프트', score: 97 },
            { symbol: 'TSLA', name: '테슬라', score: 93 },
            { symbol: 'NVDA', name: '엔비디아', score: 92 }
        ]
    },
    {
        id: 'john-bogle',
        name: '존 보글',
        philosophy: '인덱스 투자와 낮은 비용의 장기 투자 옹호자',
        quote: '시간은 당신의 친구이며, 충동은 적이다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'VTI', name: '토탈 마켓 ETF', score: 95 },
            { symbol: 'VOO', name: 'S&P 500 ETF', score: 94 },
            { symbol: 'BND', name: '토탈 채권 ETF', score: 90 }
        ]
    },
    {
        id: 'howard-marks',
        name: '하워드 막스',
        philosophy: '시장 심리와 가치 평가에 집중하는 채권 투자의 거장',
        quote: '대부분의 사람들이 조심스러울 때는 공격적이어야 하고, 공격적일 때는 조심해야 한다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'AMZN', name: '아마존', score: 92 },
            { symbol: 'GOOGL', name: '알파벳', score: 90 },
            { symbol: 'C', name: '시티그룹', score: 87 }
        ]
    },
    {
        id: 'jim-simons',
        name: '짐 사이먼스',
        philosophy: '수학적 모델과 알고리즘을 활용한 퀀트 투자의 선구자',
        quote: '시장을 이기려면 더 많은 정보와 더 정확한 분석이 필요하다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'GOOGL', name: '알파벳', score: 98 },
            { symbol: 'AMZN', name: '아마존', score: 96 },
            { symbol: 'MSFT', name: '마이크로소프트', score: 95 }
        ]
    },
    {
        id: 'john-templeton',
        name: '존 템플턴',
        philosophy: '글로벌 투자와 가치 기반 접근으로 유명한 국제 투자의 선구자',
        quote: '다른 사람들이 외면하는 곳에서 기회를 찾아라.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'VXUS', name: '해외 주식 ETF', score: 96 },
            { symbol: 'VWO', name: '신흥국 ETF', score: 92 },
            { symbol: 'EWJ', name: '일본 ETF', score: 89 }
        ]
    }
];

// 주식 변화에 따른 화살표 컴포넌트
const ChangeArrow = ({ change }) => {
    if (change > 0) return '<span class="up">↑</span>';
    if (change < 0) return '<span class="down">↓</span>';
    return '';
};

// 대가 카드의 말풍선 컴포넌트
function createStockBubble(stocks) {
    let stockBubbleHTML = `<div class="stock-bubble">
        <h4>추천 종목 Top 3</h4>
        <ul>`;
    
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
    
    stockBubbleHTML += `</ul></div>`;
    
    return stockBubbleHTML;
}

// 투자자 카드 렌더링 함수
function renderInvestorCards() {
    const investorGrid = document.getElementById('investor-grid');
    investorGrid.innerHTML = ''; // 기존 내용 삭제
    
    investors.forEach(investor => {
        const card = document.createElement('div');
        card.className = 'investor-card';
        card.dataset.id = investor.id;
        
        // 주식 말풍선 HTML 생성
        const stockBubbleHTML = createStockBubble(investor.topStocks);
        
        // 카드 내용 HTML 생성
        card.innerHTML = `
            ${stockBubbleHTML}
            <img src="${investor.image}" alt="${investor.name}">
            <h3>${investor.name}</h3>
            <p>${investor.philosophy}</p>
            <p class="quote">"${investor.quote}"</p>
            <button>상세 보기 <span>→</span></button>
        `;
        
        // 마우스 오버 이벤트 추가
        card.addEventListener('mouseenter', function() {
            const bubble = this.querySelector('.stock-bubble');
            bubble.style.display = 'block';
        });
        
        card.addEventListener('mouseleave', function() {
            const bubble = this.querySelector('.stock-bubble');
            bubble.style.display = 'none';
        });
        
        // 상세 보기 버튼 클릭 이벤트
        const button = card.querySelector('button');
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 버블링 방지
            window.location.href = `investor/index.html?id=${investor.id}`;
        });
        
        investorGrid.appendChild(card);
    });
}

// 모든 투자자의 모든 주식 심볼 가져오기
function getAllStockSymbols() {
    const symbols = new Set();
    
    investors.forEach(investor => {
        investor.topStocks.forEach(stock => {
            symbols.add(stock.symbol);
        });
    });
    
    return Array.from(symbols);
}

// 주식 데이터 업데이트 함수
async function updateStockData() {
    const refreshButton = document.getElementById('refresh-button');
    const refreshIcon = refreshButton.querySelector('.refresh-icon');
    
    refreshIcon.style.transform = 'rotate(360deg)';
    refreshButton.disabled = true;
    
    try {
        // 모든 주식 심볼 가져오기
        const allSymbols = getAllStockSymbols();
        
        // API가 로드되었는지 확인
        if (!window.StockAPI) {
            throw new Error('Stock API가 로드되지 않았습니다.');
        }
        
        // 모든 주식 데이터 가져오기
        const stockData = await window.StockAPI.fetchMultipleStocks(allSymbols);
        
        // 각 투자자의 추천 종목 데이터 업데이트
        investors.forEach(investor => {
            investor.topStocks.forEach(stock => {
                if (stockData[stock.symbol]) {
                    stock.price = stockData[stock.symbol].price;
                    stock.change = stockData[stock.symbol].change;
                    stock.previousClose = stockData[stock.symbol].previousClose;
                    stock.isMock = stockData[stock.symbol].isMock;
                }
            });
        });
        
        // UI 업데이트
        renderInvestorCards();
        updateLastUpdatedTime();
        
        console.log('주식 데이터가 성공적으로 업데이트되었습니다.');
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
        alert('주식 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 리프레시 버튼 복원
        setTimeout(() => {
            refreshIcon.style.transform = 'rotate(0deg)';
            refreshButton.disabled = false;
        }, 500);
    }
}

// 마지막 업데이트 시간 표시
function updateLastUpdatedTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    document.getElementById('last-updated').textContent = formattedTime;
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 초기 카드 렌더링
    renderInvestorCards();
    
    // 초기 시간 설정
    updateLastUpdatedTime();
    
    // API 키 설정 (실제 API 키로 변경 필요)
    if (window.StockAPI) {
        window.StockAPI.setApiKey('YOUR_API_KEY_HERE');
    }
    
    // 새로고침 버튼 이벤트
    document.getElementById('refresh-button').addEventListener('click', updateStockData);
    
    // 페이지 로드 후 데이터 가져오기
    setTimeout(() => {
        updateStockData();
    }, 1000);
    
    // 5분마다 자동 업데이트
    setInterval(updateStockData, 5 * 60 * 1000);
});