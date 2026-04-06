export default function BentoSkillsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* UI Design */}
      <div className="lg:col-span-2 bg-surface-container-high rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined text-primary text-2xl">palette</span>
        </div>
        <h3 className="text-xl font-bold font-headline text-white">UI Design</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Crafting pixel-perfect interfaces with Material Design 3, creating cohesive design systems and component libraries.
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">Figma</span>
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">Material 3</span>
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">Prototyping</span>
        </div>
      </div>

      {/* Frontend Dev */}
      <div className="lg:col-span-2 bg-surface-container-high rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center group-hover:bg-tertiary/20 transition-colors">
          <span className="material-symbols-outlined text-tertiary-dim text-2xl">code</span>
        </div>
        <h3 className="text-xl font-bold font-headline text-white">Frontend Dev</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Building responsive, accessible web apps with modern frameworks and a deep focus on performance.
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="text-xs bg-tertiary/10 text-tertiary-dim px-3 py-1 rounded-full font-label">React</span>
          <span className="text-xs bg-tertiary/10 text-tertiary-dim px-3 py-1 rounded-full font-label">Tailwind</span>
          <span className="text-xs bg-tertiary/10 text-tertiary-dim px-3 py-1 rounded-full font-label">TypeScript</span>
        </div>
      </div>

      {/* Creative Suite */}
      <div className="lg:col-span-2 bg-surface-container-high rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-secondary-container/50 flex items-center justify-center group-hover:bg-secondary-container transition-colors">
          <span className="material-symbols-outlined text-secondary-dim text-2xl">brush</span>
        </div>
        <h3 className="text-xl font-bold font-headline text-white">Creative Suite</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Motion design, brand identity, and visual storytelling that leaves a lasting impression.
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="text-xs bg-secondary-container/50 text-secondary-dim px-3 py-1 rounded-full font-label">After Effects</span>
          <span className="text-xs bg-secondary-container/50 text-secondary-dim px-3 py-1 rounded-full font-label">Illustrator</span>
        </div>
      </div>

      {/* User Research */}
      <div className="lg:col-span-3 bg-gradient-to-br from-primary/10 to-tertiary/5 rounded-2xl p-6 flex flex-col gap-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl">people</span>
        </div>
        <h3 className="text-xl font-bold font-headline text-white">User Research</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Conducting usability studies, interviews, and accessibility audits to validate design decisions and champion inclusive experiences.
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">WCAG 2.1</span>
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">A/B Testing</span>
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">Usability</span>
        </div>
      </div>

      {/* Collaborative */}
      <div className="lg:col-span-3 bg-surface-container rounded-2xl p-6 flex flex-col gap-4 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">groups</span>
        </div>
        <h3 className="text-xl font-bold font-headline text-white">Collaborative</h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed">
          Leading cross-functional teams, presenting design rationale, and iterating based on stakeholder feedback in agile environments.
        </p>
        <div className="flex items-center gap-4 mt-auto">
          <div className="text-center">
            <p className="text-2xl font-black font-headline text-white">95%</p>
            <p className="text-on-surface-variant text-xs font-body">Client Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black font-headline text-white">8+</p>
            <p className="text-on-surface-variant text-xs font-body">Teams Led</p>
          </div>
        </div>
      </div>
    </div>
  )
}
