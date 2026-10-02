/* Motion engine: replayable viewport entrances, stable text layout and one RAF.
   Content is never unloaded: filters, focus, downloads and links keep their state. */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const html = document.documentElement;
let reduced = html.classList.contains('no-motion');
const characters = '01{}[]<>/_+#';
const prepared = new WeakMap();
const jobs = new Map();
const scenes = [];
// Delay starts only after the block reaches the reading area.
const ENTRY_DELAY = 1500;
const TEXT_STAGGER = 240;
let frame = 0, lastPaint = 0, lastGlyph = 0;
let heroVisible = true;

// The original letters remain in the DOM. Only aria-hidden overlays scramble.
// Fixed character widths preserve line breaks, accent spans and layout on mobile.
function prepare(el) {
  if (prepared.has(el)) return prepared.get(el);
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = []; let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim() && !node.parentElement.closest('.cipher-char, .sr-only')) nodes.push(node);
  }
  const chars = [];
  nodes.forEach(textNode => {
    const fragment = document.createDocumentFragment();
    textNode.textContent.split(/(\s+)/).forEach(word => {
      if (!word.trim()) { fragment.append(document.createTextNode(word)); return; }
      const wordEl = document.createElement('span'); wordEl.className = 'cipher-word';
      [...word].forEach(letter => {
        const char = document.createElement('span'); char.className = 'cipher-char';
        const real = document.createElement('span'); real.className = 'cipher-real'; real.textContent = letter;
        const noise = document.createElement('span'); noise.className = 'cipher-live'; noise.setAttribute('aria-hidden', 'true');
        char.append(real, noise); wordEl.append(char); chars.push({char, noise});
      });
      fragment.append(wordEl);
    });
    textNode.replaceWith(fragment);
  });
  prepared.set(el, chars); return chars;
}
function finish(el) {
  const data = prepared.get(el);
  if (data) data.forEach(({char}) => char.classList.remove('is-scrambled', 'is-unwritten'));
  el.classList.remove('cipher-running'); jobs.delete(el);
}
function animateText(el, type = false, delay = 0) {
  finish(el);
  if (reduced || document.hidden) return;
  const chars = prepare(el); if (!chars.length) return;
  el.classList.add('cipher-running');
  chars.forEach(({char, noise}) => {char.classList.add(type ? 'is-unwritten' : 'is-scrambled'); noise.textContent = characters[Math.floor(Math.random()*characters.length)];});
  jobs.set(el, {chars, type, start: performance.now()+delay, duration: type ? Math.min(2400, Math.max(950, chars.length*13)) : 1150});
  wake();
}
function textTargets(el) {
  const selector = 'h1, h2, h3, [data-type-text]';
  return [...(el.matches(selector) ? [el] : []), ...el.querySelectorAll(selector)];
}
function cancelEntry(scene) {
  clearTimeout(scene.timer); scene.timer=null;
}
function showNow(scene) {
  cancelEntry(scene);
  scene.el.classList.remove('scene-out','scene-wait','scene-enter');
  textTargets(scene.el).forEach(finish);
}
function playScene(scene, force=false) {
  cancelEntry(scene);
  if (reduced || (!force && scene.el.contains(document.activeElement))) {showNow(scene);return;}
  scene.el.classList.remove('scene-enter');
  scene.el.classList.add('scene-wait');
  textTargets(scene.el).forEach(finish);
  scene.timer=setTimeout(()=>{
    scene.timer=null;
    if(!scene.active || document.hidden || reduced)return;
    // Prepare invisible text before the block is revealed.
    textTargets(scene.el).forEach((el,i)=>animateText(el,el.hasAttribute('data-type-text'),Math.min(i*TEXT_STAGGER,960)));
    scene.el.classList.remove('scene-out','scene-wait');
    void scene.el.offsetWidth;
    scene.el.classList.add('scene-enter');
    scene.el.dataset.entries=String((Number(scene.el.dataset.entries)||0)+1);
    if(scene.el.classList.contains('hero-visual'))playCode();
    if(scene.el.classList.contains('assistant-panel'))document.dispatchEvent(new CustomEvent('portfolio:assistant-enter'));
  }, ENTRY_DELAY + scene.delay);
}
function enter(scene) {if(!scene.active){scene.active=true;playScene(scene);}}
function exit(scene) {
  if(scene.el.contains(document.activeElement))return;
  cancelEntry(scene);scene.active=false;
  scene.el.classList.remove('scene-wait','scene-enter');
  if(!reduced)scene.el.classList.add('scene-out');
  textTargets(scene.el).forEach(finish);
  if(scene.el.classList.contains('assistant-panel'))document.dispatchEvent(new CustomEvent('portfolio:assistant-exit'));
}
$$('.hero-description, .about-copy > p, .timeline-item > p, .contact-grid > div > p').forEach(el => el.setAttribute('data-type-text', ''));
// Small, independent scenes avoid threshold problems on tall mobile sections.
const sceneElements = $$('.hero-copy, .hero-visual, .section-heading, .about-copy, .assistant-panel, .timeline-item, #project-filters, #projects, .degree-card, .courses, .contact-grid, .contact-card-cta');
sceneElements.forEach((el, i) => {
  el.classList.add('motion-scene');
  el.style.setProperty('--scene-delay', `${Math.min(i%4*35,105)}ms`);
  const scene = {el, active:false, timer:null, delay:Math.min(i%3*110,220)}; scenes.push(scene);
  if(!reduced && 'IntersectionObserver' in window)el.classList.add('scene-out');
});
let observer;
if ('IntersectionObserver' in window) {
  html.classList.add('motion-ready');
  const map = new Map(scenes.map(s => [s.el, s]));
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    const scene = map.get(entry.target);
    if (entry.isIntersecting) enter(scene); else exit(scene);
    if (scene.el.classList.contains('hero-visual')) {heroVisible=entry.isIntersecting; if(heroVisible) wake();}
  }), {threshold:0, rootMargin:'-78px 0px -18% 0px'});
  scenes.forEach(s => observer.observe(s.el));
}
// A keyboard-focused link is never made invisible during navigation.
document.addEventListener('focusin', e => {const scene=scenes.find(s => s.el.contains(e.target)); if(scene){scene.active=true;showNow(scene);}});

