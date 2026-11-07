import { DataHome } from '../../data/dataHome'

const About = () => {
  const descItems = DataHome.heroSection.desc || []

  return (
    <div className="space-y-3 pt-6 pb-2">
      <h3 className="text-app-primary text-[36px] font-crimson h-[40px] italic tracking-tighter">
        About me . .
      </h3>

      <div className="space-y-3">
        {descItems.map((item, index) => (
          <p key={index} className="text-app-secondary text-[15px] leading-relaxed">
            {item.en}
          </p>
        ))}
      </div>
    </div>
  )
}

export default About

