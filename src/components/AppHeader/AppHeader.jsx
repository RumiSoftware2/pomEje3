import { Link } from 'react-router-dom'
import StarCounter from '../StarCounter/StarCounter.jsx'
import useProgress from '../../hooks/useProgress.js'
import areaAndinaLogo from '../../assets/logo-fundacionUniversitariaAreaAndina.png'
import './AppHeader.css'

function AppHeader() {
  const { progress } = useProgress()
  return (
    <header className="app-header">
      <Link className="app-header__brand" to="/" aria-label="Inicio de Miniaventuras">
        <img src={areaAndinaLogo} alt="Área Andina" />
        <span aria-hidden="true" />
        <strong>Miniaventuras</strong>
      </Link>
      <nav className="app-header__actions" aria-label="Accesos rápidos">
        <Link className="app-header__adult" to="/padres" aria-label="Ajustes para adultos">⚙</Link>
        <StarCounter total={progress.stars} />
      </nav>
    </header>
  )
}

export default AppHeader
