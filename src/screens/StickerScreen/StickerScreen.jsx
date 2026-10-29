import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import useProgress from '../../hooks/useProgress.js'
import stickers from '../../content/stickers.js'
import './StickerScreen.css'

function StickerScreen() {
  const { progress } = useProgress()
  return (
    <ScreenFrame title="Álbum de pegatinas" subtitle="Cada cinco estrellas ganas una." backTo="/">
      <div className="sticker-grid">
        {stickers.map((sticker) => {
          const unlocked = progress.stickers.includes(sticker.id)
          return (
            <article className={`sticker-card${unlocked ? ' is-unlocked' : ' is-locked'}`} key={sticker.id}>
              <span className="sticker-card__emoji" aria-hidden="true">{unlocked ? sticker.emoji : '🔒'}</span>
              <strong>{unlocked ? sticker.nombre : 'Por descubrir'}</strong>
            </article>
          )
        })}
      </div>
    </ScreenFrame>
  )
}

export default StickerScreen
