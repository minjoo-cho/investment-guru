// 투자자 상세 데이터
const investorsData = {
    'warren-buffett': {
        id: 'warren-buffett',
        name: '워렌 버핏',
        fullName: 'Warren Buffett',
        birthYear: 1930,
        company: 'Berkshire Hathaway',
        philosophy: '기업의 본질적 가치에 집중하는 가치투자의 대가',
        quote: '다른 사람들이 두려워할 때 욕심내고, 다른 사람들이 욕심낼 때 두려워하라.',
        image: '/images/warren-buffett.png',
        imageBackground: '/images/warren-buffett-bg.jpg',
        // S&P 500 전체 스크리닝 활성화 플래그 추가
        useFullScreening: true,
        metrics: [
            {
                name: '경제적 해자 (Economic Moat)',
                description: '경쟁사가 쉽게 침투하기 어려운 경쟁우위를 가진 기업을 선호합니다. 브랜드 파워, 네트워크 효과, 전환 비용 등이 포함됩니다.',
                weight: 25
            },
            {
                name: 'ROE (자기자본이익률)',
                description: '15% 이상의 ROE를 가진 기업을 선호합니다. 이는 기업이 주주 자본을 얼마나 효율적으로 활용하는지 보여줍니다.',
                weight: 20
            },
            {
                name: '낮은 부채 비율',
                description: '부채가 적은 기업을 선호합니다. 재무 건전성이 강한 기업이 경제 위기 상황에서도 생존할 가능성이 높습니다.',
                weight: 15
            },
            {
                name: 'P/E 비율',
                description: '업종 평균 대비 낮은 P/E 비율을 가진 기업을 선호합니다. 이는 기업의 가격이 수익 대비 합리적인지 평가하는 지표입니다.',
                weight: 10
            },
            {
                name: '현금흐름',
                description: '예측 가능하고 안정적인 현금 흐름을 가진 기업을 선호합니다. 지속적인 현금 창출 능력은 투자 안정성에 중요합니다.',
                weight: 10
            },
            {
                name: '경영진 신뢰성',
                description: '정직하고 주주 친화적인 경영진이 있는 기업을 선호합니다. 경영진의 투명성과 능력은 장기적 성공에 중요합니다.',
                weight: 8
            },
            {
                name: '내재가치 할인율',
                description: '현재 주가가 내재가치보다 낮은 기업을 선호합니다. 이는 안전마진 개념의 핵심입니다.',
                weight: 7
            },
            {
                name: '이익 성장성',
                description: '10년간 연평균 10% 이상의 EPS 성장을 보이는 기업을 선호합니다. 장기적이고 일관된 성장은 가치 증가에 중요합니다.',
                weight: 5
            },
            {
                name: '자사주 매입',
                description: '지속적으로 자사주를 매입하여 주식 수를 줄이는 기업을 선호합니다. 이는 주주 가치를 높이는 방법 중 하나입니다.',
                weight: 4
            },
            {
                name: '상품 의존도',
                description: '원자재 의존도가 낮은 기업을 선호합니다. 원자재 가격 변동이 수익성에 큰 영향을 미치지 않는 기업이 안정적입니다.',
                weight: 3
            }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'roe', name: 'ROE(%)', sortable: true },
            { id: 'debtToEquity', name: '부채비율', sortable: true },
            { id: 'pe', name: 'P/E', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['AAPL', 'BRK-B', 'KO', 'AMZN', 'MCO', 'AXP', 'BAC', 'DVA', 'VZ', 'CVX', 'KHC', 'CE', 'GM', 'PG', 'OXY', 'PARA', 'HPQ', 'NUE', 'SNOW', 'USB'],
        strategy: `
            <h4>워렌 버핏의 투자 철학</h4>
            <p>워렌 버핏은 벤자민 그레이엄의 가치 투자 원칙을 자신만의 방식으로 발전시켰습니다. 그는 "너무 비싸지 않은 가격에 훌륭한 기업을 구매하라"는 철학을 가지고 있습니다.</p>
            
            <h4>주요 투자 전략</h4>
            <ul>
                <li><strong>기업의 본질 가치 분석:</strong> 버핏은 주가의 단기적 움직임보다 기업의 본질적 가치에 집중합니다. 그는 수익성, 성장성, 부채 수준 등 기업의 재무 건전성을 철저히 분석합니다.</li>
                <li><strong>장기적 관점:</strong> 버핏은 최소 10년 이상의 장기 관점에서 투자를 고려합니다. 그는 "주식을 산다는 것은 그 기업의 사업을 산다는 것"이라고 믿습니다.</li>
                <li><strong>경제적 해자:</strong> 경쟁사가 쉽게 진입하기 어려운 경쟁 우위(경제적 해자)를 가진 기업을 선호합니다.</li>
                <li><strong>이해할 수 있는 비즈니스:</strong> 버핏은 자신이 완전히 이해할 수 있는 단순한 비즈니스 모델을 가진 기업에만 투자합니다.</li>
                <li><strong>뛰어난 경영진:</strong> 정직하고 역량 있는 경영진이 운영하는 기업을 중요시합니다.</li>
            </ul>
            
            <h4>시장 관점</h4>
            <p>버핏은 시장 타이밍을 잡으려 하지 않으며, 대신 시장이 과열되었을 때는 신중해지고 시장이 공포에 빠졌을 때는 적극적으로 매수하는 경향을 보입니다. 그의 유명한 격언 "다른 사람들이 두려워할 때 욕심을 부리고, 다른 사람들이 욕심을 부릴 때 두려워하라"는 이러한 전략을 잘 보여줍니다.</p>
        `
    },
    // 다른 투자자 데이터는 원래 내용 그대로 유지
    'charlie-munger': {
        // 기존 데이터 유지
    },
    'benjamin-graham': {
        // 기존 데이터 유지
    }
    // 다른 투자자 정보는 생략
};

// 주식 데이터 가져오기 함수
async function getInvestorStocksData(investorId) {
    try {
        // StockAPI가 로드되었는지 확인
        if (!window.StockAPI) {
            throw new Error('Stock API가 로드되지 않았습니다.');
        }
        
        // investorsData에 해당 투자자 정보가 있는지 확인
        if (!investorsData[investorId]) {
            throw new Error(`${investorId} 투자자 정보를 찾을 수 없습니다.`);
        }
        
        // 투자자별 추천 종목 가져오기
        const stocks = await window.StockAPI.getStocksByInvestor(investorId);
        
        // 투자자 상세 정보 업데이트
        if (stocks && stocks.length > 0) {
            return stocks;
        }
        
        return [];
    } catch (error) {
        console.error(`${investorId} 투자자의 종목 데이터 가져오기 오류:`, error);
        return generateMockStocks(investorId, 10); // 오류 시 모의 데이터 반환
    }
}

// 모의 데이터 생성 함수 (API 연결 전 테스트용)
function generateMockStocks(investorId, count = 10) {
    const stockSamples = {
        'warren-buffett': ['AAPL', 'BRK-B', 'KO', 'BAC', 'AXP'],
        'charlie-munger': ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL'],
        'benjamin-graham': ['JNJ', 'PG', 'KO', 'XOM', 'JPM'],
        // 다른 투자자 샘플 데이터 추가
    };
    
    const stocks = [];
    const baseStocks = stockSamples[investorId] || ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB'];
    
    for (let i = 0; i < count; i++) {
        const symbol = baseStocks[i % baseStocks.length] || `STOCK${i}`;
        stocks.push({
            symbol: symbol,
            name: getStockName(symbol),
            price: Math.floor(100 + Math.random() * 900),
            change: (Math.random() * 10 - 5).toFixed(2),
            roe: (Math.random() * 30).toFixed(1),
            debtToEquity: (Math.random() * 2).toFixed(2),
            pe: (Math.random() * 40 + 5).toFixed(1),
            score: Math.floor(Math.random() * 40 + 60),
            isMock: true
        });
    }
    
    return stocks.sort((a, b) => b.score - a.score);
}

// 주식명 가져오기 (모의 데이터용)
function getStockName(symbol) {
    const stockNames = {
        'AAPL': 'Apple Inc.',
        'MSFT': 'Microsoft Corp',
        'GOOGL': 'Alphabet Inc',
        'AMZN': 'Amazon.com Inc',
        'BRK-B': 'Berkshire Hathaway',
        'KO': 'Coca-Cola Co',
        'XOM': 'Exxon Mobil Corp',
        'BAC': 'Bank of America',
        'AXP': 'American Express',
        'COST': 'Costco Wholesale',
        'WFC': 'Wells Fargo',
        'JNJ': 'Johnson & Johnson',
        'PG': 'Procter & Gamble',
        'JPM': 'JPMorgan Chase'
    };
    return stockNames[symbol] || `Stock (${symbol})`;
}

// 투자자 목록 가져오기
function getAllInvestors() {
    return Object.values(investorsData);
}

// 투자자 상세 정보 가져오기
function getInvestorData(investorId) {
    return investorsData[investorId] || null;
}

// 메인 페이지용 투자자 데이터 가져오기
function getInvestorsForMainPage() {
    // 외부 API 호출없이 요약 정보만 가져올 때 사용
    return Object.values(investorsData).map(investor => {
        return {
            id: investor.id,
            name: investor.name,
            philosophy: investor.philosophy,
            quote: investor.quote,
            image: investor.image,
            metrics: investor.metrics,
            stockCandidates: investor.stockCandidates,
            useFullScreening: investor.useFullScreening || false, // 추가: S&P 500 스크리닝 플래그
            topStocks: [] // 실시간 API 호출을 위해 빈 배열로 초기화
        };
    });
}

// 전체 투자자 목록을 위한 API 연동 함수
async function loadAllInvestorsWithStocks() {
    try {
        // 모든 투자자 ID 가져오기
        const investorIds = Object.keys(investorsData);
        
        // 각 투자자별 주식 데이터 가져오기
        const investorsWithStocks = await Promise.all(
            investorIds.map(async (id) => {
                const investor = { ...investorsData[id] };
                investor.topStocks = await getInvestorStocksData(id);
                // TOP 3만 사용
                investor.topStocks = investor.topStocks.slice(0, 3);
                return investor;
            })
        );
        
        return investorsWithStocks;
    } catch (error) {
        console.error('투자자 데이터 로딩 중 오류 발생:', error);
        return Object.values(investorsData).map(investor => ({
            ...investor,
            topStocks: []
        }));
    }
}

// 외부에서 사용할 함수들 내보내기
window.InvestorData = {
    getInvestorData,
    getAllInvestors,
    getInvestorsForMainPage,
    getInvestorStocksData,
    loadAllInvestorsWithStocks
};
