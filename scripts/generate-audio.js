import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { Buffer } from 'node:buffer'

const sampleRate = 22_050
const bitDepth = 16
const effectDirectory = resolve('public/audio/efectos')
const musicDirectory = resolve('public/audio/musica')
await mkdir(effectDirectory, { recursive: true })
await mkdir(musicDirectory, { recursive: true })

function note(frequency, time, start, duration, strength = 0.14) {
  const localTime = time - start
  if (localTime < 0 || localTime > duration) return 0
  const attack = Math.min(1, localTime / 0.025)
  const release = Math.min(1, (duration - localTime) / Math.min(0.16, duration / 2))
  const envelope = Math.max(0, Math.min(attack, release)) * Math.exp(-2.8 * localTime / duration)
  return Math.sin(2 * Math.PI * frequency * localTime) * strength * envelope
}

function melodyAt(time, notes, beat = 0.15, strength = 0.14) {
  return notes.reduce((sum, item) => sum + note(item.frequency, time, item.start, item.duration ?? beat, item.strength ?? strength), 0)
}

async function saveWave(path, duration, getSample) {
  const frameCount = Math.floor(sampleRate * duration)
  const dataBytes = frameCount * 2
  const wav = Buffer.alloc(44 + dataBytes)
  wav.write('RIFF', 0)
  wav.writeUInt32LE(36 + dataBytes, 4)
  wav.write('WAVE', 8)
  wav.write('fmt ', 12)
  wav.writeUInt32LE(16, 16)
  wav.writeUInt16LE(1, 20)
  wav.writeUInt16LE(1, 22)
  wav.writeUInt32LE(sampleRate, 24)
  wav.writeUInt32LE(sampleRate * 2, 28)
  wav.writeUInt16LE(2, 32)
  wav.writeUInt16LE(bitDepth, 34)
  wav.write('data', 36)
  wav.writeUInt32LE(dataBytes, 40)

  for (let frame = 0; frame < frameCount; frame += 1) {
    const time = frame / sampleRate
    const edgeFade = Math.min(1, time / 0.025, (duration - time) / 0.06)
    const sample = Math.max(-0.92, Math.min(0.92, getSample(time) * Math.max(0, edgeFade)))
    wav.writeInt16LE(Math.round(sample * 32_767), 44 + frame * 2)
  }

  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, wav)
}

const effects = [
  ['tap', 0.12, (t) => note(520 - t * 950, t, 0, 0.12, 0.1)],
  ['success-small', 0.52, (t) => melodyAt(t, [
    { frequency: 392, start: 0, duration: 0.2 },
    { frequency: 494, start: 0.18, duration: 0.23 },
    { frequency: 587, start: 0.36, duration: 0.16, strength: 0.11 },
  ])],
  ['star', 0.74, (t) => melodyAt(t, [
    { frequency: 523, start: 0, duration: 0.22 },
    { frequency: 659, start: 0.16, duration: 0.25 },
    { frequency: 784, start: 0.34, duration: 0.32, strength: 0.1 },
  ])],
  ['celebration', 1.25, (t) => melodyAt(t, [
    { frequency: 392, start: 0, duration: 0.24 },
    { frequency: 494, start: 0.15, duration: 0.26 },
    { frequency: 587, start: 0.32, duration: 0.3 },
    { frequency: 784, start: 0.52, duration: 0.52, strength: 0.1 },
    { frequency: 587, start: 0.78, duration: 0.33, strength: 0.07 },
  ], 0.2, 0.12)],
  ['countdown-tick', 0.11, (t) => note(440, t, 0, 0.1, 0.1)],
  ['ya', 0.24, (t) => melodyAt(t, [
    { frequency: 440, start: 0, duration: 0.1 },
    { frequency: 523, start: 0.09, duration: 0.13 },
  ], 0.12, 0.12)],
  ['transition', 0.34, (t) => note(240 + 250 * Math.sin(Math.PI * t / 0.34), t, 0, 0.34, 0.08)],
  ['ice', 0.62, (t) => melodyAt(t, [
    { frequency: 440, start: 0, duration: 0.3, strength: 0.1 },
    { frequency: 554, start: 0.11, duration: 0.34, strength: 0.08 },
    { frequency: 659, start: 0.22, duration: 0.36, strength: 0.06 },
  ])],
  ['applause', 0.72, (t) => {
    const pulses = [0.02, 0.13, 0.25, 0.4, 0.53]
    return pulses.reduce((sum, start, index) => sum + note(250 + index * 24, t, start, 0.12, 0.07), 0)
  }],
  ['error-soft', 0.38, (t) => melodyAt(t, [
    { frequency: 330, start: 0, duration: 0.18, strength: 0.09 },
    { frequency: 294, start: 0.17, duration: 0.19, strength: 0.08 },
  ], 0.15, 0.1)],
  ['rest', 0.92, (t) => melodyAt(t, [
    { frequency: 330, start: 0, duration: 0.28, strength: 0.1 },
    { frequency: 392, start: 0.2, duration: 0.3, strength: 0.09 },
    { frequency: 440, start: 0.42, duration: 0.4, strength: 0.07 },
  ])],
]

for (const [name, duration, getSample] of effects) {
  await saveWave(resolve(effectDirectory, `${name}.wav`), duration, getSample)
}

const tracks = [
  { name: 'musica-suave-1', melody: [60, 64, 67, 72, 69, 67, 64, 62, 64, 60], roots: [48, 53, 48] },
  { name: 'musica-suave-2', melody: [67, 69, 72, 74, 72, 69, 67, 64, 67, 69], roots: [55, 53, 55] },
  { name: 'musica-suave-3', melody: [60, 62, 64, 67, 69, 67, 64, 62, 60, 64], roots: [48, 55, 48] },
]

const frequencyForMidi = (number) => 440 * (2 ** ((number - 69) / 12))
const trackDuration = 15

for (const track of tracks) {
  await saveWave(resolve(musicDirectory, `${track.name}.wav`), trackDuration, (time) => {
    const stepDuration = 0.5
    const step = Math.floor(time / stepDuration) % track.melody.length
    const stepTime = time % stepDuration
    const melodyFrequency = frequencyForMidi(track.melody[step])
    const melodyEnvelope = Math.exp(-5 * stepTime / stepDuration)
    const melody = Math.sin(2 * Math.PI * melodyFrequency * stepTime) * 0.11 * melodyEnvelope
    const chordIndex = Math.floor(time / 5) % track.roots.length
    const root = frequencyForMidi(track.roots[chordIndex])
    const fifth = frequencyForMidi(track.roots[chordIndex] + 7)
    const bass = Math.sin(2 * Math.PI * root * time) * 0.035 + Math.sin(2 * Math.PI * fifth * time) * 0.018
    return (melody + bass) * Math.min(1, time / 0.12, (trackDuration - time) / 0.16)
  })
}

console.log(`Se generaron ${effects.length} efectos y ${tracks.length} pistas originales.`)
