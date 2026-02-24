import { useState } from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types';
import { useNews } from '@/hooks/useNews';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { NewsList } from '@/components/NewsList';
import { Sidebar } from '@/components/Sidebar';

function App() {
  const [category, setCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { news, loading, error, refresh } = useNews(category, searchQuery);

  return (
    <div className="min-h-screen bg-finance-bg dark:bg-finance-dark-bg text-finance-text dark:text-finance-dark-text">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <CategoryNav activeCategory={category} onCategoryChange={setCategory} />

      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Content */}
          <div>
            {/* Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-4 pb-3 border-b border-finance-border dark:border-finance-dark-border"
            >
              <div className="flex items-center gap-3">
                <h2 className="font-display text-sm font-semibold">
                  {category === 'all' ? '全部资讯' :
                   category === 'us-stocks' ? '美股资讯' :
                   category === 'cn-stocks' ? 'A股资讯' :
                   category === 'crypto' ? '加密货币' :
                   '宏观经济'}
                </h2>
                {!loading && (
                  <span className="text-xs font-mono text-finance-muted dark:text-finance-dark-muted">
                    {news.length} 条
                  </span>
                )}
              </div>

              <motion.button
                onClick={refresh}
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-finance-muted dark:text-finance-dark-muted hover:text-finance-accent dark:hover:text-finance-accent transition-colors"
                aria-label="Refresh"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.button>
            </motion.div>

            <NewsList news={news} loading={loading} error={error} />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <Sidebar news={news} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-finance-border dark:border-finance-dark-border bg-finance-bg dark:bg-finance-dark-bg">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-finance-muted dark:text-finance-dark-muted">
            <p>© 2026 Finance Now - 金融资讯聚合平台</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/zhujun-123/dexter-finance" target="_blank" rel="noopener noreferrer" className="hover:text-finance-accent transition-colors">
                GitHub
              </a>
              <span>•</span>
              <span>Powered by Tavily, AkShare & OpenBB</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
