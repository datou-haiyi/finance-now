import { NewsItem, Category } from '@/types';

// API 配置
const TAVILY_API_KEY = import.meta.env.VITE_TAVILY_API_KEY || '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';
const AKSHARE_API_URL = import.meta.env.VITE_AKSHARE_API_URL || 'http://localhost:8000';
const OPENBB_API_URL = import.meta.env.VITE_OPENBB_API_URL || 'http://localhost:8001';

// Tavily API 调用
const fetchTavilyNews = async (query: string, category: Category): Promise<NewsItem[]> => {
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: `${query} finance news`,
        search_depth: 'advanced',
        max_results: 20,
        include_answer: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`);
    }

    const data = await response.json();

    return (data.results || []).map((item: any, index: number) => ({
      id: `tavily-${category}-${index}-${Date.now()}`,
      title: item.title,
      source: 'tavily' as const,
      category,
      url: item.url,
      publisher: new URL(item.url).hostname.replace('www.', ''),
      timestamp: new Date(item.published_date || Date.now()),
      summary: item.content?.substring(0, 200),
      readTime: Math.ceil(item.content?.length / 1000) || 2,
    }));
  } catch (error) {
    console.error('Tavily API error:', error);
    return [];
  }
};

// AkShare API 调用 - 中国市场新闻
const fetchAkShareNews = async (category: Category): Promise<NewsItem[]> => {
  if (category !== 'cn-stocks' && category !== 'all') {
    return [];
  }

  try {
    // 获取A股实时行情热门股票
    const response = await fetch(`${AKSHARE_API_URL}/stock/realtime/hot`);

    if (!response.ok) {
      throw new Error(`AkShare API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success' && Array.isArray(data.data)) {
      return data.data.slice(0, 10).map((item: any, index: number) => ({
        id: `akshare-cn-stocks-${index}-${Date.now()}`,
        title: `${item.name || item['名称']} (${item.code || item['代码']}) - ${item.reason || item['原因'] || '热门股票'}`,
        source: 'akshare' as const,
        category: 'cn-stocks' as const,
        url: `https://finance.sina.com.cn/realstock/company/${item.code || item['代码']}/nc.shtml`,
        publisher: '东方财富',
        timestamp: new Date(),
        summary: `最新价: ${item.price || item['最新价']} | 涨跌幅: ${item.change_percent || item['涨跌幅']}%`,
        sentiment: (item.change_percent || item['涨跌幅'] || 0) > 0 ? 'positive' : 'negative',
        readTime: 1,
      }));
    }

    return [];
  } catch (error) {
    console.error('AkShare API error:', error);
    return [];
  }
};

// OpenBB API 调用 - 美股新闻
const fetchOpenBBNews = async (category: Category): Promise<NewsItem[]> => {
  if (category !== 'us-stocks' && category !== 'all') {
    return [];
  }

  try {
    // 获取美股市场新闻
    const response = await fetch(`${OPENBB_API_URL}/news/market`);

    if (!response.ok) {
      throw new Error(`OpenBB API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success' && Array.isArray(data.data)) {
      return data.data.map((item: any, index: number) => ({
        id: `openbb-us-stocks-${index}-${Date.now()}`,
        title: item.title,
        source: 'openbb' as const,
        category: 'us-stocks' as const,
        url: item.url,
        publisher: item.source || 'Bloomberg',
        timestamp: new Date(item.date || Date.now()),
        summary: item.text?.substring(0, 200),
        readTime: Math.ceil(item.text?.length / 1000) || 2,
      }));
    }

    return [];
  } catch (error) {
    console.error('OpenBB API error:', error);
    return [];
  }
};

// 主要导出函数 - 聚合所有数据源
export const fetchNews = async (category: Category = 'all'): Promise<NewsItem[]> => {
  const queries: Record<Category, string> = {
    'all': 'financial markets',
    'us-stocks': 'US stock market',
    'cn-stocks': 'China A-share market',
    'crypto': 'cryptocurrency Bitcoin Ethereum',
    'macro': 'global economy GDP inflation',
  };

  const query = queries[category] || queries['all'];

  // 并行获取所有数据源
  const [tavilyNews, akshareNews, openbbNews] = await Promise.all([
    fetchTavilyNews(query, category),
    fetchAkShareNews(category),
    fetchOpenBBNews(category),
  ]);

  // 合并并按时间排序
  const allNews = [...tavilyNews, ...akshareNews, ...openbbNews];

  return allNews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// 搜索新闻
export const searchNews = async (query: string): Promise<NewsItem[]> => {
  if (!query.trim()) {
    return fetchNews('all');
  }

  // 使用 Tavily 进行搜索
  return fetchTavilyNews(query, 'all');
};
