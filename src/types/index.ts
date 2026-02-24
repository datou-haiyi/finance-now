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

// A股热门股票
export interface HotStock {
  code: string;          // 股票代码
  name: string;          // 股票名称
  price: number;         // 最新价
  change: number;        // 涨跌额
  changePercent: number; // 涨跌幅 %
  volume: number;        // 成交量
  amount: number;        // 成交额
  turnover: number;      // 换手率 %
  amplitude: number;     // 振幅 %
  high: number;          // 最高价
  low: number;           // 最低价
  open: number;          // 开盘价
  previousClose: number; // 昨收价
}

// A股热门板块
export interface HotSector {
  name: string;          // 板块名称
  code: string;          // 板块代码
  changePercent: number; // 涨跌幅 %
  leadingStock: string;  // 领涨股
  stockCount: number;    // 个股数量
  upCount: number;       // 上涨数
  downCount: number;     // 下跌数
  amount: number;        // 成交额
  netInflow: number;     // 净流入
}
