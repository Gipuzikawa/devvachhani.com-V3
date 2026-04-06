import { useState } from 'react'

export default function NewsletterCard() {
  const [email, setEmail] = useState('')

  function handleSubscribe() {
    alert('Thanks!')
    setEmail('')
  }

  return (
    <article className="bg-gradient-to-br from-primary/10 to-tertiary/5 rounded-2xl p-6 border border-primary/20 flex flex-col justify-between">
      <div>
        <span className="material-symbols-outlined text-primary text-4xl mb-4 block">mail</span>
        <h3 className="text-xl font-bold font-headline text-white mb-3">Stay in the Loop</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-6">
          Get new articles, project updates, and design insights delivered directly to your inbox — no spam, ever.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-body text-on-surface placeholder-on-surface-variant/50 focus:border-primary focus:outline-none transition-colors"
        />
        <button
          onClick={handleSubscribe}
          className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl text-sm font-label hover:scale-105 transition-all"
        >
          Subscribe
        </button>
      </div>
    </article>
  )
}
