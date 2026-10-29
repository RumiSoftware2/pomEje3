import './ScreenLayout.css'

function ScreenLayout({ children }) {
  return (
    <div className="screen-layout">
      <div className="screen-layout__decor screen-layout__decor--left" aria-hidden="true" />
      <div className="screen-layout__decor screen-layout__decor--right" aria-hidden="true" />
      <div className="screen-layout__decor screen-layout__decor--star-one" aria-hidden="true">✦</div>
      <div className="screen-layout__decor screen-layout__decor--star-two" aria-hidden="true">✧</div>
      <div className="screen-layout__decor screen-layout__decor--bubble-one" aria-hidden="true" />
      <div className="screen-layout__decor screen-layout__decor--bubble-two" aria-hidden="true" />
      <div className="screen-layout__decor screen-layout__decor--flower" aria-hidden="true">✳</div>
      <div className="screen-layout__content">{children}</div>
    </div>
  )
}

export default ScreenLayout
