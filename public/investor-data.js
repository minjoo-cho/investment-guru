// 투자자 상세 데이터 (일관된 구조로 전체 수정)
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
        metrics: [
            { id: 'roe', name: 'ROE(%)', description: '15% 이상', weight: 30 },
            { id: 'debtToEquity', name: '부채비율', description: '1.0x 이하', weight: 25 },
            { id: 'pe', name: 'P/E', description: '업종 평균 대비 낮음', weight: 20 },
            { id: 'cashFlow', name: '현금흐름', description: '안정적 운영현금흐름', weight: 15 },
            { id: 'buyback', name: '자사주매입', description: '지속적 감소', weight: 10 }
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
        stockCandidates: ['AAPL', 'BRK-B', 'KO', 'BAC', 'AXP', 'MCO', 'AMZN', 'CVX'],
        strategy: `워렌 버핏의 핵심 투자 원칙...`
    },
    // [찰리 멍거] 데이터 수정
    'charlie-munger': {
        id: 'charlie-munger',
        name: '찰리 멍거',
        fullName: 'Charlie Munger',
        birthYear: 1924,
        deathYear: 2023,
        company: 'Berkshire Hathaway',
        philosophy: '멘탈 모델 기반의 투자 결정',
        quote: '역발상은 모든 문제 해결의 열쇠다',
        image: '/images/charlie-munger.png',
        imageBackground: '/images/charlie-munger-bg.jpg',
        metrics: [
            { id: 'roic', name: 'ROIC(%)', description: '15% 이상', weight: 40 },
            { id: 'fcfYield', name: 'FCF Yield(%)', description: '8% 이상', weight: 25 },
            { id: 'peg', name: 'PEG', description: '1.0 이하', weight: 20 },
            { id: 'dividend', name: '배당성향(%)', description: '50% 이상', weight: 15 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'roic', name: 'ROIC(%)', sortable: true },
            { id: 'fcfYield', name: 'FCF Yield(%)', sortable: true },
            { id: 'peg', name: 'PEG', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL', 'BABA'],
        strategy: `찰리 멍거의 투자 접근법...`
    },
    // [벤저민 그레이엄] 데이터 수정
    'benjamin-graham': {
        id: 'benjamin-graham',
        name: '벤저민 그레이엄',
        fullName: 'Benjamin Graham',
        birthYear: 1894,
        deathYear: 1976,
        company: 'Graham-Newman Partnership',
        philosophy: '안전마진을 중시하는 가치투자',
        quote: '투자는 돈을 잃지 않는 것에서 시작한다',
        image: '/images/benjamin-graham.png',
        imageBackground: '/images/benjamin-graham-bg.jpg',
        metrics: [
            { id: 'pb', name: 'P/B', description: '1.0 이하', weight: 35 },
            { id: 'currentRatio', name: '유동비율', description: '2.0 이상', weight: 30 },
            { id: 'evEbitda', name: 'EV/EBITDA', description: '10 이하', weight: 25 },
            { id: 'dividendYield', name: '배당수익률(%)', description: '5% 이상', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'pb', name: 'P/B', sortable: true },
            { id: 'currentRatio', name: '유동비율', sortable: true },
            { id: 'evEbitda', name: 'EV/EBITDA', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['JNJ', 'PG', 'KO', 'XOM', 'JPM', 'GE'],
        strategy: `벤저민 그레이엄의 안전마진 전략...`
    },
    // [나머지 7명] 동일 패턴으로 수정
    // ...
};

// 기본 목데이터 (모든 필드 통일)
const defaultMockStocks = {
    'warren-buffett': [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.5, roe: 42.3, debtToEquity: 0.4, pe: 29.8, score: 92, isMock: true, lastUpdated: new Date() },
        // ... 다른 종목
    ],
    // [모든 투자자] 동일 형식으로 추가
};

// [나머지 함수들] 캐시 로직 개선
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

async function getInvestorStocksData(investorId) {
    try {
        const cached = getCachedStocks(investorId);
        if (cached) return cached;

        const stocks = await window.StockAPI.getStocksByInvestor(investorId);
        if (stocks?.length) {
            setCachedStocks(investorId, stocks);
            return stocks;
        }
        return defaultMockStocks[investorId] || [];
    } catch (error) {
        console.error(error);
        return defaultMockStocks[investorId] || [];
    }
}

// [window.InvestorData 등록] 수정 없음
window.InvestorData = { /* ... */ };
