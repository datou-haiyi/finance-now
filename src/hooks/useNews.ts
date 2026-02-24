import { useState, useEffect, useCallback } from 'react';
import { NewsItem, Category } from '@/types';
import { fetchNews, searchNews } from '@/services/api';

export const useNews = (category: Category, searchQuery: string = '') => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data: NewsItem[];
      if (searchQuery.trim()) {
        data = await searchNews(searchQuery);
      } else {
        data = await fetchNews(category);
      }
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const refresh = useCallback(() => {
    loadNews();
  }, [loadNews]);

  return { news, loading, error, refresh };
};
