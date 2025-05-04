// API 키는 실제 키로 대체해주세요
let API_KEY = 'YOUR_API_KEY_HERE';

// 데이터 캐시 시스템 초기화
const dataCache = {
    metrics: {},         // 투자 지표 캐시
    stocks: {},          // 종목 데이터 캐시
    lastPriceUpdate: {}, // 마지막 주가 업데이트 시간
    lastMetricsUpdate: {} // 마지막 지표 업데이트 시간
};

// 주식 데이터 가져오기
async function fetchStockData(symbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status}`);
        }
        
        const data = await response.json();
        
        // API 응답에 오류가 있는지 확인
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
        
        // 데이터 형식 확인
        if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
            // 무료 API는 분당 요청 수 제한이 있으므로, 제한에 걸릴 경우 모의 데이터 반환
            console.warn(`${symbol}에 대한 데이터가 없거나 API 제한에 도달했습니다. 모의 데이터를 사용합니다.`);
            return generateMockData(symbol);
        }
        
        const quote = data['Global Quote'];
        
        return {
            symbol: symbol,
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume']),
            previousClose: parseFloat(quote['08. previous close']),
            timestamp: new Date().toLocaleString()
        };
    } catch (error) {
        console.error(`${symbol} 데이터 가져오기 오류:`, error);
        // 오류 발생 시 모의 데이터 반환
        return generateMockData(symbol);
    }
}

// 모의 데이터 생성 (API 한도 초과 또는 오류 시 사용)
function generateMockData(symbol) {
    const basePrice = getBasePriceForSymbol(symbol);
    const randomChange = (Math.random() * 4 - 2).toFixed(1); // -2.0% ~ +2.0%
    const changeValue = parseFloat(randomChange);
    const price = parseFloat((basePrice * (1 + changeValue / 100)).toFixed(2));
    
    return {
        symbol: symbol,
        price: price,
        change: changeValue,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        previousClose: basePrice,
        timestamp: new Date().toLocaleString(),
        isMock: true // 모의 데이터 표시
    };
}

// 기본 가격 정보 (모의 데이터용)
function getBasePriceForSymbol(symbol) {
    const priceMap = {
        'AAPL': 184.92, 'BRK-B': 408.76, 'KO': 62.81,
        'SBUX': 97.25, 'COST': 732.88, 'TGT': 156.42,
        'PG': 162.35, 'JNJ': 147.53, 'JPM': 198.78,
        'WFC': 59.71, 'GLD': 215.67, 'TLT': 94.92,
        'VWO': 43.81, 'MSFT': 417.82, 'TSLA': 179.23,
        'NVDA': 924.73, 'VTI': 253.82, 'VOO': 469.81,
        'BND': 74.53, 'VXUS': 60.24, 'AMZN': 183.26,
        'GOOGL': 174.49, 'C': 63.81, 'EWJ': 48.52,
        'MCO': 415.27, 'AXP': 235.26, 'BAC': 39.69, 
        'DVA': 139.55, 'VZ': 40.89, 'CVX': 153.18, 
        'KHC': 36.98, 'CE': 142.61, 'GM': 45.70, 
        'OXY': 59.75, 'PARA': 12.00, 'HPQ': 34.85, 
        'NUE': 178.46, 'SNOW': 180.76, 'USB': 42.16,
        'LULU': 301.75, 'CMG': 2841.67, 'DPZ': 417.79, 
        'DG': 150.30, 'ULTA': 458.90, 'TJX': 103.51,
        'ETSY': 68.16, 'DIS': 112.61, 'YUM': 132.43
    };
    
    return priceMap[symbol] || 100.00; // 기본값 100.00
}

// 여러 종목 데이터 한번에 가져오기
async function fetchMultipleStocks(symbols) {
    const promises = symbols.map(symbol => fetchStockData(symbol));
    
    // Alpha Vantage 무료 API는 분당 5개 요청으로 제한되어 있음
    // 실제 환경에서는 순차적으로 호출하거나 지연을 추가해야 할 수 있음
    const results = await Promise.all(promises);
    
    return results.reduce((acc, stock) => {
        acc[stock.symbol] = stock;
        return acc;
    }, {});
}

// 캐시 관련 함수들
function getCachedMetrics(investorType) {
    return dataCache.metrics[investorType] || null;
}

function cacheMetricsData(investorType, data) {
    dataCache.metrics[investorType] = data;
    dataCache.lastMetricsUpdate[investorType] = new Date();
}

function getFromCache(investorId, needPrices, needMetrics) {
    const cachedData = dataCache.stocks[investorId];
    if (!cachedData) return null;
    
    const lastPriceUpdate = dataCache.lastPriceUpdate[investorId] || null;
    const lastMetricsUpdate = dataCache.lastMetricsUpdate[investorId] || null;
    
    // 필요한 데이터가 캐시에 있는지 확인
    const hasPrices = !needPrices || lastPriceUpdate;
    const hasMetrics = !needMetrics || lastMetricsUpdate;
    
    if (hasPrices && hasMetrics) {
        return cachedData;
    }
    
    return null;
}

function cacheStocksData(investorId, stocks, isPriceUpdated, isMetricsUpdated) {
    dataCache.stocks[investorId] = stocks;
    
    if (isPriceUpdated) {
        dataCache.lastPriceUpdate[investorId] = new Date();
    }
    
    if (isMetricsUpdated) {
        dataCache.lastMetricsUpdate[investorId] = new Date();
    }
}

// 워렌 버핏 지표에 따른 종목 평가
async function evaluateBuffettStocks(updatePrices = true, updateMetrics = true) {
    // 캐시된 기본 점수 데이터 가져오기
    let stocksWithScores = getCachedMetrics('buffett');
    
    // 메트릭 업데이트가 필요하면 점수 재계산
    if (updateMetrics || !stocksWithScores) {
        // 워렌 버핏이 선호하는 종목 후보들
        const candidates = ['AAPL', 'BRK-B', 'KO', 'AMZN', 'MCO', 'AXP', 'BAC', 'DVA', 'VZ', 'CVX', 'KHC', 'CE', 'GM', 'PG', 'OXY', 'PARA', 'HPQ', 'NUE', 'SNOW', 'USB'];
        
        // 투자 지표 계산 (ROI 등)
        stocksWithScores = candidates.map(symbol => {
            const score = calculateBuffettScore(symbol);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                score: score,
                price: 0, // 가격은 나중에 업데이트
                change: 0 // 변동률은 나중에 업데이트
            };
        });
        
        // 재무 지표 캐싱
        cacheMetricsData('buffett', stocksWithScores);
    }
    
    // 주가 업데이트가 필요한 경우
    if (updatePrices) {
        const symbols = stocksWithScores.map(stock => stock.symbol);
        const stocksData = await fetchMultipleStocks(symbols);
        
        // 주가 데이터 업데이트
        stocksWithScores.forEach(stock => {
            const priceData = stocksData[stock.symbol];
            if (priceData) {
                stock.price = priceData.price;
                stock.change = priceData.change;
            }
        });
    }
    
    // 점수가 높은 순으로 정렬
    return stocksWithScores.sort((a, b) => b.score - a.score);
}

// 찰리 멍거 지표에 따른 종목 평가
async function evaluateMungerStocks(updatePrices = true, updateMetrics = true) {
    // 캐시된 기본 점수 데이터 가져오기
    let stocksWithScores = getCachedMetrics('munger');
    
    // 메트릭 업데이트가 필요하면 점수 재계산
    if (updateMetrics || !stocksWithScores) {
        // 찰리 멍거가 선호하는 종목 후보들
        const candidates = ['COST', 'BRK-B', 'WFC', 'AAPL', 'BAC', 'USB', 'MSFT', 'GOOGL', 'JNJ', 'PG'];
        
        // 투자 지표 계산
        stocksWithScores = candidates.map(symbol => {
            const score = calculateMungerScore(symbol);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                score: score,
                price: 0, // 가격은 나중에 업데이트
                change: 0 // 변동률은 나중에 업데이트
            };
        });
        
        // 재무 지표 캐싱
        cacheMetricsData('munger', stocksWithScores);
    }
    
    // 주가 업데이트가 필요한 경우
    if (updatePrices) {
        const symbols = stocksWithScores.map(stock => stock.symbol);
        const stocksData = await fetchMultipleStocks(symbols);
        
        // 주가 데이터 업데이트
        stocksWithScores.forEach(stock => {
            const priceData = stocksData[stock.symbol];
            if (priceData) {
                stock.price = priceData.price;
                stock.change = priceData.change;
            }
        });
    }
    
    // 점수가 높은 순으로 정렬
    return stocksWithScores.sort((a, b) => b.score - a.score);
}

// 벤자민 그레이엄 지표에 따른 종목 평가
async function evaluateGrahamStocks(updatePrices = true, updateMetrics = true) {
    // 캐시된 기본 점수 데이터 가져오기
    let stocksWithScores = getCachedMetrics('graham');
    
    // 메트릭 업데이트가 필요하면 점수 재계산
    if (updateMetrics || !stocksWithScores) {
        // 벤자민 그레이엄이 선호하는 종목 후보들
        const candidates = ['PG', 'JNJ', 'JPM', 'VZ', 'IBM', 'KMB', 'CVX', 'XOM', 'KO', 'PEP', 'MRK', 'PFE', 'CSCO', 'MCD', 'INTC', 'HD', 'MMM', 'CAT', 'WMT', 'TRV'];
        
        // 투자 지표 계산
        stocksWithScores = candidates.map(symbol => {
            const score = calculateGrahamScore(symbol);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                score: score,
                price: 0, // 가격은 나중에 업데이트
                change: 0 // 변동률은 나중에 업데이트
            };
        });
        
        // 재무 지표 캐싱
        cacheMetricsData('graham', stocksWithScores);
    }
    
    // 주가 업데이트가 필요한 경우
    if (updatePrices) {
        const symbols = stocksWithScores.map(stock => stock.symbol);
        const stocksData = await fetchMultipleStocks(symbols);
        
        // 주가 데이터 업데이트
        stocksWithScores.forEach(stock => {
            const priceData = stocksData[stock.symbol];
            if (priceData) {
                stock.price = priceData.price;
                stock.change = priceData.change;
            }
        });
    }
    
    // 점수가 높은 순으로 정렬
    return stocksWithScores.sort((a, b) => b.score - a.score);
}

// 피터 린치 지표에 따른 종목 평가
async function evaluateLynchStocks(updatePrices = true, updateMetrics = true) {
    // 캐시된 기본 점수 데이터 가져오기
    let stocksWithScores = getCachedMetrics('lynch');
    
    // 메트릭 업데이트가 필요하면 점수 재계산
    if (updateMetrics || !stocksWithScores) {
        // 피터 린치가 선호하는 종목 후보들
        const candidates = ['SBUX', 'COST', 'TGT', 'LULU', 'CMG', 'DPZ', 'DG', 'ULTA', 'TJX', 'ETSY', 'DIS', 'YUM', 'EL', 'NKE', 'BURL', 'BBY', 'WSM', 'DKS', 'GPS', 'KSS'];
        
        // 투자 지표 계산
        stocksWithScores = candidates.map(symbol => {
            const score = calculateLynchScore(symbol);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                score: score,
                price: 0, // 가격은 나중에 업데이트
                change: 0 // 변동률은 나중에 업데이트
            };
        });
        
        // 재무 지표 캐싱
        cacheMetricsData('lynch', stocksWithScores);
    }
    
    // 주가 업데이트가 필요한 경우
    if (updatePrices) {
        const symbols = stocksWithScores.map(stock => stock.symbol);
        const stocksData = await fetchMultipleStocks(symbols);
        
        // 주가 데이터 업데이트
        stocksWithScores.forEach(stock => {
            const priceData = stocksData[stock.symbol];
            if (priceData) {
                stock.price = priceData.price;
                stock.change = priceData.change;
            }
        });
    }
    
    // 점수가 높은 순으로 정렬
    return stocksWithScores.sort((a, b) => b.score - a.score);
}

// 레이 달리오 지표에 따른 종목 평가
async function evaluateDalioStocks(updatePrices = true, updateMetrics = true) {
    // 캐시된 기본 점수 데이터 가져오기
    let stocksWithScores = getCachedMetrics('dalio');
    
    // 메트릭 업데이트가 필요하면 점수 재계산
    if (updateMetrics || !stocksWithScores) {
        // 레이 달리오가 선호하는 종목 후보들
        const candidates = ['GLD', 'TLT', 'VWO', 'SPY', 'IEF', 'EFA', 'LQD', 'VTIP', 'VNQ', 'BNDX', 'HYG', 'EMB'];
        
        // 투자 지표 계산
        stocksWithScores = candidates.map(symbol => {
            const score = calculateDalioScore(symbol);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                score: score,
                price: 0, // 가격은 나중에 업데이트
                change: 0 // 변동률은 나중에 업데이트
            };
        });
        
        // 재무 지표 캐싱
        cacheMetricsData('dalio', stocksWithScores);
    }
    
    // 주가 업데이트가 필요한 경우
    if (updatePrices) {
        const symbols = stocksWithScores.map(stock => stock.symbol);
        const stocksData = await fetchMultipleStocks(symbols);
        
        // 주가 데이터 업데이트
        stocksWithScores.forEach(stock => {
            const priceData = stocksData[stock.symbol];
            if (priceData) {
                stock.price = priceData.price;
                stock.change = priceData.change;
            }
        });
    }
    
    // 점수가 높은 순으로 정렬
    return stocksWithScores.sort((a, b) => b.score - a.score);
}

// 투자자 ID에 따라 종목 평가 함수 선택
async function getStocksByInvestor(investorId, updatePrices = true, updateMetrics = true) {
    // 캐시된 데이터가 있는지 확인
    const cachedData = getFromCache(investorId, updatePrices, updateMetrics);
    if (cachedData) {
        return cachedData;
    }
    
    let stocks = [];
    
    switch (investorId) {
        case 'warren-buffett':
            stocks = await evaluateBuffettStocks(updatePrices, updateMetrics);
            break;
        case 'charlie-munger':
            stocks = await evaluateMungerStocks(updatePrices, updateMetrics);
            break;
        case 'benjamin-graham':
            stocks = await evaluateGrahamStocks(updatePrices, updateMetrics);
            break;
        case 'peter-lynch':
            stocks = await evaluateLynchStocks(updatePrices, updateMetrics);
            break;
        case 'ray-dalio':
            stocks = await evaluateDalioStocks(updatePrices, updateMetrics);
            break;
        case 'george-soros':
            // 소로스 평가 함수는 별도 구현 필요
            stocks = await evaluateBuffettStocks(updatePrices, updateMetrics); // 임시로 버핏 함수 사용
            break;
        case 'jim-simons':
            // 사이먼스 평가 함수는 별도 구현 필요
            stocks = await evaluateBuffettStocks(updatePrices, updateMetrics); // 임시로 버핏 함수 사용
            break;
        case 'john-templeton':
            // 템플턴 평가 함수는 별도 구현 필요
            stocks = await evaluateBuffettStocks(updatePrices, updateMetrics); // 임시로 버핏 함수 사용
            break;
        case 'phil-fisher':
            // 피셔 평가 함수는 별도 구현 필요
            stocks = await evaluateLynchStocks(updatePrices, updateMetrics); // 임시로 린치 함수 사용
            break;
        case 'john-bogle':
            // 보글 평가 함수는 별도 구현 필요
            stocks = await evaluateDalioStocks(updatePrices, updateMetrics); // 임시로 달리오 함수 사용
            break;
        default:
            stocks = await evaluateBuffettStocks(updatePrices, updateMetrics);
    }
    
    // 데이터 캐싱
    cacheStocksData(investorId, stocks, updatePrices, updateMetrics);
    
    return stocks;
}

// 종목 이름 가져오기
function getStockName(symbol) {
    const stockNames = {
        'AAPL': '애플', 'MSFT': '마이크로소프트', 'GOOGL': '알파벳', 'AMZN': '아마존',
        'BRK-B': '버크셔 해서웨이', 'JPM': 'JP모건', 'JNJ': '존슨앤존슨', 'KO': '코카콜라',
        'PG': '프록터앤갬블', 'VZ': '버라이즌', 'WFC': '웰스파고', 'COST': '코스트코',
        'BAC': '뱅크 오브 아메리카', 'DVA': '다비타', 'CVX': '셰브론', 'KHC': '크래프트 하인즈',
        'CE': '셀라니즈', 'GM': '제너럴 모터스', 'OXY': '옥시덴탈 페트롤리엄', 'PARA': '파라마운트',
        'HPQ': 'HP Inc.', 'NUE': '뉴코', 'SNOW': '스노우플레이크', 'USB': 'US 뱅코프',
        'MCO': '무디스', 'AXP': '아메리칸 익스프레스', 'IBM': 'IBM', 'KMB': '킴벌리-클락',
        'XOM': '엑손모빌', 'PEP': '펩시코', 'MRK': '머크', 'PFE': '화이자',
        'CSCO': '시스코', 'MCD': '맥도날드', 'INTC': '인텔', 'HD': '홈 디포',
        'MMM': '3M', 'CAT': '캐터필러', 'WMT': '월마트', 'TRV': '트레블러스',
        'SBUX': '스타벅스', 'TGT': '타겟', 'LULU': '룰루레몬', 'CMG': '치포틀레',
        'DPZ': '도미노피자', 'DG': '달러 제너럴', 'ULTA': '울타 뷰티', 'TJX': 'TJX 컴퍼니스',
        'ETSY': '엣시', 'DIS': '디즈니', 'YUM': '얌! 브랜즈', 'EL': '에스티 로더',
        'NKE': '나이키', 'BURL': '벌링턴 스토어', 'BBY': '베스트 바이', 'WSM': '윌리엄스 소노마',
        'DKS': '딕스 스포팅 굿즈', 'GPS': '갭', 'KSS': '콜스',
        'GLD': 'SPDR 골드', 'TLT': 'iShares 20+ 채권', 'VWO': '신흥국 ETF',
        'SPY': 'S&P 500 ETF', 'IEF': 'iShares 7-10년 채권', 'EFA': '선진국 ETF',
        'LQD': '기업 채권 ETF', 'VTIP': '인플레이션 연동 ETF', 'VNQ': '리츠 ETF',
        'BNDX': '국제 채권 ETF', 'HYG': '하이일드 채권 ETF', 'EMB': '신흥국 채권 ETF',
        'VXUS': '해외 주식 ETF', 'EWJ': '일본 ETF', 'VTI': '토탈 마켓 ETF',
        'VOO': 'S&P 500 ETF', 'BND': '토탈 채권 ETF'
    };
    
    return stockNames[symbol] || symbol;
}

// 워렌 버핏 지표 점수 계산
function calculateBuffettScore(symbol) {
    // 미리 정의된 점수 (실제로는 API에서 재무제표 등을 가져와 계산해야 함)
    const presetScores = {
        'AAPL': 95, 'BRK-B': 92, 'KO': 88, 'AMZN': 86, 
        'MCO': 85, 'AXP': 84, 'BAC': 82, 'DVA': 79,
        'VZ': 78, 'CVX': 77, 'KHC': 76, 'CE': 75,
        'GM': 74, 'PG': 73, 'OXY': 73, 'PARA': 72,
        'HPQ': 72, 'NUE': 71, 'SNOW': 70, 'USB': 69
    };
    
    return presetScores[symbol] || Math.floor(Math.random() * 20) + 60; // 기본값 60-80
}

// 찰리 멍거 지표 점수 계산
function calculateMungerScore(symbol) {
    // 미리 정의된 점수 (실제로는 API에서 재무제표 등을 가져와 계산해야 함)
    const presetScores = {
        'COST': 95, 'BRK-B': 91, 'WFC': 87, 'AAPL': 90,
        'BAC': 85, 'USB': 83, 'MSFT': 88, 'GOOGL': 86,
        'JNJ': 82, 'PG': 80
    };
    
    return presetScores[symbol] || Math.floor(Math.random() * 20) + 60; // 기본값 60-80
}

// 벤자민 그레이엄 지표 점수 계산
// 피터 린치 지표 점수 계산
function calculateLynchScore(symbol) {
    // 미리 정의된 점수 (실제로는 API에서 재무제표 등을 가져와 계산해야 함)
    const presetScores = {
        'SBUX': 94, 'COST': 91, 'TGT': 87, 'LULU': 86,
        'CMG': 85, 'DPZ': 84, 'DG': 83, 'ULTA': 82,
        'TJX': 81, 'ETSY': 80, 'DIS': 78, 'YUM': 77,
        'EL': 76, 'NKE': 75, 'BURL': 74, 'BBY': 73,
        'WSM': 72, 'DKS': 71, 'GPS': 70, 'KSS': 68
    };
    
    return presetScores[symbol] || Math.floor(Math.random() * 20) + 60; // 기본값 60-80
}

// 레이 달리오 지표 점수 계산
function calculateDalioScore(symbol) {
    // 미리 정의된 점수 (실제로는 API에서 재무제표 등을 가져와 계산해야 함)
    const presetScores = {
        'GLD': 96, 'TLT': 94, 'VWO': 89, 'SPY': 88,
        'IEF': 86, 'EFA': 85, 'LQD': 83, 'VTIP': 82,
        'VNQ': 80, 'BNDX': 79, 'HYG': 77, 'EMB': 76
    };
    
    return presetScores[symbol] || Math.floor(Math.random() * 20) + 60; // 기본값 60-80
}

// API 키 설정 함수
function setApiKey(key) {
    API_KEY = key;
}

// 외부에서 사용할 함수들 내보내기
window.StockAPI = {
    fetchStockData,
    fetchMultipleStocks,
    setApiKey,
    getStocksByInvestor
};