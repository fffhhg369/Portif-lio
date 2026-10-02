"""Atualiza APENAS o cartão virtual público.
pip install qrcode cairosvg
python gerar-cartao-virtual.py
Não gera nem publica arquivos para impressão.
"""
from pathlib import Path
import base64, json
import qrcode, cairosvg
from html import escape
P = Path(__file__).resolve().parent
OUT = P/'virtual'
OUT.mkdir(exist_ok=True)
D = {
    'nome': 'Kauan Alves', 'sobrenome': 'da Silva',
    'cargo': 'Engenheiro Civil',
    'foco': 'Em transição para Engenharia de Dados',
    'telefone': '+55 (11) 95419-6757', 'tel': '+5511954196757',
    'email': 'kauanmacedo21@gmail.com',
    'linkedin': 'https://www.linkedin.com/in/kauan-alves-4925b6196/',
    'whatsapp': 'https://wa.me/5511954196757',
}
qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,border=4)
qr.add_data(D['whatsapp']);qr.make(fit=True);matrix=qr.get_matrix()

def svg(theme):
    dark=theme=='escuro'
    bg,fg,muted,accent,line,panel=('#101710','#f2f0e5','#b5c2a4','#f68a50','#34452c','#182215') if dark else ('#f7f5ee','#182719','#4f6246','#a8471b','#cbd2be','#ebeede')
    e=[f'<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><title>Cartão virtual de Kauan Alves da Silva</title><rect width="1080" height="1350" fill="{bg}"/><rect width="1080" height="10" fill="{accent}"/>']
    def t(x,y,s,txt,color=fg,font='Arial,Helvetica,sans-serif',weight='400'):
        e.append(f'<text x="{x}" y="{y}" fill="{color}" font-family="{font}" font-size="{s}" font-weight="{weight}">{escape(txt)}</text>')
    def l(x1,y1,x2,y2,col=line):e.append(f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{col}" stroke-width="2"/>')
    for r in (110,170,230):e.append(f'<circle cx="975" cy="180" r="{r}" fill="none" stroke="{line}" stroke-width="1"/>')
    t(66,113,65,'k',weight='700');t(100,113,65,'.',accent,weight='700')
    t(160,92,20,'ENGENHARIA & DADOS',muted,'monospace')
    t(160,124,15,'CARTÃO VIRTUAL / CONECTE-SE',muted,'monospace')
    t(66,220,17,'01 / QUEM CONSTRÓI',accent,'monospace')
    t(62,325,87,D['nome'],weight='700');t(66,389,58,D['sobrenome'],muted)
    t(66,458,32,D['cargo']);t(66,504,25,D['foco'],muted)
    l(66,555,1014,555)
    t(66,613,18,'02 / VAMOS CONVERSAR',accent,'monospace')
    t(66,675,19,'WHATSAPP / TELEFONE',muted,'monospace');t(66,722,37,D['telefone'])
    t(66,784,19,'E-MAIL',muted,'monospace');t(66,831,35,D['email'])
    t(66,891,19,'LINKEDIN',muted,'monospace');t(66,933,27,'linkedin.com/in/kauan-alves-4925b6196')
    e.append(f'<rect x="66" y="986" width="948" height="267" rx="14" fill="{panel}" stroke="{line}"/>')
    t(102,1041,17,'03 / DO DIGITAL À CONVERSA',accent,'monospace')
    t(102,1095,33,'Boas conexões.',weight='700');t(102,1138,33,'Novas possibilidades.',weight='700')
    t(102,1190,22,'Escaneie para abrir meu WhatsApp.',muted)
    qx,qy,size=756,1006,230
    e.append(f'<rect x="{qx}" y="{qy}" width="{size}" height="{size}" fill="white"/>')
    unit=size/len(matrix)
    for y,row in enumerate(matrix):
        for x,on in enumerate(row):
            if on:e.append(f'<rect x="{qx+x*unit:.4f}" y="{qy+y*unit:.4f}" width="{unit:.4f}" height="{unit:.4f}" fill="black"/>')
    t(66,1306,16,'SÃO PAULO, BR',muted,'monospace');t(590,1306,16,'PYTHON · AUTOMAÇÃO · DADOS',muted,'monospace')
    return ''.join(e)+'</svg>'
assets={}
for theme in ('escuro','claro'):
    text=svg(theme);(OUT/f'Kauan-virtual-{theme}.svg').write_text(text,encoding='utf-8')
    png=cairosvg.svg2png(bytestring=text.encode(),output_width=1080,output_height=1350)
    (OUT/f'Kauan-virtual-{theme}.png').write_bytes(png)
    assets[theme]='data:image/png;base64,'+base64.b64encode(png).decode()
vcf='\r\n'.join(['BEGIN:VCARD','VERSION:3.0','N:Alves da Silva;Kauan;;;',f'FN:{D["nome"]} {D["sobrenome"]}',f'TITLE:{D["cargo"]}',f'TEL;TYPE=CELL:{D["tel"]}',f'EMAIL;TYPE=INTERNET:{D["email"]}',f'URL:{D["linkedin"]}',f'NOTE:{D["foco"]}.','END:VCARD',''])
(OUT/'Kauan-Alves.vcf').write_bytes(vcf.encode())
(P/'cartao-assets.js').write_text('window.CARTAO_VIRTUAL = '+json.dumps({'imagens':assets,'vcf':'data:text/vcard;charset=utf-8;base64,'+base64.b64encode(vcf.encode()).decode(),'contatos':D},ensure_ascii=False)+';\n',encoding='utf-8')
print('Cartões virtuais atualizados: PNG 1080 × 1350, SVG, vCard e dados locais.')
