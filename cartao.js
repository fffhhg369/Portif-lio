/* Cartão virtual público. Os PDFs para impressão NÃO são servidos pelo site. */
(() => {
 'use strict';
 const data=window.CARTAO_VIRTUAL;
 const dialog=document.getElementById('contact-card-dialog');
 const openButton=document.getElementById('open-contact-card');
 if(!dialog||!data)return;
 const $=s=>dialog.querySelector(s);
 const d=data.contatos;
 const contactText=`${d.nome} ${d.sobrenome}\n${d.cargo}\n${d.foco}\nWhatsApp: ${d.whatsapp}\nE-mail: ${d.email}\nLinkedIn: ${d.linkedin}`;
 let lastFocus=null;
 const files={};
 // Prepared up front so navigator.share retains the click's user activation.
 for(const theme of ['escuro','claro']){
  const base64=data.imagens[theme].split(',')[1];
  const bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
  files[theme]=new File([bytes],`Kauan-virtual-${theme}.png`,{type:'image/png'});
 }
 const selected=()=>$('input[name="card-theme"]:checked').value;
 function update(){
  const theme=selected();
  $('#card-preview-image').src=data.imagens[theme];
  $('#card-download').href=data.imagens[theme];
  $('#card-download').download=`Kauan-virtual-${theme}.png`;
  $('#card-vcf').href=data.vcf;
  $('#card-feedback').textContent='';
  $('#card-share-fallback').hidden=true;
 }
 function fallback(message){
  $('#card-feedback').textContent=message;
  $('#card-share-fallback').hidden=false;
  $('#card-copy-text').value=contactText;
 }
 openButton.addEventListener('click',()=>{
  lastFocus=document.activeElement;update();dialog.showModal();document.body.classList.add('card-dialog-open');
 });
 $('#card-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{
  document.body.classList.remove('card-dialog-open');
  if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});
 });
 dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
 });
 dialog.querySelectorAll('input[name="card-theme"]').forEach(input=>input.addEventListener('change',update));
 $('#card-download').addEventListener('click',()=>{
  $('#card-feedback').textContent='Imagem pronta para salvar. Se o navegador abrir a imagem, use “Salvar imagem” no menu do aparelho.';
 });
 $('#card-vcf').addEventListener('click',()=>{
  $('#card-feedback').textContent='Abra o arquivo .vcf baixado para importar o contato. Confirme o salvamento na agenda do seu aparelho.';
 });
 $('#card-share').addEventListener('click',async()=>{
  $('#card-feedback').textContent='';$('#card-share-fallback').hidden=true;
  if(!navigator.share){fallback('O compartilhamento direto não está disponível neste navegador. Baixe a imagem ou copie os contatos abaixo.');return;}
  const file=files[selected()];
  const payload={title:'Cartão virtual · Kauan Alves',text:contactText};
  try{
   if(navigator.canShare?.({files:[file]}))payload.files=[file];
   await navigator.share(payload);
   $('#card-feedback').textContent=payload.files?'Cartão entregue ao compartilhamento do aparelho.':'Contatos entregues ao compartilhamento. Para enviar a imagem, use “Baixar imagem”.';
  }catch(error){
   if(error.name==='AbortError'){$('#card-feedback').textContent='Compartilhamento cancelado.';return;}
   fallback('Não foi possível abrir o compartilhamento. Você pode baixar a imagem ou copiar os contatos abaixo.');
  }
 });
 $('#card-copy').addEventListener('click',async()=>{
  try{
   if(!navigator.clipboard?.writeText)throw new Error('clipboard unavailable');
   await navigator.clipboard.writeText(contactText);
   $('#card-feedback').textContent='Contatos copiados. Cole na conversa que preferir.';
  }catch{
   const text=$('#card-copy-text');text.focus();text.select();text.setSelectionRange(0,text.value.length);
   $('#card-feedback').textContent='Texto selecionado. Use “Copiar” no aparelho ou Ctrl+C / ⌘C.';
  }
 });
 update();
})();
