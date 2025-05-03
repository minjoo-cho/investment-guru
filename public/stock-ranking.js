/**
 * 주식 종목 랭킹 및 평가 서비스
 * 각 투자 대가별 지표에 따라 주식 종목을 평가하고 순위를 매깁니다.
 */

// 전체 주식 시장 데이터 (실제로는 API에서 가져와야 함)
let marketData = {};

// 투자 대가별 지표에 따라 종목 점수 계산
function calculateStockScores(investor, stocksData) {
    // 투자자 ID에 따라 다른 평가 함수 호출
    switch(investor.id) {
        case 'warren-buffett':
            return calculateBuffettScores(stocksData);
        case 'peter-lynch':
            return calculateLynchScores(stocksData);
        case 'benjamin-graham':
            return calculateGrahamScores(stocksData);
        // 나머지 투자자들에 대한 케이스 추가
        default:
            // 기본 평가 방식
            return calculateDefaultScores(stocksData);
    }
}

// 워렌 버핏 기준 점수 계산
function calculateBuffettScores(stocksData) {
    const scoredStocks = [];
    
    Object.keys(stocksData).forEach(symbol => {
        const stock = stocksData[symbol];
        const fundamentals = getStockFundamentals(symbol);
        
        // 버핏의 지표에 따른 점수 계산
        let score = 0;
        
        // ROE 점수 (15% 이상이 좋음)
        if (fundamentals.roe >= 15) {
            score += 25;
        } else if (fundamentals.roe >= 10) {
            score += 15;
        } else if (fundamentals.roe >= 5) {
            score += 5;
        }
        
        // 부채비율 점수 (낮을수록 좋음)
        if (fundamentals.debtToEquity < 0.5) {
            score += 25;
        } else if (fundamentals.debtToEquity < 1.0) {
            score += 15;
        } else if (fundamentals.debtToEquity < 1.5) {
            score += 5;
        }
        
        // 수익 안정성 (10년간 수익 성장)
        if (fundamentals.earningsStability >= 90) {
            score += 20;
        } else if (fundamentals.earningsStability >= 70) {
            score += 10;
        } else if (fundamentals.earningsStability >= 50) {
            score += 5;
        }
        
        // 경제적 해자 점수 (주관적 요소이지만 수익률 및 시장 점유율로 대체)
        if (fundamentals.marketShare >= 30) {
            score += 15;
        } else if (fundamentals.marketShare >= 15) {
            score += 10;
        } else if (fundamentals.marketShare >= 5) {
            score += 5;
        }
        
        // P/E 비율 (현재 주가가 적정한지)
        if (fundamentals.pe < 15) {
            score += 15;
        } else if (fundamentals.pe < 20) {
            score += 10;
        } else if (fundamentals.pe < 25) {
            score += 5;
        }
        
        // 최종 점수 계산 (100점 만점)
        const finalScore = Math.min(100, score);
        
        // 최신 가격 정보 추가
        scoredStocks.push({
            symbol: symbol,
            name: stock.name || fundamentals.name,
            price: stock.price,
            change: stock.change,
            roe: fundamentals.roe,
            debtToEquity: fundamentals.debtToEquity,
            pe: fundamentals.pe,
            score: finalScore
        });
    });
    
    // 점수 기준 내림차순 정렬
    return scoredStocks.sort((a, b) => b.score - a.score);
}

// 피터 린치 기준 점수 계산
function calculateLynchScores(stocksData) {
    const scoredStocks = [];
    
    Object.keys(stocksData).forEach(symbol => {
        const stock = stocksData[symbol];
        const fundamentals = getStockFundamentals(symbol);
        
        // 린치의 지표에 따른 점수 계산
        let score = 0;
        
        // PEG 비율 (1 이하가 좋음)
        if (fundamentals.peg <= 0.5) {
            score += 30;
        } else if (fundamentals.peg <= 1.0) {
            score += 20;
        } else if (fundamentals.peg <= 1.5) {
            score += 10;
        }
        
        // 성장률 점수
        if (fundamentals.growthRate >= 20) {
            score += 30;
        } else if (fundamentals.growthRate >= 15) {
            score += 20;
        } else if (fundamentals.growthRate >= 10) {
            score += 10;
        } else if (fundamentals.growthRate >= 5) {
            score += 5;
        }
        
        // 부채 대비 현금 흐름
        if (fundamentals.debtToCashFlow < 1) {
            score += 20;
        } else if (fundamentals.debtToCashFlow < 3) {
            score += 10;
        } else if (fundamentals.debtToCashFlow < 5) {
            score += 5;
        }
        
        // 재고 회전율
        if (fundamentals.inventoryTurnover > 10) {
            score += 10;
        } else if (fundamentals.inventoryTurnover > 6) {
            score += 5;
        } else if (fundamentals.inventoryTurnover > 4) {
            score += 3;
        }
        
        // 주주 친화적 정책 (배당 성장률)
        if (fundamentals.dividendGrowth > 10) {
            score += 10;
        } else if (fundamentals.dividendGrowth > 5) {
            score += 5;
        } else if (fundamentals.dividendGrowth > 0) {
            score += 2;
        }
        
        // 최종 점수 계산 (100점 만점)
        const finalScore = Math.min(100, score);
        
        // 최신 가격 정보 추가
        scoredStocks.push({
            symbol: symbol,
            name: stock.name || fundamentals.name,
            price: stock.price,
            change: stock.change,
            growthRate: fundamentals.growthRate,
            peg: fundamentals.peg,
            debtToEbitda: fundamentals.debtToCashFlow,
            score: finalScore
        });
    });
    
    // 점수 기준 내림차순 정렬
    return scoredStocks.sort((a, b) => b.score - a.score);
}

