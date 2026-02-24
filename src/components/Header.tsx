import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-finance-border dark:border-finance-dark-border bg-finance-bg/95 dark:bg-finance-dark-bg/95 backdrop-blur-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-finance-accent flex items-center justify-center font-bold text-white text-sm">
              FN
            </div>
            <h1 className="font-display text-xl font-bold text-finance-text dark:text-finance-dark-text tracking-tight">
              Finance Now
            </h1>
            <span className="hidden sm:block text-xs text-finance-muted dark:text-finance-dark-muted font-mono">
              实时金融资讯聚合
            </span>
          </motion.div>

          {/* Search & Controls */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="搜索资讯..."
                className="w-64 px-3 py-1.5 text-sm font-mono bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border focus:outline-none focus:border-finance-accent dark:focus:border-finance-accent text-finance-text dark:text-finance-dark-text placeholder:text-finance-muted dark:placeholder:text-finance-dark-muted"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-finance-muted hover:text-finance-text dark:hover:text-finance-dark-text"
                >
                  ✕
                </button>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center border border-finance-border dark:border-finance-dark-border hover:border-finance-accent dark:hover:border-finance-accent transition-colors"
              aria-label="Toggle theme"
            >
              <span className="text-sm">{theme === 'light' ? '🌙' : '☀️'}</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="搜索资讯..."
            className="w-full px-3 py-1.5 text-sm font-mono bg-white dark:bg-finance-dark-bg border border-finance-border dark:border-finance-dark-border focus:outline-none focus:border-finance-accent text-finance-text dark:text-finance-dark-text placeholder:text-finance-muted"
          />
        </div>
      </div>
    </motion.header>
  );
};
