// API 키
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
    PRICE: 3 * 60 * 60 * 1000,
    METRICS: 24 * 60 * 60 * 1000
};

// API 호출 제한
const API_LIMIT = {
    CALLS_PER_MINUTE: 5
};

// 주식 데이터 가져오기
async function fetchStockData(symbol) {
    try {
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
        
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
        
        if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
            console.warn(`${symbol} 데이터 없음 또는 API 제한. 모의 데이터 사용.`);
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
        return generateMockData(symbol);
    }
}

// 모의 데이터 생성
function generateMockData(symbol) {
    // 기준 가격 (실제 API 호출 실패 시 모의 데이터로 사용)
    const basePrice = getBasePriceForSymbol(symbol);
    const randomChange = (Math.random() * 4 - 2).toFixed(1);
    const changeValue = parseFloat(randomChange);
    const price = parseFloat((basePrice * (1 + changeValue / 100)).toFixed(2));
    
    return {
        symbol: symbol,
        price: price,
        change: changeValue,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        previousClose: basePrice,
        timestamp: new Date().toLocaleString(),
        isMock: true
    };
}

// 기본 가격 정보 (외부 API에서 가져오거나 DB에서 관리해야 하지만 현재는 예시로 사용)
function getBasePriceForSymbol(symbol) {
    // 실제 서비스에서는 이 부분을 API에서 가져오거나 DB에서 관리해야 함
    // 하드코딩 대신 동적으로 가격을 가져오는 로직으로 대체 필요
    return Math.random() * 500 + 50; // 예시로 50-550 사이의 임의 가격 반환
}

// 여러 종목 데이터 가져오기 (API 제한 고려)
async function fetchMultipleStocks(symbols) {
    const results = {};
    
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        
        try {
            if (i > 0 && i % API_LIMIT.CALLS_PER_MINUTE === 0) {
                console.log(`API 호출 제한 방지 대기 중... (${i}/${symbols.length})`);
                await new Promise(resolve => setTimeout(resolve, 60000));
            }
            
            const stock = await fetchStockData(symbol);
            results[stock.symbol] = stock;
        } catch (error) {
            console.error(`${symbol} 데이터 가져오기 실패:`, error);
            results[symbol] = generateMockData(symbol);
        }
    }
    
    return results;
}

// 투자자별 종목 평가 함수 (투자자 ID에 따라 다른 로직 적용)
async function getStocksByInvestor(investorId, updatePrices = true, updateMetrics = true) {
    // 캐시된 데이터 확인
    const cachedData = getFromCache(investorId, updatePrices, updateMetrics);
    if (cachedData) {
        return cachedData;
    }
    
    // 투자자별 평가 로직 및 후보 종목 목록
    const investorConfig = getInvestorConfig(investorId);
    
    // 캐시된 지표 데이터 확인
    let stocksWithScores = getCachedMetrics(investorId);
    
    // 메트릭 업데이트 필요시 새로 계산
    if (updateMetrics || !stocksWithScores) {
        stocksWithScores = investorConfig.candidates.map(symbol => {
            const score = calculateStockScore(symbol, investorId);
            
            return {
                symbol: symbol,
                name: getStockName(symbol),
                score: score,
                price: 0,
                change: 0
            };
        });
        
        // 지표 데이터 캐싱
        cacheMetricsData(investorId, stocksWithScores);
    }
    
    // 주가 업데이트 필요시 가격 정보 가져오기
    if (updatePrices) {
        const symbols = stocksWithScores.map(stock => stock.symbol);
        const stocksData = await fetchMultipleStocks(symbols);
        
        // 주가 데이터 업데이트
        stocksWithScores.forEach(stock => {
            const priceData = stocksData[stock.symbol];
            if (priceData) {
                stock.price = priceData.price;
                stock.change = priceData.change;
                stock.previousClose = priceData.previousClose;
                stock.isMock = priceData.isMock;
            }
        });
    }
    
    // 점수 기준 정렬
    const sortedStocks = stocksWithScores.sort((a, b) => b.score - a.score);
    
    // 결과 캐싱
    cacheStocksData(investorId, sortedStocks, updatePrices, updateMetrics);
    
    return sortedStocks;
}