// 벤자민 그레이엄 기준 점수 계산
function calculateGrahamScores(stocksData) {
    const scoredStocks = [];
    
    Object.keys(stocksData).forEach(symbol => {
        const stock = stocksData[symbol];
        const fundamentals = getStockFundamentals(symbol);
        
        // 그레이엄의 지표에 따른 점수 계산
        let score = 0;
        
        // P/B 비율 (1.5 이하가 좋음)
        if (fundamentals.pb <= 1.0) {
            score += 25;
        } else if (fundamentals.pb <= 1.5) {
            score += 15;
        } else if (fundamentals.pb <= 2.0) {
            score += 5;
        }
        
        // P/E 비율 (15 이하가 좋음)
        if (fundamentals.pe <= 10) {
            score += 25;
        } else if (fundamentals.pe <= 15) {
            score += 15;
        } else if (fundamentals.pe <= 20) {
            score += 5;
        }
        
        // 배당수익률
        if (fundamentals.dividend >= 4.0) {
            score += 20;
        } else if (fundamentals.dividend >= 2.0) {
            score += 10;
        } else if (fundamentals.dividend >= 1.0) {
            score += 5;
        }
        
        // 부채비율 (유동자산 대비 장기부채)
        if (fundamentals.debtToCurrentAssets < 0.5) {
            score += 15;
        } else if (fundamentals.debtToCurrentAssets < 1.0) {
            score += 10;
        } else if (fundamentals.debtToCurrentAssets < 1.5) {
            score += 5;
        }
        
        // 유동비율 (2 이상이 좋음)
        if (fundamentals.currentRatio >= 2.0) {
            score += 15;
        } else if (fundamentals.currentRatio >= 1.5) {
            score += 10;
        } else if (fundamentals.currentRatio >= 1.0) {
            score += 5;
        }
        
        // 최종 점수 계산 (100점 만점)
        const finalScore = Math.min(100, score);
        
        // 최신 가격 정보 추가
        scoredStocks.push({
            symbol: symbol,
            name: stock.name || fundamentals.name,
            price: stock.price,
            change: stock.change,
            pb: fundamentals.pb,
            pe: fundamentals.pe,
            dividend: fundamentals.dividend,
            score: finalScore
        });
    });
    
    // 점수 기준 내림차순 정렬
    return scoredStocks.sort((a, b) => b.score - a.score);
}

// 기본 점수 계산 (나머지 투자자들을 위한 함수)
function calculateDefaultScores(stocksData) {
    const scoredStocks = [];
    
    Object.keys(stocksData).forEach(symbol => {
        const stock = stocksData[symbol];
        const fundamentals = getStockFundamentals(symbol);
        
        // 기본 지표에 따른 점수 계산
        let score = 0;
        
        // ROE 점수
        if (fundamentals.roe >= 15) {
            score += 20;
        } else if (fundamentals.roe >= 10) {
            score += 15;
        } else if (fundamentals.roe >= 5) {
            score += 5;
        }
        
        // 성장률 점수
        if (fundamentals.growthRate >= 15) {
            score += 20;
        } else if (fundamentals.growthRate >= 10) {
            score += 15;
        } else if (fundamentals.growthRate >= 5) {
            score += 5;
        }
        
        // P/E 비율 점수
        if (fundamentals.pe <= 15) {
            score += 20;
        } else if (fundamentals.pe <= 20) {
            score += 15;
        } else if (fundamentals.pe <= 25) {
            score += 5;
        }
        
        // 배당 점수
        if (fundamentals.dividend >= 3.0) {
            score += 20;
        } else if (fundamentals.dividend >= 2.0) {
            score += 15;
        } else if (fundamentals.dividend >= 1.0) {
            score += 5;
        }
        
        // 부채 점수
        if (fundamentals.debtToEquity < 1.0) {
            score += 20;
        } else if (fundamentals.debtToEquity < 2.0) {
            score += 15;
        } else if (fundamentals.debtToEquity < 3.0) {
            score += 5;
        }
        
        // 최종 점수 계산 (100점 만점)
        const finalScore = Math.min(100, score);
        
        // 최신 가격 정보 추가
        scoredStocks.push({
            symbol: symbol,
            name: stock.name || fundamentals.name,
            price: stock.price,
            change: stock.change,
            score: finalScore
        });
    });
    
    // 점수 기준 내림차순 정렬
    return scoredStocks.sort((a, b) => b.score - a.score);
}

