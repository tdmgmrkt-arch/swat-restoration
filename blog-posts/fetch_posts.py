import os, re, json, hashlib, requests
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(__file__)
HTML_DIR = os.path.join(ROOT, "html")
IMG_DIR = os.path.join(ROOT, "images")
os.makedirs(HTML_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def safe_filename(url):
    path = unquote(urlparse(url).path)
    base = os.path.basename(path) or "image"
    name, ext = os.path.splitext(base)
    name = re.sub(r"[^A-Za-z0-9._-]", "_", name)[:80]
    ext = (ext or "").lower()
    h = hashlib.md5(url.encode("utf-8")).hexdigest()[:8]
    return f"{name}-{h}{ext}"

def download_image(url):
    if not url:
        return None
    fname = safe_filename(url)
    dest = os.path.join(IMG_DIR, fname)
    if os.path.exists(dest):
        return fname
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        if r.status_code != 200:
            print(f"  ! image {r.status_code} {url}")
            return None
        with open(dest, "wb") as f:
            f.write(r.content)
        return fname
    except Exception as e:
        print(f"  ! image error {url}: {e}")
        return None

index = []
page = 1
total = 0
while True:
    r = requests.get(
        "https://www.swat-restoration.com/wp-json/wp/v2/posts",
        params={"per_page": 100, "page": page, "_embed": 1},
        headers=HEADERS,
        timeout=30,
    )
    if r.status_code != 200:
        print(f"page {page}: HTTP {r.status_code} — stopping")
        break
    posts = r.json()
    if not posts:
        break

    for post in posts:
        slug = post["slug"]
        title = post["title"]["rendered"]
        date = post.get("date", "")
        excerpt = post.get("excerpt", {}).get("rendered", "")
        html = post["content"]["rendered"]

        # Featured image
        fm = post.get("_embedded", {}).get("wp:featuredmedia", [{}])[0]
        feat_url = fm.get("source_url")
        feat_alt = fm.get("alt_text", "") or title
        feat_local = download_image(feat_url) if feat_url else None

        # Build final HTML: featured image at top (if present), then title, then content
        parts = []
        if feat_local:
            parts.append(f'<img src="../images/{feat_local}" alt="{feat_alt}" />')
        parts.append(f"<h1>{title}</h1>")
        parts.append(html)

        with open(os.path.join(HTML_DIR, f"{slug}.html"), "w", encoding="utf-8") as f:
            f.write("\n".join(parts))

        index.append({
            "slug": slug,
            "title": title,
            "date": date,
            "excerpt": re.sub(r"<[^>]+>", "", excerpt).strip(),
            "featured_image_url": feat_url,
            "featured_image_local": f"images/{feat_local}" if feat_local else None,
            "source_url": post.get("link"),
        })

    total += len(posts)
    print(f"page {page}: {len(posts)} posts (total {total})")
    page += 1

with open(os.path.join(ROOT, "index.json"), "w", encoding="utf-8") as f:
    json.dump(index, f, indent=2, ensure_ascii=False)

print(f"\ndone — {total} posts, {len([p for p in index if p['featured_image_local']])} featured images")
