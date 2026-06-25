import os, re, hashlib, requests
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(__file__)
HTML_DIR = os.path.join(ROOT, "html")
IMG_DIR = os.path.join(ROOT, "images")
os.makedirs(IMG_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Match src="..." and srcset="..." values
SRC_RE = re.compile(r'\bsrc="([^"]+)"', re.IGNORECASE)
SRCSET_RE = re.compile(r'\bsrcset="([^"]+)"', re.IGNORECASE)

# Track downloaded URLs -> local relative path (so we dedupe across files)
url_to_local = {}

def safe_filename(url):
    """Generate a safe local filename from a URL, preserving extension."""
    path = unquote(urlparse(url).path)
    base = os.path.basename(path) or "image"
    name, ext = os.path.splitext(base)
    # Sanitize
    name = re.sub(r"[^A-Za-z0-9._-]", "_", name)[:80]
    ext = ext.lower() if ext else ""
    # Disambiguate with short hash so different URLs with same basename don't collide
    h = hashlib.md5(url.encode("utf-8")).hexdigest()[:8]
    return f"{name}-{h}{ext}"

def download(url):
    if url in url_to_local:
        return url_to_local[url]
    if not url.lower().startswith(("http://", "https://")):
        return None
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        if r.status_code != 200:
            print(f"  ! {r.status_code} {url}")
            return None
        fname = safe_filename(url)
        with open(os.path.join(IMG_DIR, fname), "wb") as f:
            f.write(r.content)
        local = f"../images/{fname}"
        url_to_local[url] = local
        return local
    except Exception as e:
        print(f"  ! error {url}: {e}")
        return None

def rewrite_srcset(value):
    # srcset is "url1 300w, url2 768w, ..."
    parts = []
    for chunk in value.split(","):
        chunk = chunk.strip()
        if not chunk:
            continue
        bits = chunk.split(None, 1)
        url = bits[0]
        descriptor = " " + bits[1] if len(bits) > 1 else ""
        local = download(url)
        parts.append(f"{local or url}{descriptor}")
    return ", ".join(parts)

files = sorted(f for f in os.listdir(HTML_DIR) if f.endswith(".html"))
for i, fname in enumerate(files, 1):
    path = os.path.join(HTML_DIR, fname)
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    print(f"[{i}/{len(files)}] {fname}")

    def replace_src(m):
        local = download(m.group(1))
        return f'src="{local}"' if local else m.group(0)

    def replace_srcset(m):
        return f'srcset="{rewrite_srcset(m.group(1))}"'

    new_html = SRC_RE.sub(replace_src, html)
    new_html = SRCSET_RE.sub(replace_srcset, new_html)

    if new_html != html:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_html)

print(f"\ndone — {len(url_to_local)} unique images saved to {IMG_DIR}")
