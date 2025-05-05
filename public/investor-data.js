// 투자자 상세 데이터
const investorsData = {
    'warren-buffett': {
        id: 'warren-buffett',
        name: '워렌 버핏',
        fullName: 'Warren Buffett',
        birthYear: 1930,
        company: 'Berkshire Hathaway',
        philosophy: '기업의 본질적 가치에 집중하는 가치투자의 대가',
        quote: '다른 사람들이 두려워할 때 욕심내고, 다른 사람들이 욕심낼 때 두려워하라.',
        image: '/images/warren-buffett.png',
        imageBackground: '/images/warren-buffett-bg.jpg',
        metrics: [
            {
                name: '경제적 해자 (Economic Moat)',
                description: '경쟁사가 쉽게 침투하기 어려운 경쟁우위를 가진 기업을 선호합니다. 브랜드 파워, 네트워크 효과, 전환 비용 등이 포함됩니다.',
                weight: 25
            },
            {
                name: 'ROE (자기자본이익률)',
                description: '15% 이상의 ROE를 가진 기업을 선호합니다. 이는 기업이 주주 자본을 얼마나 효율적으로 활용하는지 보여줍니다.',
                weight: 20
            },
            {
                name: '낮은 부채 비율',
                description: '부채가 적은 기업을 선호합니다. 재무 건전성이 강한 기업이 경제 위기 상황에서도 생존할 가능성이 높습니다.',
                weight: 15
            },
            {
                name: 'P/E 비율',
                description: '업종 평균 대비 낮은 P/E 비율을 가진 기업을 선호합니다. 이는 기업의 가격이 수익 대비 합리적인지 평가하는 지표입니다.',
                weight: 10
            },
            {
                name: '현금흐름',
                description: '예측 가능하고 안정적인 현금 흐름을 가진 기업을 선호합니다. 지속적인 현금 창출 능력은 투자 안정성에 중요합니다.',
                weight: 10
            },
            {
                name: '경영진 신뢰성',
                description: '정직하고 주주 친화적인 경영진이 있는 기업을 선호합니다. 경영진의 투명성과 능력은 장기적 성공에 중요합니다.',
                weight: 8
            },
            {
                name: '내재가치 할인율',
                description: '현재 주가가 내재가치보다 낮은 기업을 선호합니다. 이는 안전마진 개념의 핵심입니다.',
                weight: 7
            },
            {
                name: '이익 성장성',
                description: '10년간 연평균 10% 이상의 EPS 성장을 보이는 기업을 선호합니다. 장기적이고 일관된 성장은 가치 증가에 중요합니다.',
                weight: 5
            },
            {
                name: '자사주 매입',
                description: '지속적으로 자사주를 매입하여 주식 수를 줄이는 기업을 선호합니다. 이는 주주 가치를 높이는 방법 중 하나입니다.',
                weight: 4
            },
            {
                name: '상품 의존도',
                description: '원자재 의존도가 낮은 기업을 선호합니다. 원자재 가격 변동이 수익성에 큰 영향을 미치지 않는 기업이 안정적입니다.',
                weight: 3
            }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'roe', name: 'ROE(%)', sortable: true },
            { id: 'debtToEquity', name: '부채비율', sortable: true },
            { id: 'pe', name: 'P/E', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['AAPL', 'BRK-B', 'KO', 'AMZN', 'MCO', 'AXP', 'BAC', 'DVA', 'VZ', 'CVX', 'KHC', 'CE', 'GM', 'PG', 'OXY', 'PARA', 'HPQ', 'NUE', 'SNOW', 'USB'],
        strategy: `
            <h4>워렌 버핏의 투자 철학</h4>
            <p>워렌 버핏은 벤자민 그레이엄의 가치 투자 원칙을 자신만의 방식으로 발전시켰습니다. 그는 "너무 비싸지 않은 가격에 훌륭한 기업을 구매하라"는 철학을 가지고 있습니다.</p>
            
            <h4>주요 투자 전략</h4>
            <ul>
                <li><strong>기업의 본질 가치 분석:</strong> 버핏은 주가의 단기적 움직임보다 기업의 본질적 가치에 집중합니다. 그는 수익성, 성장성, 부채 수준 등 기업의 재무 건전성을 철저히 분석합니다.</li>
                <li><strong>장기적 관점:</strong> 버핏은 최소 10년 이상의 장기 관점에서 투자를 고려합니다. 그는 "주식을 산다는 것은 그 기업의 사업을 산다는 것"이라고 믿습니다.</li>
                <li><strong>경제적 해자:</strong> 경쟁사가 쉽게 진입하기 어려운 경쟁 우위(경제적 해자)를 가진 기업을 선호합니다.</li>
                <li><strong>이해할 수 있는 비즈니스:</strong> 버핏은 자신이 완전히 이해할 수 있는 단순한 비즈니스 모델을 가진 기업에만 투자합니다.</li>
                <li><strong>뛰어난 경영진:</strong> 정직하고 역량 있는 경영진이 운영하는 기업을 중요시합니다.</li>
            </ul>
            
            <h4>시장 관점</h4>
            <p>버핏은 시장 타이밍을 잡으려 하지 않으며, 대신 시장이 과열되었을 때는 신중해지고 시장이 공포에 빠졌을 때는 적극적으로 매수하는 경향을 보입니다. 그의 유명한 격언 "다른 사람들이 두려워할 때 욕심을 부리고, 다른 사람들이 욕심을 부릴 때 두려워하라"는 이러한 전략을 잘 보여줍니다.</p>
        `
    },
    'charlie-munger': {
        id: 'charlie-munger',
        name: '찰리 멍거',
        fullName: 'Charlie Munger',
        birthYear: 1924,
        deathYear: 2023,
        company: 'Berkshire Hathaway',
        philosophy: '다학제적 사고모델을 바탕으로 한 가치투자의 실천가',
        quote: '당신이 무엇을 모르는지 아는 것이 중요하다.',
        image: '/images/charlie-munger.png',
        imageBackground: '/images/charlie-munger-bg.jpg',
        metrics: [
            {
                name: '경제적 해자',
                description: '50년 후에도 유지될 수 있는 강력한 경쟁우위를 가진 기업을 선호합니다.',
                weight: 30
            },
            {
                name: '경영진 품질',
                description: '정직하고 유능하며 주주 이익을 우선시하는 경영진이 있는 기업을 선호합니다.',
                weight: 25
            },
            {
                name: '비즈니스 단순성',
                description: '이해하기 쉽고 예측 가능한 사업 모델을 가진 기업을 선호합니다.',
                weight: 15
            },
            {
                name: '안전마진',
                description: '내재가치 대비 30% 이상 할인된 가격에 투자합니다.',
                weight: 12
            },
            {
                name: 'P/E 비율',
                description: '성장성 대비 합리적인 P/E 비율을 가진 기업을 선호합니다.',
                weight: 8
            },
            {
                name: '현금흐름',
                description: '부채 없이 현금으로 성장 가능한 기업을 선호합니다.',
                weight: 5
            },
            {
                name: '장기적 관점',
                description: '10년 이상 보유할 수 있는 기업을 선호합니다.',
                weight: 5
            },
            {
                name: '브랜드 파워',
                description: '소비자 충성도가 높은 프리미엄 브랜드를 가진 기업을 선호합니다.',
                weight: 4
            },
            {
                name: 'R&D 투자',
                description: '지속적인 혁신으로 경쟁 우위를 유지하는 기업을 선호합니다.',
                weight: 3
            },
            {
                name: '유통망 강도',
                description: '독점적 유통 인프라를 가진 기업을 선호합니다.',
                weight: 3
            }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'pe', name: 'P/E', sortable: true },
            { id: 'roe', name: 'ROE(%)', sortable: true },
            { id: 'roic', name: 'ROIC(%)', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['COST', 'BRK-B', 'WFC', 'AAPL', 'BAC', 'USB', 'MSFT', 'GOOGL', 'JNJ', 'PG'],
        strategy: `
            <h4>찰리 멍거의 투자 철학</h4>
            <p>찰리 멍거는 워렌 버핏의 오랜 동반자이자 버크셔 해서웨이의 부회장으로, 광범위한 지식과 다학제적 사고방식으로 유명합니다. 그는 '정신적 모델'의 중요성을 강조하며, 다양한 학문 분야의 핵심 개념을 통합하여 투자 결정을 내리는 방식을 사용했습니다.</p>
            
            <h4>주요 투자 전략</h4>
            <ul>
                <li><strong>정신적 모델:</strong> 멍거는 심리학, 물리학, 수학, 생물학 등 다양한 학문 분야의 핵심 개념을 통합하여 투자 결정을 내리는 접근법을 강조했습니다.</li>
                <li><strong>훌륭한 기업에 집중:</strong> 멍거는 "좋은 가격의 훌륭한 기업"에 투자하는 것을 선호했으며, 평범한 기업의 저평가 주식보다는 뛰어난 기업의 적정 가격 주식을 선호했습니다.</li>
                <li><strong>인지적 편향 인식:</strong> 멍거는 인간의 심리적 약점과 인지적 편향을 이해하고 이를 극복하는 것의 중요성을 강조했습니다.</li>
                <li><strong>집중 투자:</strong> 멍거는 "분산투자는 무지함에 대한 방어책"이라고 말하며, 소수의 우량 기업에 집중 투자하는 전략을 지지했습니다.</li>
                <li><strong>장기적 관점:</strong> 멍거는 단기적인 시장 변동에 영향받지 않고 장기적인 관점에서 투자하는 접근법을 선호했습니다.</li>
            </ul>
            
            <h4>투자 명언</h4>
            <p>멍거의 유명한 말 중 하나는 "쉬운 결정을 내리고 그것을 지키는 것이 어려운 결정을 하는 것보다 낫다"입니다. 이는 복잡한 상황에서도 핵심적인 원칙을 통해 단순하고 명확한 결정을 내리는 그의 접근법을 보여줍니다.</p>
        `
    },
    'benjamin-graham': {
        id: 'benjamin-graham',
        name: '벤자민 그레이엄',
        fullName: 'Benjamin Graham',
        birthYear: 1894,
        deathYear: 1976,
        company: 'Graham-Newman Partnership',
        philosophy: '안전마진을 중시하는 가치투자의 창시자',
        quote: '투자는 철저한 분석, 약속된 안전성, 적절한 수익을 동반한다.',
        image: '/images/benjamin-graham.png',
        imageBackground: '/images/benjamin-graham-bg.jpg',
        metrics: [
            {
                name: '안전마진 (Margin of Safety)',
                description: '그레이엄의 가장 중요한 개념으로, 주식의 내재가치와 시장가격 사이의 차이를 의미합니다. 그는 내재가치보다 최소 33% 이상 낮은 가격에 투자할 것을 권장했습니다.',
                weight: 30
            },
            {
                name: '그레이엄 넘버',
                description: '√(22.5 × EPS × BPS) > 현재가. 주가가 그레이엄 넘버보다 낮으면 매력적인 투자 대상입니다.',
                weight: 20
            },
            {
                name: 'P/E 비율 (주가수익비율)',
                description: '그레이엄은 P/E 비율이 15 이하인 기업을 선호했습니다. 이는 기업의 시장가치가 수익에 비해 과도하게 높지 않은지 평가하는 지표입니다.',
                weight: 15
            },
            {
                name: 'P/B 비율 (주가순자산비율)',
                description: '그레이엄은 P/B 비율이 1.5 이하인 기업을 선호했습니다. 이는 기업의 시장가치가 장부가치에 근접하거나 그 이하인 경우를 의미합니다.',
                weight: 10
            },
            {
                name: '부채 비율',
                description: '그레이엄은 부채가 적은, 재무적으로 안정적인 기업을 선호했습니다. 장기 부채가 유동자산보다 작은 기업을 중요시했습니다.',
                weight: 10
            },
            {
                name: '현금비율',
                description: '유동자산/유동부채 ≥ 2.0을 가진 기업을 선호했습니다. 이는 단기 부채를 충분히 커버할 수 있는 유동성을 의미합니다.',
                weight: 5
            },
            {
                name: '배당 수익률',
                description: '그레이엄은 상당한 배당수익률을 제공하는 기업을 선호했습니다. 이는 안정적인 현금 흐름과 주주 친화적 정책을 나타냅니다.',
                weight: 5
            },
            {
                name: '분산투자',
                description: '10~30종목 보유, 단일종목 10% 이하로 투자하는 원칙을 지켰습니다. 이는 특정 종목의 위험을 분산시키는 전략입니다.',
                weight: 5
            },
            {
                name: '이익 안정성',
                description: '10년간 연속 흑자를 기록한 기업을 선호했습니다. 지속적인 수익성은 기업의 안정성을 보여주는 중요한 지표입니다.',
                weight: 5
            },
            {
                name: '자산 유동성',
                description: '현금·채권 비중이 높은 기업을 선호했습니다. 유동성 높은 자산은 경제 위기 상황에서 중요한 안전장치가 됩니다.',
                weight: 5
            }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'pb', name: 'P/B', sortable: true },
            { id: 'pe', name: 'P/E', sortable: true },
            { id: 'dividend', name: '배당률(%)', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['PG', 'JNJ', 'JPM', 'VZ', 'IBM', 'KMB', 'CVX', 'XOM', 'KO', 'PEP', 'MRK', 'PFE', 'CSCO', 'MCD', 'INTC', 'HD', 'MMM', 'CAT', 'WMT', 'TRV'],
        strategy: `
            <h4>벤자민 그레이엄의 투자 철학</h4>
            <p>벤자민 그레이엄은 현대 가치 투자의 아버지로 불립니다. 그는 "현명한 투자는 철저한 분석, 약속된 안전성, 적절한 수익을 기반으로 한다"고 믿었습니다. 그의 투자 철학은 주로 주식의 내재가치를 찾아 시장 가격보다 훨씬 낮은 가격에 매수하는 것에 중점을 둡니다.</p>
            
            <h4>주요 투자 전략</h4>
            <ul>
                <li><strong>안전마진 원칙:</strong> 그레이엄의 가장 중요한 원칙은 충분한 안전마진(Margin of Safety)을 확보하는 것입니다. 내재가치보다 상당히 낮은 가격에 주식을 구매함으로써 투자 위험을 줄이고자 했습니다.</li>
                <li><strong>가치 지표 분석:</strong> P/E 비율, P/B 비율, 부채 비율, 배당 수익률 등의 기본적인 가치 지표를 활용해 저평가된 기업을 찾았습니다.</li>
                <li><strong>분산 투자:</strong> 그레이엄은 포트폴리오 구성 시 충분한 분산 투자의 중요성을 강조했습니다.</li>
                <li><strong>방어적 투자자 접근법:</strong> 그의 저서 '현명한 투자자'에서 그레이엄은 방어적 투자자와 기업형 투자자를 구분했으며, 대부분의 개인 투자자들에게는 방어적 접근법을 권장했습니다.</li>
                <li><strong>심리적 규율:</strong> 그레이엄은 투자에서 감정을 배제하고 규율을 유지하는 것의 중요성을 강조했습니다.</li>
            </ul>
            
            <h4>투자 기준</h4>
            <p>그레이엄은 구체적인 투자 기준을 제시했습니다. 그의 '현명한 투자자'에서는 적정한 기업 규모, 충분한 재무 상태, 20년 이상의 배당금 지급 역사, 10년간 수익 감소 없음 등의 기준을 제시했습니다. 이러한 엄격한 기준은 투자자들이 질적으로 우수한 기업을 선별하는 데 도움을 주었습니다.</p>
        `
    }
};

// 주식 데이터 가져오기 함수
async function getInvestorStocksData(investorId) {
    try {
        // StockAPI가 로드되었는지 확인
        if (!window.StockAPI) {
            throw new Error('Stock API가 로드되지 않았습니다.');
        }
        
        // investorsData에 해당 투자자 정보가 있는지 확인
        if (!investorsData[investorId]) {
            throw new Error(`${investorId} 투자자 정보를 찾을 수 없습니다.`);
        }
        
        // 투자자별 추천 종목 가져오기
        const stocks = await window.StockAPI.getStocksByInvestor(investorId);
        
        // 투자자 상세 정보 업데이트
        if (stocks && stocks.length > 0) {
            return stocks;
        }
        
        return [];
    } catch (error) {
        console.error(`${investorId} 투자자의 종목 데이터 가져오기 오류:`, error);
        return [];
    }
}

// 투자자 목록 가져오기
function getAllInvestors() {
    return Object.values(investorsData);
}

// 투자자 상세 정보 가져오기
function getInvestorData(investorId) {
    return investorsData[investorId] || null;
}

// 메인 페이지용 투자자 데이터 가져오기
function getInvestorsForMainPage() {
    // 외부 API 호출없이 요약 정보만 가져올 때 사용
    return Object.values(investorsData).map(investor => {
        return {
            id: investor.id,
            name: investor.name,
            philosophy: investor.philosophy,
            quote: investor.quote,
            image: investor.image,
            metrics: investor.metrics,
            stockCandidates: investor.stockCandidates,
            topStocks: [] // 실시간 API 호출을 위해 빈 배열로 초기화
        };
    });
}

// 전체 투자자 목록을 위한 API 연동 함수
async function loadAllInvestorsWithStocks() {
    try {
        // 모든 투자자 ID 가져오기
        const investorIds = Object.keys(investorsData);
        
        // 각 투자자별 주식 데이터 가져오기
        const investorsWithStocks = await Promise.all(
            investorIds.map(async (id) => {
                const investor = { ...investorsData[id] };
                investor.topStocks = await getInvestorStocksData(id);
                // TOP 3만 사용
                investor.topStocks = investor.topStocks.slice(0, 3);
                return investor;
            })
        );
        
        return investorsWithStocks;
    } catch (error) {
        console.error('투자자 데이터 로딩 중 오류 발생:', error);
        return Object.values(investorsData).map(investor => ({
            ...investor,
            topStocks: []
        }));
    }
}

// 외부에서 사용할 함수들 내보내기
window.InvestorData = {
    getInvestorData,
    getAllInvestors,
    getInvestorsForMainPage,
    getInvestorStocksData,
    loadAllInvestorsWithStocks
};