import AppHeader from '../AppHeader/AppHeader.jsx'
import BackButton from '../BackButton/BackButton.jsx'
import ScreenLayout from '../ScreenLayout/ScreenLayout.jsx'
import './ScreenFrame.css'

function ScreenFrame({ title, subtitle, backTo, children, className = '', style }) {
  return (
    <ScreenLayout>
      <div className={`screen-frame ${className}`} style={style}>
        <AppHeader />
        {backTo && <BackButton to={backTo} />}
        <main className="screen-frame__main">
          <div className="screen-frame__heading">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </ScreenLayout>
  )
}

export default ScreenFrame
