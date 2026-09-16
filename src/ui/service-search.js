export function initServiceSearch({input,clearButton,grid,emptyState,resultCount}={}){
  if(!input||!grid)return;
  const allChip=document.querySelector('.category-chip[data-category="all"]');
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
  };

  input.addEventListener('input',()=>{
    clearTimeout(timer);
    updateState();
    timer=setTimeout(resetCategoryForSearch,80);
  });

  input.addEventListener('search',()=>{
    updateState();
    if(!input.value.trim()&&allChip&&!allChip.classList.contains('active')) allChip.click();
  });

  input.addEventListener('keydown',event=>{
    if(event.key!=='Enter')return;
    event.preventDefault();
    resetCategoryForSearch();
    input.blur();
    setTimeout(()=>grid.scrollIntoView({behavior:'smooth',block:'start'}),120);
  });

  clearButton?.addEventListener('click',()=>{
    updateState();
    input.focus({preventScroll:true});
  });

  updateState();
}
