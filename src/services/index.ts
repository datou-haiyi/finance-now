/**
 * API 服务入口
 *
 * 根据环境变量决定使用 Mock 数据还是真实 API
 */

import { NewsItem, Category } from '@/types';

// 检查是否使用真实 API
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

// 动态导入对应的 API 模块
const apiModule = USE_REAL_API
  ? import('./realApi')
  : import('./api');

export const fetchNews = async (category: Category = 'all'): Promise<NewsItem[]> => {
  const api = await apiModule;
  return api.fetchNews(category);
};

export const searchNews = async (query: string): Promise<NewsItem[]> => {
  const api = await apiModule;
  return api.searchNews(query);
};

// 导出配置信息
export const getApiConfig = () => ({
  useRealApi: USE_REAL_API,
  tavilyKey: import.meta.env.VITE_TAVILY_API_KEY ? '已配置' : '未配置',
  akshareUrl: import.meta.env.VITE_AKSHARE_API_URL || 'localhost:8000',
  openbbUrl: import.meta.env.VITE_OPENBB_API_URL || 'localhost:8001',
});
