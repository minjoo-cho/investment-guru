// URL에서 투자자 ID 가져오기
function getInvestorIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'warren-buffett';
}

// 캐시에서 이전 데이터 불러오기
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

// 캐시에 데이터 저장
function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        localStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
}

// 페이지 초기화
async function initializeInvestorPage() {
    const investorId = getInvestorIdFromUrl();

    if (!window.InvestorData) {
        showErrorMessage("투자자 데이터 API가 로드되지 않았습니다.");
        return;
    }

    const investor = window.InvestorData.getInvestorData(investorId);
    if (!investor) {
        showErrorMessage("투자자 정보를 찾을 수 없습니다.");
        return;
    }

    setInvestorProfileInfo(investor);
    setInvestorDetailInfo(investor);
    setInvestorBackgroundImage(investor);
    renderMetrics(investor.metrics);
    
    // 전략 정보가 없는 경우 기본 메시지 표시
    const strategyContent = document.getElementById('strategy-content');
    if (strategyContent) {
        strategyContent.innerHTML = investor.strategy || '투자 전략 정보가 없습니다.';
    }

    if (window.StockAPI) {
        window.StockAPI.setApiKey('YOUR_API_KEY_HERE'); // 실제 API 키로 교체
    }

    updateLastUpdatedTime();

    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            refreshStockData(investor);
        });
    }

    // 캐시 또는 기본 목 데이터를 먼저 표시
    let initialStocks = getCachedStocks(investorId);
    if (!initialStocks || initialStocks.length === 0) {
        // 캐시에 없으면 기본 목 데이터 생성
        initialStocks = generateDefaultMockStocks(investorId);
        showInfoMessage("초기 데이터로 표시 중입니다. 최신 데이터 로딩 중...");
    } else {
        showInfoMessage("캐시된 데이터로 표시 중입니다. 최신 데이터 로딩 중...");
    }
    
    renderStockTable(investor.stockColumns, initialStocks);

    try {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.style.display = 'block';

        // 실제 API 호출로 최신 데이터 시도
        const stocks = await window.InvestorData.getInvestorStocksData(investorId);
        if (stocks && stocks.length > 0) {
            renderStockTable(investor.stockColumns, stocks);
            setCachedStocks(investorId, stocks);
            hideInfoMessage();
        }

        if (loadingElement) loadingElement.style.display = 'none';
    } catch (error) {
        console.error('주식 데이터 로딩 중 오류 발생:', error);
        showErrorMessage("API 데이터를 가져오는 중 오류가 발생했습니다. 이전 데이터로 표시합니다.");
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

// 기본 목 데이터 생성
function generateDefaultMockStocks(investorId) {
    const defaultStocks = {
        'warren-buffett': [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.5, roe: 42.3, debtToEquity: 0.4, pe: 29.8, score: 92, isMock: true, lastUpdated: new Date() },
            { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, roe: 35.7, debtToEquity: 0.6, pe: 25.1, score: 87, isMock: true, lastUpdated: new Date() },
            { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roe: 10.5, debtToEquity: 0.2, pe: 15.8, score: 90, isMock: true, lastUpdated: new Date() },
            { symbol: 'BAC', name: 'Bank of America', price: 38.75, change: -0.2, roe: 12.3, debtToEquity: 1.2, pe: 11.5, score: 84, isMock: true, lastUpdated: new Date() },
            { symbol: 'AXP', name: 'American Express', price: 235.40, change: 0.5, roe: 28.1, debtToEquity: 0.9, pe: 18.3, score: 86, isMock: true, lastUpdated: new Date() },
            { symbol: 'MCO', name: 'Moody\'s Corp', price: 385.20, change: 0.3, roe: 65.2, debtToEquity: 1.1, pe: 31.2, score: 85, isMock: true, lastUpdated: new Date() },
            { symbol: 'AMZN', name: 'Amazon.com Inc', price: 185.40, change: 2.1, roe: 22.5, debtToEquity: 0.5, pe: 42.3, score: 83, isMock: true, lastUpdated: new Date() },
            { symbol: 'CVX', name: 'Chevron Corp', price: 155.30, change: -0.8, roe: 15.3, debtToEquity: 0.3, pe: 12.8, score: 82, isMock: true, lastUpdated: new Date() },
            { symbol: 'OXY', name: 'Occidental Petroleum', price: 62.45, change: -1.2, roe: 18.7, debtToEquity: 0.8, pe: 10.5, score: 81, isMock: true, lastUpdated: new Date() },
            { symbol: 'VZ', name: 'Verizon Communications', price: 42.85, change: 0.1, roe: 25.3, debtToEquity: 1.3, pe: 8.7, score: 80, isMock: true, lastUpdated: new Date() }
        ],
        // 다른 투자자 기본 데이터...
    };
    
    if (defaultStocks[investorId]) {
        return defaultStocks[investorId];
    }
    
    // 기본 데이터가 없으면 생성
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'JNJ', 'V'];
    const names = [
        'Apple Inc.', 'Microsoft Corp', 'Alphabet Inc', 'Amazon.com Inc', 
        'Meta Platforms Inc', 'Tesla Inc', 'NVIDIA Corp', 'JPMorgan Chase', 
        'Johnson & Johnson', 'Visa Inc'
    ];
    
    return symbols.map((symbol, index) => ({
        symbol: symbol,
        name: names[index] || `Company ${symbol}`,
        price: 100 + Math.random() * 900,
        change: (Math.random() * 10 - 5).toFixed(2),
        roe: (Math.random() * 30).toFixed(1),
        debtToEquity: (Math.random() * 2).toFixed(2),
        pe: (Math.random() * 40 + 5).toFixed(1),
        score: Math.floor(Math.random() * 40 + 60),
        lastUpdated: new Date(),
        isMock: true
    })).sort((a, b) => b.score - a.score);
}

