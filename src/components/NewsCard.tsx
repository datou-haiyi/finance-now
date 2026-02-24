import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { NewsItem } from '@/types';

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

const sourceColors = {
  tavily: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  akshare: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  openbb: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
};

const sourceLabels = {
  tavily: 'Tavily',
  akshare: 'AkShare',
  openbb: 'OpenBB',
};

export const NewsCard = ({ item, index }: NewsCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const timeAgo = formatDistanceToNow(item.timestamp, {
    addSuffix: true,
    locale: zhCN
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group border-b border-finance-border dark:border-finance-dark-border last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
    >
      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-start gap-3 mb-1.5">
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 text-left"
            whileHover={{ x: 2 }}
          >
            <h3 className="font-mono text-sm leading-relaxed text-finance-text dark:text-finance-dark-text group-hover:text-finance-accent dark:group-hover:text-finance-accent transition-colors">
              {item.title}
            </h3>
          </motion.button>

          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="text-finance-muted dark:text-finance-dark-muted hover:text-finance-accent dark:hover:text-finance-accent transition-colors text-xs mt-0.5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {expanded ? '−' : '+'}
          </motion.button>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-finance-muted dark:text-finance-dark-muted">
          <span className={`px-1.5 py-0.5 ${sourceColors[item.source]}`}>
            {sourceLabels[item.source]}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="font-medium">{item.publisher}</span>
          <span className="hidden sm:inline">•</span>
          <time dateTime={item.timestamp.toISOString()}>
            {timeAgo}
          </time>
          {item.readTime && (
            <>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{item.readTime}分钟阅读</span>
            </>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-finance-border dark:border-finance-dark-border">
                {item.summary && (
                  <p className="text-sm font-mono text-finance-muted dark:text-finance-dark-muted mb-3 leading-relaxed">
                    {item.summary}
                  </p>
                )}
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-mono text-finance-accent hover:underline"
                  whileHover={{ x: 3 }}
                >
                  <span>阅读原文</span>
                  <span>→</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
};
