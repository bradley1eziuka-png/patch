# Builds the blurred site background from Jeremylogo.JPG (project root). The original is not modified.
# Run from the project root: python3 scripts/make-background.py
# Blur radius is applied at the size the image is shown (about 1450px wide), so it reads as a ~14px blur.
from PIL import Image, ImageFilter
im = Image.open('Jeremylogo.JPG').convert('RGB')
im = im.filter(ImageFilter.GaussianBlur(14))
im.save('site/assets/img/bg/jeremylogo-blur.webp', 'WEBP', quality=72, method=6)
print(im.size)
