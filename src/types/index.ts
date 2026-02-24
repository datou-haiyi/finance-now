export interface NewsItem {
  id: string;
  title: string;
  source: 'tavily' | 'akshare' | 'openbb';
  category: Category;
  url: string;
  publisher: string;
  timestamp: Date;
  summary?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  readTime?: number;
}

export type Category = 'us-stocks' | 'cn-stocks' | 'crypto' | 'macro' | 'all';

export interface CategoryConfig {
  id: Category;
  label: string;
  icon: string;
  color: string;
}

export interface FilterState {
  category: Category;
  sources: Set<NewsItem['source']>;
  searchQuery: string;
}
