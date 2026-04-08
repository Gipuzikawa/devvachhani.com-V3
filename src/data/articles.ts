wimport type { Article } from '../types'

export const articles: Article[] = [
  {
    id: '1',
    slug: 'architectural-dynamics-the-future-of-user-interfaces',
    title: 'Architectural Dynamics: The Future of User Interfaces',
    excerpt:
      'How fluid design philosophies are transforming fintech and reshaping our relationship with digital architecture — and what it means for the next generation of builders.',
    category: 'Design',
    readTime: 12,
    date: 'December 2024',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwQfJZ7bryFUIH_FbvrxGrfNQelAg3eN2v1k7tRyLdqN_jZK9xQbjSvz2_w2IitNEHqaAIvc9V7xvsNjJH1Pxu5apROWrJNMyLP59k_ZXXk8YAA8a7oBX55e9QprixLJ4d_bGKYTrrfbv9SpH_JQLde-DC8StAyASaaPGd3K1uy8oaAcBjtHWTWtNBRe_X5Rt08yXnwpf7rK3_cECIFsp3FUL4pKb1ioe2-SroFCyZ7P-CyjC7oMNrNSx2UFpNA1QmDgvT_YEmCvWl',
    featured: true,
    featuredSize: 'large',
    tags: ['Design Theory', 'Fintech', 'UX Architecture'],
    body: `
      <div class="rounded-2xl overflow-hidden mb-10 -mt-4">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4z4bktwTpTzJ4ZZClzzFKmrGILTcLpb8IVjbCa0DHvw5XDdl2wAJTmypvGhPy9ZWl5UREVE84154zH1j--xSSqGEL-j4GGx-g_jSGq9nru-Et688a5sHVbfSyp5hT5ulnmH9-OE8_Y25R3qtozx4sX97uDUKH1S-Y2kM6bxRLtmSf-BPVPznIOSLTDv9pQNYYK7q2O6DQf_ro5GgDKAXD5npzvU73ayycP0D0XTHj" alt="Fluid interface design concept — dynamic UI architecture visualization" class="w-full h-[400px] object-cover" />
      </div>

      <h2>The Shift Toward Fluid Architecture</h2>
      <p>For most of the last decade, user interfaces have been governed by a kind of geological certainty — static, predictable, built on grids that don't breathe. We designed systems as if software were furniture: stable, physical, something you place once and leave undisturbed.</p>
      <p>That metaphor is collapsing. The most interesting interfaces being built today — especially in fintech, where the stakes of clarity and trust are highest — treat the interface not as furniture, but as water. They adapt. They respond to context, to the user's state, to the emotional register of the moment.</p>

      <blockquote>
        <p>"The interface of the future doesn't present information — it anticipates needs and dissolves friction before it can form."</p>
      </blockquote>

      <h2>What Fintech Gets Right</h2>
      <p>Financial applications have long been derided for their conservatism — row after row of numbers, dense with legal obligation and institutional caution. But the new wave of fintech design is doing something quietly radical: it's treating money not as a set of facts to be reported, but as a story to be understood.</p>
      <p>Consider the way modern budgeting apps surface spending trends. The data doesn't change. What changes is the frame — the system decides which data is most emotionally salient in this moment, for this person, and presents it accordingly. This is fluid architecture in practice.</p>

      <h3>The Three Pillars of Fluid Design</h3>
      <ul>
        <li><strong style="color:#e2e2e6">Contextual Awareness:</strong> The interface knows where you are in your journey, not just what screen you're on. State is tracked semantically, not just technically.</li>
        <li><strong style="color:#e2e2e6">Emotional Responsiveness:</strong> Tone, density, and pacing shift based on the nature of the task. Reviewing a failed transaction feels different from celebrating a savings milestone — the interface should, too.</li>
        <li><strong style="color:#e2e2e6">Progressive Disclosure:</strong> Information is layered. The surface is clean. Depth is available on demand, never imposed.</li>
      </ul>

      <h2>Material Design 3 as a Blueprint</h2>
      <p>Google's Material Design 3 represents the clearest large-scale attempt to codify fluid interface principles into a design system. Its introduction of dynamic color — surfaces that shift hue based on user-selected wallpapers — was widely dismissed as cosmetic. But this misses the point entirely.</p>
      <p>Dynamic theming is a proof of concept for interface systems that respond to personal context. The wallpaper is just the first input. The logical extension is interfaces that respond to time of day, task category, stress indicators from wearables, and the accumulated context of a relationship between user and product.</p>

      <blockquote>
        <p>"Design tokens aren't about color values. They're about encoding intent — the difference between 'blue' and 'trust'."</p>
      </blockquote>

      <h3>The Role of Design Tokens</h3>
      <p>None of this is possible without a strong semantic token architecture. When your design system encodes intent rather than value — "surface-container" rather than "#1e1f23" — you create the conditions for dynamic adaptation. The token is the contract; the resolved value is a runtime decision.</p>
      <p>This is the piece most high school and early-career designers miss when they learn design systems. The goal is not to make Figma and code agree on hex values. The goal is to encode the semantics of your visual language so the system can make intelligent decisions at scale.</p>

      <h2>Building for the Next Five Years</h2>
      <p>If I were starting a design system project today — and in some ways, I am, with every project I take on — I would build for fluidity from day one. That means:</p>
      <ul>
        <li>Semantic token architecture with at least three layers of abstraction</li>
        <li>Component APIs designed for contextual variants, not just visual states</li>
        <li>Animation systems that treat motion as communication, not decoration</li>
        <li>Accessibility woven into the architecture, not bolted on at the end</li>
      </ul>
      <p>The interfaces that will matter most in the next five years will be the ones that disappear — that become so responsive to human context that users stop noticing them and simply live within them. That's the horizon we're building toward. And from where I'm standing, as a high school designer in 2024, it's never been closer.</p>
    `,
  },
  {
    id: '2',
    slug: 'cognitive-dissonance-in-modern-ux',
    title: 'Cognitive Dissonance in Modern UX',
    excerpt:
      'Why the most frustrating digital experiences often stem from misaligned user expectations — and what designers can do about it.',
    category: 'Design',
    readTime: 8,
    date: 'November 2024',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-Tf9IiDr0c6NgmnDzJsCCcXAk1EzYjsTDV5s-51aAYj0P0up-FC2q5-2mKmL8BpCv1pfuyKqwyM8BNY9TOfs3puIMyLUoDX7VQc_ZeA6nAICk3l5qyBmvomq6whuBygqgsoApCsEyOJRPd4K8_lm0XfVdaLuQrKc0jCkMs8eCg0rkGy-qMn2B8YQvdhXl3XLt_uTljV6q2KVU7FAWX6v-Ss3Mjr7BdsH6c_TQaale1VeoI40_u4mj1-dGtPspmNe9WC_WPS8VxeKk',
    featured: true,
    featuredSize: 'side',
    body: '',
  },
  {
    id: '3',
    slug: 'the-ethics-of-persuasive-design',
    title: 'The Ethics of Persuasive Design',
    excerpt:
      'Dark patterns, deceptive interfaces, and the moral responsibility of designers who shape behavior at scale.',
    category: 'Design',
    readTime: 6,
    date: 'October 2024',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqY0h2FzLsVD4HSNRlYpbhBfF-qnOEZM1Ath-Sq3eXBL9WWV_oqHcDh_YV_8OHPaMJpOwkSOfsnskFlWyxDoExZOjlyJda99TqEnJiGBYd03dtXyfUm2LSHmXrR8L6EjeyrW23CIQSrUtExppMEIzTIjw31SKOladjn60A_oLGzK9zaOtewVTUpF8qnNjmDIp_tB1Aln2tiWUri1I6xvcjJkabfvVTJu06Hlma66trErHlA9UeDdHpQ1ozhVDjI5J-TXx-ElNSojQG',
    featured: true,
    featuredSize: 'side',
    body: '',
  },
  {
    id: '4',
    slug: 'design-for-a-better-planet-sustainable-ux',
    title: 'Design for a Better Planet: Sustainable UX',
    excerpt:
      'How conscious design choices reduce digital carbon footprints and promote environmental awareness.',
    category: 'Culture',
    readTime: 5,
    date: 'Nov 2024',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuXWah9IX6K66T8wjdcWZY3RRCqewdpnNOtGWfo_ivuUQGjI498fmcFlgFLJarcvbYnHmwi2sfso2TrgIcQIM7tzs9FFOYtiqO8R1Scl6az6UTPORhqztvPhmZmfFkfph7uNPl21WjIC4GQXgrESwaz2xPK8iQD94uH8Y7Fp3fjcjGS0z3xRu6i0K4F7E6q3wF3RAecgQZMtrbDr9HZ6m85uw4E6QtHVgmFKoYs-rKO9d7k90GgskSkrsrT6avbOp87NwsWj54c3q1',
    featured: false,
    body: '',
  },
  {
    id: '5',
    slug: 'privacy-by-design-a-ux-perspective-on-data-security',
    title: 'Privacy by Design: A UX Perspective on Data Security',
    excerpt:
      'Designing interfaces that make secure behavior the path of least resistance for everyday users.',
    category: 'Tech',
    readTime: 7,
    date: 'Oct 2024',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfTTArhpluZl_5IRE8CFy34A4x48bHNVp32ZIOyTd8zIA16ZczagQORH7_D668mljBYIA3x1szjZ56FRhBpFmWT_eIoeaLsetcsM4jJ0i7Y5TXbnMPtmQTUwP5hvUMe2391y4fUeVb0m2vd0d5zj778F-DsyjkryoGuALC1j3r2Fa_99TPwMYC9pysZ5xXkL-7vy8_0azGKkQp2KyKZqg9BxkzKR1LthONsvSOfaYE_SrUuyHPKRzKJXjyyGOqcTMSfgl9WgX51Jab',
    featured: false,
    body: '',
  },
  {
    id: '6',
    slug: 'why-design-tokens-are-the-future-of-scalable-ui',
    title: 'Why Design Tokens Are the Future of Scalable UI',
    excerpt:
      'From raw hex values to semantic tokens — how this shift unlocks true design-dev collaboration.',
    category: 'Design',
    readTime: 9,
    date: 'Sep 2024',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_dmLzWj1ozpC9wywTSWj4W1Mv6qZVnOu4YpvqDbmSQamvkVbeeVQ9OEnrdGP33PUnwtI9eF3-xMjMjWzy2N7FkqhLsD2F4t3zkwAxRHiBVBsYR_pvLXxNdlLz6VjN6qQonU8ddcc8zTqpFmHbx-UGZSwgTwwRNyEiIOksz8Hwj9q7yBJRHVKPUIm2IlwaqeBlqQsqztFIJNieMPvgOOuM54tqZgMHSc7yDKy6osJd1tRYZftkMF-jVvVUHUYe3aEalAPmiEB65Sw',
    featured: false,
    body: '',
  },
  {
    id: '7',
    slug: 'the-psychology-of-empty-states-in-mobile-apps',
    title: 'The Psychology of Empty States in Mobile Apps',
    excerpt:
      'What happens when there\'s nothing to show — and why that moment matters more than you think.',
    category: 'Design',
    readTime: 6,
    date: 'Aug 2024',
    imageUrl: null,
    featured: false,
    body: '',
  },
  {
    id: '8',
    slug: 'beyond-wcag-designing-truly-inclusive-experiences',
    title: 'Beyond WCAG: Designing Truly Inclusive Experiences',
    excerpt:
      'Compliance is a floor, not a ceiling. What it truly means to design for everyone from day one.',
    category: 'Culture',
    readTime: 10,
    date: 'Jul 2024',
    imageUrl: null,
    featured: false,
    body: '',
  },
]
