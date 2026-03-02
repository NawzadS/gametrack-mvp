import { createContext, useContext, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user } = useAuth();

  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
    const saved = localStorage.getItem('newsreader_saved_articles_by_user');
    return saved ? JSON.parse(saved) : {};
  });

  const persist = (next) => {
    setSavedArticlesByUser(next);
    localStorage.setItem('newsreader_saved_articles_by_user', JSON.stringify(next));
  };

  const currentUsername = user?.username;

  const getUserSavedArticles = () => {
    if (!currentUsername) return [];
    return savedArticlesByUser[currentUsername] || [];
  };

  const saveArticle = (article) => {
    if (!currentUsername) return;

    const existing = savedArticlesByUser[currentUsername] || [];
    const key = (article.uri || article._id || article.url);

    const already = existing.some(a => (a.uri || a._id || a.url) === key);
    if (already) return;

    const next = {
      ...savedArticlesByUser,
      [currentUsername]: [...existing, article]
    };
    persist(next);
  };

  const removeArticle = (article) => {
    if (!currentUsername) return;

    const existing = savedArticlesByUser[currentUsername] || [];
    const key = (article.uri || article._id || article.url);

    const next = {
      ...savedArticlesByUser,
      [currentUsername]: existing.filter(a => (a.uri || a._id || a.url) !== key)
    };
    persist(next);
  };

  const isArticleSaved = (article) => {
    const list = getUserSavedArticles();
    const key = (article.uri || article._id || article.url);
    return list.some(a => (a.uri || a._id || a.url) === key);
  };

  const getAllUserArticles = () => savedArticlesByUser;

  const value = useMemo(() => ({
    saveArticle,
    removeArticle,
    isArticleSaved,
    getUserSavedArticles,
    getAllUserArticles
  }), [savedArticlesByUser, currentUsername]);

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error('useArticles must be used inside ArticlesProvider');
  return ctx;
}
