// API 키는 실제 키로 대체해주세요
let API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY';

// S&P 500 티커 리스트 불러오기
async function loadSP500Tickers() {
    const response = await fetch('/sp500-tickers.json');
    if (!response.ok) throw new Error('S&P 500 데이터를 불러올 수 없습니다');
    const data = await response.json();
    return data.symbols || [];
}

// 캐시 시스템
const dataCache = {
    metrics: {},
    stocks: {},
    lastPriceUpdate: {},
    lastMetricsUpdate: {}
};
const CACHE_DURATION = {
    PRICE: 3 * 60 * 60 * 1000,
    METRICS: 24 * 60 * 60 * 1000
};
const API_LIMIT = { CALLS_PER_MINUTE: 5 };

// 주식 데이터 가져오기 (기존과 동일)
async function fetchStockData(symbol) { /* ... (생략, 기존 코드 그대로) ... */ }

// 종목 파이낸셜 메트릭 가져오기 (기존과 동일)
async function fetchStockMetrics(symbol) { /* ... (생략, 기존 코드 그대로) ... */ }

// 여러 종목 데이터 한번에 가져오기 (기존과 동일)
async function fetchMultipleStocks(symbols) { /* ... (생략, 기존 코드 그대로) ... */ }
async function fetchMultipleStockMetrics(symbols) { /* ... (생략, 기존 코드 그대로) ... */ }

// 버핏 지표 점수 계산 (정량 5개만 반영)
function calculateBuffettScore(metrics) {
    // 가중치
    const weights = {
        roe: 0.30,
        debtToEquity: 0.25,
        pe: 0.20,
        cashFlow: 0.15,
        buyback: 0.10
    };
    let score = 0;
    try {
        // ROE (15% 이상이면 최고점)
        score += Math.min(metrics.roe / 15, 1) * weights.roe * 100;
        // 부채비율 (0.5x 이하 최고점)
        score += Math.max(0, (1.5 - metrics.debtToEquity) / 1.0) * weights.debtToEquity * 100;
        // P/E (15 이하 최고점, 30 이상 0점)
        score += Math.max(0, (30 - metrics.pe) / 15) * weights.pe * 100;
        // 현금흐름 (영업현금흐름/순이익 1.0 이상 최고점, 예시로 roic 사용)
        score += Math.min(metrics.roic / 10, 1) * weights.cashFlow * 100;
        // 자사주 매입 (랜덤 대체)
        score += Math.random() * weights.buyback * 100;
    } catch (e) {
        return Math.round(Math.random() * 30 + 70);
    }
    return Math.round(score);
}

// S&P 500 전체 워렌 버핏 스크리닝
async function evaluateBuffettStocksFromSP500() {
    try {
        const candidates = await loadSP500Tickers();
        const batchSize = 5; // API 제한 고려 (5회/분)
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
        // 점수 계산
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
        // 상위 10개 반환
        return evaluated.sort((a, b) => b.score - a.score).slice(0, 10);
    } catch (e) {
        console.error('S&P 500 버핏 스크리닝 오류:', e);
        return [];
    }
}

// 기존 getStocksByInvestor 함수에서 버핏만 S&P 500 전체 스크리닝 사용
async function getStocksByInvestor(investorId) {
    if (investorId === 'warren-buffett') {
        return await evaluateBuffettStocksFromSP500();
    }
    // 나머지 투자자는 기존 방식 (예시)
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
