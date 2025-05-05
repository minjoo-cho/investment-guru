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
        useFullScreening: true,
        metrics: [
            {
                name: '경제적 해자 (Economic Moat)',
                description: '경쟁사가 쉽게 침투하기 어려운 경쟁우위를 가진 기업을 선호합니다. 브랜드 파워, 네트워크 효과, 전환 비용 등이 포함됩니다.',
                weight: 25
            },
            // 다른 지표들...
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
    'charlie-munger': {
        id: 'charlie-munger',
        name: '찰리 멍거',
        fullName: 'Charlie Munger',
        birthYear: 1924,
        deathYear: 2023,
        company: 'Berkshire Hathaway',
        philosophy: '멘탈 모델과 다학제적 사고를 통한 투자의 대가',
        quote: '모든 장애를 뛰어넘기 위한 가장 좋은 방법은 역방향으로 생각하는 것이다.',
        image: '/images/charlie-munger.png',
        imageBackground: '/images/charlie-munger-bg.jpg',
        // 다른 데이터...
    },
    'benjamin-graham': {
        id: 'benjamin-graham',
        name: '벤저민 그레이엄',
        fullName: 'Benjamin Graham',
        birthYear: 1894,
        deathYear: 1976,
        company: 'Graham-Newman Partnership',
        philosophy: '안전마진을 중시하는 가치투자의 창시자',
        quote: '투자는 돈을 잃지 않는 것에서 시작하고, 두 번째가 수익을 내는 것이다.',
        image: '/images/benjamin-graham.png',
        imageBackground: '/images/benjamin-graham-bg.jpg',
        // 다른 데이터...
    },
    // 다른 투자자 데이터...
};

// 기본 목 데이터 - API 호출 실패/지연 시 즉시 표시용
const defaultMockStocks = {
    'warren-buffett': [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.5, roe: 42.3, debtToEquity: 0.4, pe: 29.8, score: 92, isMock: true, lastUpdated: new Date() },
        { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, roe: 35.7, debtToEquity: 0.6, pe: 25.1, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roe: 10.5, debtToEquity: 0.2, pe: 15.8, score: 90, isMock: true, lastUpdated: new Date() },
        { symbol: 'BAC', name: 'Bank of America', price: 38.75, change: -0.2, roe: 12.3, debtToEquity: 1.2, pe: 11.5, score: 84, isMock: true, lastUpdated: new Date() },
        { symbol: 'AXP', name: 'American Express', price: 235.40, change: 0.5, roe: 28.1, debtToEquity: 0.9, pe: 18.3, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'MCO', name: 'Moody\'s Corp', price: 385.20, change: 0.3, roe: 65.2, debtToEquity: 1.1, pe: 31.2, score: 85, isMock: true, lastUpdated: new Date() },
        { symbol: 'AMZN', name: 'Amazon.com Inc', price: 185.40, change: 2.1, roe: 22.5, debtToEquity: 0.5, pe: 42.3, score: 83, isMock: true, lastUpdated: new Date() },
        { symbol: 'CVX', name: 'Chevron Corp', price: 155.30, change: -0.8, roe: 15.3, debtToEquity: 0.3, pe: 12.8, score: 82, isMock: true, lastUpdated: new Date() },
        { symbol: 'OXY', name: 'Occidental Petroleum', price: 62.45, change: -1.2, roe: 18.7, debtToEquity: 0.8, pe: 10.5, score: 81, isMock: true, lastUpdated: new Date() },
        { symbol: 'VZ', name: 'Verizon Communications', price: 42.85, change: 0.1, roe: 25.3, debtToEquity: 1.3, pe: 8.7, score: 80, isMock: true, lastUpdated: new Date() }
    ],
    'charlie-munger': [
        { symbol: 'COST', name: 'Costco Wholesale', price: 732.35, change: 0.9, roe: 28.5, debtToEquity: 0.3, pe: 45.6, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roe: 10.5, debtToEquity: 0.2, pe: 15.8, score: 90, isMock: true, lastUpdated: new Date() },
        { symbol: 'BABA', name: 'Alibaba Group', price: 85.20, change: -0.5, roe: 15.2, debtToEquity: 0.4, pe: 13.5, score: 86, isMock: true, lastUpdated: new Date() },
        // 추가 종목...
    ],
    'benjamin-graham': [
        { symbol: 'JNJ', name: 'Johnson & Johnson', price: 152.80, change: 0.2, roe: 18.7, debtToEquity: 0.5, pe: 14.2, score: 88, isMock: true, lastUpdated: new Date() },
        { symbol: 'PG', name: 'Procter & Gamble', price: 165.30, change: 0.7, roe: 22.5, debtToEquity: 0.6, pe: 28.3, score: 84, isMock: true, lastUpdated: new Date() },
        { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, roe: 35.7, debtToEquity: 0.6, pe: 25.1, score: 83, isMock: true, lastUpdated: new Date() },
        // 추가 종목...
    ],
    // 다른 투자자 목 데이터...
};

// 주식 데이터 가져오기 함수
async function getInvestorStocksData(investorId) {
    try {
        // 캐시에서 데이터 확인
        const cached = getCachedStocks(investorId);
        if (cached && cached.length > 0) {
            console.log(`캐시에서 ${investorId} 데이터 로드됨`);
            return cached;
        }
        
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
        
        // 데이터가 있으면 캐시에 저장
        if (stocks && stocks.length > 0) {
            setCachedStocks(investorId, stocks);
            return stocks;
        }
        
        // 기본 목 데이터 반환
        return defaultMockStocks[investorId] || generateMockStocks(investorId, 10);
    } catch (error) {
        console.error(`${investorId} 투자자의 종목 데이터 가져오기 오류:`, error);
        // 기본 목 데이터 반환
        return defaultMockStocks[investorId] || generateMockStocks(investorId, 10);
    }
}

