// 투자자 상세 데이터 (10명 모두 완전히 채움)
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
            { id: 'roe', name: 'ROE(%)', description: '15% 이상', weight: 30 },
            { id: 'debtToEquity', name: '부채비율', description: '1.0x 이하', weight: 25 },
            { id: 'pe', name: 'P/E', description: '업종 평균 대비 낮음', weight: 20 },
            { id: 'cashFlow', name: '현금흐름', description: '안정적 운영현금흐름', weight: 15 },
            { id: 'buyback', name: '자사주매입', description: '지속적 감소', weight: 10 }
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
        stockCandidates: ['AAPL', 'BRK-B', 'KO', 'BAC', 'AXP', 'MCO', 'AMZN', 'CVX'],
        strategy: `<h4>워렌 버핏의 투자 철학</h4>
        <p>워렌 버핏은 벤자민 그레이엄의 가치 투자 원칙을 자신만의 방식으로 발전시켰습니다. 그는 "너무 비싸지 않은 가격에 훌륭한 기업을 구매하라"는 철학을 가지고 있습니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>기업의 본질 가치 분석:</strong> 버핏은 주가의 단기적 움직임보다 기업의 본질적 가치에 집중합니다. 그는 수익성, 성장성, 부채 수준 등 기업의 재무 건전성을 철저히 분석합니다.</li>
            <li><strong>장기적 관점:</strong> 버핏은 최소 10년 이상의 장기 관점에서 투자를 고려합니다. 그는 "주식을 산다는 것은 그 기업의 사업을 산다는 것"이라고 믿습니다.</li>
            <li><strong>경제적 해자:</strong> 경쟁사가 쉽게 진입하기 어려운 경쟁 우위(경제적 해자)를 가진 기업을 선호합니다.</li>
        </ul>`
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
            { id: 'roic', name: 'ROIC(%)', description: '15% 이상', weight: 40 },
            { id: 'fcfYield', name: 'FCF Yield(%)', description: '8% 이상', weight: 25 },
            { id: 'peg', name: 'PEG', description: '1.0 이하', weight: 20 },
            { id: 'dividend', name: '배당성향(%)', description: '50% 이상', weight: 15 }
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
        stockCandidates: ['COST', 'BAC', 'BRK-B', 'WFC', 'AAPL', 'BABA'],
        strategy: `<h4>찰리 멍거의 투자 철학</h4>
        <p>멍거는 심리학, 경제학, 물리학 등 다양한 학문의 핵심 원리를 활용한 멘탈 모델을 통해 투자 결정을 내립니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>멘탈 모델:</strong> 다양한 학문의 원리를 활용해 복잡한 문제를 분석합니다.</li>
            <li><strong>역발상 투자:</strong> 대중의 생각과 반대로 가는 투자 결정을 내리는 용기를 강조합니다.</li>
            <li><strong>집중 투자:</strong> 소수의 훌륭한 기업에 집중 투자하는 전략을 선호합니다.</li>
        </ul>`
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
            { id: 'pb', name: 'P/B', description: '1.0 이하', weight: 35 },
            { id: 'currentRatio', name: '유동비율', description: '2.0 이상', weight: 30 },
            { id: 'evEbitda', name: 'EV/EBITDA', description: '10 이하', weight: 25 },
            { id: 'dividendYield', name: '배당수익률(%)', description: '5% 이상', weight: 10 }
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
        stockCandidates: ['JNJ', 'PG', 'KO', 'XOM', 'JPM', 'GE'],
        strategy: `<h4>벤저민 그레이엄의 투자 철학</h4>
        <p>그레이엄은 안전마진 개념을 통해 투자와 투기를 명확히 구분했습니다. 기업의 내재가치보다 낮은 가격에 매수하는 원칙을 강조했습니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>안전마진:</strong> 기업의 내재가치보다 30~50% 할인된 가격에 매수합니다.</li>
            <li><strong>분산투자:</strong> 위험 관리를 위해 30개 이상의 종목에 분산투자를 권장합니다.</li>
            <li><strong>재무안정성:</strong> 부채비율이 낮고 유동성이 높은 기업을 선호합니다.</li>
        </ul>`
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
            { id: 'peg', name: 'PEG', description: '1.0 이하', weight: 35 },
            { id: 'epsGrowth', name: 'EPS 성장률(%)', description: '20% 이상', weight: 30 },
            { id: 'debtToEquity', name: '부채비율', description: '0.5x 이하', weight: 20 },
            { id: 'consistency', name: '실적 일관성', description: '5년 연속 성장', weight: 10 },
            { id: 'industry', name: '산업 매력도', description: '성장 산업', weight: 5 }
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
        strategy: `<h4>피터 린치의 투자 철학</h4>
        <p>일반인들도 전문가만큼 좋은 수익을 낼 수 있다고 믿었으며, 자신이 잘 아는 분야에 투자하라고 조언했습니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>당신이 알고 있는 것에 투자:</strong> 평소 자신이 사용하고 경험한 제품과 서비스에 투자하세요.</li>
            <li><strong>현장 조사:</strong> 직접 매장을 방문하고 제품을 사용해보며 투자 기회를 발견하세요.</li>
            <li><strong>장기 성장성:</strong> 성장 가능성이 높은 기업을 찾되, 과대평가된 기업은 피하세요.</li>
        </ul>`
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
            { id: 'correlation', name: '자산 상관관계', description: '낮은 상관관계', weight: 30 },
            { id: 'riskParity', name: '리스크 패리티', description: '리스크 균형', weight: 25 },
            { id: 'inflation', name: '인플레이션 민감도', description: '인플레이션 대응', weight: 20 },
            { id: 'economic', name: '경기 순환 포지션', description: '경기 대응', weight: 15 },
            { id: 'volatility', name: '변동성', description: '낮은 변동성', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'correlation', name: '상관관계', sortable: true },
            { id: 'volatility', name: '변동성(%)', sortable: true },
            { id: 'inflation', name: '인플레이션 민감도', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['GLD', 'TLT', 'SPY', 'IEF', 'VTIP', 'DBC', 'VWO', 'BNDX', 'EMB', 'LQD'],
        strategy: `<h4>레이 달리오의 투자 철학</h4>
        <p>달리오는 경제 주기와 자산 클래스 간의 상관관계를 기반으로 모든 경제 환경에서 작동하는 포트폴리오를 구축합니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>올웨더 전략:</strong> 인플레이션, 디플레이션, 성장, 침체 등 모든 경제 환경에 대비하는 포트폴리오를 구성합니다.</li>
            <li><strong>리스크 패리티:</strong> 각 자산이 포트폴리오 위험에 동일하게 기여하도록 배분합니다.</li>
            <li><strong>분산투자:</strong> 상관관계가 낮은 자산들을 결합하여 포트폴리오 변동성을 낮춥니다.</li>
        </ul>`
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
            { id: 'macro', name: '거시경제 트렌드', description: '글로벌 변화 감지', weight: 35 },
            { id: 'momentum', name: '모멘텀 강도', description: '추세 강도', weight: 25 },
            { id: 'sentiment', name: '시장 감성', description: '투자자 심리', weight: 20 },
            { id: 'policy', name: '정책 영향', description: '정부/중앙은행 정책', weight: 15 },
            { id: 'liquidity', name: '유동성', description: '높은 거래량', weight: 5 }
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
        strategy: `<h4>조지 소로스의 투자 철학</h4>
        <p>소로스는 '반사성 이론'을 통해 시장 참여자들의 행동이 시장 자체에 영향을 미치고, 이것이 다시 참여자들의 행동에 영향을 미치는 피드백 루프를 분석합니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>거시경제 트렌드 파악:</strong> 글로벌 경제, 정치, 사회 변화를 분석하여 큰 투자 기회를 찾습니다.</li>
            <li><strong>추세 추종:</strong> 시장 추세를 파악하고 그 흐름에 따라 투자합니다.</li>
            <li><strong>변화 감지:</strong> 시장 감성이나 정책 변화의 초기 신호를 빠르게 포착합니다.</li>
        </ul>`
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
            { id: 'global', name: '글로벌 분산투자', description: '국가/지역 분산', weight: 30 },
            { id: 'peGrowth', name: 'P/E 대비 성장률', description: '저평가 성장', weight: 25 },
            { id: 'macro', name: '거시경제 환경', description: '국가별 펀더멘털', weight: 20 },
            { id: 'contrarian', name: '역발상 지표', description: '과도한 비관/낙관', weight: 15 },
            { id: 'dividendGrowth', name: '배당 성장률', description: '배당 증가', weight: 10 }
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
        strategy: `<h4>존 템플턴의 투자 철학</h4>
        <p>템플턴은 글로벌 관점에서 가치 투자를 실천했으며, 특히 어려움에 처한 시장이나 산업에서 기회를 찾는 역발상 투자자였습니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>글로벌 가치 투자:</strong> 전 세계 시장에서 저평가된 기업을 찾습니다.</li>
            <li><strong>역발상 투자:</strong> 과도한 공포나 비관론이 지배하는 시장에서 기회를 찾습니다.</li>
            <li><strong>장기 투자:</strong> 단기 변동성보다 장기적인 가치 창출에 집중합니다.</li>
        </ul>`
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
            { id: 'growth', name: '성장 잠재력', description: '높은 장기 성장', weight: 30 },
            { id: 'rnd', name: 'R&D 투자 효율성', description: '효율적 연구개발', weight: 25 },
            { id: 'management', name: '경영진 능력', description: '뛰어난 경영진', weight: 20 },
            { id: 'moat', name: '경쟁우위', description: '지속가능한 비즈니스', weight: 15 },
            { id: 'margins', name: '이익률 추세', description: '개선되는 이익률', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'growth', name: '성장률(%)', sortable: true },
            { id: 'rnd', name: 'R&D 비율(%)', sortable: true },
            { id: 'margins', name: '이익률(%)', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['GOOGL', 'ADBE', 'NVDA', 'ASML', 'ISRG', 'INTU', 'AMGN', 'GILD', 'TMO', 'IDXX'],
        strategy: `<h4>필립 피셔의 투자 철학</h4>
        <p>피셔는 기업의 질적 요소와 성장 잠재력을 중시했으며, 깊이 있는 조사(scuttlebutt)를 통해 투자 결정을 내렸습니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>질적 분석:</strong> 재무제표를 넘어 기업 문화, 경영진 능력, 혁신 역량 등을 평가합니다.</li>
            <li><strong>깊이 있는 조사:</strong> 업계 관계자, 고객, 공급업체 등을 통해 기업에 대한 다양한 관점을 수집합니다.</li>
            <li><strong>장기 보유:</strong> 우수한 기업은 장기간 보유하며, 매각 기준을 엄격하게 적용합니다.</li>
        </ul>`
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
            { id: 'navDiscount', name: '자산가치 할인율', description: '순자산 대비 할인', weight: 30 },
            { id: 'shareholder', name: '주주환원 잠재력', description: '자사주/배당 확대', weight: 25 },
            { id: 'governance', name: '지배구조 개선여지', description: '경영진 교체', weight: 20 },
            { id: 'breakup', name: '사업부 분할가치', description: '분할 시 가치 상승', weight: 15 },
            { id: 'fcf', name: '잉여현금흐름', description: '높은 FCF 비율', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'navDiscount', name: 'NAV 할인율(%)', sortable: true },
            { id: 'fcfYield', name: 'FCF 수익률(%)', sortable: true },
            { id: 'governance', name: '지배구조 점수', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['XRX', 'CVX', 'MCD', 'EBAY', 'NFLX', 'AAPL', 'FCX', 'HLF', 'LNG', 'OXY'],
        strategy: `<h4>칼 아이칸의 투자 철학</h4>
        <p>아이칸은 저평가된 기업에 투자한 후, 경영 참여를 통해 주주 가치를 높이는 액티비스트 투자자입니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>저평가 기업 발굴:</strong> 자산가치 대비 저평가된 기업을 찾습니다.</li>
            <li><strong>경영 참여:</strong> 이사회 의석 확보, CEO 교체, 구조조정 등을 통해 기업 가치를 개선합니다.</li>
            <li><strong>주주환원 강화:</strong> 자사주 매입, 배당 확대, 사업부 분할 등을 통한 가치 상승을 추구합니다.</li>
        </ul>`
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
            { id: 'anomaly', name: '통계적 시장이상현상', description: '가격 비효율성', weight: 35 },
            { id: 'momentum', name: '모멘텀 지표', description: '가격/실적 모멘텀', weight: 25 },
            { id: 'volatility', name: '변동성 특성', description: '변동성 패턴', weight: 15 },
            { id: 'liquidity', name: '유동성 지표', description: '거래량/깊이', weight: 15 },
            { id: 'seasonal', name: '계절성 패턴', description: '반복적 패턴', weight: 10 }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'momentum', name: '모멘텀 점수', sortable: true },
            { id: 'volatility', name: '변동성 점수', sortable: true },
            { id: 'anomaly', name: '이상치 점수', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stockCandidates: ['SPY', 'QQQ', 'IWM', 'EFA', 'LQD', 'AMZN', 'MSFT', 'NVDA', 'AAPL', 'ASML'],
        strategy: `<h4>짐 사이먼스의 투자 철학</h4>
        <p>사이먼스는 수학과 통계학을 활용한 알고리즘 기반 트레이딩 전략을 개발했으며, 시장의 비효율성을 찾아내는 퀀트 투자의 선구자입니다.</p>
        
        <h4>주요 투자 전략</h4>
        <ul>
            <li><strong>패턴 인식:</strong> 방대한 데이터에서 통계적으로 유의미한 패턴을 찾아냅니다.</li>
            <li><strong>단기 거래:</strong> 작은 이익을 빠르게 확보하는 고빈도 거래 전략을 활용합니다.</li>
            <li><strong>감정 배제:</strong> 인간의 감정과 편향을 배제한 알고리즘 기반 의사결정을 중시합니다.</li>
        </ul>`
    }
};

// 기본 목 데이터 (모든 투자자 포함)
const defaultMockStocks = {
    'warren-buffett': [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.5, roe: 42.3, debtToEquity: 0.4, pe: 29.8, cashFlow: 58.2, buyback: 3.1, score: 92, isMock: true, lastUpdated: new Date() },
        { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, roe: 35.7, debtToEquity: 0.6, pe: 25.1, cashFlow: 42.5, buyback: 1.8, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roe: 10.5, debtToEquity: 0.2, pe: 15.8, cashFlow: 64.3, buyback: 2.5, score: 90, isMock: true, lastUpdated: new Date() }
    ],
    'charlie-munger': [
        { symbol: 'COST', name: 'Costco Wholesale', price: 732.35, change: 0.9, roic: 28.5, fcfYield: 4.3, peg: 1.2, dividend: 45.2, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'BRK-B', name: 'Berkshire Hathaway', price: 425.60, change: 1.1, roic: 10.5, fcfYield: 3.8, peg: 1.1, dividend: 0, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'BABA', name: 'Alibaba Group', price: 85.20, change: -0.5, roic: 15.2, fcfYield: 7.5, peg: 0.8, dividend: 25.1, score: 84, isMock: true, lastUpdated: new Date() }
    ],
    'benjamin-graham': [
        { symbol: 'JNJ', name: 'Johnson & Johnson', price: 152.80, change: 0.2, pb: 0.8, currentRatio: 2.3, evEbitda: 9.2, dividendYield: 5.2, score: 88, isMock: true, lastUpdated: new Date() },
        { symbol: 'PG', name: 'Procter & Gamble', price: 165.30, change: 0.7, pb: 1.2, currentRatio: 1.9, evEbitda: 11.5, dividendYield: 4.1, score: 84, isMock: true, lastUpdated: new Date() },
        { symbol: 'KO', name: 'Coca-Cola Co', price: 64.25, change: 0.8, pb: 0.6, currentRatio: 2.1, evEbitda: 8.7, dividendYield: 5.8, score: 83, isMock: true, lastUpdated: new Date() }
    ],
    'peter-lynch': [
        { symbol: 'AMZN', name: 'Amazon.com Inc', price: 185.40, change: 2.1, peg: 1.1, epsGrowth: 32.5, debtToEquity: 0.3, consistency: 4, industry: 5, score: 91, isMock: true, lastUpdated: new Date() },
        { symbol: 'COST', name: 'Costco Wholesale', price: 732.35, change: 0.9, peg: 0.9, epsGrowth: 25.3, debtToEquity: 0.4, consistency: 5, industry: 4, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'NKE', name: 'Nike Inc', price: 102.75, change: -0.3, peg: 1.2, epsGrowth: 18.5, debtToEquity: 0.5, consistency: 3, industry: 4, score: 86, isMock: true, lastUpdated: new Date() }
    ],
    'ray-dalio': [
        { symbol: 'GLD', name: 'SPDR Gold Trust', price: 214.85, change: 0.5, correlation: -0.3, riskParity: 4.2, inflation: 0.8, economic: 3.5, volatility: 12.5, score: 90, isMock: true, lastUpdated: new Date() },
        { symbol: 'TLT', name: 'iShares 20+ Treasury', price: 98.40, change: -0.2, correlation: -0.5, riskParity: 3.8, inflation: -0.6, economic: 2.8, volatility: 15.2, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 515.20, change: 0.8, correlation: 0.1, riskParity: 3.5, inflation: 0.2, economic: 4.2, volatility: 14.8, score: 85, isMock: true, lastUpdated: new Date() }
    ],
    'george-soros': [
        { symbol: 'EEM', name: 'iShares MSCI Emerging', price: 42.80, change: -1.2, macro: 4.5, momentum: 0.3, sentiment: 3.2, policy: 3.8, liquidity: 0.9, score: 88, isMock: true, lastUpdated: new Date() },
        { symbol: 'GLD', name: 'SPDR Gold Trust', price: 214.85, change: 0.5, macro: 4.2, momentum: 0.6, sentiment: 3.5, policy: 4.1, liquidity: 0.8, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'FXI', name: 'iShares China Large-Cap', price: 28.45, change: -2.1, macro: 3.8, momentum: -0.2, sentiment: 2.5, policy: 3.2, liquidity: 0.7, score: 83, isMock: true, lastUpdated: new Date() }
    ],
    'john-templeton': [
        { symbol: 'EFA', name: 'iShares MSCI EAFE ETF', price: 78.90, change: 0.6, global: 4.8, peGrowth: 0.9, macro: 3.7, contrarian: 4.2, dividendGrowth: 5.2, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'EWJ', name: 'iShares MSCI Japan ETF', price: 65.40, change: 0.8, global: 4.2, peGrowth: 0.8, macro: 3.5, contrarian: 3.8, dividendGrowth: 4.5, score: 86, isMock: true, lastUpdated: new Date() },
        { symbol: 'EWG', name: 'iShares MSCI Germany ETF', price: 30.75, change: 0.2, global: 4.5, peGrowth: 0.7, macro: 3.2, contrarian: 4.1, dividendGrowth: 6.8, score: 84, isMock: true, lastUpdated: new Date() }
    ],
    'philip-fisher': [
        { symbol: 'GOOGL', name: 'Alphabet Inc', price: 172.90, change: 1.2, growth: 18.5, rnd: 15.3, management: 4.5, moat: 4.8, margins: 28.7, score: 93, isMock: true, lastUpdated: new Date() },
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 950.40, change: 2.8, growth: 32.5, rnd: 20.5, management: 4.7, moat: 4.5, margins: 42.3, score: 91, isMock: true, lastUpdated: new Date() },
        { symbol: 'ASML', name: 'ASML Holding', price: 1045.20, change: 1.5, growth: 25.2, rnd: 18.7, management: 4.8, moat: 4.9, margins: 35.4, score: 89, isMock: true, lastUpdated: new Date() }
    ],
    'carl-icahn': [
        { symbol: 'XRX', name: 'Xerox Holdings', price: 16.45, change: -0.3, navDiscount: 42.5, shareholder: 3.2, governance: 4.2, breakup: 3.8, fcf: 8.5, score: 87, isMock: true, lastUpdated: new Date() },
        { symbol: 'OXY', name: 'Occidental Petroleum', price: 62.45, change: -1.2, navDiscount: 35.2, shareholder: 3.5, governance: 5.1, breakup: 3.2, fcf: 12.3, score: 85, isMock: true, lastUpdated: new Date() },
        { symbol: 'CVX', name: 'Chevron Corp', price: 155.30, change: -0.8, navDiscount: 28.7, shareholder: 3.9, governance: 6.3, breakup: 2.8, fcf: 9.5, score: 82, isMock: true, lastUpdated: new Date() }
    ],
    'jim-simons': [
        { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 515.20, change: 0.8, anomaly: 0.8, momentum: 0.7, volatility: 0.3, liquidity: 0.9, seasonal: 0.6, score: 92, isMock: true, lastUpdated: new Date() },
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: 950.40, change: 2.8, anomaly: 0.7, momentum: 0.9, volatility: 0.6, liquidity: 0.8, seasonal: 0.4, score: 89, isMock: true, lastUpdated: new Date() },
        { symbol: 'MSFT', name: 'Microsoft Corp', price: 425.60, change: 1.5, anomaly: 0.9, momentum: 0.6, volatility: 0.2, liquidity: 0.9, seasonal: 0.5, score: 87, isMock: true, lastUpdated: new Date() }
    ]
};

