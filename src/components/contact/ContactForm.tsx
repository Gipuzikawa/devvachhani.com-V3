import { useState } from 'react'

const SUBJECT_OPTIONS = [
  { value: 'freelance', label: 'Freelance Project' },
  { value: 'internship', label: 'Internship Opportunity' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'feedback', label: 'Feedback on My Work' },
  { value: 'other', label: 'Just Saying Hello' },
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [newsletter, setNewsletter] = useState(false)

  if (!import.meta.env.VITE_FORMSPREE_ID) {
    console.error('[ContactForm] VITE_FORMSPREE_ID is not set — form submissions will fail')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, subject, message, newsletter }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-primary text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <h3 className="text-3xl font-headline font-bold text-white">Message Sent!</h3>
        <p className="text-on-surface-variant max-w-sm">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary font-bold border-b border-primary pb-1 hover:pb-2 transition-all"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClass =
    'bg-[rgba(40,42,47,0.4)] border border-outline-variant/50 rounded-xl px-4 py-3.5 text-sm font-body text-on-surface placeholder-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors w-full disabled:opacity-60'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {status === 'error' && (
        <p className="text-error text-sm font-label">Something went wrong. Please try again.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-on-surface-variant text-sm font-label font-semibold" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Alex Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'submitting'}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-on-surface-variant text-sm font-label font-semibold" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting'}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-on-surface-variant text-sm font-label font-semibold" htmlFor="subject">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={status === 'submitting'}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="" disabled>
            What's this about?
          </option>
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-on-surface-variant text-sm font-label font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project, idea, or just introduce yourself..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === 'submitting'}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-1 rounded"
        />
        <label htmlFor="newsletter" className="text-on-surface-variant text-sm font-body cursor-pointer">
          I'd like to receive occasional updates about new articles and projects
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95 font-headline text-sm self-start flex items-center gap-2 disabled:opacity-70 disabled:scale-100"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
        {status !== 'submitting' && (
          <span className="material-symbols-outlined text-base">send</span>
        )}
      </button>
    </form>
  )
}
