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
                name: 'ROE (자기자본이익률)',
                description: '15% 이상의 ROE를 가진 기업 선호',
                weight: 30
            },
            {
                name: '부채비율',
                description: '1.0x 이하의 낮은 부채비율',
                weight: 25
            },
            {
                name: 'P/E 비율',
                description: '업종 평균 대비 낮은 P/E',
                weight: 20
            },
            {
                name: '현금흐름',
                description: '안정적인 영업현금흐름',
                weight: 15
            },
            {
                name: '자사주매입',
                description: '지속적인 자사주 감소',
                weight: 10
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
        stockCandidates: ['AAPL', 'BRK-B', 'KO', 'AMZN', 'MCO', 'AXP', 'BAC', 'DVA', 'VZ', 'CVX'],
        strategy: `워렌 버핏의 핵심 투자 전략...`
    },
    'charlie-munger': {
        id: 'charlie-munger',
        name: '찰리 멍거',
        fullName: 'Charlie Munger',
        birthYear: 1924,
        company: 'Berkshire Hathaway',
        philosophy: '멘탈 모델 기반의 투자 결정',
        quote: '역발상은 모든 문제 해결의 열쇠다',
        image: '/images/charlie-munger.png',
        imageBackground: '/images/charlie-munger-bg.jpg',
        metrics: [
            { name: 'ROIC', description: '15% 이상 투하자본수익률', weight: 40 },
            { name: 'FCF Yield', description: '8% 이상 자유현금흐름 수익률', weight: 25 },
            { name: 'PEG', description: '1.0 이하 성장성 대비 가치', weight: 20 },
            { name: '배당성향', description: '50% 이상 안정적 배당', weight: 15 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'roic', name: 'ROIC(%)', sortable: true },
            { id: 'fcfYield', name: 'FCF Yield(%)', sortable: true },
            { id: 'peg', name: 'PEG', sortable: true },
            { id: 'score', name: '종합점수', sortable: true }
        ],
        stockCandidates: ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL', 'BABA'],
        strategy: `찰리 멍거의 심리적 모델 접근법...`
    },
    'benjamin-graham': {
        id: 'benjamin-graham',
        name: '벤저민 그레이엄',
        fullName: 'Benjamin Graham',
        birthYear: 1894,
        company: 'Graham-Newman',
        philosophy: '안전마진을 통한 가치투자',
        quote: '투자와 투기는 명확히 구분되어야 한다',
        image: '/images/benjamin-graham.png',
        imageBackground: '/images/benjamin-graham-bg.jpg',
        metrics: [
            { name: 'P/B Ratio', description: '1.0 이하 시가총액 대비 순자산', weight: 35 },
            { name: 'Current Ratio', description: '2.0 이상 유동성 비율', weight: 30 },
            { name: 'EV/EBITDA', description: '10 이하 기업가치 대비 수익', weight: 25 },
            { name: '배당수익률', description: '5% 이상 안정적 배당', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'pb', name: 'P/B', sortable: true },
            { id: 'currentRatio', name: '유동비율', sortable: true },
            { id: 'evEbitda', name: 'EV/EBITDA', sortable: true },
            { id: 'score', name: '종합점수', sortable: true }
        ],
        stockCandidates: ['JNJ', 'PG', 'KO', 'XOM', 'JPM', 'GE'],
        strategy: `벤저민 그레이엄의 네트-넛 이론...`
    }
};

// 기본 목 데이터
const defaultMockStocks = {
    'warren-buffett': [
        { symbol: 'AAPL', price: 178.72, change: 1.5, roe: 42.3, debtToEquity: 0.4, pe: 29.8, score: 92 },
        { symbol: 'KO', price: 64.25, change: 0.8, roe: 35.7, debtToEquity: 0.6, pe: 25.1, score: 87 },
        { symbol: 'BRK-B', price: 425.60, change: 1.1, roe: 10.5, debtToEquity: 0.2, pe: 15.8, score: 90 }
    ],
    'charlie-munger': [
        { symbol: 'COST', price: 732.35, change: 0.9, roic: 28.5, fcfYield: 4.3, peg: 1.2, score: 89 },
        { symbol: 'BAC', price: 38.75, change: -0.2, roic: 12.3, fcfYield: 5.1, peg: 0.8, score: 84 },
        { symbol: 'BRK-B', price: 425.60, change: 1.1, roic: 10.5, fcfYield: 3.8, peg: 1.1, score: 86 }
    ],
    'benjamin-graham': [
        { symbol: 'JNJ', price: 152.80, change: 0.2, pb: 0.8, currentRatio: 2.3, evEbitda: 9.2, score: 88 },
        { symbol: 'PG', price: 165.30, change: 0.7, pb: 1.2, currentRatio: 1.9, evEbitda: 11.5, score: 84 },
        { symbol: 'KO', price: 64.25, change: 0.8, pb: 0.6, currentRatio: 2.1, evEbitda: 8.7, score: 83 }
    ]
};

// 나머지 함수들은 기존 내용 유지 (getInvestorStocksData, getCachedStocks 등)
// ...[중략]...

window.InvestorData = {
    getInvestorData,
    getAllInvestors,
    getInvestorsForMainPage,
    getInvestorStocksData,
    loadAllInvestorsWithStocks
};
