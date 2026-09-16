const DETAILS={
  1:{icon:'ri-search-eye-line',title:'Escolha o serviço',intro:'Comece encontrando exatamente o atendimento que precisa.',items:['Explore as categorias disponíveis','Use a pesquisa para localizar um serviço rapidamente','Abra o serviço para conferir descrição e forma de cobrança'],tip:'Se não encontrar o serviço, você também pode preparar uma solicitação personalizada.'},
  2:{icon:'ri-file-list-3-line',title:'Conte os detalhes',intro:'Quanto mais contexto você informar, mais clara fica a solicitação.',items:['Descreva o problema ou o que deseja realizar','Informe o endereço do atendimento','Adicione fotos ou arquivos quando ajudarem a explicar o serviço'],tip:'Os anexos ficam apenas no fluxo local nesta versão do frontend.'},
  3:{icon:'ri-calendar-check-line',title:'Escolha quando',intro:'Defina uma preferência de atendimento que combine com sua rotina.',items:['Escolha a data desejada','Selecione manhã, tarde, noite ou período flexível','Use horário personalizado quando precisar de maior precisão'],tip:'A data e o horário ainda serão considerados uma preferência até a confirmação do atendimento.'},
  4:{icon:'ri-route-line',title:'Solicite e acompanhe',intro:'Revise tudo antes de preparar a solicitação e mantenha os dados acessíveis.',items:['Confira serviço, endereço e agendamento','Receba o número da ordem de serviço','Acompanhe a jornada da solicitação ou confirme os dados pelo WhatsApp'],tip:'Nenhum pagamento é realizado durante a preparação da solicitação.'}
};
export function initHowItWorks(){
  const cards=[...document.querySelectorAll('.spatial-step')];
  if(!cards.length)return;
  cards.forEach((card,index)=>{
    const data=DETAILS[index+1];
    card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-expanded','false');card.setAttribute('aria-label',`${data.title}. Toque para ver mais detalhes`);
    const more=document.createElement('span');more.className='how-card-more';more.innerHTML='<span>Ver detalhes</span><i class="ri-add-line"></i>';card.appendChild(more);
    const detail=document.createElement('div');detail.className='how-card-detail';detail.hidden=true;detail.innerHTML=`<div class="how-card-detail__head"><i class="${data.icon}"></i><p>${data.intro}</p></div><ul>${data.items.map(item=>`<li><i class="ri-checkbox-circle-fill"></i><span>${item}</span></li>`).join('')}</ul><div class="how-card-tip"><i class="ri-information-line"></i><span>${data.tip}</span></div>`;card.appendChild(detail);
    const toggle=()=>{const open=card.getAttribute('aria-expanded')==='true';cards.forEach(other=>{if(other===card)return;other.setAttribute('aria-expanded','false');other.querySelector('.how-card-detail')?.setAttribute('hidden','');const m=other.querySelector('.how-card-more');if(m)m.innerHTML='<span>Ver detalhes</span><i class="ri-add-line"></i>'});card.setAttribute('aria-expanded',String(!open));detail.hidden=open;more.innerHTML=open?'<span>Ver detalhes</span><i class="ri-add-line"></i>':'<span>Fechar detalhes</span><i class="ri-subtract-line"></i>';if(!open&&innerWidth<=700)setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'nearest'}),80)};
    card.addEventListener('click',toggle);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
  });
}
