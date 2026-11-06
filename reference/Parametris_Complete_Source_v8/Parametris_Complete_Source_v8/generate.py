import re,html,json,pathlib
root=pathlib.Path(__file__).parent
h=pathlib.Path('/tmp/parametris-software.html').read_text()
links=[]
for url,txt in re.findall(r'<a\b[^>]*href=[\"\']([^\"\']+)[\"\'][^>]*>(.*?)</a>',h,re.S):
 name=html.unescape(re.sub('<[^>]*>','',txt)).strip()
 name=re.sub(r'\s+',' ',name)
 if 'ptc.com' in url and name and (url,name) not in [(l['url'],l['name']) for l in links]: links.append({'url':html.unescape(url),'name':name.title()})
print('Product links',len(links))
groups=[('CAD','cad.jpg','Desain dan pemodelan produk.','Product design and modeling.',6),('CAM','cam.jpg','Pemesinan dan manufaktur aditif.','Machining and additive manufacturing.',2),('CAE','cae.jpg','Simulasi, analisis, dan validasi desain.','Simulation, analysis, and design validation.',8),('PLM','plm.jpg','Pengelolaan siklus hidup produk.','Product lifecycle management.',8),('ALM','alm.jpg','Pengelolaan siklus hidup aplikasi.','Application lifecycle management.',5),('AR','ar.jpg','Augmented reality untuk industri.','Augmented reality for industry.',3)]
out=[];pos=0
for name,img,id,en,n in groups:
 out.append(dict(name=name,image=img,id=id,en=en,links=links[pos:pos+n]));pos+=n
(root/'dist/products.js').write_text('const software='+json.dumps(out)+';\nconst productTranslations='+json.dumps({'Product Data Management':'Pengelolaan data produk','Manufacturing Process Management':'Pengelolaan proses manufaktur','Engineering Change Management':'Pengelolaan perubahan engineering','Product Variability Management':'Pengelolaan variasi produk','Bom Management':'Pengelolaan BOM','Quality Management':'Pengelolaan kualitas','Collaborative Product Development':'Pengembangan produk kolaboratif','Supply Chain Collaboration':'Kolaborasi rantai pasok','Requirements Management':'Pengelolaan kebutuhan','Test Management':'Pengelolaan pengujian','Software Risk Management':'Pengelolaan risiko software','Software Development':'Pengembangan software','Ar Solutions For Manufacturing':'Solusi AR untuk manufaktur','Ar Solutions For Services':'Solusi AR untuk layanan','Ar Solutions For Quality Inspection':'Solusi AR untuk inspeksi kualitas'})+';')
shell='''<!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Software engineering, solusi IoT, pelatihan, konsultasi, dan engineering services dari PT Parametrik Solusi Integrasi."><meta name="theme-color" content="#14252e"><title>Parametrik — Software, IoT & Engineering</title><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%2314252e'/%3E%3Ctext x='8' y='25' font-size='28' font-family='Arial' font-weight='bold' fill='%23c7b775'%3Ep%3C/text%3E%3C/svg%3E"><link rel="stylesheet" href="/style.css"><script defer src="/data.js"></script><script defer src="/products.js"></script><script defer src="/app.js"></script></head><body><div id="app"></div><noscript>PT Parametrik Solusi Integrasi — Software, IoT & Engineering. Contact: support@parametris.com · +62 21 3044 8230. Aktifkan JavaScript untuk menjelajahi website.</noscript></body></html>'''
(root/'dist/index.html').write_text(shell)
for route in ['software','iot','manufacturing','healthcare','energy','smart-city','services','training','consulting','engineering','about','contact']:
 p=root/'dist'/route;p.mkdir(exist_ok=True);(p/'index.html').write_text(shell)
