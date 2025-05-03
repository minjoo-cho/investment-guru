// API 키는 실제 키로 대체해주세요
const API_KEY = 'YOUR_API_KEY_HERE';

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
        'GOOGL': 174.49, 'C': 63.81, 'EWJ': 48.52
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

// API 키 설정 함수
function setApiKey(key) {
    API_KEY = key;
}

// 외부에서 사용할 함수들 내보내기
window.StockAPI = {
    fetchStockData,
    fetchMultipleStocks,
    setApiKey
};