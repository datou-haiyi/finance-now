import { motion } from 'framer-motion';
import { Category, CategoryConfig } from '@/types';

const categories: CategoryConfig[] = [
  { id: 'all', label: '全部', icon: '📰', color: 'text-finance-text dark:text-finance-dark-text' },
  { id: 'us-stocks', label: '美股', icon: '🇺🇸', color: 'text-finance-blue' },
  { id: 'cn-stocks', label: 'A股', icon: '🇨🇳', color: 'text-finance-accent' },
  { id: 'crypto', label: '加密', icon: '₿', color: 'text-yellow-600 dark:text-yellow-500' },
  { id: 'macro', label: '宏观', icon: '🌐', color: 'text-finance-green' },
];

interface CategoryNavProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  return (
    <nav className="border-b border-finance-border dark:border-finance-dark-border bg-finance-bg dark:bg-finance-dark-bg">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onCategoryChange(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 font-mono text-sm whitespace-nowrap
                border-b-2 transition-colors
                ${activeCategory === cat.id
                  ? 'border-finance-accent text-finance-text dark:text-finance-dark-text font-semibold'
                  : 'border-transparent text-finance-muted dark:text-finance-dark-muted hover:text-finance-text dark:hover:text-finance-dark-text'
                }
              `}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};
