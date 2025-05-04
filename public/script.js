// 투자자 데이터 (기본 정보만 포함, 종목 데이터는 API에서 가져옴)
const investors = [
    {
        id: 'warren-buffett',
        name: '워렌 버핏',
        philosophy: '기업의 본질적 가치에 집중하는 가치투자의 대가',
        quote: '다른 사람들이 두려워할 때 욕심내고, 다른 사람들이 욕심낼 때 두려워하라.',
        image: '/images/warren-buffett.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'peter-lynch',
        name: '피터 린치',
        philosophy: '일상에서 발견할 수 있는 성장 기업을 발굴하는 전략가',
        quote: '주식을 지금 사야 할지 고민 중이라면, 그건 안 사는 게 맞다.',
        image: '/images/peter-lynch.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'benjamin-graham',
        name: '벤자민 그레이엄',
        philosophy: '안전마진을 중시하는 가치투자의 창시자',
        quote: '투자는 철저한 분석, 약속된 안전성, 적절한 수익을 동반한다.',
        image: '/images/benjamin-graham.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'charlie-munger',
        name: '찰리 멍거',
        philosophy: '다학제적 사고모델을 바탕으로 한 가치투자의 실천가',
        quote: '당신이 무엇을 모르는지 아는 것이 중요하다.',
        image: '/images/charlie-munger.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'ray-dalio',
        name: '레이 달리오',
        philosophy: '경제 사이클과 자산 배분에 기반한 투자 전략가',
        quote: '고통 + 성찰 = 진보',
        image: '/images/ray-dalio.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'phil-fisher',
        name: '필립 피셔',
        philosophy: '성장 잠재력이 높은 기업을 발굴하는 성장주 투자의 대가',
        quote: '적절한 기업을 매수한 후에는 성급한 매도는 최악의 실수다.',
        image: '/images/philip-fisher.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'john-bogle',
        name: '존 보글',
        philosophy: '인덱스 투자와 낮은 비용의 장기 투자 옹호자',
        quote: '시간은 당신의 친구이며, 충동은 적이다.',
        image: '/images/john-bogle.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'george-soros',
        name: '조지 소로스',
        philosophy: '시장 심리와 자기반사성을 활용한 거시경제 투자자',
        quote: '실패하지 않는 사람은 없다. 성공한 사람은 실패를 통해 배운다.',
        image: '/images/george-soros.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'jim-simons',
        name: '짐 사이먼스',
        philosophy: '수학적 모델과 알고리즘을 활용한 퀀트 투자의 선구자',
        quote: '시장을 이기려면 더 많은 정보와 더 정확한 분석이 필요하다.',
        image: '/images/jim-simons.png',
        topStocks: [] // API에서 가져올 예정
    },
    {
        id: 'john-templeton',
        name: '존 템플턴',
        philosophy: '글로벌 투자와 가치 기반 접근으로 유명한 국제 투자의 선구자',
        quote: '다른 사람들이 외면하는 곳에서 기회를 찾아라.',
        image: '/images/john-templeton.png',
        topStocks: [] // API에서 가져올 예정
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
    // 종목 데이터가 없는 경우 로딩 메시지 표시
    if (!stocks || stocks.length === 0) {
        return `<div class="stock-bubble">
            <h4>추천 종목 Top 3</h4>
            <p class="loading-message">종목 데이터를 불러오는 중...</p>
        </div>`;
    }
    
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
        if (investor.topStocks && investor.topStocks.length > 0) {
            investor.topStocks.forEach(stock => {
                symbols.add(stock.symbol);
            });
        }
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
        // API가 로드되었는지 확인
        if (!window.StockAPI) {
            throw new Error('Stock API가 로드되지 않았습니다.');
        }
        
        // 각 투자자별 맞춤형 종목 데이터 가져오기
        const updatePromises = investors.map(async (investor) => {
            try {
                // 투자자별 지표에 맞는 종목 가져오기
                const stocks = await window.StockAPI.getStocksByInvestor(investor.id);
                
                // 상위 3개 종목만 선택하여 투자자 데이터 업데이트
                investor.topStocks = stocks.slice(0, 3);
                
                return true;
            } catch (error) {
                console.error(`${investor.name} 종목 데이터 가져오기 오류:`, error);
                return false;
            }
        });
        
        // 모든 업데이트 작업 완료 대기
        await Promise.all(updatePromises);
        
        // UI 업데이트
        renderInvestorCards();
        updateLastUpdatedTime();
        
        console.log('주식 데이터가 성공적으로 업데이트되었습니다.');
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
        alert('주식 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 새로고침 버튼 복원
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
    // 초기 카드 렌더링 (빈 종목 데이터로)
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