// 투자자별 설정 정보 가져오기
function getInvestorConfig(investorId) {
    const configs = {
        'warren-buffett': {
            candidates: ['AAPL', 'BRK-B', 'KO', 'AMZN', 'MCO', 'AXP', 'BAC', 'DVA', 'VZ', 'CVX', 'KHC', 'CE', 'GM', 'PG', 'OXY', 'PARA', 'HPQ', 'NUE', 'SNOW', 'USB'],
            metrics: [
                { name: '경제적 해자', weight: 0.25 },
                { name: 'ROE', weight: 0.20 },
                { name: '부채비율', weight: 0.15 },
                { name: 'P/E', weight: 0.10 },
                { name: '현금흐름', weight: 0.10 },
                { name: '경영진 신뢰성', weight: 0.08 },
                { name: '내재가치 할인율', weight: 0.07 },
                { name: '이익 성장성', weight: 0.05 },
                { name: '자사주 매입', weight: 0.04 },
                { name: '상품 의존도', weight: 0.03 }
            ]
        },
        'charlie-munger': {
            candidates: ['COST', 'BRK-B', 'WFC', 'AAPL', 'BAC', 'USB', 'MSFT', 'GOOGL', 'JNJ', 'PG'],
            metrics: [
                { name: '경제적 해자', weight: 0.30 },
                { name: '경영진 품질', weight: 0.25 },
                { name: '비즈니스 단순성', weight: 0.15 },
                { name: '안전마진', weight: 0.12 },
                { name: 'P/E', weight: 0.08 },
                { name: '현금흐름', weight: 0.05 },
                { name: '장기적 관점', weight: 0.05 },
                { name: '브랜드 파워', weight: 0.04 },
                { name: 'R&D 투자', weight: 0.03 },
                { name: '유통망 강도', weight: 0.03 }
            ]
        },
        'benjamin-graham': {
            candidates: ['PG', 'JNJ', 'JPM', 'VZ', 'IBM', 'KMB', 'CVX', 'XOM', 'KO', 'PEP', 'MRK', 'PFE', 'CSCO', 'MCD', 'INTC', 'HD', 'MMM', 'CAT', 'WMT', 'TRV'],
            metrics: [
                { name: '안전마진', weight: 0.30 },
                { name: '그레이엄 넘버', weight: 0.20 },
                { name: 'P/E', weight: 0.15 },
                { name: 'P/B', weight: 0.10 },
                { name: '부채비율', weight: 0.10 },
                { name: '현금비율', weight: 0.05 },
                { name: '배당 수익률', weight: 0.05 },
                { name: '분산투자', weight: 0.05 },
                { name: '이익 안정성', weight: 0.05 },
                { name: '자산 유동성', weight: 0.05 }
            ]
        },
        'peter-lynch': {
            candidates: ['SBUX', 'COST', 'TGT', 'LULU', 'CMG', 'DPZ', 'DG', 'ULTA', 'TJX', 'ETSY', 'DIS', 'YUM', 'EL', 'NKE', 'BURL', 'BBY', 'WSM', 'DKS', 'GPS', 'KSS'],
            metrics: [
                { name: 'PEG 비율', weight: 0.25 },
                { name: '이익 성장률', weight: 0.20 },
                { name: '부채비율', weight: 0.15 },
                { name: 'P/E', weight: 0.10 },
                { name: '현금 보유량', weight: 0.10 },
                { name: '배당+성장률', weight: 0.08 },
                { name: '동일매장 매출 성장', weight: 0.05 },
                { name: '소비자 니즈', weight: 0.05 },
                { name: '경영진 인터뷰', weight: 0.03 },
                { name: '업종 내 위치', weight: 0.03 }
            ]
        },
        'ray-dalio': {
            candidates: ['GLD', 'TLT', 'VWO', 'SPY', 'IEF', 'EFA', 'LQD', 'VTIP', 'VNQ', 'BNDX', 'HYG', 'EMB'],
            metrics: [
                { name: '분산도', weight: 0.20 },
                { name: '거시경제지표', weight: 0.15 },
                { name: '리스크 패리티', weight: 0.15 },
                { name: '상관관계', weight: 0.10 },
                { name: '유동성', weight: 0.10 },
                { name: '헤지 전략', weight: 0.08 },
                { name: '장기 트렌드', weight: 0.07 },
                { name: '비용 효율성', weight: 0.05 },
                { name: '정책 변화', weight: 0.05 },
                { name: '포트폴리오 리밸런싱', weight: 0.05 }
            ]
        },
        'phil-fisher': {
            candidates: ['MSFT', 'TSLA', 'NVDA', 'GOOG', 'ASML', 'AMZN', 'META', 'AVGO', 'ADBE', 'CRM', 'NFLX', 'INTC', 'AMD', 'QCOM', 'AMAT', 'PYPL', 'CSCO', 'TXN', 'ORCL', 'MU'],
            metrics: [
                { name: '성장성', weight: 0.25 },
                { name: '경영진 품질', weight: 0.20 },
                { name: 'R&D 투자', weight: 0.15 },
                { name: '시장 점유율', weight: 0.10 },
                { name: '이익률', weight: 0.10 },
                { name: '제품/서비스 차별화', weight: 0.07 },
                { name: '고객 충성도', weight: 0.05 },
                { name: '재무 건전성', weight: 0.03 },
                { name: '기업 문화', weight: 0.03 },
                { name: '장기적 관점', weight: 0.02 }
            ]
        },
        'john-bogle': {
            candidates: ['VTI', 'VOO', 'BND', 'VXUS', 'VEA', 'VWO', 'VIG', 'VNQ', 'BSV', 'BIV', 'BLV', 'BNDX', 'VGSH', 'VGIT', 'VGLT', 'VTIP', 'VMBS', 'VCIT', 'VCLT', 'VTEB'],
            metrics: [
                { name: '비용 효율성', weight: 0.30 },
                { name: '다각화', weight: 0.25 },
                { name: '인덱스 구성', weight: 0.15 },
                { name: '운용 규모', weight: 0.10 },
                { name: '장기 수익률', weight: 0.10 },
                { name: '거래량/유동성', weight: 0.05 },
                { name: '추적 오차', weight: 0.05 },
                { name: '세금 효율성', weight: 0.03 },
                { name: '수탁사 신뢰도', weight: 0.02 },
                { name: '재투자 옵션', weight: 0.01 }
            ]
        },
        'jim-simons': {
            candidates: ['GOOGL', 'AMZN', 'MSFT', 'AAPL', 'NFLX', 'META', 'NVDA', 'TSLA', 'AMD', 'PYPL', 'DDOG', 'CRM', 'ADBE', 'SHOP', 'SNOW', 'TWLO', 'OKTA', 'UBER', 'ZS', 'NET'],
            metrics: [
                { name: '수학/통계 모델', weight: 0.25 },
                { name: '자동화 트레이딩', weight: 0.20 },
                { name: '빅데이터 분석', weight: 0.15 },
                { name: '리스크 관리', weight: 0.10 },
                { name: '상관관계', weight: 0.08 },
                { name: '변동성', weight: 0.07 },
                { name: '시장 중립 전략', weight: 0.05 },
                { name: '거래비용 최소화', weight: 0.04 },
                { name: '데이터 품질', weight: 0.03 },
                { name: '지속적 모델 개선', weight: 0.03 }
            ]
        },
        'john-templeton': {
            candidates: ['VXUS', 'VWO', 'EWJ', 'INDA', 'EWY', 'EWZ', 'EWT', 'MCHI', 'RSX', 'EWU', 'EWG', 'EWQ', 'EWI', 'EWP', 'EWL', 'EWM', 'THD', 'EPP', 'ECH', 'EZA'],
            metrics: [
                { name: '글로벌 분산', weight: 0.20 },
                { name: '역발상(Contrarian)', weight: 0.18 },
                { name: '저P/E', weight: 0.15 },
                { name: '성장성', weight: 0.10 },
                { name: '환율 리스크 관리', weight: 0.10 },
                { name: '배당/현금흐름', weight: 0.08 },
                { name: '장기투자', weight: 0.07 },
                { name: '가치평가', weight: 0.05 },
                { name: '정치/정책 리스크', weight: 0.04 },
                { name: '산업 다각화', weight: 0.03 }
            ]
        },
        'howard-marks': {
            candidates: ['AMZN', 'GOOGL', 'C', 'MS', 'GS', 'BX', 'BAC', 'WFC', 'JPM', 'UBER', 'DIS', 'NFLX', 'ABNB', 'META', 'BKNG', 'HLT', 'MAR', 'DASH', 'XOM', 'CVX'],
            metrics: [
                { name: '시장 사이클', weight: 0.25 },
                { name: '신용 사이클', weight: 0.20 },
                { name: '투자자 심리', weight: 0.15 },
                { name: '리스크 프리미엄', weight: 0.10 },
                { name: '가격 대비 가치', weight: 0.10 },
                { name: '유동성', weight: 0.08 },
                { name: '신용 스프레드', weight: 0.05 },
                { name: '레버리지', weight: 0.03 },
                { name: '채권 등급', weight: 0.02 },
                { name: '디스트레스 수준', weight: 0.02 }
            ]
        }
    };
    
    return configs[investorId] || configs['warren-buffett'];
}

