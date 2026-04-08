import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 | Dev Vachhani· Portfolio.OS</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-primary text-8xl font-extrabold font-headline">404</p>
        <h1 className="text-2xl font-headline font-bold text-white">Page not found</h1>
        <p className="text-on-surface-variant font-body">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-4 bg-primary text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
        >
          Go home
        </Link>
      </div>
    </>
  )
}
