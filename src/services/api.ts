import { NewsItem, Category } from '@/types';

// Mock data generator - 实际项目中替换为真实 API 调用
const generateMockNews = (category: Category, count: number = 20): NewsItem[] => {
  const sources: NewsItem['source'][] = ['tavily', 'akshare', 'openbb'];
  const publishers = {
    'us-stocks': ['Bloomberg', 'CNBC', 'MarketWatch', 'Seeking Alpha', 'The Motley Fool'],
    'cn-stocks': ['财联社', '东方财富', '新浪财经', '证券时报', '第一财经'],
    'crypto': ['CoinDesk', 'Decrypt', 'The Block', 'CoinTelegraph', 'Crypto Briefing'],
    'macro': ['Reuters', 'Financial Times', 'WSJ', 'The Economist', 'Fed Reserve'],
  };

  const titles = {
    'us-stocks': [
      'Apple stock surges on strong iPhone sales projections',
      'Tesla deliveries beat expectations for Q1 2026',
      'Nvidia announces new AI chip breakthrough',
      'Tech sector rally continues as Fed signals rate cuts',
      'Amazon splits stock 20-for-1 amid record profits',
      'Microsoft Azure revenue growth accelerates',
      'Meta unveils new VR headset, stock jumps 8%',
      'Google antitrust case reaches critical phase',
      'AMD gains market share in data center chips',
      'Warren Buffett increases stake in energy sector',
    ],
    'cn-stocks': [
      '贵州茅台市值突破3万亿，创历史新高',
      '宁德时代发布新一代电池技术',
      'A股三大指数集体上涨，创业板涨超2%',
      '比亚迪1月销量同比增长超50%',
      '央行宣布降准0.5个百分点',
      '阿里巴巴回港上市获批',
      '腾讯发布Q4财报，净利润超预期',
      '中国平安股价创年内新高',
      '上证指数突破3500点关口',
      '北向资金连续10日净流入',
    ],
    'crypto': [
      'Bitcoin breaks $70,000 as institutional demand surges',
      'Ethereum upgrade successful, gas fees plummet',
      'SEC approves spot Bitcoin ETF applications',
      'Binance launches zero-fee trading promotion',
      'Solana DeFi TVL reaches all-time high',
      'Crypto market cap surpasses $3 trillion',
      'Stablecoin regulations gain bipartisan support',
      'NFT market shows signs of recovery',
      'Bitcoin mining difficulty hits new record',
      'PayPal expands crypto services to 50 countries',
    ],
    'macro': [
      'Fed holds rates steady, signals two cuts in 2026',
      'US GDP growth beats forecasts at 3.2% annualized',
      'China announces stimulus package to boost consumption',
      'ECB cuts rates by 25bp, euro weakens',
      'US inflation falls to 2.4%, lowest since 2021',
      'Japan raises interest rates for first time in decades',
      'Oil prices surge on OPEC+ production cuts',
      'US unemployment rate drops to 3.6%',
      'Global trade tensions ease as talks progress',
      'IMF raises global growth forecast to 3.5%',
    ],
  };

  const categoryTitles = category === 'all'
    ? Object.values(titles).flat()
    : titles[category as keyof typeof titles] || titles['us-stocks'];

  const categoryPublishers = category === 'all'
    ? Object.values(publishers).flat()
    : publishers[category as keyof typeof publishers] || publishers['us-stocks'];

  return Array.from({ length: count }, (_, i) => {
    const actualCategory = category === 'all'
      ? (['us-stocks', 'cn-stocks', 'crypto', 'macro'] as Category[])[Math.floor(Math.random() * 4)]
      : category;

    const title = categoryTitles[i % categoryTitles.length];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const publisher = categoryPublishers[Math.floor(Math.random() * categoryPublishers.length)];
    const minutesAgo = Math.floor(Math.random() * 180);

    return {
      id: `${actualCategory}-${i}-${Date.now()}`,
      title,
      source,
      category: actualCategory,
      url: `https://example.com/news/${i}`,
      publisher,
      timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
      summary: Math.random() > 0.7 ? `Full article available at ${publisher}. Click to read more details about this developing story.` : undefined,
      sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as any,
      readTime: Math.floor(Math.random() * 5) + 1,
    };
  });
};

export const fetchNews = async (category: Category = 'all'): Promise<NewsItem[]> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  // 实际项目中，这里会调用：
  // - Tavily API: https://api.tavily.com/search
  // - AkShare 服务: http://localhost:8000/news/cn-stocks
  // - OpenBB 服务: http://localhost:8001/news/us-stocks

  return generateMockNews(category, 50);
};

export const searchNews = async (query: string): Promise<NewsItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const allNews = generateMockNews('all', 100);
  return allNews.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.publisher.toLowerCase().includes(query.toLowerCase())
  );
};