// 안내 메시지 표시
function showInfoMessage(msg) {
    let infoDiv = document.getElementById('info-message');
    if (!infoDiv) {
        infoDiv = document.createElement('div');
        infoDiv.id = 'info-message';
        infoDiv.style.color = '#888';
        infoDiv.style.fontSize = '13px';
        infoDiv.style.margin = '8px 0';
        infoDiv.style.padding = '4px 8px';
        infoDiv.style.backgroundColor = '#f8f9fa';
        infoDiv.style.borderRadius = '4px';
        const target = document.querySelector('.stock-table-container') || document.querySelector('.stocks-section') || document.body;
        target.insertBefore(infoDiv, target.firstChild);
    }
    infoDiv.textContent = msg;
    infoDiv.style.display = 'block';
}

// 안내 메시지 숨기기
function hideInfoMessage() {
    const infoDiv = document.getElementById('info-message');
    if (infoDiv) {
        infoDiv.style.display = 'none';
    }
}

// 오류 메시지 표시
function showErrorMessage(msg) {
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = '#d9534f';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.padding = '8px 12px';
        errorDiv.style.backgroundColor = '#f8d7da';
        errorDiv.style.borderRadius = '4px';
        const target = document.querySelector('.stock-table-container') || document.querySelector('.stocks-section') || document.body;
        target.insertBefore(errorDiv, target.firstChild);
    }
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
}

// 오류 메시지 숨기기
function hideErrorMessage() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// 투자자 프로필 정보 설정
function setInvestorProfileInfo(investor) {
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = investor.name || '투자자';
    
    const profileFullName = document.getElementById('profile-full-name');
    if (profileFullName) profileFullName.textContent = investor.fullName || '';
    
    const profileCompany = document.getElementById('profile-company');
    if (profileCompany) profileCompany.textContent = investor.company || '';
    
    const profilePhilosophy = document.getElementById('profile-philosophy');
    if (profilePhilosophy) profilePhilosophy.textContent = investor.philosophy || '';
}

// 투자자 상세 정보 설정
function setInvestorDetailInfo(investor) {
    const birthInfo = document.getElementById('birth-info');
    if (birthInfo) {
        if (investor.deathYear) {
            birthInfo.textContent = `${investor.birthYear || '?'} - ${investor.deathYear || '?'}`;
        } else {
            birthInfo.textContent = investor.birthYear || '정보 없음';
        }
    }
    
    const quoteText = document.getElementById('quote-text');
    if (quoteText) quoteText.textContent = investor.quote || '인용구 정보가 없습니다.';
}

// 투자자 배경 이미지 설정
function setInvestorBackgroundImage(investor) {
    const bgImage = document.getElementById('investor-banner');
    if (bgImage && investor.imageBackground) {
        bgImage.style.backgroundImage = `url(${investor.imageBackground})`;
    }
}

