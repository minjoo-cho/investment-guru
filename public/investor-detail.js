// URL에서 투자자 ID 가져오기
function getInvestorIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'warren-buffett';
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
    document.getElementById('strategy-content').innerHTML = investor.strategy;

    if (window.StockAPI) {
        window.StockAPI.setApiKey('YOUR_API_KEY_HERE'); // 실제 API 키로 변경
    }

    updateLastUpdatedTime();

    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            refreshStockData(investor);
        });
    }

    try {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.style.display = 'block';

        const stocks = await window.InvestorData.getInvestorStocksData(investorId);
        renderStockTable(investor.stockColumns, stocks);

        if (loadingElement) loadingElement.style.display = 'none';
    } catch (error) {
        console.error('주식 데이터 로딩 중 오류 발생:', error);
        showErrorMessage("주식 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
        const loadingElement = document.getElementById('loading');
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

// 프로필/상세/배경/지표 렌더링 함수(생략, 기존과 동일)

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

function renderTableBody(columns, stocks) {
    const tableBody = document.getElementById('table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = columns.length + 1;
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

// 나머지 함수(프로필, 상세, 배경, 지표, 정렬, 새로고침, 오류 등)는 기존 코드 그대로 사용

document.addEventListener('DOMContentLoaded', initializeInvestorPage);
