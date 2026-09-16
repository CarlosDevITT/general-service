const STORAGE_KEY='state-services:request';

function readRequest(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null')}catch{return null}
}

function serviceName(request){return request?.service?.name||request?.serviceName||request?.title||'Solicitação de serviço'}
function orderNumber(request){return request?.orderNumber||request?.orderId||request?.id||'Em preparação'}
function requestDate(request){
  const value=request?.schedule?.date||request?.date;
  if(!value)return 'Data a confirmar';
  const date=new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime())?'Data a confirmar':new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short'}).format(date);
}

export function initCustomerArea({tracking}={}){
  const modal=document.querySelector('#customer-area');
  const openers=[...document.querySelectorAll('[data-open-customer]')];
  if(!modal||!openers.length)return {open(){}};
  const sheet=modal.querySelector('.customer-area__sheet');
  const body=modal.querySelector('#customer-area-body');
  let previousFocus=null;

  function render(){
    const request=readRequest();
    body.innerHTML=request?`<section class="customer-home"><div class="customer-greeting"><span>Minha conta</span><h2>Olá! 👋</h2><p>Acompanhe seus atendimentos e mantenha suas informações organizadas.</p></div><article class="customer-active"><div class="customer-active__top"><span class="customer-status"><i class="ri-time-line"></i> Em andamento</span><small>OS ${orderNumber(request)}</small></div><h3>${serviceName(request)}</h3><div class="customer-active__meta"><span><i class="ri-calendar-line"></i>${requestDate(request)}</span><span><i class="ri-route-line"></i>Acompanhamento disponível</span></div><button type="button" class="customer-primary" data-track-request>Acompanhar serviço <i class="ri-arrow-right-line"></i></button></article><div class="customer-menu"><button type="button" data-track-request><i class="ri-file-list-3-line"></i><span><strong>Meus serviços</strong><small>Em andamento e histórico</small></span><i class="ri-arrow-right-s-line"></i></button><button type="button" disabled><i class="ri-map-pin-line"></i><span><strong>Endereços</strong><small>Disponível quando sua conta estiver conectada</small></span><i class="ri-lock-line"></i></button><button type="button" disabled><i class="ri-user-3-line"></i><span><strong>Meus dados</strong><small>Disponível com login do cliente</small></span><i class="ri-lock-line"></i></button><button type="button" data-customer-help><i class="ri-question-line"></i><span><strong>Ajuda</strong><small>Entenda como funciona a solicitação</small></span><i class="ri-arrow-right-s-line"></i></button></div><div class="customer-note"><i class="ri-information-line"></i><span>Esta é a versão frontend da sua área. Login, histórico completo, endereços e dados pessoais serão conectados ao banco na próxima fase.</span></div></section>`:`<section class="customer-empty"><div class="customer-empty__icon"><i class="ri-user-smile-line"></i></div><span>Minha conta</span><h2>Seus serviços em um só lugar.</h2><p>Quando você preparar uma solicitação, ela aparecerá aqui para acompanhamento.</p><a href="#services" class="customer-primary" data-close-customer>Encontrar um serviço <i class="ri-arrow-right-line"></i></a><div class="customer-empty__features"><span><i class="ri-route-line"></i>Acompanhe solicitações</span><span><i class="ri-history-line"></i>Histórico na próxima fase</span></div></section>`;
  }
  function open(){previousFocus=document.activeElement;render();modal.hidden=false;document.body.style.overflow='hidden';requestAnimationFrame(()=>sheet?.focus())}
  function close(){modal.hidden=true;document.body.style.overflow='';previousFocus?.focus?.()}
  openers.forEach(button=>button.addEventListener('click',event=>{event.preventDefault();open()}));
  modal.addEventListener('click',event=>{
    if(event.target.closest('[data-close-customer]')){close();return}
    if(event.target.closest('[data-track-request]')){close();tracking?.openSaved?.();return}
    if(event.target.closest('[data-customer-help]')){close();setTimeout(()=>document.querySelector('#how-it-works')?.scrollIntoView({behavior:'smooth'}),80)}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)close()});
  return {open,close,render};
}
