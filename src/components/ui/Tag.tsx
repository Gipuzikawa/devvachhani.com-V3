interface TagProps {
  text: string
  variant?: 'primary' | 'tertiary' | 'secondary' | 'neutral'
  className?: string
}

const variantClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary-dim',
  tertiary: 'bg-tertiary/10 text-tertiary-dim',
  secondary: 'bg-secondary/10 text-secondary-dim',
  neutral: 'bg-surface-container-high text-on-surface-variant',
}

export default function Tag({ text, variant = 'neutral', className = '' }: TagProps) {
  return (
    <span
      className={`text-xs rounded-full px-3 py-1 font-label font-medium ${variantClasses[variant]} ${className}`}
    >
      {text}
    </span>
  )
}