// 캐시에서 이전 데이터 불러오기
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

// 캐시에 데이터 저장
function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        localStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
}

// 모의 데이터 생성 함수 (API 연결 전 테스트용)
function generateMockStocks(investorId, count = 10) {
    const stockSamples = {
        'warren-buffett': ['AAPL', 'BRK-B', 'KO', 'BAC', 'AXP', 'MCO', 'AMZN', 'OXY', 'VZ', 'CVX'],
        'charlie-munger': ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL', 'BABA', 'DJCO', 'COF', 'USB', 'WFC'],
        'benjamin-graham': ['JNJ', 'PG', 'KO', 'XOM', 'JPM', 'GE', 'CVX', 'IBM', 'MMM', 'T'],
        'default': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'V', 'JPM', 'JNJ']
    };
    
    const stocks = [];
    const baseStocks = stockSamples[investorId] || stockSamples['default'];
    
    for (let i = 0; i < count; i++) {
        const symbol = baseStocks[i % baseStocks.length];
        stocks.push({
            symbol: symbol,
            name: getStockName(symbol),
            price: Math.floor(100 + Math.random() * 900),
            change: (Math.random() * 10 - 5).toFixed(2),
            roe: (Math.random() * 30).toFixed(1),
            debtToEquity: (Math.random() * 2).toFixed(2),
            pe: (Math.random() * 40 + 5).toFixed(1),
            score: Math.floor(Math.random() * 40 + 60),
            lastUpdated: new Date(),
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
        'META': 'Meta Platforms Inc',
        'TSLA': 'Tesla Inc',
        'NVDA': 'NVIDIA Corp',
        'BRK-B': 'Berkshire Hathaway',
        'BRK.B': 'Berkshire Hathaway',
        'KO': 'Coca-Cola Co',
        'XOM': 'Exxon Mobil Corp',
        'BAC': 'Bank of America',
        'AXP': 'American Express',
        'COST': 'Costco Wholesale',
        'WFC': 'Wells Fargo',
        'JNJ': 'Johnson & Johnson',
        'PG': 'Procter & Gamble',
        'JPM': 'JPMorgan Chase',
        'MCO': 'Moody\'s Corp',
        'BABA': 'Alibaba Group',
        'DJCO': 'Daily Journal Corp',
        'COF': 'Capital One Financial',
        'USB': 'U.S. Bancorp',
        'GE': 'General Electric',
        'CVX': 'Chevron Corp',
        'IBM': 'IBM Corp',
        'MMM': '3M Company',
        'T': 'AT&T Inc',
        'OXY': 'Occidental Petroleum',
        'VZ': 'Verizon Communications'
    };
    return stockNames[symbol] || `Stock (${symbol})`;
}

// 투자자 목록 가져오기
function getAllInvestors() {
    return Object.values(investorsData).map(investor => {
        // 기본값 설정으로 undefined 방지
        return {
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            ...investor
        };
    });
}

// 투자자 상세 정보 가져오기
function getInvestorData(investorId) {
    const investor = investorsData[investorId];
    if (!investor) return null;
    
    // 기본값 설정으로 undefined 방지
    return {
        id: investor.id || 'unknown',
        name: investor.name || '투자자',
        philosophy: investor.philosophy || '정보가 없습니다.',
        quote: investor.quote || '정보가 없습니다.',
        image: investor.image || '/images/default-investor.png',
        ...investor
    };
}

// 메인 페이지용 투자자 데이터 가져오기
function getInvestorsForMainPage() {
    // 외부 API 호출없이 요약 정보만 가져올 때 사용
    return Object.values(investorsData).map(investor => {
        // 기본값 설정으로 undefined 방지
        return {
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            metrics: investor.metrics || [],
            stockCandidates: investor.stockCandidates || [],
            useFullScreening: investor.useFullScreening || false,
            // 기본 목 데이터 설정
            topStocks: defaultMockStocks[investor.id] ? defaultMockStocks[investor.id].slice(0, 3) : []
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
                // 기본값 설정으로 undefined 방지
                const investor = {
                    id: investorsData[id].id || 'unknown',
                    name: investorsData[id].name || '투자자',
                    philosophy: investorsData[id].philosophy || '정보가 없습니다.',
                    quote: investorsData[id].quote || '정보가 없습니다.',
                    image: investorsData[id].image || '/images/default-investor.png',
                    ...investorsData[id]
                };
                
                // 캐시 또는 기본 목 데이터를 먼저 설정
                const cached = getCachedStocks(id);
                if (cached && cached.length > 0) {
                    investor.topStocks = cached.slice(0, 3);
                } else {
                    investor.topStocks = defaultMockStocks[id] ? defaultMockStocks[id].slice(0, 3) : [];
                }
                
                // 실제 API 호출은 비동기로 진행
                getInvestorStocksData(id).then(stocks => {
                    if (stocks && stocks.length > 0) {
                        investor.topStocks = stocks.slice(0, 3);
                    }
                }).catch(err => console.error(err));
                
                return investor;
            })
        );
        
        return investorsWithStocks;
    } catch (error) {
        console.error('투자자 데이터 로딩 중 오류 발생:', error);
        return Object.values(investorsData).map(investor => ({
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            ...investor,
            topStocks: defaultMockStocks[investor.id] ? defaultMockStocks[investor.id].slice(0, 3) : []
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
