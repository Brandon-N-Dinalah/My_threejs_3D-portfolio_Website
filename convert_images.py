import os
from PIL import Image

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(root, file)
                try:
                    img = Image.open(filepath)
                    webp_path = os.path.splitext(filepath)[0] + '.webp'
                    img.save(webp_path, 'WEBP', quality=85)
                    print(f"Converted {filepath} to {webp_path}")
                except Exception as e:
                    print(f"Failed to convert {filepath}: {e}")

if __name__ == "__main__":
    convert_to_webp(r"e:\PROJECTS\threejs_portfolio\public")
