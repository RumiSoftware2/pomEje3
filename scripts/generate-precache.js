import { readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const assetDirectory = resolve('dist/assets')
const assetFiles = await readdir(assetDirectory)
const assets = assetFiles.map((file) => `/assets/${file}`)
const audioFiles = [
  ...(await readdir(resolve('dist/audio/efectos'))).map((file) => `/audio/efectos/${file}`),
  ...(await readdir(resolve('dist/audio/musica'))).map((file) => `/audio/musica/${file}`),
]
const coreFiles = ['/', '/index.html', '/manifest.webmanifest', '/app-icon.svg']
const contents = `self.__PRECACHE_URLS__ = ${JSON.stringify([...coreFiles, ...assets, ...audioFiles])};\n`

await writeFile(resolve('dist/precache-manifest.js'), contents)
