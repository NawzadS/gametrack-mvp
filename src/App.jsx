import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticlesProvider } from './context/ArticlesContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ArticlesProvider>
      <BrowserRouter>
        <Layout>
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/search" element={<SearchPage />} />
  <Route path="/saved" element={<SavedArticlesPage />} />

  {/* 4th route */}
  <Route path="/login" element={<LoginPage />} />

  {/* 404 route */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
        </Layout>
      </BrowserRouter>
    </ArticlesProvider>
  );
}

export default App;