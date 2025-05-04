// 마지막 업데이트 시간을 추적하기 위한 전역 변수
let lastPriceUpdate = null;
let lastMetricsUpdate = null;

/**
 * 모든 투자자에 대한 주식 데이터를 새로고침 간격에 따라 업데이트합니다
 * @param {boolean} forceUpdate - true인 경우 시간 간격에 관계없이 강제 업데이트
 */
async function updateStockData(forceUpdate = false) {
    const refreshButton = document.getElementById('refresh-button');
    const refreshIcon = refreshButton.querySelector('.refresh-icon');
    
    // 업데이트 진행 중 시각적 피드백
    refreshIcon.style.transform = 'rotate(360deg)';
    refreshButton.disabled = true;
    
    try {
        const now = new Date();
        
        // API 가용성 확인
        if (!window.StockAPI) {
            throw new Error('Stock API가 로드되지 않았습니다.');
        }
        
        // 구성된 간격에 따라 업데이트 필요 여부 결정
        const PRICE_UPDATE_INTERVAL = 3 * 60 * 60 * 1000; // 3시간
        const METRICS_UPDATE_INTERVAL = 24 * 60 * 60 * 1000; // 24시간
        
        const needPriceUpdate = forceUpdate || 
                               !lastPriceUpdate || 
                               (now - lastPriceUpdate) > PRICE_UPDATE_INTERVAL;
        
        const needMetricsUpdate = forceUpdate || 
                                 !lastMetricsUpdate || 
                                 (now - lastMetricsUpdate) > METRICS_UPDATE_INTERVAL;
        
        // 필요할 때만 업데이트
        if (needPriceUpdate || needMetricsUpdate) {
            // 업데이트 시작 로그
            console.log(`데이터 업데이트 시작 - 주가: ${needPriceUpdate ? '예' : '아니오'}, 지표: ${needMetricsUpdate ? '예' : '아니오'}`);
            
            // 모든 투자자를 동시에 처리
            const updatePromises = investors.map(async (investor) => {
                try {
                    // 투자자의 전략에 따라 주식 가져오기
                    const stocks = await window.StockAPI.getStocksByInvestor(
                        investor.id,
                        needPriceUpdate,
                        needMetricsUpdate
                    );
                    
                    // 추천 상위 3개 주식으로 업데이트
                    investor.topStocks = stocks.slice(0, 3);
                    return true;
                } catch (error) {
                    console.error(`${investor.name} 종목 데이터 가져오기 오류:`, error);
                    return false;
                }
            });
            
            // 모든 투자자 업데이트가 완료될 때까지 대기
            const results = await Promise.all(updatePromises);
            const allSuccessful = results.every(result => result === true);
            
            // 성공적인 업데이트에 대한 타임스탬프 업데이트
            if (needPriceUpdate) {
                lastPriceUpdate = now;
                const nextUpdate = new Date(now.getTime() + PRICE_UPDATE_INTERVAL);
                console.log(`주가 데이터가 업데이트되었습니다. 다음 업데이트: ${nextUpdate.toLocaleTimeString()}`);
            }
            
            if (needMetricsUpdate) {
                lastMetricsUpdate = now;
                const nextUpdate = new Date(now.getTime() + METRICS_UPDATE_INTERVAL);
                console.log(`투자 지표가 업데이트되었습니다. 다음 업데이트: ${nextUpdate.toLocaleTimeString()}`);
            }
            
            // 새 데이터로 UI 업데이트
            renderInvestorCards();
            updateLastUpdatedTime();
            
            console.log(`주식 데이터 업데이트 완료. ${allSuccessful ? '모든 업데이트 성공' : '일부 업데이트 실패'}`);
        } else {
            console.log('최근에 업데이트되어 새로운 데이터를 가져오지 않았습니다.');
            
            if (lastPriceUpdate) {
                const nextPriceUpdate = new Date(lastPriceUpdate.getTime() + PRICE_UPDATE_INTERVAL);
                console.log(`다음 주가 업데이트: ${nextPriceUpdate.toLocaleTimeString()}`);
            }
            
            if (lastMetricsUpdate) {
                const nextMetricsUpdate = new Date(lastMetricsUpdate.getTime() + METRICS_UPDATE_INTERVAL);
                console.log(`다음 지표 업데이트: ${nextMetricsUpdate.toLocaleTimeString()}`);
            }
        }
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
        alert('주식 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 업데이트 시도 후 UI 재설정(애니메이션을 위한 약간의 지연)
        setTimeout(() => {
            refreshIcon.style.transform = 'rotate(0deg)';
            refreshButton.disabled = false;
        }, 500);
    }
}

/**
 * 마지막 업데이트 타임스탬프로 UI 업데이트
 */
function updateLastUpdatedTime() {
    const now = new Date();
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    };
    
    let timeText = `마지막 UI 업데이트: ${now.toLocaleTimeString(undefined, options)}`;
    
    if (lastPriceUpdate) {
        timeText += ` | 주가: ${lastPriceUpdate.toLocaleTimeString(undefined, options)}`;
    }
    
    if (lastMetricsUpdate) {
        timeText += ` | 지표: ${lastMetricsUpdate.toLocaleTimeString(undefined, options)}`;
    }
    
    document.getElementById('last-updated').textContent = timeText;
}