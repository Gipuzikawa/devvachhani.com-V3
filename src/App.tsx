import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './layouts/PageLayout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ArticlesPage from './pages/ArticlesPage'
import ArticlePage from './pages/ArticlePage'
import ContactPage from './pages/ContactPage'
import MePage from './pages/MePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="me" element={<MePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
