// DOM要素の取得
const cardsContainer = document.getElementById('cardsContainer');
const toolsContainer = document.getElementById('toolsContainer');
const tagFilters = document.getElementById('tagFilters');

// JSONデータの読み込み
async function loadData() {
    try {
        const response = await fetch('items.json');
        const data = await response.json();
        displayItems(data.items);
        displayTools(data.tools || []);
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
        // デフォルトデータを使用 (ここは削除しても良いですが、互換性のため残しておきます)
        displayItems([
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1555066931-4365d14b8c87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                title: "AI開発ツール",
                description: "最新のAI開発支援ツールで、開発効率を大幅に向上させます。",
                tags: ["AI", "開発", "ツール"],
                url: "https://example.com/ai-tool"
            },
            {
                id: 2,
                image: "",
                title: "学習プラットフォーム",
                description: "専門分野の学習を効率的に行えるオンラインプラットフォーム。",
                tags: ["学習", "教育", "オンライン"],
                url: "https://example.com/learning-platform"
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82030d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                title: "デザインテンプレート",
                description: "プロフェッショナルなデザインテンプレート集。",
                tags: ["デザイン", "テンプレート", "UI"],
                url: "https://example.com/design-templates"
            }
        ]);
        
        displayTools([
            {
                id: 1,
                title: "無料レポート",
                description: "最新の市場トレンドをまとめた無料レポート。",
                link: "https://example.com/free-report"
            },
            {
                id: 2,
                title: "限定ワークショップ",
                description: "特別価格で実施中の限定ワークショップ。",
                link: "https://example.com/limited-workshop"
            },
            {
                id: 3,
                title: "無料トライアル",
                description: "期間限定の無料トライアル版を提供中。",
                link: "https://example.com/free-trial"
            },
            {
                id: 4,
                title: "プレミアムプラン",
                description: "追加機能を満載したプレミアムプラン。",
                link: "https://example.com/premium-plan"
            }
        ]);
    }
}

// タグの抽出とフィルター表示
function displayTagFilters(items) {
    const allTags = new Set();
    
    items.forEach(item => {
        item.tags.forEach(tag => {
            allTags.add(tag);
        });
    });
    
    tagFilters.innerHTML = '';
    
    const allButton = document.createElement('button');
    allButton.className = 'tag-filter active';
    allButton.textContent = 'すべて';
    allButton.addEventListener('click', () => filterItemsByTag(null, items));
    tagFilters.appendChild(allButton);
    
    allTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.className = 'tag-filter';
        tagButton.textContent = tag;
        tagButton.addEventListener('click', () => filterItemsByTag(tag, items));
        tagFilters.appendChild(tagButton);
    });
}

// カードの表示
function displayItems(items) {
    cardsContainer.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // 画像の処理
        const imageHtml = item.image ? 
            `<img src="${item.image}" alt="${item.title}" class="card-image">` : 
            `<div class="card-image-placeholder">画像なし</div>`;
        
        card.innerHTML = `
            <div class="card-image-container">
                ${imageHtml}
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-tags">
                    ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>
                <a href="${item.url}" class="card-link" target="_blank" rel="noopener noreferrer">公式サイトで詳細を見る</a>
            </div>
        `;
        
        cardsContainer.appendChild(card);
    });
    
    // タグフィルターを表示
    displayTagFilters(items);
}

// ツールカードの表示
function displayTools(tools) {
    toolsContainer.innerHTML = '';
    
    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        
        toolCard.innerHTML = `
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" class="tool-link" target="_blank" rel="noopener noreferrer">公式サイトで詳細を見る</a>
        `;
        
        toolsContainer.appendChild(toolCard);
    });
}

// タグフィルターでの絞り込み
function filterItemsByTag(selectedTag, allItems) {
    // フィルターの状態を更新
    document.querySelectorAll('.tag-filter').forEach(button => {
        button.classList.remove('active');
    });
    
    const activeButton = Array.from(tagFilters.children).find(button => 
        selectedTag === null ? button.textContent === 'すべて' : button.textContent === selectedTag
    );
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // フィルターされたアイテムを取得
    let filteredItems = [];
    
    if (selectedTag === null) {
        filteredItems = allItems;
    } else {
        filteredItems = allItems.filter(item => 
            item.tags.includes(selectedTag)
        );
    }
    
    displayItems(filteredItems);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

// タグの抽出とフィルター表示
function displayTagFilters(items) {
    const allTags = new Set();
    
    items.forEach(item => {
        item.tags.forEach(tag => {
            allTags.add(tag);
        });
    });
    
    tagFilters.innerHTML = '';
    
    const allButton = document.createElement('button');
    allButton.className = 'tag-filter active';
    allButton.textContent = 'すべて';
    allButton.addEventListener('click', () => filterItemsByTag(null, items));
    tagFilters.appendChild(allButton);
    
    allTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.className = 'tag-filter';
        tagButton.textContent = tag;
        tagButton.addEventListener('click', () => filterItemsByTag(tag, items));
        tagFilters.appendChild(tagButton);
    });
}

// カードの表示
function displayCards(items) {
    cardsContainer.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // 画像の処理
        const imageHtml = item.image ? 
            `<img src="${item.image}" alt="${item.title}" class="card-image">` : 
            `<div class="card-image-placeholder">画像なし</div>`;
        
        card.innerHTML = `
            <div class="card-image-container">
                ${imageHtml}
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <div class="card-tags">
                    ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>
                <a href="${item.url}" class="card-link" target="_blank" rel="noopener noreferrer">公式サイトで詳細を見る</a>
            </div>
        `;
        
        cardsContainer.appendChild(card);
    });
}

// ツールカードの表示
function displayTools(tools) {
    toolsContainer.innerHTML = '';
    
    tools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        
        toolCard.innerHTML = `
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" class="tool-link" target="_blank" rel="noopener noreferrer">公式サイトで詳細を見る</a>
        `;
        
        toolsContainer.appendChild(toolCard);
    });
}

// タグフィルターでの絞り込み
function filterItemsByTag(selectedTag, allItems) {
    // フィルターの状態を更新
    document.querySelectorAll('.tag-filter').forEach(button => {
        button.classList.remove('active');
    });
    
    const activeButton = Array.from(tagFilters.children).find(button => 
        selectedTag === null ? button.textContent === 'すべて' : button.textContent === selectedTag
    );
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // フィルターされたアイテムを取得
    let filteredItems = [];
    
    if (selectedTag === null) {
        filteredItems = allItems;
    } else {
        filteredItems = allItems.filter(item => 
            item.tags.includes(selectedTag)
        );
    }
    
    displayCards(filteredItems);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});