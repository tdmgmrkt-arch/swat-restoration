import fs from "fs"
import path from "path"

const POSTS = JSON.parse(fs.readFileSync("blog-posts/index.json", "utf8"))

const TAXONOMY = {
  "why-choosing-a-family-owned-local-restoration-company-matters": { category: "About SWAT", city: "Aledo" },
  "storm-damage-in-north-texas-how-to-protect-your-home-and-recover-fast": { category: "Storm & Roofing", city: "Fort Worth" },
  "fire-damage-restoration-in-north-texas-what-homeowners-need-to-know": { category: "Fire Damage", city: "Fort Worth" },
  "the-main-causes-of-water-damage": { category: "Water Damage", city: "Aledo" },
  "what-to-do-immediately-after-water-damage-in-your-home": { category: "Water Damage", city: "Aledo" },
  "navigating-insurance-after-a-disaster-how-swat-restoration-helps-homeowners": { category: "Insurance Claims", city: "Aledo" },
  "mold-in-your-home-what-you-need-to-know": { category: "Mold Remediation", city: "Aledo" },
  "swat-restoration-your-first-responders-for-disasters": { category: "About SWAT", city: "Aledo" },
  "the-hidden-dangers-of-delaying-restoration-after-a-disaster": { category: "About SWAT", city: "Aledo" },
  "how-to-prepare-your-home-for-storm-season": { category: "Storm & Roofing", city: "Aledo" },
  "the-importance-of-immediate-water-damage-restoration": { category: "Water Damage", city: "Aledo" },
  "the-hidden-dangers-of-mold-what-every-homeowner-should-know": { category: "Mold Remediation", city: "Aledo" },
  "5-essential-steps-to-take-after-water-damage-in-your-home": { category: "Water Damage", city: "Aledo" },
  "how-to-protect-your-roof-during-storm-season": { category: "Storm & Roofing", city: "Aledo" },
  "winter-water-damage-in-dfw": { category: "Water Damage", city: "Fort Worth" },
  "best-company-for-mold-remediation-near-me": { category: "Mold Remediation", city: "Aledo" },
  "how-to-tell-if-mold-is-behind-walls": { category: "Mold Remediation", city: "Aledo" },
  "who-to-call-for-mold-removal-near-me": { category: "Mold Remediation", city: "Aledo" },
  "how-to-get-rid-of-mold-in-my-house-fast": { category: "Mold Remediation", city: "Aledo" },
  "does-homeowners-insurance-cover-water-damage-restoration-costs": { category: "Insurance Claims", city: "Aledo" },
  "how-to-prevent-mold-after-a-flood-or-water-damage": { category: "Mold Remediation", city: "Aledo" },
  "how-long-does-water-damage-restoration-take-to-complete": { category: "Water Damage", city: "Aledo" },
  "emergency-restoration-checklist-for-winter-storms": { category: "Storm & Roofing", city: "Aledo" },
  "space-heaters-and-fire-damage-what-homeowners-should-know": { category: "Fire Damage", city: "Aledo" },
  "why-mold-problems-increase-during-winter": { category: "Mold Remediation", city: "Aledo" },
  "why-diy-mold-removal-can-be-dangerous": { category: "Mold Remediation", city: "Aledo" },
  "what-to-do-after-mold-is-found": { category: "Mold Remediation", city: "Aledo" },
  "signs-your-property-needs-mold-remediation-now": { category: "Mold Remediation", city: "Aledo" },
  "how-to-spot-mold-before-it-spreads": { category: "Mold Remediation", city: "Aledo" },
  "my-home-has-water-damage-what-are-the-first-steps-to-take": { category: "Water Damage", city: "Aledo" },
  "what-to-do-after-a-house-fire-in-fort-worth": { category: "Fire Damage", city: "Fort Worth" },
  "emergency-water-removal-services-in-fort-worth": { category: "Water Damage", city: "Fort Worth" },
  "mold-remediation-process-length": { category: "Mold Remediation", city: "Aledo" },
  "how-to-remove-black-mold-from-bathroom-safely": { category: "Mold Remediation", city: "Aledo" },
  "is-mold-in-my-house-dangerous-to-my-family": { category: "Mold Remediation", city: "Aledo" },
  "who-to-call-for-mold-removal-near-me-2": { category: "Mold Remediation", city: "Aledo" },
  "what-does-mold-remediation-cost-in-texas": { category: "Mold Remediation", city: "Aledo" },
  "how-much-does-water-damage-repair-cost": { category: "Water Damage", city: "Aledo" },
  "can-i-stay-in-my-house-during-mold-removal": { category: "Mold Remediation", city: "Aledo" },
}

