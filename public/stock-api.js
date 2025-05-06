// stock-api.js

// Yahoo Finance API (비공식) + CORS 프록시
const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v7/finance';
const CORS_PROXY = 'https://corsproxy.io/?'; // 또는 'https://cors-anywhere.herokuapp.com/' 사용 가능

// 캐시 시스템 (24시간 유지)
const dataCache = {
    stocks: {},
    metrics: {},
    lastUpdated: {}
};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간

// 토스트 메시지 함수 (script.js에 중복 구현되어 있으면 삭제)
function showToast(message, type = 'info') {
    let toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 캐시 시간 표시 함수
function timeSince(date) {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    const seconds = Math.floor((new Date() - d) / 1000);
    if (seconds < 60) return '방금 전';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
    return `${Math.floor(hours / 24)}일 전`;
}

// Yahoo Finance API 호출 함수
async function fetchYahooData(symbol, endpoint) {
    try {
        const url = `${CORS_PROXY}${YAHOO_FINANCE_API}/${endpoint}?symbols=${symbol}`;
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Yahoo API Error (${endpoint}):`, error);
        return null;
    }
}

// 주식 기본 데이터 가져오기
async function fetchStockData(symbol) {
    if (dataCache.stocks[symbol] && Date.now() - dataCache.lastUpdated[symbol] < CACHE_DURATION) {
        return dataCache.stocks[symbol]; // 캐시 반환
    }

    const data = await fetchYahooData(symbol, 'quote');
    if (!data?.quoteResponse?.result[0]) {
        showToast(`"${symbol}"의 최신 데이터를 가져올 수 없습니다. 캐시/목데이터를 표시합니다.`, 'error');
        return generateMockData(symbol);
    }

    const quote = data.quoteResponse.result[0];
    const stockData = {
        symbol,
        name: quote.longName || quote.shortName || symbol,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChangePercent,
        lastUpdated: new Date(),
        isMock: false
    };

    dataCache.stocks[symbol] = stockData;
    dataCache.lastUpdated[symbol] = Date.now();
    return stockData;
}

// 재무 지표 가져오기 (Yahoo Key Statistics)
async function fetchStockMetrics(symbol) {
    if (dataCache.metrics[symbol] && Date.now() - dataCache.lastUpdated[symbol] < CACHE_DURATION) {
        return dataCache.metrics[symbol];
    }

    const data = await fetchYahooData(symbol, 'quoteSummary&modules=defaultKeyStatistics,financialData');
    if (!data?.quoteSummary?.result?.[0]) {
        showToast(`"${symbol}"의 재무지표를 가져올 수 없습니다. 캐시/목데이터를 표시합니다.`, 'error');
        return generateMockMetrics(symbol);
    }

    const stats = data.quoteSummary.result[0];
    const metrics = {
        pe: stats.defaultKeyStatistics?.forwardPE?.raw,
        roic: stats.financialData?.returnOnInvestedCapital?.raw,
        freeCashflow: stats.financialData?.freeCashflow?.raw,
        payoutRatio: stats.financialData?.payoutRatio?.raw ? stats.financialData.payoutRatio.raw * 100 : undefined,
        pegRatio: stats.defaultKeyStatistics?.pegRatio?.raw
    };

    dataCache.metrics[symbol] = metrics;
    dataCache.lastUpdated[symbol] = Date.now();
    return metrics;
}

// 목데이터 생성 (API 실패 시)
function generateMockData(symbol) {
    return {
        symbol,
        name: symbol,
        price: Math.random() * 500 + 50,
        change: (Math.random() * 10 - 5).toFixed(2),
        lastUpdated: new Date(),
        isMock: true
    };
}

function generateMockMetrics() {
    return {
        pe: Math.random() * 30 + 10,
        roic: Math.random() * 20 + 5,
        freeCashflow: Math.random() * 1e9 + 1e8,
        payoutRatio: Math.random() * 50,
        pegRatio: Math.random() * 2
    };
}

// S&P 500 티커 리스트 가져오기 (위키피디아)
async function fetchSP500Tickers() {
    const res = await fetch('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies');
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const table = doc.querySelector('table.wikitable');
    return Array.from(table.querySelectorAll('tbody tr td:nth-child(1)')).map(td => td.textContent.trim()).filter(Boolean);
}

// 투자자별 점수 계산 (예: 찰리 멍거)
function calculateInvestorScore(metrics, stock) {
    let score = 0;
    metrics.forEach(metric => {
        let value = stock[metric.id] || 0;
        if (metric.inverse) {
            value = value > 0 ? Math.max(0, 1 - value / metric.target) * 100 : 0;
        } else {
            value = Math.min((value / metric.target) * 100, 100);
        }
        score += value * metric.weight;
    });
    return score;
}

// S&P 500 전체 스크리닝 (캐시/에러/토스트 반영)
async function screenSP500ByInvestor(investorId) {
    const cacheKey = `screening_${investorId}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        showToast('캐시된 스크리닝 결과를 표시합니다.', 'info');
        return JSON.parse(cachedData);
    }

    const investor = window.InvestorData.getInvestorData(investorId);
    if (!investor) {
        showToast('투자자 데이터가 없습니다.', 'error');
        return [];
    }
    const sp500 = await fetchSP500Tickers();
    showToast('S&P 500 스크리닝을 시작합니다. (최대 30개)', 'info');

    const results = [];
    for (const ticker of sp500.slice(0, 30)) { // API 제한으로 30개만 처리
        const stockData = await fetchStockData(ticker);
        const metrics = await fetchStockMetrics(ticker);
        const merged = { ...stockData, ...metrics };
        const score = calculateInvestorScore(investor.metrics, merged);
        results.push({ ...merged, score });
    }

    localStorage.setItem(cacheKey, JSON.stringify(results));
    showToast('스크리닝이 완료되었습니다.', 'info');
    return results.sort((a, b) => b.score - a.score).slice(0, 10);
}

// --- window.StockAPI 등록 ---
window.StockAPI = {
    fetchStockData,
    fetchStockMetrics,
    screenSP500ByInvestor,
    timeSince // UI에서 캐시 시간 표시용으로 사용 가능
};