// 종목 점수 계산 함수
function calculateStockScore(symbol, investorId) {
    // 실제로는 API에서 재무제표 등을 가져와 계산해야 함
    // 지금은 50-100 사이의 임의의 점수 반환
    return Math.floor(Math.random() * 50) + 50;
}

// 종목 이름 매핑
function getStockName(symbol) {
    const nameMap = {
        'AAPL': '애플', 'MSFT': '마이크로소프트', 'GOOGL': '알파벳',
        'AMZN': '아마존', 'BRK-B': '버크셔 해서웨이', 'JPM': 'JP모건',
        'JNJ': '존슨앤존슨', 'KO': '코카콜라', 'PG': '프록터앤갬블'
        // 실제 서비스에서는 DB나 외부 API에서 가져오는 것이 바람직
    };
    
    return nameMap[symbol] || symbol;
}

// 캐시 관련 함수들
function getCachedMetrics(investorId) {
    return dataCache.metrics[investorId] || null;
}

function cacheMetricsData(investorId, data) {
    dataCache.metrics[investorId] = data;
    dataCache.lastMetricsUpdate[investorId] = new Date();
}

function isCacheValid(investorId, needPrices, needMetrics) {
    const now = new Date();
    const lastPriceUpdate = dataCache.lastPriceUpdate[investorId] || null;
    const lastMetricsUpdate = dataCache.lastMetricsUpdate[investorId] || null;
    
    const priceValid = !needPrices || 
                      (lastPriceUpdate && (now - lastPriceUpdate) < CACHE_DURATION.PRICE);
    
    const metricsValid = !needMetrics || 
                        (lastMetricsUpdate && (now - lastMetricsUpdate) < CACHE_DURATION.METRICS);
    
    return priceValid && metricsValid;
}

function getFromCache(investorId, needPrices, needMetrics) {
    const cachedData = dataCache.stocks[investorId];
    if (!cachedData) return null;
    
    if (isCacheValid(investorId, needPrices, needMetrics)) {
        return cachedData;
    }
    
    return null;
}

function cacheStocksData(investorId, stocks, isPriceUpdated, isMetricsUpdated) {
    dataCache.stocks[investorId] = stocks;
    
    const now = new Date();
    
    if (isPriceUpdated) {
        dataCache.lastPriceUpdate[investorId] = now;
    }
    
    if (isMetricsUpdated) {
        dataCache.lastMetricsUpdate[investorId] = now;
    }
}

// API 키 설정 함수
function setApiKey(key) {
    API_KEY = key;
    console.log('API 키가 설정되었습니다.');
}

// 외부에서 사용할 함수들 내보내기
window.StockAPI = {
    fetchStockData,
    fetchMultipleStocks,
    setApiKey,
    getStocksByInvestor
};