const INTERNAL_LINK_MAP = {
  "/water-removal-damage-restoration/": "/water-damage/",
  "/fire-smoke-damage-restoration/": "/fire-damage/",
  "/mold-remediation/": "/mold-remediation/",
  "/pack-out-cleaning/": "/reconstruction/pack-out-cleaning/",
  "/roofing/": "/reconstruction/roofing/",
  "/about/": "/about-us/",
  "/contact/": "/contact-us/",
  "/terms-and-conditions/": "/terms-of-service/",
  "/privacy-policy/": "/privacy-policy/",
  "/blog/": "/blog/",
  "/": "/",
}

const SITE_HOSTS = new Set(["www.swat-restoration.com", "swat-restoration.com"])

function decodeEntities(s) {
  return s
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
}

function classifyLink(href) {
  try {
    const u = new URL(href, "https://www.swat-restoration.com/")
    if (SITE_HOSTS.has(u.host)) {
      const p = u.pathname
      if (p.startsWith("/post/")) return { kind: "internal-keep", href: p }
      if (p === "/areas-served" || p === "/areas-served/") return { kind: "internal-keep", href: "/areas-served/" }
      if (p.startsWith("/areas-served/")) return { kind: "internal-keep", href: p }
      const mapped = INTERNAL_LINK_MAP[p] || INTERNAL_LINK_MAP[p + "/"]
      if (mapped) return { kind: "internal-keep", href: mapped }
      return { kind: "internal-strip" }
    }
    return { kind: "outbound", href }
  } catch (e) {
    return { kind: "internal-strip" }
  }
}

function parseInline(html) {
  const tokens = []
  const re = /<(a|strong)\b([^>]*)>([\s\S]*?)<\/\1>/gi
  let lastIdx = 0
  let m
  while ((m = re.exec(html)) !== null) {
    if (m.index > lastIdx) {
      tokens.push({ type: "text", text: decodeEntities(html.slice(lastIdx, m.index)) })
    }
    const tag = m[1].toLowerCase()
    const attrs = m[2]
    const inner = stripTags(m[3])
    if (tag === "a") {
      const hrefMatch = attrs.match(/href\s*=\s*"([^"]+)"/i)
      if (!hrefMatch) {
        tokens.push({ type: "text", text: inner })
      } else {
        const decision = classifyLink(hrefMatch[1])
        if (decision.kind === "internal-strip") {
          tokens.push({ type: "text", text: inner })
        } else if (decision.kind === "internal-keep") {
          tokens.push({ type: "link", text: inner, href: decision.href })
        } else {
          tokens.push({ type: "link", text: inner, href: decision.href, outbound: true })
        }
      }
    } else if (tag === "strong") {
      tokens.push({ type: "strong", text: inner })
    }
    lastIdx = m.index + m[0].length
  }
  if (lastIdx < html.length) {
    tokens.push({ type: "text", text: decodeEntities(html.slice(lastIdx)) })
  }
  const out = []
  for (const t of tokens) {
    if (t.type === "text") {
      if (!t.text) continue
      if (out.length && out[out.length - 1].type === "text") {
        out[out.length - 1].text += t.text
      } else {
        out.push(t)
      }
    } else {
      out.push(t)
    }
  }
  if (out.length === 1 && out[0].type === "text") return out[0].text
  if (out.length === 0) return ""
  return out
}

function parseHtml(html) {
  let body = html
  body = body.replace(/^\s*<img\b[^>]*\/?>\s*/i, "")
  body = body.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "")
  body = body.replace(/<p>\s*<\/p>/gi, "")
  body = body.replace(/\s+class="[^"]*"/g, "")
  body = body.replace(/\s+id="[^"]*"/g, "")
  const blocks = []
  const re = /<(h2|h3|p|ul|ol|figure)\b[^>]*>([\s\S]*?)<\/\1>/gi
  let m
  while ((m = re.exec(body)) !== null) {
    const tag = m[1].toLowerCase()
    const inner = m[2].trim()
    if (!inner) continue
    if (tag === "h2" || tag === "h3") {
      blocks.push({ type: "heading", text: stripTags(inner) })
    } else if (tag === "p") {
      const content = parseInline(inner)
      if (content === "" || (typeof content === "string" && !content.trim())) continue
      blocks.push({ type: "paragraph", content })
    } else if (tag === "ul" || tag === "ol") {
      const items = []
      const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi
      let lm
      while ((lm = liRe.exec(inner)) !== null) {
        const t = stripTags(lm[1])
        if (t) items.push(t)
      }
      if (items.length) blocks.push({ type: "list", items })
    }
  }
  return blocks
}

