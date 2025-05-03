// URL에서 투자자 ID 가져오기
function getInvestorIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'warren-buffett'; // 기본값은 워렌 버핏
}

// 페이지 초기화
function initializeInvestorPage() {
    const investorId = getInvestorIdFromUrl();
    const investor = investorsData[investorId];
    
    if (!investor) {
        showErrorMessage("투자자 정보를 찾을 수 없습니다.");
        return;
    }
    
    // 투자자 프로필 정보 설정
    document.getElementById('investor-image').src = investor.image;
    document.getElementById('investor-image').alt = investor.name;
    document.getElementById('investor-name').textContent = investor.name;
    document.getElementById('investor-philosophy').textContent = investor.philosophy;
    document.getElementById('investor-quote').textContent = `"${investor.quote}"`;
    
    // 주요 투자 지표 렌더링
    renderMetrics(investor.metrics);
    
    // 추천 종목 테이블 렌더링
    renderStockTable(investor.stockColumns, investor.stocks);
    
    // 투자 전략 내용 렌더링
    document.getElementById('strategy-content').innerHTML = investor.strategy;
    
    // 마지막 업데이트 시간 표시
    updateLastUpdatedTime();
    
    // 새로고침 버튼 이벤트 설정
    document.getElementById('refresh-button').addEventListener('click', function() {
        refreshStockData(investor);
    });
}

// 투자 지표 렌더링
function renderMetrics(metrics) {
    const metricsGrid = document.getElementById('metrics-grid');
    metricsGrid.innerHTML = '';
    
    metrics.forEach(metric => {
        const metricCard = document.createElement('div');
        metricCard.className = 'metric-card';
        metricCard.innerHTML = `
            <h4>${metric.name}</h4>
            <p>${metric.description}</p>
        `;
        metricsGrid.appendChild(metricCard);
    });
}

// 주식 테이블 렌더링
function renderStockTable(columns, stocks) {
    // 테이블 헤더 생성
    const tableHead = document.getElementById('table-head');
    tableHead.innerHTML = '';
    
    const headerRow = document.createElement('tr');
    columns.forEach((column, index) => {
        const th = document.createElement('th');
        
        if (column.sortable) {
            th.innerHTML = `
                <div class="sort-header">
                    ${column.name}
                    <span class="sort-icon">↕</span>
                </div>
            `;
            th.dataset.field = column.id;
            th.addEventListener('click', () => sortTable(column.id));
        } else {
            th.textContent = column.name;
        }
        
        if (column.highlight) {
            th.classList.add('highlighted');
        }
        
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);
    
    // 테이블 내용 생성
    renderTableBody(columns, stocks);
}

// 테이블 내용 렌더링
function renderTableBody(columns, stocks) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    // 종합점수 기준으로 정렬하여 순위 계산
    const sortedStocks = [...stocks].sort((a, b) => b.score - a.score);
    
    sortedStocks.forEach((stock, index) => {
        const row = document.createElement('tr');
        
        columns.forEach(column => {
            const cell = document.createElement('td');
            
            if (column.id === 'rank') {
                cell.textContent = index + 1;
            } else if (column.id === 'change') {
                const changeValue = stock[column.id];
                cell.innerHTML = `
                    <span class="${changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : ''}">
                        ${changeValue > 0 ? '+' : ''}${changeValue}%
                    </span>
                `;
            } else if (column.id === 'price') {
                cell.textContent = `$${stock[column.id].toLocaleString()}`;
            } else if (column.id === 'dividend') {
                cell.textContent = `${stock[column.id]}%`;
            } else if (column.id === 'score') {
                cell.textContent = stock[column.id];
                cell.classList.add('score-cell');
            } else {
                cell.textContent = stock[column.id] !== undefined ? stock[column.id] : '-';
            }
            
            if (column.highlight) {
                cell.classList.add('highlighted');
            }
            
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
    });
}

// 테이블 정렬 기능
function sortTable(field) {
    const investor = investorsData[getInvestorIdFromUrl()];
    const stocks = [...investor.stocks];
    
    // 현재 정렬 상태 확인
    const th = document.querySelector(`th[data-field="${field}"]`);
    const currentSort = th.dataset.sort || 'none';
    
    // 모든 헤더의 정렬 상태 초기화
    document.querySelectorAll('th[data-field]').forEach(header => {
        header.dataset.sort = 'none';
        header.querySelector('.sort-icon').textContent = '↕';
    });
    
    // 새로운 정렬 방향 설정
    let newSort;
    if (currentSort === 'none' || currentSort === 'desc') {
        newSort = 'asc';
        th.querySelector('.sort-icon').textContent = '↑';
        stocks.sort((a, b) => {
            if (field === 'rank') return 0; // 순위는 별도 처리
            if (typeof a[field] === 'string') return a[field].localeCompare(b[field]);
            return a[field] - b[field];
        });
    } else {
        newSort = 'desc';
        th.querySelector('.sort-icon').textContent = '↓';
        stocks.sort((a, b) => {
            if (field === 'rank') return 0; // 순위는 별도 처리
            if (typeof a[field] === 'string') return b[field].localeCompare(a[field]);
            return b[field] - a[field];
        });
    }
    
    th.dataset.sort = newSort;
    
    // 정렬된 데이터로 테이블 다시 렌더링
    renderTableBody(investor.stockColumns, stocks);
}

// 주식 데이터 새로고침
async function refreshStockData(investor) {
    const refreshButton = document.getElementById('refresh-button');
    const refreshIcon = refreshButton.querySelector('.refresh-icon');
    
    refreshIcon.style.transform = 'rotate(360deg)';
    refreshButton.disabled = true;
    
    // 실제로는 여기서 API를 호출하여 최신 데이터를 가져옴
    // 지금은 모의 데이터로 랜덤 변화를 줌
    const updatedStocks = investor.stocks.map(stock => {
        const randomChange = (Math.random() * 2 - 1) * 2; // -2 ~ +2% 범위
        const newPrice = stock.price * (1 + randomChange / 100);
        
        return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(randomChange.toFixed(1))
        };
    });
    
    // 테이블 업데이트
    renderTableBody(investor.stockColumns, updatedStocks);
    updateLastUpdatedTime();
    
    // 새로고침 버튼 복원
    setTimeout(() => {
        refreshIcon.style.transform = 'rotate(0deg)';
        refreshButton.disabled = false;
    }, 500);
}

// 마지막 업데이트 시간 표시
function updateLastUpdatedTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    document.getElementById('last-updated').textContent = formattedTime;
}

// 오류 메시지 표시
function showErrorMessage(message) {
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="error-container">
            <h2>오류가 발생했습니다</h2>
            <p>${message}</p>
            <a href="../index.html">홈으로 돌아가기</a>
        </div>
    `;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializeInvestorPage);