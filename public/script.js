// 투자자 데이터 (샘플)
const investors = [
    {
        id: 'warren-buffett',
        name: '워렌 버핏',
        philosophy: '기업의 본질적 가치에 집중하는 가치투자의 대가',
        quote: '다른 사람들이 두려워할 때 욕심내고, 다른 사람들이 욕심낼 때 두려워하라.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'AAPL', name: '애플', score: 95, change: 2.3 },
            { symbol: 'BRK-B', name: '버크셔 해서웨이', score: 92, change: 1.5 },
            { symbol: 'KO', name: '코카콜라', score: 88, change: -0.7 }
        ]
    },
    {
        id: 'peter-lynch',
        name: '피터 린치',
        philosophy: '일상에서 발견할 수 있는 성장 기업을 발굴하는 전략가',
        quote: '주식을 지금 사야 할지 고민 중이라면, 그건 안 사는 게 맞다.',
        image: 'https://via.placeholder.com/150',
        topStocks: [
            { symbol: 'SBUX', name: '스타벅스', score: 94, change: 1.8 },
            { symbol: 'COST', name: '코스트코', score: 91, change: 2.2 },
            { symbol: 'TGT', name: '타겟', score: 87, change: 0.5 }
        ]
    }
    // 더 많은 투자자 데이터 추가 가능
];

// 투자자 카드 렌더링 함수
function renderInvestorCards() {
    const investorGrid = document.querySelector('.investor-grid');
    
    investors.forEach(investor => {
        const card = document.createElement('div');
        card.className = 'investor-card';
        
        card.innerHTML = `
            <img src="${investor.image}" alt="${investor.name}">
            <h3>${investor.name}</h3>
            <p>${investor.philosophy}</p>
            <p class="quote">"${investor.quote}"</p>
            <button>상세 보기</button>
        `;
        
        investorGrid.appendChild(card);
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    renderInvestorCards();
});