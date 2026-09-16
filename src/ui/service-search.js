export function initServiceSearch({input,clearButton,grid,emptyState,resultCount}={}){
  if(!input||!grid)return;
  const allChip=document.querySelector('.category-chip[data-category="all"]');
  const servicesSection=document.querySelector('#services');
  const searchBox=input.closest('.search-box');
  const categoryList=document.querySelector('#category-list');
  const sectionHeading=servicesSection?.querySelector('.section-heading');
  let timer;

  const resetCategoryForSearch=()=>{
    if(!input.value.trim())return;
    if(allChip&&!allChip.classList.contains('active')) allChip.click();
  };

  const updateState=()=>{
    const hasQuery=Boolean(input.value.trim());
    document.body.classList.toggle('service-searching',hasQuery);
    input.setAttribute('aria-label','Pesquisar serviços');
    input.setAttribute('enterkeyhint','search');
    input.setAttribute('inputmode','search');
    if(clearButton) clearButton.setAttribute('aria-label','Limpar pesquisa');
    if(innerWidth<=600){
      sectionHeading?.toggleAttribute('hidden',hasQuery);
      categoryList?.toggleAttribute('hidden',hasQuery);
      resultCount?.parentElement?.classList.toggle('search-results-summary',hasQuery);
      servicesSection?.classList.toggle('search-results-mode',hasQuery);
    }
  };

  const positionResultsBelowHeader=()=>{
    if(innerWidth>600||!input.value.trim())return;
    const topbar=document.querySelector('.topbar');
    const offset=(topbar?.getBoundingClientRect().height||72)+8;
    const y=grid.getBoundingClientRect().top+window.scrollY-offset;
    window.scrollTo({top:Math.max(0,y),behavior:'smooth'});
  };

  input.addEventListener('input',()=>{
    clearTimeout(timer);
    resetCategoryForSearch();
    updateState();
    timer=setTimeout(positionResultsBelowHeader,60);
  });

  input.addEventListener('search',()=>{resetCategoryForSearch();updateState();if(input.value.trim())positionResultsBelowHeader()});
  input.addEventListener('keydown',event=>{if(event.key!=='Enter')return;event.preventDefault();resetCategoryForSearch();updateState();input.blur();setTimeout(positionResultsBelowHeader,40)});
  clearButton?.addEventListener('click',()=>{updateState();input.focus({preventScroll:true})});
  addEventListener('resize',updateState,{passive:true});
  updateState();
}