// Illustrative local files; no Python execution or unverified skill claims.
const files = {
 profile: [
  [['comment','# uma trajetória em construção']],
  [['purple','class '],['cream','Kauan'],['',':']],
  [['','    origem = '],['green','"Engenharia Civil"']],
  [['','    foco = '],['green','"Engenharia de Dados"']],
  [['','    próximo_passo = '],['green','"Construir"']]
 ],
 stack: [
  [['comment','# ferramentas em aprendizado']],
  [['','linguagens = '],['green','["Python", "VBA"]']],
  [['','dados = '],['green','["Pandas", "PySpark"]']],
  [['','plataformas = '],['green','["Databricks", "Azure"]']],
  [['','prática = '],['green','"Aprender construindo"']]
 ],
 journey: [
  [['comment','# experiência na Qualieng']],
  [['cream','2019'],['',' → Aprendiz']],
  [['cream','2020'],['',' → Estagiário']],
  [['cream','2021'],['',' → Orçamentista Júnior']],
  [['cream','2025'],['',' → Engenheiro Orçamentista']]
 ]
};
let selectedFile='profile';
function playCode() {
  const panel=$('#code-panel'); panel.classList.remove('code-playing');
  if(!reduced){void panel.offsetWidth;panel.classList.add('code-playing');}
}
function renderCode(key, focus=false) {
  selectedFile=key;
  const panel=$('#code-panel'); panel.replaceChildren();
  files[key].forEach((segments,index) => {
    const row=document.createElement('div'); row.className='code-row';row.style.setProperty('--row',index);
    const n=document.createElement('span');n.className='line-no';n.setAttribute('aria-hidden','true');n.textContent=String(index+1).padStart(2,'0');row.append(n);
    segments.forEach(([cls,text])=>{const s=document.createElement('span');if(cls)s.className=cls;s.textContent=text;row.append(s);});
    if(index===4){const cursor=document.createElement('span');cursor.className='cursor';cursor.setAttribute('aria-hidden','true');row.append(cursor);}
    panel.append(row);
  });
  $$('[data-file]').forEach(tab=>{const on=tab.dataset.file===key;tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;if(on&&focus)tab.focus();});
  panel.setAttribute('aria-labelledby','tab-'+key); $('#terminal-file').textContent=key+'.py · UTF-8'; playCode();
}
$$('[data-file]').forEach(tab=>{
  tab.addEventListener('click',()=>renderCode(tab.dataset.file));
  tab.addEventListener('keydown',e=>{
    const keys=Object.keys(files);let n=keys.indexOf(selectedFile);
    if(e.key==='ArrowRight')n=(n+1)%keys.length;
    else if(e.key==='ArrowLeft')n=(n+keys.length-1)%keys.length;
    else if(e.key==='Home')n=0;else if(e.key==='End')n=keys.length-1;else return;
    e.preventDefault();renderCode(keys[n],true);
  });
});
renderCode('profile');
$('#replay').addEventListener('click',()=>{
  scenes.filter(s=>s.el.closest('#inicio')).forEach(s=>{s.active=true;playScene(s,true);});
  document.dispatchEvent(new CustomEvent('portfolio:replay'));
});

