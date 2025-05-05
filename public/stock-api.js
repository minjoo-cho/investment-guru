// API 키는 실제 키로 대체해주세요
let API_KEY = 'YOUR_API_KEY_HERE';

// 캐시 시스템 설정
const dataCache = {
    metrics: {},
    stocks: {},
    lastPriceUpdate: {},
    lastMetricsUpdate: {}
};

// 캐시 만료 시간 (밀리초)
const CACHE_DURATION = {
    PRICE: 3 * 60 * 60 * 1000, // 3시간
    METRICS: 24 * 60 * 60 * 1000 // 24시간
};

// API 호출 제한
const API_LIMIT = {
    CALLS_PER_MINUTE: 5
};

// 주식 데이터 가져오기
async function fetchStockData(symbol) {
    try {
        // 심볼이 없거나 잘못된 경우 예외 처리
        if (!symbol || typeof symbol !== 'string') {
            throw new Error(`유효하지 않은 심볼: ${symbol}`);
        }
        
        // 캐시 확인
        const now = new Date();
        const cachedStock = dataCache.stocks[symbol];
        if (cachedStock && (now - cachedStock.timestamp < CACHE_DURATION.PRICE)) {
            console.log(`캐시된 ${symbol} 데이터 사용`);
            return cachedStock;
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
            { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
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
            const mockData = generateMockData(symbol);
            dataCache.stocks[symbol] = mockData; // 캐시에 저장
            return mockData;
        }
        
        const quote = data['Global Quote'];
        
        const stockData = {
            symbol: symbol,
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume']),
            previousClose: parseFloat(quote['08. previous close']),
            timestamp: new Date().getTime(),
            isMock: false
        };
        
        // 캐시에 저장
        dataCache.stocks[symbol] = stockData;
        
        return stockData;
    } catch (error) {
        console.error(`${symbol} 데이터 가져오기 오류:`, error);
        // 오류 발생 시 모의 데이터 반환
        const mockData = generateMockData(symbol);
        dataCache.stocks[symbol] = mockData; // 캐시에 저장
        return mockData;
    }
}

// 종목 파이낸셜 메트릭 가져오기 (실제로는 API에서 가져와야 하지만, 예시로 모의 데이터 사용)
async function fetchStockMetrics(symbol) {
    try {
        // 캐시 확인
        const now = new Date();
        const cachedMetrics = dataCache.metrics[symbol];
        if (cachedMetrics && (now - cachedMetrics.timestamp < CACHE_DURATION.METRICS)) {
            console.log(`캐시된 ${symbol} 메트릭 데이터 사용`);
            return cachedMetrics;
        }
        
        // 실제로는 API 호출로 가져와야 하지만, 모의 데이터 생성
        const metrics = generateMockMetrics(symbol);
        
        // 캐시에 저장
        metrics.timestamp = new Date().getTime();
        dataCache.metrics[symbol] = metrics;
        
        return metrics;
    } catch (error) {
        console.error(`${symbol} 메트릭 데이터 가져오기 오류:`, error);
        return generateMockMetrics(symbol);
    }
}

// 모의 메트릭 데이터 생성
function generateMockMetrics(symbol) {
    // 여기서는 모든 종목에 대해 랜덤 데이터를 생성합니다.
    // 실제로는 API에서 해당 지표들을 가져와야 합니다.
    return {
        symbol: symbol,
        // 재무 지표
        roe: Math.random() * 30 + 5, // 5-35% 범위
        pe: Math.random() * 40 + 5, // 5-45 범위
        pb: Math.random() * 5 + 0.5, // 0.5-5.5 범위
        debtToEquity: Math.random() * 2, // 0-2 범위
        dividend: Math.random() * 5, // 0-5% 범위
        growthRate: Math.random() * 30, // 0-30% 범위
        peg: Math.random() * 2 + 0.1, // 0.1-2.1 범위
        debtToEbitda: Math.random() * 5, // 0-5 범위
        roic: Math.random() * 20 + 5, // 5-25% 범위
        // 투자 지표
        economicMoat: Math.random() * 100, // 0-100 점수
        managementQuality: Math.random() * 100, // 0-100 점수
        businessSimplicity: Math.random() * 100, // 0-100 점수
        marginOfSafety: Math.random() * 50, // 0-50% 할인율
        // 레이 달리오 지표
        assetClass: ['주식', '채권', '원자재', '금', 'ETF'][Math.floor(Math.random() * 5)],
        volatility: Math.random() * 25 + 5, // 5-30% 범위
        correlation: Math.random() * 2 - 1, // -1에서 1 범위
        // 시장 지표
        marketShare: Math.random() * 60 + 5, // 5-65% 범위
        industryGrowth: Math.random() * 20, // 0-20% 범위
        competitivePower: Math.random() * 100, // 0-100 점수
        innovationRate: Math.random() * 100, // 0-100 점수
        rndInvestment: Math.random() * 15, // 0-15% 매출 대비
        // 시간 정보
        timestamp: new Date().getTime()
    };
}

// 모의 데이터 생성 (API 한도 초과 또는 오류 시 사용)
function generateMockData(symbol) {
    const basePrice = getBasePriceForSymbol(symbol);
    const randomChange = (Math.random() * 4 - 2).toFixed(2); // -2.0% ~ +2.0%
    const changeValue = parseFloat(randomChange);
    const price = parseFloat((basePrice * (1 + changeValue / 100)).toFixed(2));
    
    return {
        symbol: symbol,
        price: price,
        change: changeValue,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        previousClose: basePrice,
        timestamp: new Date().getTime(),
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
        'ETSY': 68.16, 'DIS': 112.61, 'YUM': 132.43,
        'IBM': 170.20, 'KMB': 128.45, 'XOM': 115.80,
        'PEP': 170.95, 'MRK': 127.85, 'PFE': 27.41,
        'MCD': 269.20, 'INTC': 31.45, 'HD': 342.35,
        'MMM': 98.50, 'CAT': 352.40, 'WMT': 60.51,
        'TRV': 214.85, 'EL': 143.00, 'NKE': 93.45,
        'BURL': 203.75, 'BBY': 77.35, 'WSM': 144.53,
        'DKS': 205.65, 'GPS': 20.45, 'KSS': 23.35,
        'SPY': 520.89, 'IEF': 96.75, 'EFA': 79.86,
        'LQD': 109.25, 'VTIP': 48.95, 'VNQ': 84.21,
        'BNDX': 49.35, 'HYG': 78.31, 'EMB': 89.45,
        'VEA': 48.75, 'INDA': 52.85, 'EWY': 68.25,
        'EWZ': 33.75, 'EWT': 48.95, 'MCHI': 33.65,
        'RSX': 9.50, 'EWU': 34.15, 'EWG': 32.55,
        'EWQ': 39.85, 'EWI': 37.45, 'EWP': 32.85,
        'EWL': 49.75, 'EWM': 23.95, 'THD': 73.15,
        'EPP': 67.95, 'ECH': 28.45, 'EZA': 45.95,
        'GS': 456.87, 'BX': 125.35, 'ABNB': 146.25,
        'BKNG': 3587.95, 'HLT': 204.75, 'MAR': 248.45,
        'DASH': 126.75, 'VIG': 177.95, 'BSV': 77.15,
        'BIV': 84.35, 'BLV': 89.95, 'VGSH': 58.75,
        'VGIT': 59.15, 'VGLT': 62.35, 'VMBS': 46.45,
        'VCIT': 80.95, 'VCLT': 89.45, 'VTEB': 49.85,
        'META': 497.35, 'AVGO': 1368.85, 'ADBE': 510.25,
        'CRM': 308.45, 'AMD': 162.35, 'QCOM': 176.15,
        'AMAT': 209.45, 'TXN': 175.25, 'ORCL': 125.95,
        'MU': 117.35, 'DDOG': 115.45, 'SHOP': 76.15,
        'TWLO': 63.25, 'OKTA': 95.45, 'ZS': 187.95,
        'NET': 84.35, 'ASML': 958.75
    };
    
    return priceMap[symbol] || 100.00; // 기본값 100.00
}

// 여러 종목 데이터 한번에 가져오기
async function fetchMultipleStocks(symbols) {
    // 심볼 배열 검증
    if (!Array.isArray(symbols) || symbols.length === 0) {
        console.error('유효하지 않은 심볼 배열:', symbols);
        return {};
    }
    
    const results = {};
    
    // API 호출 제한을 고려한 병렬 처리
    const batchSize = API_LIMIT.CALLS_PER_MINUTE;
    
    for (let i = 0; i < symbols.length; i += batchSize) {
        const batch = symbols.slice(i, i + batchSize);
        
        // 배치 단위로 병렬 처리
        const batchPromises = batch.map(symbol => fetchStockData(symbol));
        
        try {
            const batchResults = await Promise.all(batchPromises);
            
            batchResults.forEach(stock => {
                if (stock && stock.symbol) {
                    results[stock.symbol] = stock;
                }
            });
            
            // API 제한으로 인한 지연 (배치 간)
            if (i + batchSize < symbols.length) {
                console.log(`API 제한 방지를 위해 ${batch.length}개의 종목 요청 후 대기 중...`);
                await new Promise(resolve => setTimeout(resolve, 61000)); // 1분 1초 대기
            }
        } catch (error) {
            console.error(`종목 배치 처리 중 오류:`, error);
        }
    }
    
    return results;
}

// 여러 종목의 메트릭 데이터 한번에 가져오기
async function fetchMultipleStockMetrics(symbols) {
    if (!Array.isArray(symbols) || symbols.length === 0) {
        console.error('유효하지 않은 심볼 배열:', symbols);
        return {};
    }
    
    const results = {};
    
    // 모든 종목의 메트릭 병렬 요청
    const promises = symbols.map(symbol => fetchStockMetrics(symbol));
    
    try {
        const metricsResults = await Promise.all(promises);
        
        metricsResults.forEach(metrics => {
            if (metrics && metrics.symbol) {
                results[metrics.symbol] = metrics;
            }
        });
    } catch (error) {
        console.error('종목 메트릭 데이터 가져오기 오류:', error);
    }
    
    return results;
}

// 투자자별 종목 평가 함수 (투자자 ID에 따라 다른 로직 적용)
async function getStocksByInvestor(investorId, updatePrices = true, updateMetrics = true) {
    // 투자자 ID 검증
    if (!investorId || typeof investorId !== 'string') {
        throw new Error('유효하지 않은 투자자 ID');
    }
    
    // 캐시된 데이터 확인
    const cachedData = getFromCache(investorId, updatePrices, updateMetrics);
    if (cachedData) {
        return cachedData;
    }
    
    try {
        // 투자자별 평가 함수 매핑
        const evaluationFunctions = {
            'warren-buffett': evaluateBuffettStocks,
            'charlie-munger': evaluateMungerStocks,
            'benjamin-graham': evaluateGrahamStocks,
            'peter-lynch': evaluateLynchStocks,
            'ray-dalio': evaluateDalioStocks,
            'philip-fisher': evaluateFisherStocks,
            'jim-simons': evaluateSimonsStocks,
            'john-templeton': evaluateTempletonStocks,
            'howard-marks': evaluateMarksStocks,
            'john-bogle': evaluateBogleStocks
        };
        
        // 해당 투자자의 평가 함수 호출
        const evaluateFunction = evaluationFunctions[investorId] || evaluateBuffettStocks;
        const stocks = await evaluateFunction();
        
        // 캐시에 저장
        cacheStocksData(investorId, stocks, updatePrices, updateMetrics);
        
        return stocks;
    } catch (error) {
        console.error(`${investorId} 투자자의 종목 평가 중 오류 발생:`, error);
        return [];
    }
}

// =========================================================
// 투자 지표 기반 점수 계산 함수들 - 개선된 버전
// =========================================================

// 워렌 버핏 지표 점수 계산
function calculateBuffettScore(metrics, weights) {
    if (!metrics || !weights) {
        console.error('유효하지 않은 metrics 또는 weights 데이터');
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 경제적 해자 (높을수록 좋음)
        score += (metrics.economicMoat / 100) * weights.economicMoat * 100;
        
        // ROE (15% 이상이면 좋음)
        const roeScore = metrics.roe > 15 ? 1 : metrics.roe / 15;
        score += roeScore * weights.roe * 100;
        
        // 부채비율 (낮을수록 좋음, 0.5 이하면 최고점)
        const debtScore = metrics.debtToEquity < 0.5 ? 1 : (2 - metrics.debtToEquity) / 1.5;
        score += Math.max(0, debtScore) * weights.debtToEquity * 100;
        
        // P/E (낮을수록 좋음, 15 이하면 최고점)
        const peScore = metrics.pe < 15 ? 1 : (30 - metrics.pe) / 15;
        score += Math.max(0, peScore) * weights.pe * 100;
        
        // 현금흐름
        const cashFlowScore = (Math.random() * 0.5 + 0.5); // 0.5-1.0 범위
        score += cashFlowScore * weights.cashFlow * 100;
        
        // 경영진 신뢰성
        score += (metrics.managementQuality / 100) * weights.managementQuality * 100;
        
        // 내재가치 할인율
        score += (metrics.marginOfSafety / 50) * weights.marginOfSafety * 100;
        
        // 이익 성장성
        const growthScore = metrics.growthRate > 10 ? 1 : metrics.growthRate / 10;
        score += growthScore * weights.growthRate * 100;
        
        // 자사주 매입
        const buybackScore = Math.random();
        score += buybackScore * weights.buyback * 100;
        
        // 상품 의존도 (낮을수록 좋음)
        const productDependencyScore = 1 - (Math.random() * 0.5); // 0.5-1.0 범위
        score += productDependencyScore * weights.productDependency * 100;
    } catch (error) {
        console.error('버핏 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 찰리 멍거 지표 점수 계산
function calculateMungerScore(metrics, weights) {
    if (!metrics || !weights) {
        console.error('유효하지 않은 metrics 또는 weights 데이터');
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 경제적 해자 (높을수록 좋음)
        score += (metrics.economicMoat / 100) * weights.economicMoat * 100;
        
        // 경영진 품질 (높을수록 좋음)
        score += (metrics.managementQuality / 100) * weights.managementQuality * 100;
        
        // 비즈니스 단순성 (높을수록 좋음)
        score += (metrics.businessSimplicity / 100) * weights.businessSimplicity * 100;
        
        // 안전마진 (높을수록 좋음)
        score += (metrics.marginOfSafety / 50) * weights.marginOfSafety * 100;
        
        // P/E (낮을수록 좋음, 15 이하면 최고점)
        const peScore = metrics.pe < 15 ? 1 : (30 - metrics.pe) / 15;
        score += Math.max(0, peScore) * weights.pe * 100;
        
        // 현금흐름
        const cashFlowScore = Math.random() * 0.7 + 0.3; // 0.3-1.0 범위
        score += cashFlowScore * weights.cashFlow * 100;
        
        // 장기적 관점
        score += Math.random() * weights.longTermView * 100;
        
        // 브랜드 파워
        score += Math.random() * weights.brandPower * 100;
        
        // R&D 투자
        score += (metrics.rndInvestment / 15) * weights.rndInvestment * 100;
        
        // 유통망 강도
        score += Math.random() * weights.distributionStrength * 100;
    } catch (error) {
        console.error('멍거 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 벤자민 그레이엄 지표 점수 계산
function calculateGrahamScore(metrics, weights) {
    if (!metrics || !weights) {
        console.error('유효하지 않은 metrics 또는 weights 데이터');
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 안전마진 (높을수록 좋음)
        score += (metrics.marginOfSafety / 50) * weights.marginOfSafety * 100;
        
        // 그레이엄 넘버 (임의 계산)
        const grahamNumber = Math.sqrt(22.5 * metrics.pe * metrics.pb);
        const grahamScore = metrics.price < grahamNumber ? 1 : grahamNumber / metrics.price;
        score += grahamScore * weights.grahamNumber * 100;
        
        // P/E (낮을수록 좋음, 15 이하면 최고점)
        const peScore = metrics.pe < 15 ? 1 : (30 - metrics.pe) / 15;
        score += Math.max(0, peScore) * weights.pe * 100;
        
        // P/B (낮을수록 좋음, 1.5 이하면 최고점)
        const pbScore = metrics.pb < 1.5 ? 1 : (3 - metrics.pb) / 1.5;
        score += Math.max(0, pbScore) * weights.pb * 100;
        
        // 부채비율 (낮을수록 좋음, 1.0 이하면 최고점)
        const debtScore = metrics.debtToEquity < 1.0 ? 1 : (2 - metrics.debtToEquity);
        score += Math.max(0, debtScore) * weights.debtToEquity * 100;
        
        // 현금비율
        const currentRatioScore = Math.random() * 0.7 + 0.3; // 0.3-1.0 범위
        score += currentRatioScore * weights.currentRatio * 100;
        
        // 배당 수익률
        score += (metrics.dividend / 5) * weights.dividend * 100;
        
        // 분산투자
        score += Math.random() * weights.diversification * 100;
        
        // 이익 안정성
        score += Math.random() * weights.earningStability * 100;
        
        // 자산 유동성
        score += Math.random() * weights.assetLiquidity * 100;
    } catch (error) {
        console.error('그레이엄 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 피터 린치 지표 점수 계산
function calculateLynchScore(metrics, weights) {
    if (!metrics || !weights) {
        console.error('유효하지 않은 metrics 또는 weights 데이터');
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // PEG 비율 (1.0 이하면 좋음)
        const pegScore = metrics.peg < 1.0 ? 1 : (2 - metrics.peg);
        score += Math.max(0, pegScore) * weights.peg * 100;
        
        // 이익 성장률 (높을수록 좋음, 10-20% 사이가 이상적)
        const growthScore = metrics.growthRate > 20 ? 0.8 : (metrics.growthRate > 10 ? 1 : metrics.growthRate / 10);
        score += growthScore * weights.growthRate * 100;
        
        // 부채비율 (낮을수록 좋음, 0.8 이하면 최고점)
        const debtScore = metrics.debtToEquity < 0.8 ? 1 : (1.6 - metrics.debtToEquity) / 0.8;
        score += Math.max(0, debtScore) * weights.debtToEquity * 100;
        
        // P/E (낮을수록 좋음, 업종 평균 대비)
        const peScore = metrics.pe < 20 ? 1 : (40 - metrics.pe) / 20;
        score += Math.max(0, peScore) * weights.pe * 100;
        
        // 현금 보유량
        const cashReserveScore = Math.random() * 0.7 + 0.3; // 0.3-1.0 범위
        score += cashReserveScore * weights.cashReserve * 100;
        
        // 배당+성장률
        const divGrowthScore = ((metrics.growthRate + metrics.dividend) / 15);
        score += Math.min(1, divGrowthScore) * weights.dividendGrowth * 100;
        
        // 동일매장 매출 성장
        const sameStoreSalesScore = Math.random() * 0.8 + 0.2; // 0.2-1.0 범위
        score += sameStoreSalesScore * weights.sameStoreSales * 100;
        
        // 소비자 니즈
        score += Math.random() * weights.consumerNeeds * 100;
        
        // 경영진 인터뷰
        score += Math.random() * weights.managementInterview * 100;
        
        // 업종 내 위치
        score += Math.random() * weights.industryPosition * 100;
    } catch (error) {
        console.error('린치 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 레이 달리오 지표 점수 계산
function calculateDalioScore(metrics, weights) {
    if (!metrics || !weights) {
        console.error('유효하지 않은 metrics 또는 weights 데이터');
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 분산도
        const diversificationScore = Math.random() * 0.8 + 0.2; // 0.2-1.0 범위
        score += diversificationScore * weights.diversification * 100;
        
        // 거시경제지표
        score += Math.random() * weights.macroIndicators * 100;
        
        // 리스크 패리티
        score += Math.random() * weights.riskParity * 100;
        
        // 상관관계 (낮을수록 좋음)
        const correlationScore = Math.abs(metrics.correlation) < 0.3 ? 1 : (1 - Math.abs(metrics.correlation)) / 0.7;
        score += correlationScore * weights.correlation * 100;
        
        // 유동성
        const liquidityScore = Math.random() * 0.8 + 0.2; // 0.2-1.0 범위
        score += liquidityScore * weights.liquidity * 100;
        
        // 나머지 지표들 계산
        score += Math.random() * weights.hedgeStrategy * 100;
        score += Math.random() * weights.longTermTrend * 100;
        score += Math.random() * weights.costEfficiency * 100;
        score += Math.random() * weights.policyChange * 100;
        score += Math.random() * weights.portfolioRebalancing * 100;
    } catch (error) {
        console.error('달리오 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}
// 필립 피셔 지표 점수 계산
function calculateFisherScore(metrics, weights) {
    if (!metrics || !weights) {
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 성장성
        const growthScore = metrics.growthRate > 15 ? 1 : metrics.growthRate / 15;
        score += growthScore * weights.growthRate * 100;
        
        // 경영진 품질
        score += (metrics.managementQuality / 100) * weights.managementQuality * 100;
        
        // R&D 투자
        score += (metrics.rndInvestment / 15) * weights.rndInvestment * 100;
        
        // 시장 점유율
        score += (metrics.marketShare / 60) * weights.marketShare * 100;
        
        // 이익률
        const profitMarginScore = Math.random() * 0.8 + 0.2; // 0.2-1.0 범위
        score += profitMarginScore * weights.profitMargin * 100;
        
        // 기타 지표들 계산
        score += Math.random() * weights.productDifferentiation * 100;
        score += Math.random() * weights.customerLoyalty * 100;
        score += Math.random() * weights.financialStrength * 100;
        score += Math.random() * weights.corporateCulture * 100;
        score += Math.random() * weights.longTermView * 100;
    } catch (error) {
        console.error('피셔 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 짐 사이먼스 지표 점수 계산
function calculateSimonsScore(metrics, weights) {
    if (!metrics || !weights) {
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 수학/통계 모델 (퀀트 접근법에 대한 점수)
        score += Math.random() * weights.mathematicalModels * 100;
        
        // 자동화 트레이딩
        score += Math.random() * weights.automatedTrading * 100;
        
        // 빅데이터 분석
        score += Math.random() * weights.bigDataAnalysis * 100;
        
        // 리스크 관리
        score += Math.random() * weights.riskManagement * 100;
        
        // 상관관계
        const correlationScore = Math.abs(metrics.correlation) < 0.3 ? 1 : (1 - Math.abs(metrics.correlation)) / 0.7;
        score += correlationScore * weights.correlation * 100;
        
        // 변동성
        const volatilityScore = metrics.volatility > 5 && metrics.volatility < 20 ? 1 : 0.7;
        score += volatilityScore * weights.volatility * 100;
        
        // 나머지 지표들 계산
        score += Math.random() * weights.marketNeutral * 100;
        score += Math.random() * weights.tradingCosts * 100;
        score += Math.random() * weights.dataQuality * 100;
        score += Math.random() * weights.modelImprovement * 100;
    } catch (error) {
        console.error('사이먼스 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}
// 존 템플턴 지표 점수 계산
function calculateTempletonScore(metrics, weights) {
    if (!metrics || !weights) {
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 글로벌 분산
        score += Math.random() * weights.globalDiversification * 100;
        
        // 역발상(Contrarian)
        score += Math.random() * weights.contrarian * 100;
        
        // 저P/E
        const peScore = metrics.pe < 15 ? 1 : (30 - metrics.pe) / 15;
        score += Math.max(0, peScore) * weights.lowPE * 100;
        
        // 성장성
        const growthScore = metrics.growthRate > 10 ? 1 : metrics.growthRate / 10;
        score += growthScore * weights.growth * 100;
        
        // 환율 리스크 관리
        score += Math.random() * weights.fxRiskManagement * 100;
        
        // 배당/현금흐름
        score += (metrics.dividend / 5) * weights.dividendCashflow * 100;
        
        // 나머지 지표들 계산
        score += Math.random() * weights.longTermInvestment * 100;
        score += Math.random() * weights.valueEvaluation * 100;
        score += Math.random() * weights.politicalRisk * 100;
        score += Math.random() * weights.industryDiversification * 100;
    } catch (error) {
        console.error('템플턴 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 하워드 마크스 지표 점수 계산
function calculateMarksScore(metrics, weights) {
    if (!metrics || !weights) {
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 시장 심리
        score += Math.random() * weights.marketSentiment * 100;
        
        // 가치 평가 지표
        score += Math.random() * weights.valuationMetrics * 100;
        
        // 신용 사이클
        score += Math.random() * weights.creditCycle * 100;
        
        // 부실 자산
        score += Math.random() * weights.distressedAssets * 100;
        
        // 역발상 전략
        score += Math.random() * weights.contrarian * 100;
        
        // 나머지 지표들 계산
        score += Math.random() * weights.riskManagement * 100;
        score += Math.random() * weights.liquidityPremium * 100;
        score += Math.random() * weights.assetClassRotation * 100;
        score += Math.random() * weights.marketInefficiency * 100;
        score += Math.random() * weights.patientCapital * 100;
    } catch (error) {
        console.error('마크스 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}

// 존 보글 지표 점수 계산
function calculateBogleScore(metrics, weights) {
    if (!metrics || !weights) {
        return Math.round(Math.random() * 30 + 70); // 임시 대응
    }
    
    let score = 0;
    
    try {
        // 비용 비율
        score += Math.random() * weights.expenseRatio * 100;
        
        // 넓은 시장 커버리지
        score += Math.random() * weights.broadMarketCoverage * 100;
        
        // 인덱스 충실도
        score += Math.random() * weights.indexFidelity * 100;
        
        // 세금 효율성
        score += Math.random() * weights.taxEfficiency * 100;
        
        // 분산투자
        score += Math.random() * weights.diversification * 100;
        
        // 나머지 지표들 계산
        score += Math.random() * weights.longTermHolding * 100;
        score += Math.random() * weights.lowTurnover * 100;
        score += Math.random() * weights.simplicity * 100;
        score += Math.random() * weights.assetAllocation * 100;
        score += Math.random() * weights.investorDiscipline * 100;
    } catch (error) {
        console.error('보글 점수 계산 중 오류:', error);
        return Math.round(Math.random() * 30 + 70); // 오류 발생 시 임의 점수 반환
    }
    
    return Math.round(score);
}
// 워렌 버핏 지표에 따른 종목 평가
async function evaluateBuffettStocks() {
    try {
        // 투자자 데이터에서 후보 종목 가져오기
        const investor = window.InvestorData.getInvestorData('warren-buffett');
        if (!investor || !investor.stockCandidates || !Array.isArray(investor.stockCandidates)) {
            throw new Error('버핏의 후보 종목을 가져올 수 없습니다.');
        }
        
        const candidates = investor.stockCandidates;
        
        // 종목 데이터 및 메트릭 병렬 요청
        const [stocksData, metricsData] = await Promise.all([
            fetchMultipleStocks(candidates),
            fetchMultipleStockMetrics(candidates)
        ]);
        
        // 버핏의 투자 지표 가중치
        const weights = {
            economicMoat: 0.25,    // 경제적 해자
            roe: 0.20,             // ROE
            debtToEquity: 0.15,    // 부채비율
            pe: 0.10,              // P/E
            cashFlow: 0.10,        // 현금흐름
            managementQuality: 0.08, // 경영진 신뢰성
            marginOfSafety: 0.07,  // 내재가치 할인율
            growthRate: 0.05,      // 이익 성장성
            buyback: 0.04,         // 자사주 매입
            productDependency: 0.03 // 상품 의존도
        };
        
        // 종목 평가 및 점수 계산
        const evaluatedStocks = candidates.map(symbol => {
            const stockData = stocksData[symbol] || generateMockData(symbol);
            const metrics = metricsData[symbol] || generateMockMetrics(symbol);
            
            // 종합 점수 계산 (버핏 투자 지표 기준)
            const score = calculateBuffettScore(metrics, weights);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                price: stockData.price,
                change: stockData.change,
                roe: metrics.roe.toFixed(1),
                debtToEquity: metrics.debtToEquity.toFixed(2),
                pe: metrics.pe.toFixed(1),
                score: score,
                previousClose: stockData.previousClose,
                isMock: stockData.isMock
            };
        });
        
        // 점수가 높은 순으로 정렬
        return evaluatedStocks.sort((a, b) => b.score - a.score);
    } catch (error) {
        console.error('버핏 종목 평가 중 오류:', error);
        return [];
    }
}
