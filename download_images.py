import requests
from PIL import Image
from io import BytesIO

urls = {
    "cyphercon.jpg": "https://www.cyphercon.com/wp-content/uploads/2023/02/cropped-CypherCon-logo-1-e1676860530493.png",
    "defcon.jpg": "https://media.defcon.org/DEF%20CON%2031/DEF%20CON%2031%20header%20image.png",
    "sec-t.jpg": "https://sec-t.org/images/sec-t_logo_2015-05-17.png",
    "fwdcloudsec.jpg": "https://fwdcloudsec.org/wp-content/uploads/2022/10/FCS-logo-white-background-300x125.png",
    "chibrrcon.jpg": "https://pbs.twimg.com/profile_images/1618625902123974656/V-sC-I-T_400x400.jpg",
    "corncon.jpg": "https://www.corncon.net/images/CornCon_logo_2019-Color.png",
    "drivingit.jpg": "https://ida.dk/sites/default/files/2023-01/driving-it-2023_1.png",
    "secretcon.jpg": "https://images.squarespace-cdn.com/content/v1/6421908a34247d03395821c1/779c1313-305c-4315-b3e1-3093282b610c/Secret+Con+Main+Logo+-+Light.png?format=1500w"
}

for filename, url in urls.items():
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(f"images/conferences/{filename}", "jpeg")
    except Exception as e:
        print(f"Could not download {url}: {e}")
