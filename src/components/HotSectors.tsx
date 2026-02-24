import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HotSector } from '@/types';
import { fetchHotSectors } from '@/services/stockApi';

export const HotSectors = () => {
  const [sectors, setSectors] = useState<HotSector[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    setLoading(true);
    try {
      const data = await fetchHotSectors();
      setSectors(data.slice(0, 10)); // 只显示前 10 个
    } catch (error) {
      console.error('Failed to load hot sectors:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(1)}亿`;
    } else if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toFixed(0);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-finance-border dark:border-finance-dark-border p-4">
        <h3 className="font-display text-sm font-bold mb-3 text-finance-text dark:text-finance-dark-text">
          📊 热门板块
        </h3>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-finance-border dark:border-finance-dark-border">
      <div className="px-4 py-3 border-b border-finance-border dark:border-finance-dark-border flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-finance-text dark:text-finance-dark-text">
          📊 热门板块
        </h3>
        <button
          onClick={loadSectors}
          className="text-xs text-finance-muted dark:text-finance-dark-muted hover:text-finance-accent dark:hover:text-finance-accent transition-colors"
        >
          刷新
        </button>
      </div>

      <div className="divide-y divide-finance-border dark:divide-finance-dark-border">
        {sectors.map((sector, index) => {
          const isPositive = sector.changePercent >= 0;
          const changeColor = isPositive
            ? 'text-finance-green dark:text-finance-green'
            : 'text-finance-accent dark:text-finance-accent';

          return (
            <motion.div
              key={sector.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-finance-muted dark:text-finance-dark-muted">
                      {index + 1}
                    </span>
                    <h4 className="font-mono text-xs font-medium text-finance-text dark:text-finance-dark-text truncate group-hover:text-finance-accent dark:group-hover:text-finance-accent transition-colors">
                      {sector.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs text-finance-muted dark:text-finance-dark-muted">
                      领涨: {sector.leadingStock}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono text-xs font-bold ${changeColor}`}>
                    {isPositive ? '+' : ''}{sector.changePercent.toFixed(2)}%
                  </div>
                  <div className="font-mono text-xs text-finance-muted dark:text-finance-dark-muted">
                    {sector.upCount}涨/{sector.downCount}跌
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-finance-muted dark:text-finance-dark-muted">
                <span>成交 {formatNumber(sector.amount)}</span>
                <span>共 {sector.stockCount}只</span>
                {sector.netInflow !== 0 && (
                  <span className={sector.netInflow > 0 ? 'text-finance-green' : 'text-finance-accent'}>
                    {sector.netInflow > 0 ? '流入' : '流出'} {formatNumber(Math.abs(sector.netInflow))}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
