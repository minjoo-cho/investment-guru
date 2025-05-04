// 마지막 업데이트 시간을 저장하기 위한 전역 변수
let lastPriceUpdate = null; 
let lastMetricsUpdate = null;

// 업데이트 간격 설정 (밀리초 단위)
const UPDATE_INTERVAL = {
    PRICE: 3 * 60 * 60 * 1000,  // 3시간
    METRICS: 24 * 60 * 60 * 1000 // 24시간
};

// 주식 데이터 업데이트 함수
async function updateStockData(forceUpdate = false) {
    const refreshButton = document.getElementById('refresh-button');
    const refreshIcon = refreshButton.querySelector('.refresh-icon');
    
    // 업데이트 시작 시 시각적 피드백
    refreshIcon.style.transform = 'rotate(360deg)';
    refreshButton.disabled = true;
    
    try {
        const now = new Date();
        
        // API가 로드되었는지 확인
        if (!window.StockAPI) {
            throw new Error('Stock API가 로드되지 않았습니다.');
        }
        
        // 주가 업데이트 필요 여부 확인
        const needPriceUpdate = forceUpdate || 
                               !lastPriceUpdate || 
                               (now - lastPriceUpdate) > UPDATE_INTERVAL.PRICE;
        
        // 투자 지표 업데이트 필요 여부 확인
        const needMetricsUpdate = forceUpdate || 
                                 !lastMetricsUpdate || 
                                 (now - lastMetricsUpdate) > UPDATE_INTERVAL.METRICS;
        
        // 업데이트가 필요한 경우에만 API 호출
        if (needPriceUpdate || needMetricsUpdate) {
            console.log(`데이터 업데이트 시작 - 주가: ${needPriceUpdate ? '예' : '아니오'}, 지표: ${needMetricsUpdate ? '예' : '아니오'}`);
            
            // 각 투자자별 맞춤형 종목 데이터 가져오기
            const updatePromises = investors.map(async (investor) => {
                try {
                    // 투자자별 지표에 맞는 종목 가져오기 (파라미터로 업데이트 유형 전달)
                    const stocks = await window.StockAPI.getStocksByInvestor(
                        investor.id,
                        needPriceUpdate,
                        needMetricsUpdate
                    );
                    
                    // 상위 3개 종목만 선택하여 투자자 데이터 업데이트
                    investor.topStocks = stocks.slice(0, 3);
                    
                    return true;
                } catch (error) {
                    console.error(`${investor.name} 종목 데이터 가져오기 오류:`, error);
                    return false;
                }
            });
            
            // 모든 업데이트 작업 완료 대기
            const results = await Promise.all(updatePromises);
            const allSuccessful = results.every(result => result === true);
            
            // 마지막 업데이트 시간 기록
            if (needPriceUpdate) {
                lastPriceUpdate = now;
                const nextPriceUpdate = new Date(now.getTime() + UPDATE_INTERVAL.PRICE);
                console.log(`주가 데이터가 업데이트되었습니다. 다음 업데이트: ${nextPriceUpdate.toLocaleTimeString()}`);
            }
            
            if (needMetricsUpdate) {
                lastMetricsUpdate = now;
                const nextMetricsUpdate = new Date(now.getTime() + UPDATE_INTERVAL.METRICS);
                console.log(`투자 지표가 업데이트되었습니다. 다음 업데이트: ${nextMetricsUpdate.toLocaleTimeString()}`);
            }
            
            // UI 업데이트
            renderInvestorCards();
            updateLastUpdatedTime();
            
            console.log(`주식 데이터 업데이트 완료. ${allSuccessful ? '모든 업데이트 성공' : '일부 업데이트 실패'}`);
        } else {
            console.log('최근에 업데이트되어 새로운 데이터를 가져오지 않았습니다.');
            
            if (lastPriceUpdate) {
                const nextPriceUpdate = new Date(lastPriceUpdate.getTime() + UPDATE_INTERVAL.PRICE);
                console.log(`다음 주가 업데이트: ${nextPriceUpdate.toLocaleTimeString()}`);
            }
            
            if (lastMetricsUpdate) {
                const nextMetricsUpdate = new Date(lastMetricsUpdate.getTime() + UPDATE_INTERVAL.METRICS);
                console.log(`다음 지표 업데이트: ${nextMetricsUpdate.toLocaleTimeString()}`);
            }
        }
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
        alert('주식 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 새로고침 버튼 복원
        setTimeout(() => {
            refreshIcon.style.transform = 'rotate(0deg)';
            refreshButton.disabled = false;
        }, 500);
    }
}

// 마지막 업데이트 시간 표시 (주가, 지표 업데이트 시간 모두 표시)
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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 초기 카드 렌더링
    renderInvestorCards();
    
    // 초기 시간 설정
    updateLastUpdatedTime();
    
    // API 키 설정 (실제 API 키로 변경 필요)
    if (window.StockAPI) {
        window.StockAPI.setApiKey('YOUR_API_KEY_HERE');
    }
    
    // 새로고침 버튼 이벤트
    document.getElementById('refresh-button').addEventListener('click', () => {
        updateStockData(true); // 강제 업데이트
    });
    
    // 페이지 로드 후 데이터 가져오기
    setTimeout(() => {
        updateStockData();
    }, 1000);
    
    // 5분마다 자동 업데이트 확인
    setInterval(() => {
        updateStockData(false); // 필요할 때만 업데이트
    }, 5 * 60 * 1000);
});