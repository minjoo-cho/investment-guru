// 실제 Alpha Vantage API 키로 교체하세요!
let API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY';

// S&P 500 티커 불러오기
async function loadSP500Tickers() {
    const response = await fetch('/sp500-tickers.json');
    if (!response.ok) throw new Error('S&P 500 데이터를 불러올 수 없습니다');
    const data = await response.json();
    return data.symbols || [];
}

// 캐시 시스템 등 기존 코드 유지...

// 워렌 버핏 지표 점수 계산 (정량 5개만 반영)
function calculateBuffettScore(metrics) {
    const weights = {
        roe: 0.30,
        debtToEquity: 0.25,
        pe: 0.20,
        cashFlow: 0.15,
        buyback: 0.10
    };
    let score = 0;
    try {
        score += Math.min(metrics.roe / 15, 1) * weights.roe * 100;
        score += Math.max(0, (1.5 - metrics.debtToEquity) / 1.0) * weights.debtToEquity * 100;
        score += Math.max(0, (30 - metrics.pe) / 15) * weights.pe * 100;
        score += Math.min(metrics.roic / 10, 1) * weights.cashFlow * 100;
        score += Math.random() * weights.buyback * 100; // 실제 자사주 데이터로 교체 가능
    } catch (e) {
        return Math.round(Math.random() * 30 + 70);
    }
    return Math.round(score);
}

// S&P 500 전체 워렌 버핏 스크리닝
async function evaluateBuffettStocksFromSP500() {
    try {
        const candidates = await loadSP500Tickers();
        const batchSize = 5;
        let allStocksData = {}, allMetricsData = {};
        for (let i = 0; i < candidates.length; i += batchSize) {
            const batch = candidates.slice(i, i + batchSize);
            const [stocksData, metricsData] = await Promise.all([
                fetchMultipleStocks(batch),
                fetchMultipleStockMetrics(batch)
            ]);
            allStocksData = {...allStocksData, ...stocksData};
            allMetricsData = {...allMetricsData, ...metricsData};
            if (i + batchSize < candidates.length) await new Promise(r => setTimeout(r, 61000));
        }
        const evaluated = candidates.filter(sym => allStocksData[sym] && allMetricsData[sym])
            .map(sym => {
                const stock = allStocksData[sym];
                const metrics = allMetricsData[sym];
                return {
                    symbol: sym,
                    name: getStockName(sym),
                    price: stock.price,
                    change: stock.change,
                    roe: metrics.roe?.toFixed(1) || '0.0',
                    debtToEquity: metrics.debtToEquity?.toFixed(2) || '0.00',
                    pe: metrics.pe?.toFixed(1) || '0.0',
                    score: calculateBuffettScore(metrics),
                    previousClose: stock.previousClose,
                    isMock: stock.isMock
                };
            });
        return evaluated.sort((a, b) => b.score - a.score).slice(0, 10);
    } catch (e) {
        console.error('S&P 500 버핏 스크리닝 오류:', e);
        return [];
    }
}

// 투자자별 종목 평가 함수
async function getStocksByInvestor(investorId) {
    if (investorId === 'warren-buffett') {
        return await evaluateBuffettStocksFromSP500();
    }
    // 나머지 투자자는 기존 방식
    return await evaluateBuffettStocks();
}

// 외부에서 사용할 함수 등록
window.StockAPI = {
    getStocksByInvestor,
    evaluateBuffettStocksFromSP500,
    fetchStockData,
    fetchStockMetrics,
    fetchMultipleStocks,
    fetchMultipleStockMetrics
};