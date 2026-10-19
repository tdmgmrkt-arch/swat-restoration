import sharp from "sharp"
import { readdir, unlink, access } from "node:fs/promises"
import { join } from "node:path"

/**
 * Converts raw blog hero exports in `public/blog/` to 1600px-wide WebP.
 *
 * Accepts png/jpg/jpeg/avif/tif/tiff so it doesn't matter what the image tool
 * exported. The source file is deleted only after the WebP is written.
 *
 * IMPORTANT: `public/blog/` still holds legacy source images from the original
 * site migration — mixed-case .png/.jpeg originals whose lowercase .webp
 * counterparts are already the ones in use. A bare run of the naive version of
 * this script would convert and DELETE those too, so:
 *
 *   - Pass filenames explicitly to convert only those:
 *       node scripts/convert-blog-pngs.mjs foo.png bar.jpg
 *   - A bare run converts only sources that have NO .webp of the same
 *     basename, and reports what it skipped.
 *   - Pass --all to force conversion of every source file found.
 */
const dir = new URL("../public/blog/", import.meta.url).pathname.replace(/^\//, "")
const SOURCE_EXT = /\.(png|jpe?g|avif|tiff?)$/i

const argv = process.argv.slice(2)
const forceAll = argv.includes("--all")
const explicit = argv.filter((a) => !a.startsWith("--"))

const entries = await readdir(dir)
const allSources = entries.filter((f) => SOURCE_EXT.test(f))

let sources = []
let skipped = []

if (explicit.length > 0) {
  sources = explicit
} else {
  const pairs = await Promise.all(
    allSources.map(async (f) => {
      let hasWebp = false
      try {
        await access(join(dir, f.replace(SOURCE_EXT, ".webp")))
        hasWebp = true
      } catch {}
      return { f, hasWebp }
    })
  )
  sources = forceAll ? allSources : pairs.filter((p) => !p.hasWebp).map((p) => p.f)
  skipped = forceAll ? [] : pairs.filter((p) => p.hasWebp).map((p) => p.f)
}

if (sources.length === 0) console.log("Nothing to convert.")

for (const file of sources) {
  const src = join(dir, file)
  const outName = file.replace(SOURCE_EXT, ".webp")
  const out = join(dir, outName)

  const { width, height } = await sharp(src).metadata()
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out)
  await unlink(src)

  const ratio = (width / height).toFixed(2)
  const flag = Math.abs(width / height - 16 / 9) > 0.15 ? "  <-- not 16:9" : ""
  console.log(`${file} -> ${outName}  (${width}x${height}, ${ratio}:1)${flag}`)
}

if (skipped.length > 0) {
  console.log(
    `\nSkipped ${skipped.length} legacy source file(s) that already have a .webp ` +
      `of the same name (pass --all to convert them anyway):`
  )
  for (const f of skipped) console.log(`  ${f}`)
}
