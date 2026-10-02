(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const config = window.PORTFOLIO || { projetos: [], certificados: [], cursos: [] };
const esc = v => String(v ?? '').replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const safeUrl = value => { try { const u = new URL(value, location.href); return ['https:', 'http:', 'file:'].includes(u.protocol) ? esc(u.href) : ''; } catch {return '';}};
let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
try {reduced = reduced || localStorage.getItem('kauan-reduced-motion') === 'true';} catch {}
let typeTimer;
const answers = {
  conexao: { question:'O que conecta engenharia e dados?', text:'Na engenharia, aprendi a organizar informações, analisar custos e otimizar processos. Com VBA, desenvolvi automações para propostas e planilhas. Agora, levo essa visão prática para meus estudos de Python e engenharia de dados.' },
  ferramentas: { question:'O que estou estudando atualmente?', text:'Meu aprendizado inclui Python, Pandas, PySpark, Databricks, Apache Spark e Azure. Também estudo fundamentos de engenharia de dados, Data Science, inteligência artificial e Power BI. São conhecimentos em desenvolvimento, somados à minha experiência em VBA e Excel avançado.' },
  experiencia: { question:'Como minha trajetória começou?', text:'Comecei na Qualieng Engenharia em 2019, como aprendiz. Passei por estágio e pelo cargo de orçamentista júnior até chegar a engenheiro orçamentista, em 2025. Nesse caminho, trabalhei com quantitativos, propostas, cotações e automações em planilhas.' }
};
let selectedQuestion = 'conexao';
function typeAnswer(key, animate = true) {
  clearTimeout(typeTimer); selectedQuestion = key;
  const entry = answers[key]; $('#question').textContent = entry.question;
  $$('.prompt-buttons button').forEach(b => {const on=b.dataset.question===key;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});
  const el = $('#answer'); el.classList.remove('typing');
  if(reduced || !animate){el.textContent=entry.text;el.setAttribute('aria-busy','false');return;}
  el.textContent=''; el.classList.add('typing'); el.setAttribute('aria-busy','true'); let n=0;
  function tick(){n+=3;el.textContent=entry.text.slice(0,n);if(n<entry.text.length){typeTimer=setTimeout(tick,19);}else{el.classList.remove('typing');el.setAttribute('aria-busy','false');}}
  tick();
}
$$('[data-question]').forEach(b=>b.addEventListener('click',()=>typeAnswer(b.dataset.question)));
function updateMotion(){
 document.documentElement.classList.toggle('no-motion',reduced);
 $('#motion').innerHTML=`Animações: ${reduced?'pausadas':'ativadas'} <span>◉</span>`;
 $('#motion').setAttribute('aria-pressed',String(reduced));
 if(reduced) typeAnswer(selectedQuestion,false);
 document.dispatchEvent(new CustomEvent('portfolio:motion',{detail:{reduced}}));
}
$('#motion').addEventListener('click',()=>{
 reduced=!reduced;
 try{localStorage.setItem('kauan-reduced-motion',String(reduced));}catch{}
 updateMotion();
});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{reduced=e.matches;updateMotion();});
updateMotion();
$('#menu').addEventListener('click',()=>{const on=$('#nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(on));$('#menu').setAttribute('aria-label',on?'Fechar menu':'Abrir menu');$('#menu').textContent=on?'×':'☰';});
function closeMenu(){$('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');$('#menu').setAttribute('aria-label','Abrir menu');$('#menu').textContent='☰';}
$$('#nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
function renderProjects(filter='Todos'){
 const projects=config.projetos.filter(p=>filter==='Todos'||p.categoria===filter);
 $('#project-count').textContent=config.projetos.length;
 $$('#project-filters button').forEach(b=>{const on=b.dataset.filter===filter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
 if(!projects.length){$('#projects').innerHTML=`<div class="empty-project"><div class="empty-art" aria-hidden="true"><span>&lt;/&gt;</span><small>WORK IN PROGRESS</small></div><div><div class="eyebrow">● &nbsp; ${filter==='Todos'?'ESPAÇO EM CONSTRUÇÃO':esc(filter.toUpperCase())+' / EM BREVE'}</div><h3>O próximo capítulo está sendo escrito.</h3><p>${config.projetos.length?'Ainda não há projetos publicados nesta categoria.':'Meus projetos serão publicados aqui, com código, aprendizados e resultados. Por enquanto, este espaço está reservado para o que vem a seguir.'}</p><span class="tag">Python</span><span class="tag">Dados</span><span class="tag">Automação</span></div><span class="empty-arrow">↗</span></div>`;return;}
 $('#projects').innerHTML='<div class="project-grid">'+projects.map(p=>`<article class="project-card"><div class="mono accent">${esc(p.categoria)}</div><div class="project-symbol" aria-hidden="true">{ / }</div><h3>${esc(p.titulo)}</h3><p>${esc(p.descricao)}</p><div>${(p.tecnologias||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="project-links">${p.detalhes?`<button type="button" class="project-more" data-project="${esc(p.titulo)}">Ver como funciona →</button>`:''}${p.repositorio&&safeUrl(p.repositorio)?`<a href="${safeUrl(p.repositorio)}" target="_blank" rel="noopener noreferrer">Repositório ↗</a>`:''}${p.demonstracao&&safeUrl(p.demonstracao)?`<a href="${safeUrl(p.demonstracao)}" target="_blank" rel="noopener noreferrer">Demonstração ↗</a>`:''}</div></article>`).join('')+'</div>';
}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>renderProjects(b.dataset.filter)));renderProjects();
let courseFilter='Todos', expanded=false;
function renderCourses(){
 const list=config.cursos.filter(c=>courseFilter==='Todos'||(courseFilter==='Concluído'?c.status==='Concluído':c.status!=='Concluído'));
 $('#courses').innerHTML=(expanded?list:list.slice(0,4)).map(c=>`<article class="course-row"><div class="course-icon" aria-hidden="true">${c.status==='Concluído'?'✓':'⌁'}</div><div><h3>${esc(c.titulo)}</h3><small>${esc(c.instituicao)}</small></div><span class="course-state ${c.status==='Concluído'?'':'progress'}">${esc(c.status)}</span></article>`).join('');
 $('#more-courses').hidden=list.length<=4;
 $('#more-courses').style.display=list.length<=4?'none':'inline-flex';
 $('#more-courses').innerHTML=expanded?'Mostrar menos <span>↑</span>':`Ver todas as formações (${list.length}) <span>↓</span>`;
 $('#more-courses').setAttribute('aria-expanded',String(expanded));
 $$('#course-filters button').forEach(b=>{const on=b.dataset.course===courseFilter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
}
$$('[data-course]').forEach(b=>b.addEventListener('click',()=>{courseFilter=b.dataset.course;expanded=false;renderCourses();}));$('#more-courses').addEventListener('click',()=>{expanded=!expanded;renderCourses();});renderCourses();
$('#certificates').innerHTML=config.certificados.map(c=>`<div class="certificate-row"><span>${esc(c.titulo)} · ${esc(c.instituicao)}</span>${c.arquivo&&safeUrl(c.arquivo)?`<a href="${safeUrl(c.arquivo)}" target="_blank" rel="noopener noreferrer">Ver certificado ↗</a>`:''}</div>`).join('');
$('#copy-email').addEventListener('click',async()=>{const email='kauanmacedo21@gmail.com';try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(email);}else{const ta=document.createElement('textarea');ta.value=email;ta.style.cssText='position:fixed;opacity:0;';document.body.append(ta);ta.select();const ok=document.execCommand('copy');ta.remove();if(!ok)throw Error('copy');}$('#copy-status').textContent='E-mail copiado!';}catch{$('#copy-status').textContent='Selecione o endereço acima para copiar.';}});
// Start typing when the delayed panel actually becomes visible, not before.
document.addEventListener('portfolio:assistant-enter',()=>typeAnswer(selectedQuestion));
document.addEventListener('portfolio:assistant-exit',()=>typeAnswer(selectedQuestion,false));
})();
