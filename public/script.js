let investors = [];
let lastUpdated = new Date();

// 토스트 메시지 함수
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

// 초기 목 데이터 생성 (API 실패/지연 시 즉시 표시용)
function generateInitialMockStocks(symbol, name) {
    return {
        symbol: symbol || 'AAPL',
        name: name || 'Apple Inc.',
        price: 100 + Math.random() * 900,
        change: (Math.random() * 10 - 5).toFixed(2),
        roe: (Math.random() * 30).toFixed(1),
        debtToEquity: (Math.random() * 2).toFixed(2),
        pe: (Math.random() * 40 + 5).toFixed(1),
        score: Math.floor(Math.random() * 40 + 60),
        lastUpdated: new Date(),
        isMock: true
    };
}

// 주식 말풍선 HTML 생성 함수 (캐시 시간 표시)
function createStockBubble(stocks) {
    let bubbleHTML = `<div class="stock-bubble"><h4>추천 종목 Top 3</h4><ul>`;
    if (!stocks || stocks.length === 0) {
        bubbleHTML += `<li><div class="stock-name">데이터 로드 중...</div></li>`;
    } else {
        stocks.forEach(stock => {
            const changeClass = stock.change > 0 ? 'up' : stock.change < 0 ? 'down' : '';
            const changeSymbol = stock.change > 0 ? '+' : '';
            bubbleHTML += `
                <li>
                    <div class="stock-name">${stock.symbol}: ${stock.name}</div>
                    <div class="stock-price">$${stock.price?.toFixed(2) || '-'} 
                        <span class="${changeClass}">${changeSymbol}${stock.change}%</span>
                        <small style="color:#888;">(${timeSince(stock.lastUpdated)} 데이터)</small>
                        ${stock.isMock ? '<small style="color:#d9534f;">[목]</small>' : ''}
                    </div>
                </li>
            `;
        });
    }
    bubbleHTML += `</ul></div>`;
    return bubbleHTML;
}

// 캐시에서 이전 데이터 불러오기
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

// 캐시에 데이터 저장
function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        sessionStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
}

// 투자자 카드 렌더링 함수
function renderInvestorCards() {
    const investorGrid = document.getElementById('investor-grid');
    if (!investorGrid) {
        console.error('investor-grid 요소를 찾을 수 없습니다.');
        return;
    }
    investorGrid.innerHTML = '';
    if (!investors || investors.length === 0) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-container';
        loadingDiv.innerHTML = '<div class="loading-spinner"></div><p>투자자 데이터를 불러오는 중입니다...</p>';
        investorGrid.appendChild(loadingDiv);
        return;
    }
    investors.forEach(investor => {
        if (!investor || typeof investor !== 'object') return;
        const card = document.createElement('div');
        card.className = 'investor-card';
        card.dataset.id = investor.id || '';
        if (!investor.topStocks || investor.topStocks.length === 0) {
            investor.topStocks = [
                generateInitialMockStocks('AAPL', 'Apple Inc.'),
                generateInitialMockStocks('MSFT', 'Microsoft Corp'),
                generateInitialMockStocks('GOOGL', 'Alphabet Inc')
            ];
        }
        const stockBubbleHTML = createStockBubble(investor.topStocks);
        card.innerHTML = `
            ${stockBubbleHTML}
            <img src="${investor.image || '/images/default-investor.png'}" alt="${investor.name || '투자자'}" loading="lazy">
            <h3>${investor.name || '투자자'}</h3>
            <p>${investor.philosophy || '투자 철학 정보가 없습니다.'}</p>
            <p class="quote">"${investor.quote || '인용구 정보가 없습니다.'}"</p>
            <button>상세 보기 <span>→</span></button>
        `;
        card.addEventListener('mouseenter', function() {
            const bubble = this.querySelector('.stock-bubble');
            if (bubble) bubble.style.display = 'block';
        });
        card.addEventListener('mouseleave', function() {
            const bubble = this.querySelector('.stock-bubble');
            if (bubble) bubble.style.display = 'none';
        });
        const button = card.querySelector('button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = `investor/?id=${investor.id || ''}`;
            });
        }
        investorGrid.appendChild(card);
    });
}

// 마지막 업데이트 시간 표시 함수
function updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        lastUpdated = now;
        lastUpdatedElement.textContent = now.toLocaleTimeString();
    }
}

// 주식 데이터 업데이트 함수 (토스트/캐시/에러 대응)
async function updateStockData(forceUpdate = false) {
    try {
        const now = new Date();
        if (!forceUpdate && (now - lastUpdated < 5 * 60 * 1000)) {
            return;
        }
        if (!investors || investors.length === 0) {
            investors = window.InvestorData.getInvestorsForMainPage();
        }
        // 캐시 우선 표시
        investors.forEach(investor => {
            if (!investor) return;
            const cached = getCachedStocks(investor.id);
            if (cached && cached.length > 0) {
                investor.topStocks = cached.slice(0, 3);
                renderInvestorCards();
            } else if (!investor.topStocks || investor.topStocks.length === 0) {
                investor.topStocks = [
                    generateInitialMockStocks('AAPL', 'Apple Inc.'),
                    generateInitialMockStocks('MSFT', 'Microsoft Corp'),
                    generateInitialMockStocks('GOOGL', 'Alphabet Inc')
                ];
                renderInvestorCards();
            }
        });
        // 각 투자자별 주식 데이터 업데이트 (비동기)
        investors.forEach(async (investor) => {
            if (!investor) return;
            try {
                const stocks = await window.StockAPI.getStocksByInvestor(investor.id);
                if (stocks && stocks.length > 0) {
                    investor.topStocks = stocks.slice(0, 3);
                    setCachedStocks(investor.id, stocks);
                    renderInvestorCards();
                }
            } catch (error) {
                showToast(`${investor?.name || 'Unknown'}의 최신 데이터를 가져올 수 없습니다. 캐시/목데이터를 표시합니다.`, 'error');
            }
        });
        updateLastUpdatedTime();
    } catch (error) {
        showToast('최신 데이터를 가져올 수 없습니다. 캐시/목데이터를 표시합니다.', 'error');
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!window.InvestorData) throw new Error('InvestorData API가 로드되지 않았습니다.');
        investors = window.InvestorData.getInvestorsForMainPage();
        investors = investors.map(investor => ({
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            topStocks: investor.topStocks || [],
            ...investor
        }));
        investors.forEach(investor => {
            if (!investor.topStocks || investor.topStocks.length === 0) {
                investor.topStocks = [
                    generateInitialMockStocks('AAPL', 'Apple Inc.'),
                    generateInitialMockStocks('MSFT', 'Microsoft Corp'),
                    generateInitialMockStocks('GOOGL', 'Alphabet Inc')
                ];
            }
        });
        renderInvestorCards();
        updateLastUpdatedTime();
        const refreshButton = document.getElementById('refresh-button');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => updateStockData(true));
        }
        setTimeout(() => { updateStockData(); }, 100);
        setInterval(updateStockData, 5 * 60 * 1000);
    } catch (error) {
        showToast('초기 로딩 오류: ' + error.message, 'error');
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-container">
                    <h2>데이터를 불러올 수 없습니다</h2>
                    <p>${error.message}</p>
                    <p>잠시 후 다시 시도해주세요.</p>
                    <button onclick="location.reload()">다시 시도</button>
                </div>
            `;
        }
    }
});