// 투자자 지표 렌더링
function renderMetrics(metrics) {
    const metricsContainer = document.getElementById('metrics-container');
    if (!metricsContainer) return;
    
    metricsContainer.innerHTML = '';
    
    if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
        metricsContainer.innerHTML = '<p>투자 지표 정보가 없습니다.</p>';
        return;
    }
    
    metrics.forEach(metric => {
        const metricBox = document.createElement('div');
        metricBox.className = 'metric-box';
        
        metricBox.innerHTML = `
            <h3>${metric.name} <span>(${metric.weight}%)</span></h3>
            <p>${metric.description || '설명 정보가 없습니다.'}</p>
        `;
        
        metricsContainer.appendChild(metricBox);
    });
}

// 주식 테이블 렌더링
function renderStockTable(columns, stocks) {
    const tableHead = document.getElementById('table-head');
    if (!tableHead) return;
    tableHead.innerHTML = '';

    if (!columns || !Array.isArray(columns)) return;

    const headerRow = document.createElement('tr');
    columns.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column.name;
        if (column.highlight) th.classList.add('highlighted');
        headerRow.appendChild(th);
    });
    
    // 데이터 출처 칼럼 추가
    const infoTh = document.createElement('th');
    infoTh.textContent = '데이터 출처';
    headerRow.appendChild(infoTh);

    tableHead.appendChild(headerRow);

    renderTableBody(columns, stocks);
}

// 주식 테이블 바디 렌더링
function renderTableBody(columns, stocks) {
    const tableBody = document.getElementById('table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = columns.length + 1; // +1: 데이터 출처 칼럼
        emptyCell.textContent = '데이터를 불러오는 중입니다...';
        emptyCell.className = 'empty-message';
        emptyRow.appendChild(emptyCell);
        tableBody.appendChild(emptyRow);
        return;
    }

    const sortedStocks = [...stocks].sort((a, b) => b.score - a.score);

    sortedStocks.forEach((stock, index) => {
        const row = document.createElement('tr');
        columns.forEach(column => {
            const cell = document.createElement('td');
            if (column.id === 'rank') cell.textContent = index + 1;
            else if (column.id === 'change') {
                const changeValue = stock[column.id];
                if (changeValue !== undefined) {
                    cell.innerHTML = `<span class="${changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : ''}">
                        ${changeValue > 0 ? '+' : ''}${changeValue}%</span>`;
                } else cell.textContent = '-';
            } else if (column.id === 'price') {
                cell.textContent = stock[column.id]
                    ? `$${stock[column.id].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                    : '-';
            } else if (['dividend', 'volatility', 'growthRate', 'roe', 'roic'].includes(column.id)) {
                cell.textContent = stock[column.id] ? `${stock[column.id]}%` : '-';
            } else if (column.id === 'score') {
                cell.textContent = stock[column.id] !== undefined ? stock[column.id] : '-';
                cell.classList.add('score-cell');
            } else {
                cell.textContent = stock[column.id] !== undefined ? stock[column.id] : '-';
            }
            if (column.highlight) cell.classList.add('highlighted');
            row.appendChild(cell);
        });

        // 데이터 출처 및 업데이트 시각 칼럼
        const infoCell = document.createElement('td');
        infoCell.style.fontSize = '11px';
        infoCell.style.color = stock.isMock ? '#d9534f' : '#5cb85c';
        infoCell.textContent = stock.isMock ? '목 데이터' : '실제';
        if (stock.lastUpdated) {
            const timeSpan = document.createElement('span');
            timeSpan.style.marginLeft = '5px';
            timeSpan.style.color = '#888';
            const updated = new Date(stock.lastUpdated);
            timeSpan.textContent = `(${updated.toLocaleTimeString()})`;
            infoCell.appendChild(timeSpan);
        }
        row.appendChild(infoCell);

        tableBody.appendChild(row);
    });
}

// 마지막 업데이트 시간 표시
function updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = new Date().toLocaleTimeString();
    }
}

// 주식 데이터 새로고침
async function refreshStockData(investor) {
    try {
        showInfoMessage("데이터 새로고침 중...");
        hideErrorMessage();
        
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.style.display = 'block';
        
        const stocks = await window.InvestorData.getInvestorStocksData(investor.id);
        renderStockTable(investor.stockColumns, stocks);
        setCachedStocks(investor.id, stocks);
        updateLastUpdatedTime();
        
        hideInfoMessage();
        if (loadingElement) loadingElement.style.display = 'none';
    } catch (error) {
        console.error('주식 데이터 새로고침 중 오류:', error);
        showErrorMessage("새로고침 중 오류가 발생했습니다. 이전 데이터를 유지합니다.");
        
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', initializeInvestorPage);
