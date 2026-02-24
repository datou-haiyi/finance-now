import { motion } from 'framer-motion';
import { NewsItem, Category } from '@/types';
import { HotStocks } from './HotStocks';
import { HotSectors } from './HotSectors';

interface SidebarProps {
  news: NewsItem[];
  category: Category;
}

export const Sidebar = ({ news, category }: SidebarProps) => {
  const showCNStockData = category === 'cn-stocks' || category === 'all';
  // 统计数据
  const stats = {
    total: news.length,
    bySource: {
      tavily: news.filter(n => n.source === 'tavily').length,
      akshare: news.filter(n => n.source === 'akshare').length,
      openbb: news.filter(n => n.source === 'openbb').length,
    },
    byCategory: {
      'us-stocks': news.filter(n => n.category === 'us-stocks').length,
      'cn-stocks': news.filter(n => n.category === 'cn-stocks').length,
      'crypto': news.filter(n => n.category === 'crypto').length,
      'macro': news.filter(n => n.category === 'macro').length,
    },
  };

  // 热门来源
  const topPublishers = Object.entries(
    news.reduce((acc, item) => {
      acc[item.publisher] = (acc[item.publisher] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <aside className="space-y-4">
      {/* A股热门股票 - 仅在 A股 或 全部 分类时显示 */}
      {showCNStockData && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HotStocks />
        </motion.div>
      )}

      {/* A股热门板块 - 仅在 A股 或 全部 分类时显示 */}
      {showCNStockData && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HotSectors />
        </motion.div>
      )}

      {/* 数据源统计 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: showCNStockData ? 0.3 : 0.1 }}
        className="bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border p-4"
      >
        <h2 className="font-display text-sm font-semibold mb-3 text-finance-text dark:text-finance-dark-text">
          数据源
        </h2>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">Tavily</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {stats.bySource.tavily}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">AkShare</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {stats.bySource.akshare}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">OpenBB</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {stats.bySource.openbb}
            </span>
          </div>
          <div className="pt-2 mt-2 border-t border-finance-border dark:border-finance-dark-border flex justify-between">
            <span className="text-finance-text dark:text-finance-dark-text font-semibold">总计</span>
            <span className="font-bold text-finance-accent">{stats.total}</span>
          </div>
        </div>
      </motion.div>

      {/* 分类统计 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: showCNStockData ? 0.4 : 0.2 }}
        className="bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border p-4"
      >
        <h2 className="font-display text-sm font-semibold mb-3 text-finance-text dark:text-finance-dark-text">
          分类
        </h2>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">🇺🇸 美股</span>
            <span className="font-semibold">{stats.byCategory['us-stocks']}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">🇨🇳 A股</span>
            <span className="font-semibold">{stats.byCategory['cn-stocks']}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">₿ 加密</span>
            <span className="font-semibold">{stats.byCategory.crypto}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-finance-muted dark:text-finance-dark-muted">🌐 宏观</span>
            <span className="font-semibold">{stats.byCategory.macro}</span>
          </div>
        </div>
      </motion.div>

      {/* 热门来源 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: showCNStockData ? 0.5 : 0.3 }}
        className="bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border p-4"
      >
        <h2 className="font-display text-sm font-semibold mb-3 text-finance-text dark:text-finance-dark-text">
          热门来源
        </h2>
        <div className="space-y-2 text-xs font-mono">
          {topPublishers.map(([publisher, count]) => (
            <div key={publisher} className="flex justify-between items-center">
              <span className="text-finance-muted dark:text-finance-dark-muted truncate mr-2">
                {publisher}
              </span>
              <span className="font-semibold text-finance-accent">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 关于 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: showCNStockData ? 0.6 : 0.4 }}
        className="bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border p-4"
      >
        <h2 className="font-display text-sm font-semibold mb-2 text-finance-text dark:text-finance-dark-text">
          关于
        </h2>
        <p className="text-xs font-mono text-finance-muted dark:text-finance-dark-muted leading-relaxed">
          Finance Now 是一个实时金融资讯聚合平台，整合来自 Tavily、AkShare 和 OpenBB 的全球金融市场数据。
        </p>
      </motion.div>
    </aside>
  );
};
