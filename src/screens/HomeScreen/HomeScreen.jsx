import { useNavigate } from 'react-router-dom'
import useSettings from '../../hooks/useSettings.js'
import AppHeader from '../../components/AppHeader/AppHeader.jsx'
import Mascot from '../../components/Mascot/Mascot.jsx'
import BigButton from '../../components/BigButton/BigButton.jsx'
import ScreenLayout from '../../components/ScreenLayout/ScreenLayout.jsx'
import './HomeScreen.css'

const team = [
  'Laura Vanessa Martínez',
  'Yuri Paola Mosquera',
  'Jhon Edwin Nasequia',
  'Sebastian Mendoza Duitama',
  'María Graciela Morales Pabón',
]

function HomeScreen() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const greeting = settings.childName.trim() ? `¡Hola, ${settings.childName}!` : '¡Hola, exploradores!'

  return (
    <ScreenLayout>
      <div className="screen-frame home-route">
        <AppHeader />
      <main id="inicio" className="home">
        <section className="welcome" aria-labelledby="welcome-title">
          <div className="welcome__copy">
            <span className="eyebrow"><span aria-hidden="true">✦</span> Aprendemos jugando</span>
            <h1 id="welcome-title">Pequeños pasos,<br /><span>grandes aventuras</span></h1>
            <p className="welcome__description">{greeting} Descubre, muévete y aprende en familia.</p>
            <BigButton icon="▶" onClick={() => navigate('/materias')}>¡Jugar!</BigButton>
            <p className="welcome__note">Una aventura nueva te espera</p>
          </div>
          <div className="welcome__art" aria-label="Nimbo, una nube amiga" role="img">
            <span className="art-spark art-spark--one" aria-hidden="true">✦</span>
            <span className="art-spark art-spark--two" aria-hidden="true">✧</span>
            <span className="art-cloud" aria-hidden="true" />
            <Mascot />
            <span className="art-caption">{greeting}</span>
          </div>
        </section>

        <section className="institution" aria-label="Información académica">
          <div className="institution__mark" aria-hidden="true">A</div>
          <div>
            <p className="institution__name">Fundación Universitaria del Área Andina</p>
            <p className="institution__detail">Cátedra Pablo Oliveros Marmolejo</p>
          </div>
          <span className="institution__tag">Proyecto académico</span>
        </section>

        <section id="equipo" className="team" aria-labelledby="team-title">
          <div className="team__heading">
            <div><p className="section-kicker">Detrás de esta aventura</p><h2 id="team-title">Nuestro equipo</h2></div>
            <span className="team__decoration" aria-hidden="true">✳</span>
          </div>
          <ul className="team__list">
            {team.map((member, index) => (
              <li className="team-card" key={member}>
                <span className={`team-card__avatar team-card__avatar--${index + 1}`} aria-hidden="true">
                  {member.split(' ').slice(0, 2).map((part) => part[0]).join('')}
                </span>
                <span className="team-card__name">{member}</span>
                <span className="team-card__spark" aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
        <footer className="footer"><span>Hecho con cariño para aprender y crecer</span><span aria-hidden="true">♥</span><span>Área Andina · Cátedra Pablo Oliveros Marmolejo</span></footer>
      </div>
    </ScreenLayout>
  )
}

export default HomeScreen
