// URL에서 투자자 ID 가져오기
function getInvestorIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'warren-buffett'; // 기본값은 워렌 버핏
}

// 페이지 초기화
async function initializeInvestorPage() {
    const investorId = getInvestorIdFromUrl();
    
    // InvestorData API가 로드되었는지 확인
    if (!window.InvestorData) {
        showErrorMessage("투자자 데이터 API가 로드되지 않았습니다.");
        return;
    }
    
    // 투자자 데이터 가져오기
    const investor = window.InvestorData.getInvestorData(investorId);
    
    if (!investor) {
        showErrorMessage("투자자 정보를 찾을 수 없습니다.");
        return;
    }
    
    // 투자자 프로필 정보 설정
    setInvestorProfileInfo(investor);
    
    // 투자자 상세 정보가 있으면 표시
    setInvestorDetailInfo(investor);
    
    // 배경 이미지 설정 (있는 경우)
    setInvestorBackgroundImage(investor);
    
    // 주요 투자 지표 렌더링
    renderMetrics(investor.metrics);
    
    // 투자 전략 내용 렌더링
    document.getElementById('strategy-content').innerHTML = investor.strategy;
    
    // API 키 설정 (실제 API 키로 변경 필요)
    if (window.StockAPI) {
        window.StockAPI.setApiKey('YOUR_API_KEY_HERE');
    }
    
    // 마지막 업데이트 시간 표시
    updateLastUpdatedTime();
    
    // 새로고침 버튼 이벤트 설정
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            refreshStockData(investor);
        });
    }
    
    // 페이지 로드 후 실시간 데이터 가져오기
    try {
        // 로딩 표시 활성화
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
        
        // 주식 데이터 가져오기
        const stocks = await window.InvestorData.getInvestorStocksData(investorId);
        
        // 추천 종목 테이블 렌더링
        renderStockTable(investor.stockColumns, stocks);
        
        // 로딩 표시 비활성화
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    } catch (error) {
        console.error('주식 데이터 로딩 중 오류 발생:', error);
        showErrorMessage("주식 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
        
        // 로딩 표시 비활성화
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
}

// 투자자 프로필 정보 설정
function setInvestorProfileInfo(investor) {
    const imageElement = document.getElementById('investor-image');
    if (imageElement) {
        imageElement.src = investor.image;
        imageElement.alt = investor.name;
    }
    
    const nameElement = document.getElementById('investor-name');
    if (nameElement) {
        nameElement.textContent = investor.name;
    }
    
    const philosophyElement = document.getElementById('investor-philosophy');
    if (philosophyElement) {
        philosophyElement.textContent = investor.philosophy;
    }
    
    const quoteElement = document.getElementById('investor-quote');
    if (quoteElement) {
        quoteElement.textContent = `"${investor.quote}"`;
    }
}

// 투자자 상세 정보 설정
function setInvestorDetailInfo(investor) {
    if (investor.fullName) {
        const fullnameElement = document.getElementById('investor-fullname');
        if (fullnameElement) {
            fullnameElement.textContent = investor.fullName;
        }
    }
    
    if (investor.birthYear) {
        const yearsText = investor.deathYear 
            ? `(${investor.birthYear}-${investor.deathYear})` 
            : `(${investor.birthYear}-)`;
            
        const yearsElement = document.getElementById('investor-years');
        if (yearsElement) {
            yearsElement.textContent = yearsText;
        }
    }
    
    if (investor.company) {
        const companyElement = document.getElementById('investor-company');
        if (companyElement) {
            companyElement.textContent = investor.company;
        }
    }
}

// 배경 이미지 설정
function setInvestorBackgroundImage(investor) {
    if (investor.imageBackground) {
        const header = document.querySelector('.investor-header');
        if (header) {
            header.style.backgroundImage = `url(${investor.imageBackground})`;
        }
    }
}

// 투자 지표 렌더링
function renderMetrics(metrics) {
    const metricsGrid = document.getElementById('metrics-grid');
    
    if (!metricsGrid) {
        console.error('metrics-grid 요소를 찾을 수 없습니다.');
        return;
    }
    
    metricsGrid.innerHTML = '';
    
    if (!metrics || !Array.isArray(metrics)) {
        console.error('유효하지 않은 metrics 데이터:', metrics);
        return;
    }
    
    metrics.forEach(metric => {
        const metricCard = document.createElement('div');
        metricCard.className = 'metric-card';
        
        // 가중치 시각화를 위한 바 추가
        metricCard.innerHTML = `
            <h4>${metric.name} <span class="weight">(${metric.weight}%)</span></h4>
            <div class="weight-bar">
                <div class="weight-fill" style="width: ${metric.weight * 3}px;"></div>
            </div>
            <p>${metric.description}</p>
        `;
        
        metricsGrid.appendChild(metricCard);
    });
}

// 주식 테이블 렌더링
function renderStockTable(columns, stocks) {
    // 테이블 헤더 생성
    const tableHead = document.getElementById('table-head');
    
    if (!tableHead) {
        console.error('table-head 요소를 찾을 수 없습니다.');
        return;
    }
    
    tableHead.innerHTML = '';
    
    if (!columns || !Array.isArray(columns)) {
        console.error('유효하지 않은 columns 데이터:', columns);
        return;
    }
    
    const headerRow = document.createElement('tr');
    
    columns.forEach(column => {
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
    
    if (!tableBody) {
        console.error('table-body 요소를 찾을 수 없습니다.');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
        // 데이터가 없을 경우 로딩 메시지 표시
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = columns.length;
        emptyCell.textContent = '데이터를 불러오는 중입니다...';
        emptyCell.className = 'empty-message';
        emptyRow.appendChild(emptyCell);
        tableBody.appendChild(emptyRow);
        return;
    }
    
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
                if (changeValue !== undefined) {
                    cell.innerHTML = `
                        <span class="${changeValue > 0 ? 'up' : changeValue < 0 ? 'down' : ''}">
                            ${changeValue > 0 ? '+' : ''}${changeValue}%
                        </span>
                    `;
                } else {
                    cell.textContent = '-';
                }
            } else if (column.id === 'price') {
                cell.textContent = stock[column.id] ? `$${stock[column.id].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-';
            } else if (column.id === 'dividend' || column.id === 'volatility' || column.id === 'growthRate' || column.id === 'roe' || column.id === 'roic') {
                cell.textContent = stock[column.id] ? `${stock[column.id]}%` : '-';
            } else if (column.id === 'score') {
                cell.textContent = stock[column.id] !== undefined ? stock[column.id] : '-';
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
    const investorId = getInvestorIdFromUrl();
    const investor = window.InvestorData.getInvestorData(investorId);
    
    if (!investor) {
        console.error('투자자 정보를 찾을 수 없습니다.');
        return;
    }
    
    // 테이블 내용 가져오기
    const tableBody = document.getElementById('table-body');
    
    if (!tableBody) {
        console.error('table-body 요소를 찾을 수 없습니다.');
        return;
    }
    
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    
    // 데이터가 없는 경우 (로딩 메시지가 있는 경우) 정렬하지 않음
    if (rows.length === 1 && rows[0].querySelector('.empty-message')) {
        return;
    }
    
    // 현재 정렬 상태 확인
    const th = document.querySelector(`th[data-field="${field}"]`);
    
    if (!th) {
        console.error(`data-field="${field}" 속성을 가진 th 요소를 찾을 수 없습니다.`);
        return;
    }
    
    const currentSort = th.dataset.sort || 'none';
    
    // 모든 헤더의 정렬 상태 초기화
    document.querySelectorAll('th[data-field]').forEach(header => {
        header.dataset.sort = 'none';
        const sortIcon = header.querySelector('.sort-icon');
        if (sortIcon) {
            sortIcon.textContent = '↕';
        }
    });
    
    // 새로운 정렬 방향 설정
    let newSort;
    if (currentSort === 'none' || currentSort === 'desc') {
        newSort = 'asc';
        th.querySelector('.sort-icon').textContent = '↑';
    } else {
        newSort = 'desc';
        th.querySelector('.sort-icon').textContent = '↓';
    }
    
    th.dataset.sort = newSort;
    
    // 행 정렬 함수
    function sortRows(a, b) {
        // 각 행에서 해당 칼럼의 셀 가져오기
        const aCell = a.querySelector(`td:nth-child(${getColumnIndex(field) + 1})`);
        const bCell = b.querySelector(`td:nth-child(${getColumnIndex(field) + 1})`);
        
        if (!aCell || !bCell) return 0;
        
        let aValue = aCell.textContent;
        let bValue = bCell.textContent;
        
        // 숫자 변환이 필요한 경우
        if (field === 'price' || field === 'change' || field === 'score' || 
            field === 'roe' || field === 'pe' || field === 'pb' || 
            field === 'dividend' || field === 'debtToEquity' || 
            field === 'peg' || field === 'growthRate' || 
            field === 'debtToEbitda' || field === 'roic' || 
            field === 'volatility' || field === 'correlation') {
            // $ 또는 % 기호 제거 후 숫자로 변환
            aValue = parseFloat(aValue.replace(/[$%,]/g, ''));
            bValue = parseFloat(bValue.replace(/[$%,]/g, ''));
            
            // 숫자 변환 실패 시 0으로 처리
            if (isNaN(aValue)) aValue = 0;
            if (isNaN(bValue)) bValue = 0;
        }
        
        // 정렬 방향에 따라 정렬
        if (newSort === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    }
    
    // 칼럼 인덱스 찾기
    function getColumnIndex(columnId) {
        const headers = Array.from(document.querySelectorAll('#table-head th'));
        return headers.findIndex(header => header.dataset.field === columnId);
    }
    
    // 행 정렬 및 테이블 업데이트
    rows.sort(sortRows).forEach(row => tableBody.appendChild(row));
}

// 주식 데이터 새로고침
async function refreshStockData(investor) {
    const refreshButton = document.getElementById('refresh-button');
    const refreshIcon = refreshButton ? refreshButton.querySelector('.refresh-icon') : null;
    
    if (refreshButton && refreshIcon) {
        refreshIcon.style.transform = 'rotate(360deg)';
        refreshButton.disabled = true;
    }
    
    try {
        // 투자자 ID 가져오기
        const investorId = investor.id;
        
        // API가 로드되었는지 확인
        if (!window.StockAPI || !window.InvestorData) {
            throw new Error('필요한 API가 로드되지 않았습니다.');
        }
        
        // 로딩 표시 활성화
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
            loadingEl.style.display = 'block';
        }
        
        // 실시간 주식 데이터 가져오기 (API를 통해 최신 데이터 요청)
        const stocks = await window.InvestorData.getInvestorStocksData(investorId);
        
        // 테이블 업데이트
        renderTableBody(investor.stockColumns, stocks);
        updateLastUpdatedTime();
        
        console.log('주식 데이터가 성공적으로 업데이트되었습니다.');
        
        // 로딩 표시 비활성화
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    } catch (error) {
        console.error('주식 데이터 업데이트 중 오류 발생:', error);
        alert('주식 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 새로고침 버튼 복원
        if (refreshButton && refreshIcon) {
            setTimeout(() => {
                refreshIcon.style.transform = 'rotate(0deg)';
                refreshButton.disabled = false;
            }, 500);
        }
    }
}

// 마지막 업데이트 시간 표시
function updateLastUpdatedTime() {
    const lastUpdatedEl = document.getElementById('last-updated');
    
    if (!lastUpdatedEl) {
        console.error('last-updated 요소를 찾을 수 없습니다.');
        return;
    }
    
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    lastUpdatedEl.textContent = formattedTime;
}

// 오류 메시지 표시
function showErrorMessage(message) {
    const main = document.querySelector('main');
    
    if (!main) {
        console.error('main 요소를 찾을 수 없습니다.');
        alert(message);
        return;
    }
    
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