// Position readout: real scroll percentage, not a fabricated performance counter.
let scrollDirty=true;
const sections=$$('main section[id]');
const labels={inicio:'00 / INÍCIO',sobre:'01 / SOBRE',trajetoria:'02 / TRAJETÓRIA',projetos:'03 / PROJETOS',formacao:'04 / FORMAÇÃO',contato:'05 / CONTATO'};
function scrollUpdate(){
  const max=html.scrollHeight-innerHeight;
  const ratio=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
  $('#reading-bar').style.transform=`scaleX(${ratio})`;
  $('#viewport-percent').textContent=String(Math.round(ratio*100)).padStart(2,'0')+'%';
  let active=sections[0];
  sections.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)active=s;});
  $('#viewport-label').textContent=labels[active.id];
  $$('#nav a').forEach(a=>{const on=a.hash==='#'+active.id;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  scrollDirty=false;
}
addEventListener('scroll',()=>{scrollDirty=true;wake();},{passive:true});

// Ambient field: bounded particle count, DPR capped at 1.5, ~30fps, no network.
const canvas=$('#data-field');const ctx=canvas.getContext('2d');
let width=0,height=0,particles=[];
function resize(){
  width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);
  canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
  if(ctx)ctx.setTransform(dpr,0,0,dpr,0,0);
  particles=Array.from({length:width<700?18:38},(_,i)=>({x:Math.random()*width,y:Math.random()*height,v:.12+Math.random()*.21,g:i%5===0}));
  scrollDirty=true;wake();
}
function drawField(){
  if(!ctx)return;ctx.clearRect(0,0,width,height);
  if(reduced || !heroVisible)return;
  ctx.font='9px monospace';
  particles.forEach(p=>{
    p.y-=p.v;if(p.y<-15)p.y=height+15;
    ctx.fillStyle=p.g?'rgba(246,138,80,.28)':'rgba(155,184,125,.24)';
    if(p.g)ctx.fillText('01',p.x,p.y);else ctx.fillRect(p.x,p.y,1.5,1.5);
  });
  ctx.lineWidth=.5;
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
    const a=particles[i],b=particles[j],dist=Math.hypot(a.x-b.x,a.y-b.y);
    if(dist<130){ctx.strokeStyle=`rgba(158,173,131,${(1-dist/130)*.1})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  }
}
function tick(now){
  frame=0;if(document.hidden)return;
  if(scrollDirty)scrollUpdate();
  if(now-lastGlyph>=38){
    jobs.forEach((job,el)=>{
      if(!el.isConnected){finish(el);return;}
      if(now<job.start){job.chars.forEach(({char})=>char.classList.add('is-unwritten'));return;}
      job.chars.forEach(({char})=>{if(!job.type)char.classList.remove('is-unwritten');});
      const progress=Math.max(0,(now-job.start)/job.duration);
      job.chars.forEach(({char,noise},i)=>{
        const decoded=progress >= (i+1)/job.chars.length;
        char.classList.toggle(job.type?'is-unwritten':'is-scrambled',!decoded);
        if(!decoded&&!job.type)noise.textContent=characters[Math.floor(Math.random()*characters.length)];
      });
      if(progress>=1)finish(el);
    });lastGlyph=now;
  }
  if(now-lastPaint>=33){drawField();lastPaint=now;}
  if(!reduced && (jobs.size || (heroVisible&&ctx)))wake();
}
function wake(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
addEventListener('resize',resize,{passive:true});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){cancelAnimationFrame(frame);frame=0;[...jobs.keys()].forEach(finish);scenes.forEach(cancelEntry);}
  else {scenes.filter(s=>s.active&&s.el.classList.contains('scene-wait')).forEach(playScene);scrollDirty=true;wake();}
});
document.addEventListener('portfolio:motion',e=>{
  reduced=e.detail.reduced;
  if(reduced){[...jobs.keys()].forEach(finish);scenes.forEach(showNow);$('#code-panel').classList.remove('code-playing');if(ctx)ctx.clearRect(0,0,width,height);}
  else scenes.filter(s=>s.active).forEach(playScene);
  wake();
});
resize();
})();
