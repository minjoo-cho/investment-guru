// API 키 설정 - 반드시 실제 키로 교체하세요
let API_KEY = 'E4NLDLXWIPTGW9QY';

// 캐시 시스템
const dataCache = {
    metrics: {},
    stocks: {},
    lastPriceUpdate: {},
    lastMetricsUpdate: {}
};

// 캐시 기간 설정
const CACHE_DURATION = {
    PRICE: 3 * 60 * 60 * 1000, // 3시간
    METRICS: 24 * 60 * 60 * 1000 // 24시간
};

// API 제한 설정
const API_LIMIT = {
    CALLS_PER_MINUTE: 5
};

// API 키 설정 함수
function setApiKey(key) {
    API_KEY = key;
    console.log('API 키가 설정되었습니다.');
}

// 모든 종목 이름 미리 로드
async function initializeStockNames() {
    console.log('종목 이름 데이터 초기화 중...');
    // 실제 구현 시 종목 이름 데이터 로딩 로직 추가
    return true;
}

// 주식 데이터 가져오기
async function fetchStockData(symbol) {
    // 캐시에서 최신 데이터 확인
    const now = new Date().getTime();
    if (dataCache.stocks[symbol] && dataCache.lastPriceUpdate[symbol] && 
        (now - dataCache.lastPriceUpdate[symbol] < CACHE_DURATION.PRICE)) {
        return dataCache.stocks[symbol];
    }
    
    try {
        // Alpha Vantage API에서 실시간 주가 데이터 가져오기
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`상태 코드 ${response.status}`);
        }
        
        const data = await response.json();
        
        // API 응답 형식 확인
        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
            const quote = data['Global Quote'];
            const stockData = {
                symbol: symbol,
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['10. change percent'].replace('%', '')),
                previousClose: parseFloat(quote['08. previous close']),
                volume: parseInt(quote['06. volume']),
                lastUpdated: new Date(),
                isMock: false
            };
            
            // 캐시 업데이트
            dataCache.stocks[symbol] = stockData;
            dataCache.lastPriceUpdate[symbol] = now;
            
            return stockData;
        } else {
            // API 제한에 도달했거나 형식이 다른 경우 모의 데이터 반환
            console.warn(`${symbol} API 응답 형식이 유효하지 않습니다:`, data);
            return generateMockData(symbol);
        }
    } catch (error) {
        console.error(`${symbol} 주식 데이터 가져오기 실패:`, error);
        return generateMockData(symbol);
    }
}

// 모의 데이터 생성 함수
function generateMockData(symbol) {
    return {
        symbol: symbol,
        price: 100 + Math.random() * 900, // 100~1000 사이 랜덤 가격
        change: (Math.random() * 10 - 5).toFixed(2), // -5%~+5% 사이 랜덤 변동
        previousClose: 100 + Math.random() * 900,
        volume: Math.floor(Math.random() * 10000000),
        lastUpdated: new Date(),
        isMock: true // 모의 데이터 표시
    };
}

