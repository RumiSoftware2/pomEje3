import ScreenFrame from '../../components/ScreenFrame/ScreenFrame.jsx'
import './VideoLesson.css'

function VideoLesson({ subject, topic, data }) {
  return (
    <ScreenFrame title={topic.nombre} subtitle={`Un video especial de ${subject.nombre}.`} backTo={`/materia/${subject.id}`} className="video-lesson">
      <section aria-labelledby="video-title">
        <h2 id="video-title">{data.titulo}</h2>
        <p className="video-lesson__note">Mira el video junto a un adulto.</p>
        <div className="video-lesson__frame">
          <iframe
            src={data.url}
            title={data.titulo}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>
    </ScreenFrame>
  )
}

export default VideoLesson
