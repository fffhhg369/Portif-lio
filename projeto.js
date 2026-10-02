/* Painel "Ver como funciona": lê os detalhes de conteudo.js, sem bibliotecas. */
(() => {
 'use strict';
 const dialog=document.getElementById('project-dialog');
 if(!dialog) return;
 const projetos=(window.PORTFOLIO&&window.PORTFOLIO.projetos)||[];
 const tabs=document.getElementById('project-tabs'), panel=document.getElementById('project-panel');
 let current=null, lastFocus=null;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};
 function show(id){
  const aba=current.detalhes.abas.find(a=>a.id===id)||current.detalhes.abas[0];
  [...tabs.children].forEach(b=>{const on=b.dataset.tab===aba.id;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
  panel.replaceChildren();panel.setAttribute('aria-labelledby','pt-'+aba.id);
  aba.blocos.forEach((b,i)=>{
   const card=el('article','pd-block');
   card.append(el('span','pd-num',String(i+1).padStart(2,'0')),el('h3',null,b.t),el('p',null,b.p));
   if(b.codigo){
    const wrap=el('div','pd-code'),bar=el('div','pd-code-bar');
    const copy=el('button','pd-copy','Copiar');copy.type='button';
    copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.codigo);copy.textContent='Copiado!';}catch{copy.textContent='Selecione e copie';}setTimeout(()=>copy.textContent='Copiar',1800);});
    bar.append(el('span',null,'trecho de código'),copy);
    const pre=el('pre'),code=el('code',null,b.codigo);pre.tabIndex=0;pre.append(code);wrap.append(bar,pre);card.append(wrap);
   }
   panel.append(card);
  });
 }
 function open(titulo,trigger){
  current=projetos.find(p=>p.titulo===titulo&&p.detalhes); if(!current) return;
  lastFocus=trigger;
  document.getElementById('project-dialog-title').textContent=current.titulo;
  document.getElementById('project-dialog-summary').textContent=current.detalhes.resumo;
  tabs.replaceChildren();
  current.detalhes.abas.forEach(a=>{
   const b=el('button','pd-tab',a.titulo);b.type='button';b.id='pt-'+a.id;b.dataset.tab=a.id;b.setAttribute('role','tab');
   b.addEventListener('click',()=>show(a.id));tabs.append(b);
  });
  show(current.detalhes.abas[0].id);
  dialog.showModal();document.body.classList.add('card-dialog-open');
 }
 tabs.addEventListener('keydown',e=>{
  const list=[...tabs.children];let i=list.findIndex(b=>b.getAttribute('aria-selected')==='true');
  if(e.key==='ArrowRight')i=(i+1)%list.length;else if(e.key==='ArrowLeft')i=(i+list.length-1)%list.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=list.length-1;else return;
  e.preventDefault();show(list[i].dataset.tab);list[i].focus();
 });
 // Os cartões são recriados ao filtrar: usa delegação de evento.
 document.addEventListener('click',e=>{const b=e.target.closest('.project-more');if(b)open(b.dataset.project,b);});
 document.getElementById('project-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.classList.remove('card-dialog-open');if(lastFocus&&lastFocus.isConnected)lastFocus.focus({preventScroll:true});});
})();