// 종목 메트릭 데이터 가져오기
async function fetchStockMetrics(symbol) {
    // 캐시에서 최신 데이터 확인
    const now = new Date().getTime();
    if (dataCache.metrics[symbol] && dataCache.lastMetricsUpdate[symbol] && 
        (now - dataCache.lastMetricsUpdate[symbol] < CACHE_DURATION.METRICS)) {
        return dataCache.metrics[symbol];
    }
    
    try {
        // Alpha Vantage API에서 회사 개요 데이터 가져오기
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(
            `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`상태 코드 ${response.status}`);
        }
        
        const data = await response.json();
        
        // API 응답 확인
        if (data && Object.keys(data).length > 0 && data.Symbol) {
            const metricsData = {
                symbol: symbol,
                pe: parseFloat(data.PERatio) || 0,
                pb: parseFloat(data.PriceToBookRatio) || 0,
                roe: parseFloat(data.ReturnOnEquityTTM * 100) || 0,
                debtToEquity: parseFloat(data.DebtToEquityRatio) || 0,
                dividend: parseFloat(data.DividendYield * 100) || 0,
                eps: parseFloat(data.EPS) || 0,
                beta: parseFloat(data.Beta) || 0,
                peg: parseFloat(data.PEGRatio) || 0,
                roic: parseFloat(data.ReturnOnInvestedCapital * 100) || 0,
                lastUpdated: new Date(),
                isMock: false
            };
            
            // 캐시 업데이트
            dataCache.metrics[symbol] = metricsData;
            dataCache.lastMetricsUpdate[symbol] = now;
            
            return metricsData;
        } else {
            // API 제한에 도달했거나 형식이 다른 경우 모의 데이터 반환
            console.warn(`${symbol} 메트릭 API 응답이 유효하지 않습니다:`, data);
            return generateMockMetrics(symbol);
        }
    } catch (error) {
        console.error(`${symbol} 메트릭 데이터 가져오기 실패:`, error);
        return generateMockMetrics(symbol);
    }
}

// 모의 메트릭 데이터 생성
function generateMockMetrics(symbol) {
    return {
        symbol: symbol,
        pe: Math.random() * 30 + 5, // 5~35 사이 랜덤 P/E
        pb: Math.random() * 5 + 0.5, // 0.5~5.5 사이 랜덤 P/B
        roe: Math.random() * 30, // 0~30% 사이 랜덤 ROE
        debtToEquity: Math.random() * 2, // 0~2 사이 랜덤 부채비율
        dividend: Math.random() * 5, // 0~5% 사이 랜덤 배당률
        eps: Math.random() * 10, // 0~10 사이 랜덤 EPS
        beta: 0.5 + Math.random() * 1.5, // 0.5~2 사이 랜덤 베타
        peg: Math.random() * 3, // 0~3 사이 랜덤 PEG
        roic: Math.random() * 20, // 0~20% 사이 랜덤 ROIC
        lastUpdated: new Date(),
        isMock: true // 모의 데이터 표시
    };
}

// 여러 종목 데이터 한번에 가져오기
async function fetchMultipleStocks(symbols) {
    const result = {};
    
    // API 호출 제한을 고려한 배치 처리
    for (let i = 0; i < symbols.length; i += API_LIMIT.CALLS_PER_MINUTE) {
        const batch = symbols.slice(i, i + API_LIMIT.CALLS_PER_MINUTE);
        const promises = batch.map(symbol => fetchStockData(symbol));
        
        const stocksData = await Promise.all(promises);
        stocksData.forEach((data, index) => {
            result[batch[index]] = data;
        });
        
        // API 제한을 고려한 대기 시간 설정
        if (i + API_LIMIT.CALLS_PER_MINUTE < symbols.length) {
            await new Promise(resolve => setTimeout(resolve, 60000)); // 1분 대기
        }
    }
    
    return result;
}

// 여러 종목 메트릭 한번에 가져오기
async function fetchMultipleStockMetrics(symbols) {
    const result = {};
    
    // API 호출 제한을 고려한 배치 처리
    for (let i = 0; i < symbols.length; i += API_LIMIT.CALLS_PER_MINUTE) {
        const batch = symbols.slice(i, i + API_LIMIT.CALLS_PER_MINUTE);
        const promises = batch.map(symbol => fetchStockMetrics(symbol));
        
        const metricsData = await Promise.all(promises);
        metricsData.forEach((data, index) => {
            result[batch[index]] = data;
        });
        
        // API 제한을 고려한 대기 시간 설정
        if (i + API_LIMIT.CALLS_PER_MINUTE < symbols.length) {
            await new Promise(resolve => setTimeout(resolve, 60000)); // 1분 대기
        }
    }
    
    return result;
}

// S&P 500 티커 리스트 가져오기 함수
async function loadSP500Tickers() {
    try {
        // 공개 디렉토리에 있는 SP500 티커 리스트 JSON 파일 로드
        const response = await fetch('/sp500-tickers.json');
        if (!response.ok) {
            throw new Error('S&P 500 데이터를 불러올 수 없습니다');
        }
        const data = await response.json();
        return data.symbols || [];
    } catch (error) {
        console.error('S&P 500 티커 로딩 실패:', error);
        // 에러 시 샘플 데이터 리턴
        return generateMockSP500Tickers();
    }
}

// 샘플 S&P 500 리스트 생성 함수
function generateMockSP500Tickers() {
    return [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'BRK.B', 'XOM', 'JNJ', 'JPM',
        'V', 'PG', 'UNH', 'HD', 'BAC', 'CVX', 'NVDA', 'KO', 'PFE', 'CSCO'
    ];
}

// 종목 이름 가져오기
function getStockName(symbol) {
    const stockNames = {
        'AAPL': 'Apple Inc.',
        'MSFT': 'Microsoft Corp',
        'GOOGL': 'Alphabet Inc',
        'AMZN': 'Amazon.com Inc',
        'META': 'Meta Platforms Inc',
        'TSLA': 'Tesla Inc',
        'BRK.B': 'Berkshire Hathaway',
        'XOM': 'Exxon Mobil Corp',
        'JNJ': 'Johnson & Johnson',
        'JPM': 'JPMorgan Chase',
        'V': 'Visa Inc',
        'PG': 'Procter & Gamble',
        'UNH': 'UnitedHealth Group',
        'HD': 'Home Depot Inc',
        'BAC': 'Bank of America',
        'CVX': 'Chevron Corp',
        'NVDA': 'NVIDIA Corp',
        'KO': 'Coca-Cola Co',
        'PFE': 'Pfizer Inc',
        'CSCO': 'Cisco Systems',
        'BRK-B': 'Berkshire Hathaway',
        'AXP': 'American Express',
        'MCO': 'Moody\'s Corp',
        'DVA': 'DaVita Inc',
        'VZ': 'Verizon Communications',
        'USB': 'U.S. Bancorp',
        'OXY': 'Occidental Petroleum'
    };
    
    return stockNames[symbol] || `Stock (${symbol})`;
}

// 버핏 점수 계산 함수
function calculateBuffettScore(metrics) {
    // 워렌 버핏 핵심 지표 가중치
    const weights = {
        roe: 0.30, // ROE
        debtToEquity: 0.25, // 부채비율
        pe: 0.20, // P/E
        cashFlow: 0.15, // 현금흐름
        buyback: 0.10 // 자사주 매입
    };
    
    let score = 0;
    
    try {
        // ROE (15% 이상이면 최고점)
        score += Math.min(metrics.roe / 15, 1) * weights.roe * 100;
        
        // 부채비율 (0.5x 이하 최고점, 1.5x 이상 0점)
        score += Math.max(0, (1.5 - metrics.debtToEquity) / 1.0) * weights.debtToEquity * 100;
        
        // P/E (15 이하 최고점, 30 이상 0점)
        score += Math.max(0, (30 - metrics.pe) / 15) * weights.pe * 100;
        
        // 현금흐름 (영업현금흐름/순이익 가정, roic로 대체)
        score += Math.min(metrics.roic / 10, 1) * weights.cashFlow * 100;
        
        // 자사주 매입 (랜덤 대체)
        score += Math.random() * weights.buyback * 100;
    } catch (e) {
        return Math.round(Math.random() * 30 + 70); // 오류 시 70~100 랜덤 스코어
    }
    
    return Math.round(score);
}

// S&P 500 전체 워렌 버핏 스크리닝
async function evaluateBuffettStocksFromSP500() {
    try {
        // S&P 500 티커 리스트 불러오기
        const candidates = await loadSP500Tickers();
        console.log(`S&P 500 스크리닝: ${candidates.length}개 종목 평가 시작`);
        
        // 배치 크기 설정 (API 호출 제한 고려)
        const batchSize = API_LIMIT.CALLS_PER_MINUTE;
        let allStocksData = {}, allMetricsData = {};
        
        // API 제한을 고려한 배치 처리
        for (let i = 0; i < candidates.length; i += batchSize) {
            const batch = candidates.slice(i, i + batchSize);
            console.log(`배치 ${Math.floor(i/batchSize) + 1}/${Math.ceil(candidates.length/batchSize)} 처리 중...`);
            
            // 주가 데이터와 메트릭 데이터 병렬 요청
            const [stocksData, metricsData] = await Promise.all([
                fetchMultipleStocks(batch),
                fetchMultipleStockMetrics(batch)
            ]);
            
            // 결과 병합
            allStocksData = {...allStocksData, ...stocksData};
            allMetricsData = {...allMetricsData, ...metricsData};
            
            // API 제한을 고려한 대기 시간 설정 (배치 간)
            if (i + batchSize < candidates.length) {
                console.log('API 제한 고려, 1분 대기 중...');
                await new Promise(resolve => setTimeout(resolve, 61000)); // 61초 대기
            }
        }
        
        // 평가 결과 계산
        const evaluatedStocks = candidates
            .filter(symbol => allStocksData[symbol] && allMetricsData[symbol])
            .map(symbol => {
                const stock = allStocksData[symbol];
                const metrics = allMetricsData[symbol];
                
                return {
                    symbol: symbol,
                    name: getStockName(symbol),
                    price: stock.price,
                    change: stock.change,
                    roe: metrics.roe.toFixed(1),
                    debtToEquity: metrics.debtToEquity.toFixed(2),
                    pe: metrics.pe.toFixed(1),
                    score: calculateBuffettScore(metrics),
                    previousClose: stock.previousClose,
                    isMock: stock.isMock || metrics.isMock
                };
            });
        
        // 점수 기준 내림차순 정렬 후 상위 결과 반환
        const sortedStocks = evaluatedStocks.sort((a, b) => b.score - a.score);
        console.log(`S&P 500 스크리닝 완료: ${sortedStocks.length}개 평가됨`);
        
        return sortedStocks;
    } catch (error) {
        console.error('S&P 500 스크리닝 실패:', error);
        return []; // 오류 시 빈 배열 반환
    }
}

// 투자자별 종목 평가 함수
async function getStocksByInvestor(investorId) {
    try {
        // 워렌 버핏인 경우 S&P 500 전체 스크리닝 사용
        if (investorId === 'warren-buffett') {
            // 투자자 데이터 확인
            const investor = window.InvestorData.getInvestorData(investorId);
            if (investor && investor.useFullScreening) {
                console.log('워렌 버핏: S&P 500 전체 스크리닝 사용');
                return await evaluateBuffettStocksFromSP500();
            }
        }
        
        // 일반 로직: 투자자 후보군 기반 평가
        const investor = window.InvestorData.getInvestorData(investorId);
        if (!investor || !investor.stockCandidates) {
            throw new Error(`${investorId} 투자자 정보를 찾을 수 없습니다.`);
        }
        
        // 후보군 가져오기
        const candidates = investor.stockCandidates;
        console.log(`${investorId} 후보군 평가: ${candidates.length}개 종목`);
        
        // 주가 데이터와 메트릭 데이터 가져오기
        const [stocksData, metricsData] = await Promise.all([
            fetchMultipleStocks(candidates),
            fetchMultipleStockMetrics(candidates)
        ]);
        
        // 평가 결과 계산
        const evaluatedStocks = candidates.map(symbol => {
            const stock = stocksData[symbol] || generateMockData(symbol);
            const metrics = metricsData[symbol] || generateMockMetrics(symbol);
            
            // 워렌 버핏 평가 기준 적용
            let score = 0;
            if (investorId === 'warren-buffett') {
                score = calculateBuffettScore(metrics);
            } else {
                // 다른 투자자별 스코어 계산 로직
                score = Math.round(Math.random() * 30 + 60); // 임시 스코어
            }
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                price: stock.price,
                change: stock.change,
                roe: metrics.roe.toFixed(1),
                debtToEquity: metrics.debtToEquity.toFixed(2),
                pe: metrics.pe.toFixed(1),
                score: score,
                previousClose: stock.previousClose,
                isMock: stock.isMock || metrics.isMock
            };
        });
        
        // 점수 기준 내림차순 정렬
        return evaluatedStocks.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error(`${investorId} 종목 평가 실패:`, error);
        return generateMockStocksForInvestor(investorId); // 실패 시 모의 데이터 반환
    }
}

// 투자자별 모의 데이터 생성
function generateMockStocksForInvestor(investorId) {
    const mockStockCounts = 10;
    const stockSamples = {
        'warren-buffett': ['AAPL', 'BRK-B', 'KO', 'BAC', 'AXP', 'MCO', 'OXY', 'DVA', 'VZ', 'CVX'],
        'charlie-munger': ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL'],
        'benjamin-graham': ['JNJ', 'PG', 'KO', 'XOM', 'JPM'],
        'default': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META']
    };
    
    const stocks = [];
    const baseStocks = stockSamples[investorId] || stockSamples.default;
    
    for (let i = 0; i < mockStockCounts; i++) {
        const symbol = baseStocks[i % baseStocks.length];
        stocks.push({
            symbol: symbol,
            name: getStockName(symbol),
            price: 100 + Math.random() * 900,
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

// 외부에서 사용할 함수들 등록
window.StockAPI = {
    setApiKey,
    initializeStockNames,
    fetchStockData,
    fetchStockMetrics,
    fetchMultipleStocks,
    fetchMultipleStockMetrics,
    getStocksByInvestor,
    evaluateBuffettStocksFromSP500
};
