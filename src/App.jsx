import ScreenLayout from './components/ScreenLayout/ScreenLayout.jsx'
import Mascot from './components/Mascot/Mascot.jsx'
import BigButton from './components/BigButton/BigButton.jsx'
import StarCounter from './components/StarCounter/StarCounter.jsx'
import areaAndinaLogo from './assets/logo-fundacionUniversitariaAreaAndina.png'
import './App.css'

const team = [
  'Laura Vanessa Martínez',
  'Yuri Paola Mosquera',
  'Jhon Edwin Nasequia',
  'Sebastian Mendoza Duitama',
  'María Graciela Morales Pabón',
]

function App() {
  return (
    <ScreenLayout>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Inicio, Miniaventuras">
          <img
            className="brand__logo"
            src={areaAndinaLogo}
            alt="Fundación Universitaria del Área Andina"
          />
          <span className="brand__divider" aria-hidden="true" />
          <span className="brand__name">Miniaventuras</span>
        </a>
        <StarCounter total={0} />
      </header>

      <main id="inicio" className="home">
        <section className="welcome" aria-labelledby="welcome-title">
          <div className="welcome__copy">
            <span className="eyebrow"><span aria-hidden="true">✦</span> Aprendemos jugando</span>
            <h1 id="welcome-title">Pequeños pasos,<br /><span>grandes aventuras</span></h1>
            <p className="welcome__description">
              Un espacio para moverse, descubrir y aprender en familia.
            </p>
            <BigButton icon="▶" onClick={() => document.getElementById('equipo')?.scrollIntoView({ behavior: 'smooth' })}>
              ¡Comencemos!
            </BigButton>
            <p className="welcome__note">Una aventura nueva te espera</p>
          </div>
          <div className="welcome__art" aria-label="Nimbo, una nube amiga" role="img">
            <span className="art-spark art-spark--one" aria-hidden="true">✦</span>
            <span className="art-spark art-spark--two" aria-hidden="true">✧</span>
            <span className="art-cloud" aria-hidden="true" />
            <Mascot />
            <span className="art-caption">¡Hola, exploradores!</span>
          </div>
          <span className="welcome__index" aria-hidden="true">01 <i /> 03</span>
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
            <div>
              <p className="section-kicker">Detrás de esta aventura</p>
              <h2 id="team-title">Nuestro equipo</h2>
            </div>
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

      <footer className="footer">
        <span>Hecho con cariño para aprender y crecer</span>
        <span className="footer__heart" aria-hidden="true">♥</span>
        <span>Área Andina · Cátedra Pablo Oliveros Marmolejo</span>
      </footer>
    </ScreenLayout>
  )
}

export default App