function makeMetaDescription(title, leadText) {
  // Strategy: use the lead paragraph (the post's hook, written by the client)
  // trimmed to ~155 chars at a word boundary. SEO best practice and avoids
  // rewriting body copy. The lead almost always contains the primary keyword
  // already since it sets up the topic.
  const t = leadText.trim().replace(/\s+/g, " ")
  if (!t) return title
  if (t.length <= 160) return t
  let s = t.slice(0, 158)
  const lastSpace = s.lastIndexOf(" ")
  if (lastSpace > 120) s = s.slice(0, lastSpace)
  return s + "\u2026"
}

function makeExcerpt(rawExcerpt) {
  let e = decodeEntities(rawExcerpt).trim()
  e = e.replace(/\s*\[\u2026\]\s*$/g, "")
  e = e.replace(/\s*\[\.\.\.\]\s*$/g, "")
  if (e.length <= 240) return e.trim()
  const parts = e.split(/(?<=\.)\s+/)
  let out = ""
  for (const p of parts) {
    if ((out + " " + p).length > 240) break
    out = (out ? out + " " : "") + p
  }
  return out.trim() || e.slice(0, 220).replace(/\s+\S*$/, "") + "\u2026"
}

function makeHeroAlt(title, category, city) {
  const cleanTitle = title.replace(/\s+/g, " ").trim()
  const cityLabel = city === "Fort Worth" ? "Fort Worth" : "Aledo"
  switch (category) {
    case "Water Damage":
      return `S.W.A.T. Restoration water damage response in ${cityLabel}, TX \u2014 ${cleanTitle}`
    case "Fire Damage":
      return `S.W.A.T. Restoration fire and smoke damage response in ${cityLabel}, TX \u2014 ${cleanTitle}`
    case "Mold Remediation":
      return `S.W.A.T. Restoration mold remediation crew in ${cityLabel}, TX \u2014 ${cleanTitle}`
    case "Storm & Roofing":
      return `S.W.A.T. Restoration storm and roofing damage response in ${cityLabel}, TX \u2014 ${cleanTitle}`
    case "Insurance Claims":
      return `S.W.A.T. Restoration insurance claim documentation in ${cityLabel}, TX \u2014 ${cleanTitle}`
    case "About SWAT":
      return `S.W.A.T. Restoration team serving ${cityLabel}, TX \u2014 ${cleanTitle}`
    default:
      return `S.W.A.T. Restoration \u2014 ${cleanTitle}`
  }
}

function readMinutesFromBlocks(blocks) {
  let wordCount = 0
  for (const b of blocks) {
    if (b.type === "paragraph") {
      const txt = typeof b.content === "string" ? b.content : b.content.map(t => t.text).join(" ")
      wordCount += txt.split(/\s+/).filter(Boolean).length
    } else if (b.type === "heading") {
      wordCount += b.text.split(/\s+/).filter(Boolean).length
    } else if (b.type === "list") {
      wordCount += b.items.join(" ").split(/\s+/).filter(Boolean).length
    }
  }
  return Math.max(2, Math.round(wordCount / 230))
}

const NUM_WORDS = { "5": "five", "24": "twentyFour", "10": "ten" }
function slugToVar(slug) {
  const parts = slug.split("-")
  if (NUM_WORDS[parts[0]]) parts[0] = NUM_WORDS[parts[0]]
  return parts.map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join("")
}

