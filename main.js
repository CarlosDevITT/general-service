import { services } from './src/data/services.js';
import { formatServicePrice } from './src/utils/currency.js';

const icons = {
  maintenance: 'ri-tools-line', painting: 'ri-paint-brush-line', plumbing: 'ri-drop-line',
  electrical: 'ri-flashlight-line', cleaning: 'ri-sparkling-line', automotive: 'ri-car-line',
  assembly: 'ri-hammer-line', gardening: 'ri-plant-line'
};
const categoryNames = {maintenance:'Reparos',painting:'Pintura',plumbing:'Hidráulica',electrical:'Elétrica',cleaning:'Limpeza',automotive:'Automotivo',assembly:'Montagem',gardening:'Jardinagem'};

const grid = document.querySelector('#services-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#service-search');
const clearSearch = document.querySelector('#clear-search');
const chips = [...document.querySelectorAll('.category-chip')];
const modal = document.querySelector('#service-modal');
let activeCategory = 'all';
let selectedService = null;

function normalized(value=''){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function renderServices(){
  const query = normalized(searchInput?.value.trim());
  const filtered = services.filter(service => service.active && (activeCategory === 'all' || service.category === activeCategory) && (!query || normalized(`${service.name} ${service.description} ${categoryNames[service.category] || ''}`).includes(query)));
  grid.innerHTML = filtered.map(service => `<article class="service-card" data-service-id="${service.id}"><div class="service-card__icon"><i class="${icons[service.category] || 'ri-tools-line'}"></i></div><span class="service-card__category">${categoryNames[service.category] || 'Serviço'}</span><h3>${service.name}</h3><p>${service.description}</p><div class="service-card__footer"><span class="service-card__price">${formatServicePrice(service)}</span><button class="service-card__action" type="button" aria-label="Ver ${service.name}"><i class="ri-arrow-right-line"></i></button></div></article>`).join('');
  emptyState.hidden = filtered.length > 0;
}
function openService(service){
  selectedService = service;
  document.querySelector('#modal-title').textContent = service.name;
  document.querySelector('#modal-description').textContent = service.description;
  document.querySelector('#modal-price').textContent = formatServicePrice(service);
  document.querySelector('#modal-icon').innerHTML = `<i class="${icons[service.category] || 'ri-tools-line'}"></i>`;
  modal.hidden = false; document.body.style.overflow='hidden';
  modal.querySelector('.modal__close').focus();
}
function closeModal(){modal.hidden=true;document.body.style.overflow='';selectedService=null}
function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2800)}

grid.addEventListener('click',event=>{const card=event.target.closest('[data-service-id]');if(!card)return;const service=services.find(item=>item.id===card.dataset.serviceId);if(service)openService(service)});
chips.forEach(chip=>chip.addEventListener('click',()=>{activeCategory=chip.dataset.category;chips.forEach(item=>item.classList.toggle('active',item===chip));renderServices()}));
searchInput?.addEventListener('input',renderServices);
clearSearch?.addEventListener('click',()=>{searchInput.value='';searchInput.focus();renderServices()});
modal.addEventListener('click',event=>{if(event.target.closest('[data-close-modal]'))closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)closeModal()});
document.querySelector('#request-service').addEventListener('click',()=>{const name=selectedService?.name;closeModal();showToast(name?`${name} selecionado. Fluxo de solicitação será a próxima etapa.`:'Serviço selecionado.')});
document.querySelector('#custom-request').addEventListener('click',()=>showToast('Atendimento personalizado será conectado na próxima etapa.'));
document.querySelector('#year').textContent=new Date().getFullYear();

const sections=[...document.querySelectorAll('section[id]')];
const navLinks=[...document.querySelectorAll('.bottom-nav a')];
function updateNavigation(){let current='home';sections.forEach(section=>{if(window.scrollY>=section.offsetTop-180)current=section.id});navLinks.forEach(link=>link.classList.toggle('active-link',link.getAttribute('href')===`#${current}`))}
window.addEventListener('scroll',updateNavigation,{passive:true});
renderServices();updateNavigation();