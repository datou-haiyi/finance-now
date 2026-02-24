import { motion } from 'framer-motion';
import { NewsItem } from '@/types';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

export const NewsList = ({ news, loading, error }: NewsListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-finance-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-finance-accent font-mono mb-2">❌ 加载失败</p>
        <p className="text-sm text-finance-muted dark:text-finance-dark-muted font-mono">
          {error}
        </p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-finance-muted dark:text-finance-dark-muted font-mono">
          📭 暂无资讯
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border">
      {news.map((item, index) => (
        <NewsCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};
