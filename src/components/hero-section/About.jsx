import { DataHome } from '../../data/dataHome'

// Keyword → { url } map (urutan terpanjang dulu untuk regex matching)
const KEYWORD_LINKS = [
  { keyword: 'Framer Motion', url: 'https://www.framer.com/motion/' },
  { keyword: 'TailwindCSS', url: 'https://tailwindcss.com/' },
  { keyword: 'Construct 3', url: 'https://www.construct.net/' },
  { keyword: 'React', url: 'https://react.dev/' },
  { keyword: 'Figma', url: 'https://figma.com/' },
  { keyword: 'Inotive', url: 'https://inotive.id/' },
  { keyword: 'Eduwork', url: 'https://eduwork.id/' },
  { keyword: 'Framer', url: 'https://www.framer.com/' },
  { keyword: 'Miro', url: 'https://miro.com/' },
  { keyword: 'MKA', url: 'https://www.mediakreasiabadi.co.id/' },
  { keyword: 'balikpapan.dev', url: 'https://balikpapan.dev/' },
]

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const KEYWORD_RE = new RegExp(
  `(${KEYWORD_LINKS.map((k) => escapeRe(k.keyword)).join('|')})`,
  'g'
)

const KeywordLink = ({ part, def }) => (
  <a
    href={def.url}
    target="_blank"
    rel="noopener noreferrer"
    className="keyword-link cursor-pointer"
  >
    {part}
  </a>
)

const LinkedParagraph = ({ text }) => {
  const parts = text.split(KEYWORD_RE)

  return (
    <p className="text-app-secondary leading-relaxed">
      {parts.map((part, i) => {
        const def = KEYWORD_LINKS.find((k) => k.keyword === part)
        if (def) return <KeywordLink key={i} part={part} def={def} />
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

const About = () => {
  const descItems = DataHome.heroSection.desc || []

  return (
    <div className="space-y-3 pt-6 pb-2">
      <h3 className="text-app-primary text-[36px] font-crimson h-[40px] italic tracking-tighter">
        About me . .
      </h3>

      <div className="space-y-3">
        {descItems.map((item, index) => (
          <LinkedParagraph key={index} text={item.en} />
        ))}
      </div>
    </div>
  )
}

export default About
