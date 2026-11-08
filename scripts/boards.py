"""Presentation boards: lay pieces of work in one row on a plain ground, same height, soft shadow.
Used so every set of posts, posters or screens is shown whole and at a consistent size."""
from PIL import Image, ImageDraw, ImageFilter
Image.MAX_IMAGE_PIXELS = None


def _flat(path, bg=(255, 255, 255)):
    """Open an image and lay any transparency on a plain ground, so empty areas never turn black."""
    im = Image.open(path)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        ground = Image.new('RGBA', im.size, bg + (255,))
        ground.alpha_composite(im)
        return ground.convert('RGB')
    return im.convert('RGB')


def _rounded(im, r):
    if r <= 0:
        return im.convert('RGBA')
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    out = im.convert('RGBA')
    out.putalpha(m)
    return out


def board(paths, out, size=(2400, 1500), bg='#efefec', pad=0.09, gap=0.035, radius=10, shadow=0.22, valign='center'):
    W, H = size
    ims = [_flat(p) for p in paths]
    px, py = int(W * pad), int(H * pad)
    g = int(W * gap)
    avail_w = W - 2 * px - g * (len(ims) - 1)
    avail_h = H - 2 * py
    ratios = [i.width / i.height for i in ims]
    h = min(avail_h, avail_w / sum(ratios))
    widths = [int(h * r) for r in ratios]
    total = sum(widths) + g * (len(ims) - 1)
    x = (W - total) // 2
    y = (H - int(h)) // 2
    canvas = Image.new('RGBA', (W, H), bg)
    shade = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    for w in widths:
        off = int(h * 0.02)
        sd.rounded_rectangle((x, y + off, x + w, y + int(h) + off), radius, fill=(0, 0, 0, int(255 * shadow)))
        x += w + g
    shade = shade.filter(ImageFilter.GaussianBlur(int(h * 0.025)))
    canvas = Image.alpha_composite(canvas, shade)
    x = (W - total) // 2
    for im, w in zip(ims, widths):
        piece = _rounded(im.resize((w, int(h)), Image.LANCZOS), radius)
        canvas.alpha_composite(piece, (x, y))
        x += w + g
    canvas.convert('RGB').save(out, 'JPEG', quality=88, optimize=True, progressive=True)
    return out


def fit(path, out, max_w=2400, quality=86):
    im = _flat(path)
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(out, 'JPEG', quality=quality, optimize=True, progressive=True)
    return im.size