// 캐시 관련 함수들
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

// 투자자 데이터 관련 함수들
function getInvestorData(id) {
    return investorsData[id] || null;
}

function getAllInvestors() {
    return Object.values(investorsData);
}

function getInvestorsForMainPage() {
    return Object.values(investorsData).map(investor => ({
        id: investor.id,
        name: investor.name,
        philosophy: investor.philosophy,
        quote: investor.quote,
        image: investor.image,
        metrics: investor.metrics,
        stockCandidates: investor.stockCandidates,
        useFullScreening: investor.useFullScreening || false,
        topStocks: defaultMockStocks[investor.id]?.slice(0, 3) || []
    }));
}

async function getInvestorStocksData(investorId) {
    try {
        // 캐시 확인
        const cached = getCachedStocks(investorId);
        if (cached) return cached;

        // API 호출
        if (window.StockAPI) {
            const stocks = await window.StockAPI.getStocksByInvestor(investorId);
            if (stocks?.length) {
                setCachedStocks(investorId, stocks);
                return stocks;
            }
        }
        
        // 기본 목 데이터 반환
        return defaultMockStocks[investorId] || [];
    } catch (error) {
        console.error(`${investorId} 투자자의 종목 데이터 가져오기 오류:`, error);
        return defaultMockStocks[investorId] || [];
    }
}

async function loadAllInvestorsWithStocks() {
    try {
        const investors = getAllInvestors();
        for (const investor of investors) {
            // 캐시 또는 목 데이터 사용
            const cached = getCachedStocks(investor.id);
            investor.topStocks = cached?.slice(0, 3) || defaultMockStocks[investor.id]?.slice(0, 3) || [];
            
            // 비동기로 API 호출 시도
            if (window.StockAPI) {
                try {
                    const stocks = await window.StockAPI.getStocksByInvestor(investor.id);
                    if (stocks?.length) {
                        investor.topStocks = stocks.slice(0, 3);
                        setCachedStocks(investor.id, stocks);
                    }
                } catch (e) {
                    console.error(`${investor.id} 데이터 로드 실패:`, e);
                }
            }
        }
        return investors;
    } catch (error) {
        console.error('투자자 데이터 로딩 중 오류 발생:', error);
        return getAllInvestors();
    }
}

// window.InvestorData 등록 (반드시 필요)
window.InvestorData = {
    getInvestorData,
    getAllInvestors,
    getInvestorsForMainPage,
    getInvestorStocksData,
    loadAllInvestorsWithStocks
};
