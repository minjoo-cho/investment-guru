// 실제 Alpha Vantage API 키로 교체하세요!
let API_KEY = 'YOUR_API_KEY_HERE';

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

// API 키 설정 함수
function setApiKey(key) {
    API_KEY = key;
    console.log('API 키가 설정되었습니다.');
}

// 종목명 매핑
function getStockName(symbol) {
    const stockNames = {
        'AAPL': 'Apple Inc.', 'MSFT': 'Microsoft Corp', 'GOOGL': 'Alphabet Inc',
        'AMZN': 'Amazon.com Inc', 'META': 'Meta Platforms Inc', 'TSLA': 'Tesla Inc',
        'BRK.B': 'Berkshire Hathaway', 'KO': 'Coca-Cola Co', 'BAC': 'Bank of America',
        'JNJ': 'Johnson & Johnson', 'PG': 'Procter & Gamble'
        // 필요시 추가
    };
    return stockNames[symbol] || symbol || 'Unknown';
}

// 목 데이터 생성
function generateMockData(symbol) {
    return {
        symbol: symbol,
        name: getStockName(symbol),
        price: Math.round(100 + Math.random() * 900),
        change: (Math.random() * 10 - 5).toFixed(2),
        roe: (Math.random() * 30).toFixed(1),
        debtToEquity: (Math.random() * 2).toFixed(2),
        pe: (Math.random() * 40 + 5).toFixed(1),
        score: Math.floor(Math.random() * 40 + 60),
        lastUpdated: new Date(),
        isMock: true
    };
}

// 캐시에서 불러오기
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

// 캐시에 저장
function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        localStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
}

// 주식 데이터(API 실패 시 목 데이터 반환)
async function fetchStockData(symbol) {
    try {
        // 캐시 우선
        const now = new Date().getTime();
        if (dataCache.stocks[symbol] && dataCache.lastPriceUpdate[symbol] &&
            (now - dataCache.lastPriceUpdate[symbol] < CACHE_DURATION.PRICE)) {
            return dataCache.stocks[symbol];
        }
        // 실제 API 호출
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            const quote = data['Global Quote'];
            const stockData = {
                symbol: symbol,
                name: getStockName(symbol),
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['10. change percent']?.replace('%', '') || 0),
                roe: '', debtToEquity: '', pe: '', score: '', // 재무지표는 별도
                lastUpdated: new Date(),
                isMock: false
            };
            dataCache.stocks[symbol] = stockData;
            dataCache.lastPriceUpdate[symbol] = now;
            return stockData;
        }
        // 실패 시 목 데이터
        return generateMockData(symbol);
    } catch (e) {
        return generateMockData(symbol);
    }
}

// 종목 메트릭 데이터(API 실패 시 목 데이터 반환)
async function fetchStockMetrics(symbol) {
    try {
        const now = new Date().getTime();
        if (dataCache.metrics[symbol] && dataCache.lastMetricsUpdate[symbol] &&
            (now - dataCache.lastMetricsUpdate[symbol] < CACHE_DURATION.METRICS)) {
            return dataCache.metrics[symbol];
        }
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.Symbol) {
            const metrics = {
                symbol: symbol,
                pe: parseFloat(data.PERatio) || '',
                roe: parseFloat(data.ReturnOnEquityTTM) || '',
                debtToEquity: parseFloat(data.DebtToEquityRatio) || '',
                lastUpdated: new Date(),
                isMock: false
            };
            dataCache.metrics[symbol] = metrics;
            dataCache.lastMetricsUpdate[symbol] = now;
            return metrics;
        }
        return generateMockData(symbol);
    } catch (e) {
        return generateMockData(symbol);
    }
}

// 여러 종목 데이터 한번에 가져오기 (API 제한 고려, 목 데이터 fallback)
async function fetchMultipleStocks(symbols) {
    const result = {};
    for (const symbol of symbols) {
        result[symbol] = await fetchStockData(symbol);
    }
    return result;
}
async function fetchMultipleStockMetrics(symbols) {
    const result = {};
    for (const symbol of symbols) {
        result[symbol] = await fetchStockMetrics(symbol);
    }
    return result;
}

// 버핏 점수 계산(예시)
function calculateBuffettScore(metrics) {
    let score = 0;
    if (metrics.roe) score += Math.min(metrics.roe / 15, 1) * 30;
    if (metrics.debtToEquity) score += Math.max(0, (1.5 - metrics.debtToEquity) / 1.0) * 25;
    if (metrics.pe) score += Math.max(0, (30 - metrics.pe) / 15) * 20;
    score += Math.random() * 25; // 기타 가중치
    return Math.round(score);
}

// 투자자별 종목 평가 함수
async function getStocksByInvestor(investorId) {
    // 예시: 워렌 버핏만 3개, 나머지도 3개 목 데이터
    let symbols = ['AAPL', 'KO', 'BRK.B'];
    if (investorId === 'charlie-munger') symbols = ['COST', 'BRK.B', 'BAC'];
    if (investorId === 'benjamin-graham') symbols = ['JNJ', 'PG', 'KO'];
    // 필요시 더 추가

    // 캐시 우선
    const cached = getCachedStocks(investorId);
    if (cached && cached.length > 0) return cached;

    // 실제 API 호출(실패시 목 데이터)
    const stocksData = await fetchMultipleStocks(symbols);
    const metricsData = await fetchMultipleStockMetrics(symbols);

    const stocks = symbols.map(symbol => {
        const stock = stocksData[symbol] || generateMockData(symbol);
        const metrics = metricsData[symbol] || {};
        return {
            ...stock,
            roe: metrics.roe || stock.roe,
            debtToEquity: metrics.debtToEquity || stock.debtToEquity,
            pe: metrics.pe || stock.pe,
            score: calculateBuffettScore(metrics),
            lastUpdated: stock.lastUpdated || new Date(),
            isMock: stock.isMock || metrics.isMock
        };
    });

    setCachedStocks(investorId, stocks);
    return stocks;
}

// 외부에서 사용할 함수 등록
window.StockAPI = {
    setApiKey,
    fetchStockData,
    fetchStockMetrics,
    fetchMultipleStocks,
    fetchMultipleStockMetrics,
    getStocksByInvestor
};
