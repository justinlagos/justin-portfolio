"""Write src/content/image-sizes.json with the pixel size of every image under public/assets.

Run after adding or replacing images:  python3 scripts/image_manifest.py
next/image needs width and height for images that are not statically imported.
"""
import json, os
from PIL import Image

root = os.path.join(os.path.dirname(__file__), '..', 'public')
out = {}
for dirpath, _, files in os.walk(os.path.join(root, 'assets')):
    for f in sorted(files):
        if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif')):
            continue
        full = os.path.join(dirpath, f)
        with Image.open(full) as im:
            w, h = im.size
        out['/' + os.path.relpath(full, root).replace(os.sep, '/')] = [w, h]

path = os.path.join(os.path.dirname(__file__), '..', 'src', 'content', 'image-sizes.json')
with open(path, 'w') as fh:
    json.dump(dict(sorted(out.items())), fh, indent=0)
print(f'{len(out)} images -> {os.path.relpath(path)}')
