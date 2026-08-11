/**
 * public/imgs 안의 이미지를 웹에 적당한 크기로 줄여 덮어쓴다.
 * 결과가 원본보다 클 때는 건드리지 않는다. `npm run optimize:images`로 실행.
 */
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const IMG_DIR = path.resolve('public/imgs')
const MAX_WIDTH = 1600
const JPEG_QUALITY = 80

const formatKB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

const files = (await readdir(IMG_DIR, { recursive: true })).sort()
let savedTotal = 0

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

  const filePath = path.join(IMG_DIR, file)
  const original = await readFile(filePath)
  const { width } = await sharp(original).metadata()

  // 렌더링 결과물과 현장 사진은 PNG로 두면 용량이 몇 배로 커지고,
  // 팔레트 PNG로 줄이면 화질이 무너지므로 JPEG로 변환한다.
  const relative = file.replaceAll('\\', '/')
  const isPhoto =
    relative.startsWith('3d/') || relative.startsWith('dev/') || relative === 'working.png'
  const toJpeg = ext !== '.png' || isPhoto

  let pipeline = sharp(original).rotate()
  if (width && width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }

  pipeline = toJpeg
    ? pipeline.flatten({ background: '#0a0a10' }).jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    : pipeline.png({ compressionLevel: 9, palette: true })

  const output = await pipeline.toBuffer()
  const outPath = toJpeg ? filePath.replace(/\.png$/i, '.jpg') : filePath

  if (outPath === filePath && output.length >= original.length) {
    console.log(`skip   ${file} (${formatKB(original.length)})`)
    continue
  }

  await writeFile(outPath, output)
  if (outPath !== filePath) await unlink(filePath)
  savedTotal += original.length - output.length
  console.log(`ok     ${file}  ${formatKB(original.length)} -> ${formatKB(output.length)}`)
}

console.log(`\n총 ${formatKB(savedTotal)} 절약`)
