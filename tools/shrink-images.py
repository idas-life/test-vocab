"""把 img/ 底下所有角色圖縮小成網站用的尺寸（預設最長邊 320px），保留透明背景。
用法：python3 tools/shrink-images.py 原圖資料夾 img
例如：python3 tools/shrink-images.py ~/Desktop/角色原圖 img
原圖資料夾要照 img 的結構放（xavier/idle.png、caleb/happy.png……），原圖不會被改動。
需要 Pillow：pip install pillow
"""
import sys, pathlib
from PIL import Image

MAX = 320
src, dst = pathlib.Path(sys.argv[1]).expanduser(), pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "img")
n = 0
for f in src.rglob("*"):
    if f.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp"):
        continue
    out = (dst / f.relative_to(src)).with_suffix(".png")
    out.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(f).convert("RGBA")
    im.thumbnail((MAX, MAX), Image.LANCZOS)
    im.save(out, optimize=True)
    n += 1
    print(f"{f.relative_to(src)} → {out}（{im.width}×{im.height}）")
print(f"完成 {n} 張。")
