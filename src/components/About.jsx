import { DataHome } from '../data/dataHome'

// Keyword → { url } map (urutan terpanjang dulu untuk regex matching)
const DEFAULT_KEYWORD_LINKS = [
  { keyword: 'Framer Motion', url: 'https://www.framer.com/motion/' },
  { keyword: 'TailwindCSS', url: 'https://tailwindcss.com/' },
  { keyword: 'Construct 3', url: 'https://www.construct.net/' },
  { keyword: 'balikpapan.dev', url: 'https://balikpapan.dev/' },
  { keyword: 'Instagram', url: 'https://instagram.com/balikpapan.dev' },
  { keyword: 'Website', url: 'https://balikpapan.dev' },
  { keyword: 'React', url: 'https://react.dev/' },
  { keyword: 'Figma', url: 'https://figma.com/' },
  { keyword: 'Inotive', url: 'https://inotive.id/' },
  { keyword: 'Eduwork', url: 'https://eduwork.id/' },
  { keyword: 'Framer', url: 'https://www.framer.com/' },
  { keyword: 'Miro', url: 'https://miro.com/' },
  { keyword: 'MKA', url: 'https://www.mediakreasiabadi.co.id/' },
]

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

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

const LinkedParagraph = ({ text, keywordLinks, maxLinksPerKeyword = {} }) => {
  const links = keywordLinks || DEFAULT_KEYWORD_LINKS
  const regex = new RegExp(`(${links.map((k) => escapeRe(k.keyword)).join('|')})`, 'g')
  const parts = text.split(regex)

  return (
    <p className="text-app-secondary leading-relaxed">
      {parts.map((part, i) => {
        const def = links.find((k) => k.keyword === part)
        if (def) {
          const maxAllowed = maxLinksPerKeyword[part]
          if (maxAllowed !== undefined) {
            if (maxAllowed <= 0) return <span key={i}>{part}</span>
            maxLinksPerKeyword[part] -= 1
          }
          return <KeywordLink key={i} part={part} def={def} />
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

const About = ({ data, title, desc, keywordLinks, className }) => {
  const sourceData = data || DataHome?.heroSection
  const descItems = desc || sourceData?.desc || []
  const resolvedTitle = title !== undefined ? title : sourceData?.aboutTitle || sourceData?.title || 'About me . .'
  const headingText = typeof resolvedTitle === 'object' ? resolvedTitle.en || resolvedTitle.id || '' : resolvedTitle
  const containerClass = className !== undefined ? className : "space-y-3 pt-6 pb-2"

  // Counter untuk membatasi frekuensi hyperlink keyword jika diperlukan (misal: Instagram hanya 1x di paragraf 1)
  const linkCounter = { Instagram: 1 }

  return (
    <div className={containerClass}>
      {headingText && (
        <h3 className="text-app-primary text-[36px] font-crimson h-[40px] italic tracking-tighter">
          {headingText}
        </h3>
      )}

      <div className="space-y-3">
        {descItems.map((item, index) => {
          const text = typeof item === 'string' ? item : item.en || item.id || ''
          return (
            <LinkedParagraph
              key={index}
              text={text}
              keywordLinks={keywordLinks}
              maxLinksPerKeyword={linkCounter}
            />
          )
        })}
      </div>
    </div>
  )
}

export default About
