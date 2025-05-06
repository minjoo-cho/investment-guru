// 투자자 상세 데이터 (예시 3명, 나머지도 동일 패턴으로 추가 가능)
const investorsData = {
    'warren-buffett': { /* ...생략... */ },
    'charlie-munger': { /* ...생략... */ },
    'benjamin-graham': { /* ...생략... */ }
    // ... 나머지 투자자들도 동일하게 ...
};

// 기본 목데이터 (예시)
const defaultMockStocks = {
    'warren-buffett': [ /* ... */ ],
    'charlie-munger': [ /* ... */ ],
    'benjamin-graham': [ /* ... */ ]
    // ... 나머지 투자자들도 동일하게 ...
};

// --- 반드시 아래 함수 선언부가 존재해야 합니다 ---
function getInvestorData(id) {
    return investorsData[id] || null;
}
function getAllInvestors() {
    return Object.values(investorsData);
}
function getInvestorsForMainPage() {
    return Object.values(investorsData).map(investor => ({
        id: investor.id,
        name: investor.name,
        philosophy: investor.philosophy,
        quote: investor.quote,
        image: investor.image,
        metrics: investor.metrics,
        stockCandidates: investor.stockCandidates,
        useFullScreening: investor.useFullScreening || false,
        topStocks: []
    }));
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
        return defaultMockStocks[investorId] || [];
    }
}
async function loadAllInvestorsWithStocks() {
    const ids = Object.keys(investorsData);
    return Promise.all(ids.map(async id => {
        const investor = getInvestorData(id);
        investor.topStocks = await getInvestorStocksData(id);
        return investor;
    }));
}
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}
function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        localStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
}

// --- 반드시 이 부분이 파일 마지막에 있어야 합니다 ---
window.InvestorData = {
    getInvestorData,
    getAllInvestors,
    getInvestorsForMainPage, // F 대문자! 오타 금지!
    getInvestorStocksData,
    loadAllInvestorsWithStocks
};
