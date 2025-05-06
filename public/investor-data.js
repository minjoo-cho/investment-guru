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
        useFullScreening: true,
        metrics: [
            { name: 'ROE (자기자본이익률)', description: '15% 이상의 ROE를 가진 기업 선호', weight: 30 },
            { name: '부채비율', description: '1.0x 이하의 낮은 부채비율', weight: 25 },
            { name: 'P/E 비율', description: '업종 평균 대비 낮은 P/E', weight: 20 },
            { name: '현금흐름', description: '안정적인 영업현금흐름', weight: 15 },
            { name: '자사주매입', description: '지속적인 자사주 감소', weight: 10 }
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
        stockCandidates: ['AAPL', 'BRK-B', 'KO', 'AMZN', 'MCO', 'AXP', 'BAC', 'DVA', 'VZ', 'CVX'],
        strategy: `워렌 버핏의 핵심 투자 전략...`
    },
    'charlie-munger': {
        id: 'charlie-munger',
        name: '찰리 멍거',
        fullName: 'Charlie Munger',
        birthYear: 1924,
        deathYear: 2023,
        company: 'Berkshire Hathaway',
        philosophy: '멘탈 모델 기반의 투자 결정',
        quote: '역발상은 모든 문제 해결의 열쇠다',
        image: '/images/charlie-munger.png',
        imageBackground: '/images/charlie-munger-bg.jpg',
        metrics: [
            { name: 'ROIC', description: '15% 이상 투하자본수익률', weight: 40 },
            { name: 'FCF Yield', description: '8% 이상 자유현금흐름 수익률', weight: 25 },
            { name: 'PEG', description: '1.0 이하 성장성 대비 가치', weight: 20 },
            { name: '배당성향', description: '50% 이상 안정적 배당', weight: 15 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'roic', name: 'ROIC(%)', sortable: true },
            { id: 'fcfYield', name: 'FCF Yield(%)', sortable: true },
            { id: 'peg', name: 'PEG', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL', 'BABA', 'DJCO', 'COF', 'USB', 'WFC'],
        strategy: `찰리 멍거의 멘탈 모델 접근법...`
    },
    'benjamin-graham': {
        id: 'benjamin-graham',
        name: '벤저민 그레이엄',
        fullName: 'Benjamin Graham',
        birthYear: 1894,
        deathYear: 1976,
        company: 'Graham-Newman Partnership',
        philosophy: '안전마진을 중시하는 가치투자의 창시자',
        quote: '투자는 돈을 잃지 않는 것에서 시작하고, 두 번째가 수익을 내는 것이다.',
        image: '/images/benjamin-graham.png',
        imageBackground: '/images/benjamin-graham-bg.jpg',
        metrics: [
            { name: 'P/B Ratio', description: '1.0 이하 시가총액 대비 순자산', weight: 35 },
            { name: 'Current Ratio', description: '2.0 이상 유동성 비율', weight: 30 },
            { name: 'EV/EBITDA', description: '10 이하 기업가치 대비 수익', weight: 25 },
            { name: '배당수익률', description: '5% 이상 안정적 배당', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'pb', name: 'P/B', sortable: true },
            { id: 'currentRatio', name: '유동비율', sortable: true },
            { id: 'evEbitda', name: 'EV/EBITDA', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['JNJ', 'PG', 'KO', 'XOM', 'JPM', 'GE', 'CVX', 'IBM', 'MMM', 'T'],
        strategy: `벤저민 그레이엄의 안전마진 전략...`
    },
    'peter-lynch': {
        id: 'peter-lynch',
        name: '피터 린치',
        fullName: 'Peter Lynch',
        birthYear: 1944,
        company: 'Fidelity Magellan Fund',
        philosophy: '당신이 알고 이해하는 종목에 투자하라',
        quote: '주가는 결국 기업 이익을 따라간다',
        image: '/images/peter-lynch.png',
        imageBackground: '/images/peter-lynch-bg.jpg',
        metrics: [
            { name: 'PEG Ratio', description: '1.0 이하의 성장성 대비 가치', weight: 35 },
            { name: 'EPS Growth', description: '3년 연속 20% 이상 성장률', weight: 30 },
            { name: 'Debt/Equity', description: '0.5x 이하의 낮은 부채비율', weight: 20 },
            { name: '실적 일관성', description: '5년 이상 일관된 성장 추세', weight: 10 },
            { name: '산업 매력도', description: '성장 산업 내 리더 기업', weight: 5 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'peg', name: 'PEG', sortable: true },
            { id: 'epsGrowth', name: 'EPS 성장률(%)', sortable: true },
            { id: 'debtToEquity', name: '부채비율', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['AMZN', 'COST', 'HD', 'NKE', 'SBUX', 'TGT', 'LOW', 'BKNG', 'ORLY', 'CHTR'],
        strategy: `피터 린치의 투자 철학과 전략...`
    },
    'ray-dalio': {
        id: 'ray-dalio',
        name: '레이 달리오',
        fullName: 'Ray Dalio',
        birthYear: 1949,
        company: 'Bridgewater Associates',
        philosophy: '올웨더 포트폴리오와 원칙 중심 접근',
        quote: '진정한 다각화는 위험 요소들의 균형에서 나온다',
        image: '/images/ray-dalio.png',
        imageBackground: '/images/ray-dalio-bg.jpg',
        metrics: [
            { name: '자산 상관관계', description: '자산 간 낮은 상관관계', weight: 30 },
            { name: '리스크 패리티', description: '리스크 기여도 균형', weight: 25 },
            { name: '인플레이션 민감도', description: '인플레이션 환경 적응력', weight: 20 },
            { name: '경기 순환 포지션', description: '경기 사이클 대응 전략', weight: 15 },
            { name: '변동성', description: '낮은 변동성으로 안정적 수익', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'correlation', name: '상관관계', sortable: true },
            { id: 'volatility', name: '변동성(%)', sortable: true },
            { id: 'inflationSensitivity', name: '인플레이션 민감도', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['GLD', 'TLT', 'SPY', 'IEF', 'VTIP', 'DBC', 'VWO', 'BNDX', 'EMB', 'LQD'],
        strategy: `레이 달리오의 올웨더 전략과 원칙...`
    },
    'george-soros': {
        id: 'george-soros',
        name: '조지 소로스',
        fullName: 'George Soros',
        birthYear: 1930,
        company: 'Soros Fund Management',
        philosophy: '반사성 이론과 시장 트렌드를 활용한 거시 투자',
        quote: '시장은 항상 틀릴 수 있으며, 내가 틀릴 수도 있다',
        image: '/images/george-soros.png',
        imageBackground: '/images/george-soros-bg.jpg',
        metrics: [
            { name: '거시경제 트렌드', description: '글로벌 거시경제 변화 감지', weight: 35 },
            { name: '모멘텀 강도', description: '가격 모멘텀과 추세 강도', weight: 25 },
            { name: '시장 감성', description: '투자자 행동 및 심리 패턴', weight: 20 },
            { name: '정책 영향', description: '정부/중앙은행 정책 변화', weight: 15 },
            { name: '유동성', description: '높은 거래량과 유동성', weight: 5 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'momentum', name: '모멘텀', sortable: true },
            { id: 'volatility', name: '변동성(%)', sortable: true },
            { id: 'liquidity', name: '유동성', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['EEM', 'GLD', 'FXI', 'EWZ', 'SLV', 'UUP', 'EWJ', 'RSX', 'TLT', 'SPY'],
        strategy: `조지 소로스의 반사성 이론과 시장 전략...`
    },
    'john-templeton': {
        id: 'john-templeton',
        name: '존 템플턴',
        fullName: 'John Templeton',
        birthYear: 1912,
        deathYear: 2008,
        company: 'Templeton Growth Fund',
        philosophy: '글로벌 가치 투자와 역발상적 기회 추구',
        quote: '최고의 투자 기회는 가장 큰 비관론이 지배할 때 나타난다',
        image: '/images/john-templeton.png',
        imageBackground: '/images/john-templeton-bg.jpg',
        metrics: [
            { name: '글로벌 분산투자', description: '다양한 국가 및 지역 분산', weight: 30 },
            { name: 'P/E 대비 성장률', description: '저평가된 성장 잠재력', weight: 25 },
            { name: '거시경제 환경', description: '국가별 경제 펀더멘털', weight: 20 },
            { name: '역발상 지표', description: '과도한 비관론/낙관론 영역', weight: 15 },
            { name: '배당 성장률', description: '지속적인 배당 증가', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'country', name: '국가', sortable: true },
            { id: 'pe', name: 'P/E', sortable: true },
            { id: 'dividendGrowth', name: '배당성장률(%)', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['EFA', 'VEA', 'IEMG', 'VWO', 'EWJ', 'EWG', 'EWU', 'EWQ', 'EWC', 'EWA'],
        strategy: `존 템플턴의 글로벌 가치 투자 전략...`
    },
    'philip-fisher': {
        id: 'philip-fisher',
        name: '필립 피셔',
        fullName: 'Philip A. Fisher',
        birthYear: 1907,
        deathYear: 2004,
        company: 'Fisher & Company',
        philosophy: '질적 성장주 투자의 선구자',
        quote: '주식을 사는 것보다 팔 때가 더 어렵다',
        image: '/images/philip-fisher.png',
        imageBackground: '/images/philip-fisher-bg.jpg',
        metrics: [
            { name: '성장 잠재력', description: '높은 장기 성장 잠재력', weight: 30 },
            { name: 'R&D 투자 효율성', description: '연구개발의 효율적 투자', weight: 25 },
            { name: '경영진 능력', description: '뛰어난 경영진과 기업문화', weight: 20 },
            { name: '경쟁우위', description: '지속가능한 비즈니스 모델', weight: 15 },
            { name: '이익률 추세', description: '지속적으로 개선되는 이익률', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'growthRate', name: '성장률(%)', sortable: true },
            { id: 'rndRatio', name: 'R&D 비율(%)', sortable: true },
            { id: 'profitMargin', name: '이익률(%)', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['GOOGL', 'ADBE', 'NVDA', 'ASML', 'ISRG', 'INTU', 'AMGN', 'GILD', 'TMO', 'IDXX'],
        strategy: `필립 피셔의 질적 성장주 투자 전략...`
    },
    'carl-icahn': {
        id: 'carl-icahn',
        name: '칼 아이칸',
        fullName: 'Carl Icahn',
        birthYear: 1936,
        company: 'Icahn Enterprises',
        philosophy: '액티비스트 투자와 기업 개선 전략',
        quote: '잘못 관리되는 회사는 주주 가치를 극대화할 수 있는 큰 기회다',
        image: '/images/carl-icahn.png',
        imageBackground: '/images/carl-icahn-bg.jpg',
        metrics: [
            { name: '자산가치 할인율', description: '순자산 대비 시가총액 할인', weight: 30 },
            { name: '주주환원 잠재력', description: '자사주 매입/배당 확대 가능성', weight: 25 },
            { name: '지배구조 개선여지', description: '경영진 교체 및 지배구조 개선', weight: 20 },
            { name: '사업부 분할가치', description: '사업부 분할시 가치 상승 여력', weight: 15 },
            { name: '잉여현금흐름', description: '높은 잉여현금흐름 비율', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'navDiscount', name: 'NAV 할인율(%)', sortable: true },
            { id: 'fcfYield', name: 'FCF 수익률(%)', sortable: true },
            { id: 'govScore', name: '지배구조 점수', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['XRX', 'CVX', 'MCD', 'EBAY', 'NFLX', 'AAPL', 'FCX', 'HLF', 'LNG', 'OXY'],
        strategy: `칼 아이칸의 액티비스트 투자 전략...`
    },
    'jim-simons': {
        id: 'jim-simons',
        name: '짐 사이먼스',
        fullName: 'James Harris Simons',
        birthYear: 1938,
        company: 'Renaissance Technologies',
        philosophy: '수학적 모델과 알고리즘 기반 퀀트 투자',
        quote: '시장에는 패턴이 존재하며, 그것을 발견하는 자가 승리한다',
        image: '/images/jim-simons.png',
        imageBackground: '/images/jim-simons-bg.jpg',
        metrics: [
            { name: '통계적 시장이상현상', description: '가격 비효율성 패턴', weight: 35 },
            { name: '모멘텀 지표', description: '가격 및 실적 모멘텀', weight: 25 },
            { name: '변동성 특성', description: '변동성 패턴 및 추세', weight: 15 },
            { name: '유동성 지표', description: '거래량 및 시장 깊이', weight: 15 },
            { name: '계절성 패턴', description: '반복적 시장 패턴', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'momentum', name: '모멘텀 점수', sortable: true },
            { id: 'volatility', name: '변동성 점수', sortable: true },
            { id: 'anomalyScore', name: '이상치 점수', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['SPY', 'QQQ', 'IWM', 'EFA', 'LQD', 'AMZN', 'MSFT', 'NVDA', 'AAPL', 'ASML'],
        strategy: `짐 사이먼스의 정량적 투자 전략...`
    }
};

// 기본 목 데이터
const defaultMockStocks = {
    'warren-buffett': [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.5, roe: 42.3, debtToEquity: 0.4, pe: 29.8, score: 92, isMock: true, lastUpdated: new Date() },
        { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, roe: 35.7, debtToEquity: 0.6, pe: 25.1, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roe: 10.5, debtToEquity: 0.2, pe: 15.8, score: 90, isMock: true, lastUpdated: new Date() }
    ],
    'charlie-munger': [
        { symbol: 'COST', name: 'Costco Wholesale', price: 732.35, change: 0.9, roic: 28.5, fcfYield: 4.3, peg: 1.2, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roic: 10.5, fcfYield: 3.8, peg: 1.1, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'BABA', name: 'Alibaba Group', price: 85.20, change: -0.5, roic: 15.2, fcfYield: 7.5, peg: 0.8, score: 84, isMock: true, lastUpdated: new Date() }
    ],
    'benjamin-graham': [
        { symbol: 'JNJ', name: 'Johnson & Johnson', price: 152.80, change: 0.2, pb: 0.8, currentRatio: 2.3, evEbitda: 9.2, score: 88, isMock: true, lastUpdated: new Date() },
        { symbol: 'PG', name: 'Procter & Gamble', price: 165.30, change: 0.7, pb: 1.2, currentRatio: 1.9, evEbitda: 11.5, score: 84, isMock: true, lastUpdated: new Date() },
        { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, pb: 0.6, currentRatio: 2.1, evEbitda: 8.7, score: 83, isMock: true, lastUpdated: new Date() }
    ],
    'peter-lynch': [
        { symbol: 'AMZN', name: 'Amazon.com Inc', price: 185.40, change: 2.1, peg: 1.1, epsGrowth: 32.5, debtToEquity: 0.3, score: 91, isMock: true, lastUpdated: new Date() },
        { symbol: 'COST', name: 'Costco Wholesale', price: 732.35, change: 0.9, peg: 0.9, epsGrowth: 25.3, debtToEquity: 0.4, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'NKE', name: 'Nike Inc', price: 102.75, change: -0.3, peg: 1.2, epsGrowth: 18.5, debtToEquity: 0.5, score: 86, isMock: true, lastUpdated: new Date() }
    ],
    'ray-dalio': [
        { symbol: 'GLD', name: 'SPDR Gold Trust', price: 214.85, change: 0.5, correlation: -0.3, volatility: 12.5, inflationSensitivity: 0.8, score: 90, isMock: true, lastUpdated: new Date() },
        { symbol: 'TLT', name: 'iShares 20+ Treasury', price: 98.40, change: -0.2, correlation: -0.5, volatility: 15.2, inflationSensitivity: -0.6, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 515.20, change: 0.8, correlation: 0.1, volatility: 14.8, inflationSensitivity: 0.2, score: 85, isMock: true, lastUpdated: new Date() }
    ],
    'george-soros': [
        { symbol: 'EEM', name: 'iShares MSCI Emerging', price: 42.80, change: -1.2, momentum: 0.3, volatility: 22.5, liquidity: 0.9, score: 88, isMock: true, lastUpdated: new Date() },
        { symbol: 'GLD', name: 'SPDR Gold Trust', price: 214.85, change: 0.5, momentum: 0.6, volatility: 12.5, liquidity: 0.8, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'FXI', name: 'iShares China Large-Cap', price: 28.45, change: -2.1, momentum: -0.2, volatility: 28.5, liquidity: 0.7, score: 83, isMock: true, lastUpdated: new Date() }
    ],
    'john-templeton': [
        { symbol: 'EFA', name: 'iShares MSCI EAFE ETF', price: 78.90, change: 0.6, country: '글로벌', pe: 14.5, dividendGrowth: 5.2, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'EWJ', name: 'iShares MSCI Japan ETF', price: 65.40, change: 0.8, country: '일본', pe: 13.8, dividendGrowth: 4.5, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'EWG', name: 'iShares MSCI Germany ETF', price: 30.75, change: 0.2, country: '독일', pe: 12.5, dividendGrowth: 6.8, score: 84, isMock: true, lastUpdated: new Date() }
    ],
    'philip-fisher': [
        { symbol: 'GOOGL', name: 'Alphabet Inc', price: 172.90, change: 1.2, growthRate: 18.5, rndRatio: 15.3, profitMargin: 28.7, score: 93, isMock: true, lastUpdated: new Date() },
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 950.40, change: 2.8, growthRate: 32.5, rndRatio: 20.5, profitMargin: 42.3, score: 91, isMock: true, lastUpdated: new Date() },
        { symbol: 'ASML', name: 'ASML Holding', price: 1045.20, change: 1.5, growthRate: 25.2, rndRatio: 18.7, profitMargin: 35.4, score: 89, isMock: true, lastUpdated: new Date() }
    ],
    'carl-icahn': [
        { symbol: 'XRX', name: 'Xerox Holdings', price: 16.45, change: -0.3, navDiscount: 42.5, fcfYield: 8.5, govScore: 4.2, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'OXY', name: 'Occidental Petroleum', price: 62.45, change: -1.2, navDiscount: 35.2, fcfYield: 12.3, govScore: 5.1, score: 85, isMock: true, lastUpdated: new Date() },
        { symbol: 'CVX', name: 'Chevron Corp', price: 155.30, change: -0.8, navDiscount: 28.7, fcfYield: 9.5, govScore: 6.3, score: 82, isMock: true, lastUpdated: new Date() }
    ],
    'jim-simons': [
        { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 515.20, change: 0.8, momentum: 0.7, volatility: 0.3, anomalyScore: 0.8, score: 92, isMock: true, lastUpdated: new Date() },
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 950.40, change: 2.8, momentum: 0.9, volatility: 0.6, anomalyScore: 0.7, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'MSFT', name: 'Microsoft Corp', price: 425.60, change: 1.5, momentum: 0.6, volatility: 0.2, anomalyScore: 0.9, score: 87, isMock: true, lastUpdated: new Date() }
    ]
};

// 나머지 함수들은 기존 내용 유지
function getCachedStocks(investorId) {
    try {
        const key = `stocks_${investorId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

function setCachedStocks(investorId, stocks) {
    try {
        const key = `stocks_${investorId}`;
        localStorage.setItem(key, JSON.stringify(stocks));
    } catch {}
}

function generateMockStocks(investorId, count = 10) {
    const stockSamples = {
        'warren-buffett': ['AAPL', 'BRK-B', 'KO', 'BAC', 'AXP', 'MCO', 'AMZN', 'OXY', 'VZ', 'CVX'],
        'charlie-munger': ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL', 'BABA', 'DJCO', 'COF', 'USB', 'WFC'],
        'benjamin-graham': ['JNJ', 'PG', 'KO', 'XOM', 'JPM', 'GE', 'CVX', 'IBM', 'MMM', 'T'],
        'peter-lynch': ['AMZN', 'COST', 'HD', 'NKE', 'SBUX', 'TGT', 'LOW', 'BKNG', 'ORLY', 'CHTR'],
        'ray-dalio': ['GLD', 'TLT', 'SPY', 'IEF', 'VTIP', 'DBC', 'VWO', 'BNDX', 'EMB', 'LQD'],
        'george-soros': ['EEM', 'GLD', 'FXI', 'EWZ', 'SLV', 'UUP', 'EWJ', 'RSX', 'TLT', 'SPY'],
        'john-templeton': ['EFA', 'VEA', 'IEMG', 'VWO', 'EWJ', 'EWG', 'EWU', 'EWQ', 'EWC', 'EWA'],
        'philip-fisher': ['GOOGL', 'ADBE', 'NVDA', 'ASML', 'ISRG', 'INTU', 'AMGN', 'GILD', 'TMO', 'IDXX'],
        'carl-icahn': ['XRX', 'CVX', 'MCD', 'EBAY', 'NFLX', 'AAPL', 'FCX', 'HLF', 'LNG', 'OXY'],
        'jim-simons': ['SPY', 'QQQ', 'IWM', 'EFA', 'LQD', 'AMZN', 'MSFT', 'NVDA', 'AAPL', 'ASML'],
        'default': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'V', 'JPM', 'JNJ']
    };
    
    const stocks = [];
    const baseStocks = stockSamples[investorId] || stockSamples['default'];
    
    for (let i = 0; i < count; i++) {
        const symbol = baseStocks[i % baseStocks.length];
        stocks.push({
            symbol: symbol,
            name: getStockName(symbol),
            price: Math.floor(100 + Math.random() * 900),
            change: (Math.random() * 10 - 5).toFixed(2),
            roe: (Math.random() * 30).toFixed(1),
            debtToEquity: (Math.random() * 2).toFixed(2),
            pe: (Math.random() * 40 + 5).toFixed(1),
            score: Math.floor(Math.random() * 40 + 60),
            lastUpdated: new Date(),
            isMock: true
        });
    }
    
    return stocks.sort((a, b) => b.score - a.score);
}

function getStockName(symbol) {
    const stockNames = {
        'AAPL': 'Apple Inc.',
        'MSFT': 'Microsoft Corp',
        'GOOGL': 'Alphabet Inc',
        'AMZN': 'Amazon.com Inc',
        'META': 'Meta Platforms Inc',
        'TSLA': 'Tesla Inc',
        'NVDA': 'NVIDIA Corp',
        'BRK-B': 'Berkshire Hathaway',
        'BRK.B': 'Berkshire Hathaway',
        'KO': 'Coca-Cola Co',
        'XOM': 'Exxon Mobil Corp',
        'BAC': 'Bank of America',
        'AXP': 'American Express',
        'COST': 'Costco Wholesale',
        'WFC': 'Wells Fargo',
        'JNJ': 'Johnson & Johnson',
        'PG': 'Procter & Gamble',
        'JPM': 'JPMorgan Chase',
        'MCO': 'Moody\'s Corp',
        'BABA': 'Alibaba Group',
        'DJCO': 'Daily Journal Corp',
        'COF': 'Capital One Financial',
        'USB': 'U.S. Bancorp',
        'GE': 'General Electric',
        'CVX': 'Chevron Corp',
        'IBM': 'IBM Corp',
        'MMM': '3M Company',
        'T': 'AT&T Inc',
        'OXY': 'Occidental Petroleum',
        'VZ': 'Verizon Communications',
        // 추가 종목
        'HD': 'Home Depot Inc',
        'NKE': 'Nike Inc',
        'SBUX': 'Starbucks Corp',
        'TGT': 'Target Corp',
        'LOW': 'Lowe\'s Companies',
        'BKNG': 'Booking Holdings',
        'ORLY': 'O\'Reilly Automotive',
        'CHTR': 'Charter Communications',
        'GLD': 'SPDR Gold Trust',
        'TLT': 'iShares 20+ Treasury',
        'SPY': 'SPDR S&P 500 ETF',
        'IEF': 'iShares 7-10Y Treasury',
        'VTIP': 'Vanguard TIPS ETF',
        'DBC': 'Invesco DB Commodity',
        'VWO': 'Vanguard Emerging Markets',
        'BNDX': 'Vanguard Total Intl Bond',
        'EMB': 'iShares JP Morgan USD EM Bond',
        'LQD': 'iShares iBoxx IG Corporate',
        'EEM': 'iShares MSCI Emerging',
        'FXI': 'iShares China Large-Cap',
        'EWZ': 'iShares MSCI Brazil',
        'SLV': 'iShares Silver Trust',
        'UUP': 'Invesco DB USD Index',
        'EWJ': 'iShares MSCI Japan',
        'RSX': 'VanEck Russia ETF',
        'EFA': 'iShares MSCI EAFE',
        'VEA': 'Vanguard Developed Markets',
        'IEMG': 'iShares Core MSCI Emerging',
        'EWG': 'iShares MSCI Germany',
        'EWU': 'iShares MSCI United Kingdom',
        'EWQ': 'iShares MSCI France',
        'EWC': 'iShares MSCI Canada',
        'EWA': 'iShares MSCI Australia',
        'ADBE': 'Adobe Inc',
        'ASML': 'ASML Holding',
        'ISRG': 'Intuitive Surgical',
        'INTU': 'Intuit Inc',
        'AMGN': 'Amgen Inc',
        'GILD': 'Gilead Sciences',
        'TMO': 'Thermo Fisher Scientific',
        'IDXX': 'IDEXX Laboratories',
        'XRX': 'Xerox Holdings',
        'MCD': 'McDonald\'s Corp',
        'EBAY': 'eBay Inc',
        'NFLX': 'Netflix Inc',
        'FCX': 'Freeport-McMoRan',
        'HLF': 'Herbalife Nutrition',
        'LNG': 'Cheniere Energy',
        'QQQ': 'Invesco QQQ Trust',
        'IWM': 'iShares Russell 2000'
    };
    return stockNames[symbol] || `Stock (${symbol})`;
}

async function getInvestorStocksData(investorId) {
    try {
        // 캐시에서 데이터 확인
        const cached = getCachedStocks(investorId);
        if (cached && cached.length > 0) {
            console.log(`캐시에서 ${investorId} 데이터 로드됨`);
            return cached;
        }
        
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
        
        // 데이터가 있으면 캐시에 저장
        if (stocks && stocks.length > 0) {
            setCachedStocks(investorId, stocks);
            return stocks;
        }
        
        // 기본 목 데이터 반환
        return defaultMockStocks[investorId] || generateMockStocks(investorId, 10);
    } catch (error) {
        console.error(`${investorId} 투자자의 종목 데이터 가져오기 오류:`, error);
        // 기본 목 데이터 반환
        return defaultMockStocks[investorId] || generateMockStocks(investorId, 10);
    }
}

function getAllInvestors() {
    return Object.values(investorsData).map(investor => {
        // 기본값 설정으로 undefined 방지
        return {
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            ...investor
        };
    });
}

function getInvestorData(investorId) {
    const investor = investorsData[investorId];
    if (!investor) return null;
    
    // 기본값 설정으로 undefined 방지
    return {
        id: investor.id || 'unknown',
        name: investor.name || '투자자',
        philosophy: investor.philosophy || '정보가 없습니다.',
        quote: investor.quote || '정보가 없습니다.',
        image: investor.image || '/images/default-investor.png',
        ...investor
    };
}

function getInvestorsForMainPage() {
    return Object.values(investorsData).map(investor => {
        return {
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            metrics: investor.metrics || [],
            stockCandidates: investor.stockCandidates || [],
            useFullScreening: investor.useFullScreening || false,
            topStocks: defaultMockStocks[investor.id] ? defaultMockStocks[investor.id].slice(0, 3) : []
        };
    });
}

async function loadAllInvestorsWithStocks() {
    try {
        const investorIds = Object.keys(investorsData);
        
        const investorsWithStocks = await Promise.all(
            investorIds.map(async (id) => {
                const investor = {
                    id: investorsData[id].id || 'unknown',
                    name: investorsData[id].name || '투자자',
                    philosophy: investorsData[id].philosophy || '정보가 없습니다.',
                    quote: investorsData[id].quote || '정보가 없습니다.',
                    image: investorsData[id].image || '/images/default-investor.png',
                    ...investorsData[id]
                };
                
                const cached = getCachedStocks(id);
                if (cached && cached.length > 0) {
                    investor.topStocks = cached.slice(0, 3);
                } else {
                    investor.topStocks = defaultMockStocks[id] ? defaultMockStocks[id].slice(0, 3) : [];
                }
                
                getInvestorStocksData(id).then(stocks => {
                    if (stocks && stocks.length > 0) {
                        investor.topStocks = stocks.slice(0, 3);
                    }
                }).catch(err => console.error(err));
                
                return investor;
            })
        );
        
        return investorsWithStocks;
    } catch (error) {
        console.error('투자자 데이터 로딩 중 오류 발생:', error);
        return Object.values(investorsData).map(investor => ({
            id: investor.id || 'unknown',
            name: investor.name || '투자자',
            philosophy: investor.philosophy || '정보가 없습니다.',
            quote: investor.quote || '정보가 없습니다.',
            image: investor.image || '/images/default-investor.png',
            ...investor,
            topStocks: defaultMockStocks[investor.id] ? defaultMockStocks[investor.id].slice(0, 3) : []
        }));
    }
}

window.InvestorData = {
    getInvestorData,
    getAllInvestors,
    getInvestorsForMainPage,
    getInvestorStocksData,
    loadAllInvestorsWithStocks
};

