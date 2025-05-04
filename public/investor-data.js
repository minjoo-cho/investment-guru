// 투자자 상세 데이터
const investorsData = {
    'warren-buffett': {
        id: 'warren-buffett',
        name: '워렌 버핏',
        philosophy: '기업의 본질적 가치에 집중하는 가치투자의 대가',
        quote: '다른 사람들이 두려워할 때 욕심내고, 다른 사람들이 욕심낼 때 두려워하라.',
        image: 'images/warren-buffett.png',
        metrics: [
            {
                name: 'ROE (자기자본이익률)',
                description: '15% 이상의 ROE를 가진 기업을 선호합니다. 이는 기업이 주주 자본을 얼마나 효율적으로 활용하는지 보여줍니다.'
            },
            {
                name: '경제적 해자 (Economic Moat)',
                description: '경쟁사가 쉽게 침투하기 어려운 경쟁우위를 가진 기업을 선호합니다. 브랜드 파워, 네트워크 효과, 전환 비용 등이 포함됩니다.'
            },
            {
                name: '낮은 부채 비율',
                description: '부채가 적은 기업을 선호합니다. 재무 건전성이 강한 기업이 경제 위기 상황에서도 생존할 가능성이 높습니다.'
            },
            {
                name: '이해하기 쉬운 비즈니스 모델',
                description: '단순하고 이해하기 쉬운 비즈니스 모델을 가진 기업을 선호합니다. 버핏은 자신이 이해하지 못하는 기업에는 투자하지 않습니다.'
            },
            {
                name: '장기 성장 가능성',
                description: '단기적인 이익보다 장기적인 성장 가능성을 중시합니다. 10년, 20년 후에도 성장할 수 있는 기업을 찾습니다.'
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
        stocks: [
            { symbol: 'AAPL', name: '애플', price: 184.92, change: 2.3, roe: 127.2, debtToEquity: 1.76, pe: 30.4, score: 95 },
            { symbol: 'BRK-B', name: '버크셔 해서웨이', price: 408.76, change: 1.5, roe: 8.6, debtToEquity: 0.24, pe: 27.9, score: 92 },
            { symbol: 'KO', name: '코카콜라', price: 62.81, change: -0.7, roe: 40.5, debtToEquity: 1.38, pe: 26.3, score: 88 },
            { symbol: 'AMZN', name: '아마존', price: 183.26, change: 1.7, roe: 17.1, debtToEquity: 0.62, pe: 82.4, score: 86 },
            { symbol: 'MCO', name: "무디스", price: 415.27, change: 0.3, roe: 532.1, debtToEquity: 8.16, pe: 45.1, score: 85 },
            { symbol: 'AXP', name: '아메리칸 익스프레스', price: 235.26, change: 1.2, roe: 31.9, debtToEquity: 1.68, pe: 17.3, score: 84 },
            { symbol: 'BAC', name: '뱅크 오브 아메리카', price: 39.69, change: -0.9, roe: 10.5, debtToEquity: 1.69, pe: 11.0, score: 82 },
            { symbol: 'DVA', name: '다비타', price: 139.55, change: 0.6, roe: 36.5, debtToEquity: 9.16, pe: 18.6, score: 79 },
            { symbol: 'VZ', name: '버라이즌', price: 40.89, change: -0.3, roe: 22.2, debtToEquity: 1.73, pe: 15.6, score: 78 },
            { symbol: 'CVX', name: '셰브론', price: 153.18, change: 1.1, roe: 16.0, debtToEquity: 0.15, pe: 14.9, score: 77 },
            { symbol: 'KHC', name: '크래프트 하인즈', price: 36.98, change: -0.4, roe: 3.9, debtToEquity: 0.39, pe: 16.2, score: 76 },
            { symbol: 'CE', name: '셀라니즈', price: 142.61, change: 0.8, roe: 17.4, debtToEquity: 1.62, pe: 8.0, score: 75 },
            { symbol: 'GM', name: '제너럴 모터스', price: 45.70, change: 1.6, roe: 11.6, debtToEquity: 1.86, pe: 5.6, score: 74 },
            { symbol: 'PG', name: '프록터앤갬블', price: 162.35, change: 0.5, roe: 26.8, debtToEquity: 0.61, pe: 26.4, score: 73 },
            { symbol: 'OXY', name: '옥시덴탈 페트롤리엄', price: 59.75, change: 2.1, roe: 26.7, debtToEquity: 0.90, pe: 13.3, score: 73 },
            { symbol: 'PARA', name: '파라마운트', price: 12.00, change: -1.7, roe: 5.2, debtToEquity: 0.75, pe: 0.0, score: 72 },
            { symbol: 'HPQ', name: 'HP Inc.', price: 34.85, change: 0.1, roe: -102.4, debtToEquity: -7.6, pe: 11.2, score: 72 },
            { symbol: 'NUE', name: '뉴코', price: 178.46, change: 3.2, roe: 15.8, debtToEquity: 0.34, pe: 10.8, score: 71 },
            { symbol: 'SNOW', name: '스노우플레이크', price: 180.76, change: 4.6, roe: -12.8, debtToEquity: 0.11, pe: 0.0, score: 70 },
            { symbol: 'USB', name: 'US 뱅코프', price: 42.16, change: -0.8, roe: 9.7, debtToEquity: 0.96, pe: 14.1, score: 69 }
        ],
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
    'peter-lynch': {
        id: 'peter-lynch',
        name: '피터 린치',
        philosophy: '일상에서 발견할 수 있는 성장 기업을 발굴하는 전략가',
        quote: '주식을 지금 사야 할지 고민 중이라면, 그건 안 사는 게 맞다.',
        image: 'https://via.placeholder.com/180',
        metrics: [
            {
                name: 'PEG 비율 (P/E to Growth)',
                description: 'P/E 비율을 예상 성장률로 나눈 값입니다. 린치는 PEG가 1.0 이하인 기업을 선호했습니다.'
            },
            {
                name: '매출 성장률',
                description: '지속적이고 안정적인 매출 성장을 보이는 기업을 선호했습니다. 특히 새로운 시장에 진출하는 성장 기업을 중시했습니다.'
            },
            {
                name: '부채 대비 현금 흐름',
                description: '건전한 현금 흐름을 가진 기업, 특히 부채 대비 충분한 현금 흐름을 가진 기업을 선호했습니다.'
            },
            {
                name: '재고 회전율',
                description: '효율적인 재고 관리를 하는 기업을 선호했습니다. 재고가 빠르게 판매되는 기업은 더 효율적으로 운영되고 있다는 신호입니다.'
            },
            {
                name: '주주 친화적 정책',
                description: '배당금 지급이나 주식 환매와 같은 주주 친화적 정책을 시행하는 기업을 선호했습니다.'
            }
        ],
        stockColumns: [
            { id: 'rank', name: '순위', sortable: true },
            { id: 'symbol', name: '티커', sortable: true },
            { id: 'name', name: '종목명', sortable: true },
            { id: 'price', name: '현재가($)', sortable: true },
            { id: 'change', name: '변동(%)', sortable: true },
            { id: 'growthRate', name: '성장률(%)', sortable: true },
            { id: 'peg', name: 'PEG', sortable: true },
            { id: 'debtToEbitda', name: '부채/EBITDA', sortable: true },
            { id: 'score', name: '종합점수', sortable: true, highlight: true }
        ],
        stocks: [
            { symbol: 'SBUX', name: '스타벅스', price: 97.25, change: 1.8, growthRate: 12.5, peg: 0.9, debtToEbitda: 1.2, score: 94 },
            { symbol: 'COST', name: '코스트코', price: 732.88, change: 2.2, growthRate: 8.7, peg: 1.1, debtToEbitda: 1.5, score: 91 },
            { symbol: 'TGT', name: '타겟', price: 156.42, change: 0.5, growthRate: 4.1, peg: 1.8, debtToEbitda: 2.1, score: 87 },
            { symbol: 'LULU', name: '룰루레몬', price: 301.75, change: 3.2, growthRate: 15.2, peg: 1.3, debtToEbitda: 1.1, score: 86 },
            { symbol: 'CMG', name: '치포틀레', price: 2841.67, change: 1.7, growthRate: 14.3, peg: 1.2, debtToEbitda: 0.7, score: 85 },
            { symbol: 'DPZ', name: '도미노피자', price: 417.79, change: 0.8, growthRate: 7.5, peg: 1.7, debtToEbitda: 3.2, score: 84 },
            { symbol: 'DG', name: '달러 제너럴', price: 150.30, change: -1.2, growthRate: 5.8, peg: 1.9, debtToEbitda: 2.0, score: 83 },
            { symbol: 'ULTA', name: '울타 뷰티', price: 458.90, change: 2.5, growthRate: 9.8, peg: 1.4, debtToEbitda: 1.3, score: 82 },
            { symbol: 'TJX', name: 'TJX 컴퍼니스', price: 103.51, change: 0.6, growthRate: 6.5, peg: 1.5, debtToEbitda: 1.4, score: 81 },
            { symbol: 'ETSY', name: '엣시', price: 68.16, change: 1.5, growthRate: 11.6, peg: 1.6, debtToEbitda: 2.3, score: 80 },
            { symbol: 'DIS', name: '디즈니', price: 112.61, change: 0.2, growthRate: 4.2, peg: 2.1, debtToEbitda: 2.6, score: 78 },
            { symbol: 'YUM', name: '얌! 브랜즈', price: 132.43, change: -0.3, growthRate: 5.3, peg: 2.0, debtToEbitda: 3.5, score: 77 },
            { symbol: 'EL', name: '에스티 로더', price: 148.23, change: -0.8, growthRate: 3.7, peg: 2.5, debtToEbitda: 1.8, score: 76 },
            { symbol: 'NKE', name: '나이키', price: 93.38, change: 1.1, growthRate: 6.2, peg: 1.9, debtToEbitda: 1.6, score: 75 },
            { symbol: 'BURL', name: '벌링턴 스토어', price: 202.70, change: 2.7, growthRate: 8.1, peg: 1.8, debtToEbitda: 1.9, score: 74 },
            { symbol: 'BBY', name: '베스트 바이', price: 86.93, change: 0.1, growthRate: 1.5, peg: 2.6, debtToEbitda: 1.7, score: 73 },
            { symbol: 'WSM', name: '윌리엄스 소노마', price: 152.29, change: 0.9, growthRate: 4.6, peg: 2.2, debtToEbitda: 1.2, score: 72 },
            { symbol: 'DKS', name: '딕스 스포팅 굿즈', price: 211.39, change: 1.9, growthRate: 7.3, peg: 1.6, debtToEbitda: 1.1, score: 71 },
            { symbol: 'GPS', name: '갭', price: 22.74, change: -1.1, growthRate: 1.9, peg: 2.7, debtToEbitda: 2.4, score: 70 },
            { symbol: 'KSS', name: '콜스', price: 25.87, change: -2.3, growthRate: 0.8, peg: 3.2, debtToEbitda: 2.8, score: 68 }
        ],
        strategy: `
            <h4>피터 린치의 투자 철학</h4>
            <p>피터 린치는 "일반인들도 전문가보다 좋은 투자 결정을 내릴 수 있다"고 믿었습니다. 그는 일상에서 접하는 제품과 서비스를 주의 깊게 관찰함으로써 투자 기회를 발견할 수 있다고 주장했습니다.</p>
            
            <h4>주요 투자 전략</h4>
            <ul>
                <li><strong>당신이 아는 것에 투자하라:</strong> 린치는 개인 투자자들이 자신이 이해하고 사용하는 제품이나 서비스를 제공하는 기업에 투자할 것을 권장했습니다.</li>
                <li><strong>성장 잠재력:</strong> 린치는 특히 중소형 성장주에 관심을 가졌습니다. 그는 아직 애널리스트들의 관심을 많이 받지 않는 성장 기업을 발굴하는 데 주력했습니다.</li>
                <li><strong>P/E 대비 성장률:</strong> 린치는 PEG 비율(주가수익비율을 연간 예상 성장률로 나눈 값)이 1 이하인 기업을 선호했습니다.</li>
                <li><strong>강한 재무구조:</strong> 린치는 부채 비율이 낮고 현금 흐름이 양호한 기업을 중요시했습니다.</li>
                <li><strong>지루한 사업 모델:</strong> 흥미롭지 않거나 지루해 보이는 사업 모델을 가진 기업들이 종종 좋은 투자 대상이 될 수 있다고 믿었습니다.</li>
            </ul>
            
            <h4>투자 유형 분류</h4>
            <p>린치는 주식을 6가지 카테고리로 분류했습니다: 느리게 성장하는 기업, 안정적인 성장 기업, 빠르게 성장하는 기업, 순환주, 자산 반전주, 그리고 문제 해결형 기업입니다. 그는 각 유형별로 다른 평가 기준을 적용했습니다.</p>
        `
    },
    'benjamin-graham': {
        id: 'benjamin-graham',
        name: '벤자민 그레이엄',
        philosophy: '안전마진을 중시하는 가치투자의 창시자',
        quote: '투자는 철저한 분석, 약속된 안전성, 적절한 수익을 동반한다.',
        image: 'https://via.placeholder.com/180',
        metrics: [
            {
                name: '안전마진 (Margin of Safety)',
                description: '그레이엄의 가장 중요한 개념으로, 주식의 내재가치와 시장가격 사이의 차이를 의미합니다. 그는 내재가치보다 최소 33% 이상 낮은 가격에 투자할 것을 권장했습니다.'
            },
            {
                name: 'P/B 비율 (주가순자산비율)',
                description: '그레이엄은 P/B 비율이 1.5 이하인 기업을 선호했습니다. 이는 기업의 시장가치가 장부가치에 근접하거나 그 이하인 경우를 의미합니다.'
            },
            {
                name: 'P/E 비율 (주가수익비율)',
                description: '그레이엄은 P/E 비율이 15 이하인 기업을 선호했습니다. 이는 기업의 시장가치가 수익에 비해 과도하게 높지 않은지 평가하는 지표입니다.'
            },
            {
                name: '배당수익률',
                description: '그레이엄은 상당한 배당수익률을 제공하는 기업을 선호했습니다. 이는 안정적인 현금 흐름과 주주 친화적 정책을 나타냅니다.'
            },
            {
                name: '부채 비율',
                description: '그레이엄은, 부채가 적은, 재무적으로 안정적인 기업을 선호했습니다. 장기 부채가 유동자산보다 작은 기업을 중요시했습니다.'
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
        stocks: [
            { symbol: 'PG', name: '프록터앤갬블', price: 162.35, change: 0.7, pb: 7.1, pe: 26.4, dividend: 2.37, score: 93 },
            { symbol: 'JNJ', name: '존슨앤존슨', price: 147.53, change: -0.3, pb: 5.0, pe: 23.9, dividend: 3.22, score: 90 },
            { symbol: 'JPM', name: 'JP모건', price: 198.78, change: 1.2, pb: 1.6, pe: 11.9, dividend: 2.44, score: 88 },
            { symbol: 'VZ', name: '버라이즌', price: 40.89, change: -0.3, pb: 1.7, pe: 15.6, dividend: 6.21, score: 87 },
            { symbol: 'IBM', name: 'IBM', price: 170.71, change: 0.5, pb: 7.0, pe: 19.2, dividend: 3.62, score: 86 },
            { symbol: 'KMB', name: '킴벌리-클락', price: 127.55, change: -0.2, pb: 68.7, pe: 24.2, dividend: 3.67, score: 84 },
            { symbol: 'CVX', name: '셰브론', price: 153.18, change: 1.1, pb: 1.9, pe: 14.9, dividend: 4.03, score: 83 },
            { symbol: 'XOM', name: '엑손모빌', price: 114.81, change: 0.8, pb: 2.1, pe: 13.9, dividend: 3.53, score: 82 },
            { symbol: 'KO', name: '코카콜라', price: 62.81, change: -0.7, pb: 6.3, pe: 26.3, dividend: 2.93, score: 81 },
            { symbol: 'PEP', name: '펩시코', price: 172.17, change: 0.1, pb: 13.3, pe: 26.1, dividend: 2.86, score: 80 },
            { symbol: 'MRK', name: '머크', price: 125.36, change: 1.4, pb: 7.3, pe: 22.3, dividend: 2.32, score: 79 },
            { symbol: 'PFE', name: '화이자', price: 28.43, change: -1.2, pb: 2.0, pe: 39.1, dividend: 5.35, score: 77 },
            { symbol: 'CSCO', name: '시스코', price: 48.98, change: 0.3, pb: 4.7, pe: 15.5, dividend: 3.18, score: 76 },
            { symbol: 'MCD', name: '맥도날드', price: 272.73, change: 0.6, pb: -28.4, pe: 23.2, dividend: 2.24, score: 75 },
            { symbol: 'INTC', name: '인텔', price: 42.00, change: 2.4, pb: 1.5, pe: 109.5, dividend: 1.31, score: 74 },
            { symbol: 'HD', name: '홈 디포', price: 347.63, change: 0.4, pb: -230.5, pe: 23.2, dividend: 2.47, score: 73 },
            { symbol: 'MMM', name: '3M', price: 97.08, change: -0.5, pb: 4.7, pe: 0.0, dividend: 6.01, score: 72 },
            { symbol: 'CAT', name: '캐터필러', price: 348.71, change: 0.9, pb: 6.6, pe: 16.9, dividend: 1.56, score: 71 },
            { symbol: 'WMT', name: '월마트', price: 68.76, change: 0.2, pb: 5.9, pe: 29.4, dividend: 1.43, score: 70 },
            { symbol: 'TRV', name: '트레블러스', price: 220.56, change: -0.1, pb: 1.8, pe: 16.5, dividend: 2.38, score: 69 }
        ],
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

// 주식 시장 데이터와 API를 위한 기본 함수들은 별도 파일로 분리하여 관리할 수 있습니다.
// 실제 배포 시에는 서버 API나 외부 데이터 소스와 연동하여 실시간 데이터를 사용합니다.