function serializeBody(blocks) {
  const lines = ["  body: ["]
  for (const b of blocks) {
    if (b.type === "paragraph") {
      if (typeof b.content === "string") {
        lines.push("    {")
        lines.push(`      type: "paragraph",`)
        lines.push(`      content: ${JSON.stringify(b.content)},`)
        lines.push("    },")
      } else {
        lines.push("    {")
        lines.push(`      type: "paragraph",`)
        lines.push(`      content: [`)
        for (const t of b.content) {
          lines.push(`        ${JSON.stringify(t)},`)
        }
        lines.push(`      ],`)
        lines.push("    },")
      }
    } else if (b.type === "heading") {
      lines.push(`    { type: "heading", text: ${JSON.stringify(b.text)} },`)
    } else if (b.type === "list") {
      lines.push("    {")
      lines.push(`      type: "list",`)
      lines.push(`      items: [`)
      for (const i of b.items) lines.push(`        ${JSON.stringify(i)},`)
      lines.push(`      ],`)
      lines.push("    },")
    }
  }
  lines.push("  ],")
  return lines.join("\n")
}

function buildFile(meta, body) {
  const varName = slugToVar(meta.slug)
  const readMin = readMinutesFromBlocks(body)
  const lines = []
  lines.push(`import type { BlogPost } from "./_types"`)
  lines.push(``)
  lines.push(`export const ${varName}: BlogPost = {`)
  lines.push(`  slug: ${JSON.stringify(meta.slug)},`)
  lines.push(`  title: ${JSON.stringify(meta.title)},`)
  lines.push(`  metaDescription: ${JSON.stringify(meta.metaDescription)},`)
  lines.push(`  excerpt: ${JSON.stringify(meta.excerpt)},`)
  lines.push(`  date: ${JSON.stringify(meta.date)},`)
  lines.push(`  category: ${JSON.stringify(meta.category)},`)
  lines.push(`  heroImage: ${JSON.stringify(`/blog/${meta.slug}.webp`)},`)
  lines.push(`  heroAlt: ${JSON.stringify(meta.heroAlt)},`)
  lines.push(`  city: ${JSON.stringify(meta.city)},`)
  lines.push(`  readMinutes: ${readMin},`)
  lines.push(`  published: true,`)
  lines.push(serializeBody(body))
  lines.push(`}`)
  return lines.join("\n") + "\n"
}

const report = { ok: [], lossy: [], failed: [] }
for (const p of POSTS) {
  try {
    const tax = TAXONOMY[p.slug]
    if (!tax) throw new Error("no taxonomy entry")
    const htmlPath = path.join("blog-posts", "html", p.slug + ".html")
    if (!fs.existsSync(htmlPath)) throw new Error("missing html file: " + htmlPath)
    const html = fs.readFileSync(htmlPath, "utf8")
    const blocks = parseHtml(html)
    if (blocks.length < 3) {
      report.lossy.push({ slug: p.slug, reason: `only ${blocks.length} blocks parsed` })
    }
    let leadText = ""
    for (const b of blocks) {
      if (b.type === "paragraph") {
        leadText = typeof b.content === "string" ? b.content : b.content.map(t => t.text).join(" ")
        break
      }
    }
    if (!leadText) leadText = decodeEntities(p.excerpt).replace(/\s*\[\u2026\]\s*$/, "")
    const meta = {
      slug: p.slug,
      title: p.title,
      metaDescription: makeMetaDescription(p.title, leadText),
      excerpt: makeExcerpt(p.excerpt),
      date: p.date.slice(0, 10),
      category: tax.category,
      city: tax.city,
      heroAlt: makeHeroAlt(p.title, tax.category, tax.city),
    }
    const file = buildFile(meta, blocks)
    fs.writeFileSync(path.join("lib", "blog", p.slug + ".ts"), file, "utf8")
    report.ok.push({ slug: p.slug, blocks: blocks.length })
  } catch (e) {
    report.failed.push({ slug: p.slug, reason: e.message })
  }
}

console.log("OK:", report.ok.length, "/", POSTS.length)
const blockCounts = report.ok.map(r => r.blocks).sort((a, b) => a - b)
console.log("block-counts min/median/max:", blockCounts[0], blockCounts[Math.floor(blockCounts.length / 2)], blockCounts[blockCounts.length - 1])
if (report.lossy.length) {
  console.log("LOSSY (<3 blocks):")
  report.lossy.forEach(l => console.log("  -", l.slug, "|", l.reason))
}
if (report.failed.length) {
  console.log("FAILED:")
  report.failed.forEach(l => console.log("  -", l.slug, "|", l.reason))
}
