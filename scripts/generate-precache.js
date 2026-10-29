import { readdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const assetDirectory = resolve('dist/assets')
const assetFiles = await readdir(assetDirectory)
const assets = assetFiles.map((file) => `/assets/${file}`)
const coreFiles = ['/', '/index.html', '/manifest.webmanifest', '/app-icon.svg']
const contents = `self.__PRECACHE_URLS__ = ${JSON.stringify([...coreFiles, ...assets])};\n`

await writeFile(resolve('dist/precache-manifest.js'), contents)
