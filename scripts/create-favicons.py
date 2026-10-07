"""Regenerate the PNG/ICO favicons from icon.svg (needs Google Chrome and Pillow).
Google requires a square icon whose size is a multiple of 48px, so 48/192/512 are produced.
Usage (from the repo root): python3 scripts/create-favicons.py"""
import subprocess, tempfile, pathlib
from PIL import Image
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
root = pathlib.Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory() as t:
    page, shot = pathlib.Path(t, 'i.html'), pathlib.Path(t, 'i.png')
    page.write_text(f'<body style="margin:0"><img src="file://{root}/icon.svg" style="width:512px;height:512px;display:block">')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000', '--window-size=512,512', f'--screenshot={shot}', f'file://{page}'], check=True, capture_output=True)
    im = Image.open(shot).convert('RGBA')
im.save(root / 'icon-512.png')
im.resize((192, 192), Image.LANCZOS).save(root / 'icon-192.png')
im.resize((48, 48), Image.LANCZOS).save(root / 'icon-48.png')
touch = Image.new('RGBA', (180, 180), (13, 17, 23, 255)); touch.alpha_composite(im.resize((180, 180), Image.LANCZOS))
touch.convert('RGB').save(root / 'apple-touch-icon.png')
im.save(root / 'favicon.ico', sizes=[(48, 48), (32, 32), (16, 16)])