// 주식의 기본 재무 데이터 가져오기 (실제로는 API에서 가져와야 함)
function getStockFundamentals(symbol) {
    // 실제 프로덕션에서는 여기서 API 호출을 통해 기업 재무 데이터를 가져옴
    // 현재는 모의 데이터로 대체
    
    // 기본값 설정
    const fundamentals = {
        name: getFundamentalData(symbol, 'name', '알 수 없음'),
        roe: getFundamentalData(symbol, 'roe', 10),
        pe: getFundamentalData(symbol, 'pe', 20),
        pb: getFundamentalData(symbol, 'pb', 2.5),
        debtToEquity: getFundamentalData(symbol, 'debtToEquity', 1.5),
        growthRate: getFundamentalData(symbol, 'growthRate', 8),
        dividend: getFundamentalData(symbol, 'dividend', 1.5),
        earningsStability: getFundamentalData(symbol, 'earningsStability', 70),
        marketShare: getFundamentalData(symbol, 'marketShare', 10),
        inventoryTurnover: getFundamentalData(symbol, 'inventoryTurnover', 5),
        dividendGrowth: getFundamentalData(symbol, 'dividendGrowth', 4),
        debtToCashFlow: getFundamentalData(symbol, 'debtToCashFlow', 3),
        debtToCurrentAssets: getFundamentalData(symbol, 'debtToCurrentAssets', 1.2),
        currentRatio: getFundamentalData(symbol, 'currentRatio', 1.5),
        peg: getFundamentalData(symbol, 'peg', 1.2)
    };
    
    return fundamentals;
}

// 모의 데이터에서 특정 지표 값 가져오기
function getFundamentalData(symbol, metric, defaultValue) {
    if (marketData[symbol] && marketData[symbol][metric] !== undefined) {
        return marketData[symbol][metric];
    }
    
    // 기본 모의 데이터 (실제 API 연동 전까지 사용)
    const mockData = {
        'AAPL': { name: '애플', roe: 127.2, pe: 30.4, debtToEquity: 1.76, growthRate: 8.7, pb: 7.1, dividend: 0.5, peg: 1.5 },
        'BRK-B': { name: '버크셔 해서웨이', roe: 8.6, pe: 27.9, debtToEquity: 0.24, growthRate: 5.3, pb: 1.4, dividend: 0.0, peg: 2.1 },
        'KO': { name: '코카콜라', roe: 40.5, pe: 26.3, debtToEquity: 1.38, growthRate: 6.1, pb: 6.3, dividend: 2.93, peg: 2.0 },
        'SBUX': { name: '스타벅스', roe: 54.8, pe: 28.6, debtToEquity: 3.4, growthRate: 12.5, pb: 8.4, dividend: 2.1, peg: 0.9 },
        'COST': { name: '코스트코', roe: 30.2, pe: 47.1, debtToEquity: 0.43, growthRate: 8.7, pb: 11.2, dividend: 0.6, peg: 1.1 },
        'TGT': { name: '타겟', roe: 28.4, pe: 15.8, debtToEquity: 1.04, growthRate: 4.1, pb: 3.2, dividend: 2.4, peg: 1.8 }
        // 나머지 종목들에 대한 데이터도 추가
    };
    
    if (mockData[symbol] && mockData[symbol][metric] !== undefined) {
        return mockData[symbol][metric];
    }
    
    // 기본값 반환
    return defaultValue;
}

// 마켓 데이터 설정 (API 응답이나 캐시에서 데이터를 불러올 때 사용)
function setMarketData(data) {
    marketData = data;
}

// 특정 투자자의 추천 종목 실시간 업데이트
async function updateInvestorRecommendations(investorId, stockSymbols) {
    try {
        // 주식 데이터 가져오기 (StockAPI 활용)
        const stocksData = await window.StockAPI.fetchMultipleStocks(stockSymbols);
        
        // 투자자 데이터 가져오기
        const investor = window.investorsData[investorId];
        
        if (!investor) {
            throw new Error(`${investorId} 투자자 정보를 찾을 수 없습니다.`);
        }
        
        // 투자자의 지표에 따라 점수 계산
        const scoredStocks = calculateStockScores(investor, stocksData);
        
        // 상위 종목만 선택 (필요시)
        const topStocks = scoredStocks.slice(0, 20); // 상위 20개
        
        return topStocks;
    } catch (error) {
        console.error('추천 종목 업데이트 중 오류 발생:', error);
        return null;
    }
}

// 외부에서 사용할 함수들 내보내기
window.StockRanking = {
    calculateStockScores,
    updateInvestorRecommendations,
    setMarketData
};