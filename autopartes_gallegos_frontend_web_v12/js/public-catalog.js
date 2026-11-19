// El catálogo público consulta la misma clave de productos que el panel administrativo.
// La sincronización es local al navegador hasta que se integre la API del backend.
const PUBLIC_CATALOG_STORAGE_KEY = 'ag_public_catalog_products_v1';
const seedProducts = [
 {code:'AG-001',oem:'FILT-001',name:'Filtro de aceite',brand:'Bosch',category:'Filtros',price:120,cost:75,stock:25,min:5,description:'Filtro para mantenimiento de motor.',active:true},
 {code:'AG-002',oem:'BRM-220',name:'Pastillas de freno',brand:'Brembo',category:'Frenos',price:850,cost:620,stock:12,min:5,description:'Juego de pastillas para freno delantero.',active:true},
 {code:'AG-003',oem:'BAG-009',name:'Bomba de agua',brand:'WPS',category:'Motor',price:1250,cost:920,stock:4,min:10,description:'Bomba de agua para sistema de enfriamiento.',active:true},
 {code:'AG-004',oem:'MON-450',name:'Amortiguador',brand:'Monroe',category:'Suspensión',price:1480,cost:1100,stock:15,min:5,description:'Amortiguador de suspensión.',active:true},
 {code:'AG-005',oem:'NGK-101',name:'Bujías',brand:'NGK',category:'Encendido',price:280,cost:180,stock:32,min:8,description:'Bujía para sistema de encendido.',active:true},
 {code:'AG-006',oem:'BAL-778',name:'Balero delantero',brand:'SKF',category:'Transmisión',price:430,cost:290,stock:0,min:4,description:'Rodamiento para conjunto delantero.',active:true}
];
const money = value => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(Number(value)||0);
const escapeHTML = value => String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const categoryFilters = document.getElementById('category-filters');
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
let products = [];
let activeCategory = 'Todos';

function readProducts(){
 try {
  const raw=localStorage.getItem(PUBLIC_CATALOG_STORAGE_KEY);
  if(raw!==null){const parsed=JSON.parse(raw);return Array.isArray(parsed)?parsed:[];}
  // Primera apertura: inicializa la misma información semilla que utiliza el panel.
  localStorage.setItem(PUBLIC_CATALOG_STORAGE_KEY,JSON.stringify(seedProducts.map(({code,oem,name,brand,category,price,stock,min,active})=>({code,oem,name,brand,category,price,stock,min,active}))));
  return seedProducts.map(p=>({...p}));
 } catch(error) {
  console.warn('No fue posible leer el catálogo compartido del navegador.',error);
  return [];
 }
}
function stockStatus(product){
 const stock=Number(product.stock)||0, minimum=Number(product.min)||0;
 if(stock===0)return {label:'Agotado',className:'stock-out'};
 if(stock<=minimum)return {label:'Stock bajo',className:'stock-low'};
 return {label:'Disponible',className:'stock-available'};
}
function categoryIcon(category){
 const value=String(category||'').toLocaleLowerCase('es-MX');
 if(value.includes('fren'))return 'bi-disc';
 if(value.includes('filt'))return 'bi-funnel';
 if(value.includes('encend')||value.includes('eléct'))return 'bi-lightning-charge';
 if(value.includes('susp'))return 'bi-car-front';
 if(value.includes('trans')||value.includes('balero'))return 'bi-gear';
 return 'bi-box-seam';
}
function renderCategories(){
 const categories=['Todos',...new Set(products.filter(p=>p.active!==false).map(p=>String(p.category||'Sin categoría')).sort((a,b)=>a.localeCompare(b,'es')))];
 if(!categories.includes(activeCategory))activeCategory='Todos';
 categoryFilters.innerHTML=categories.map(category=>`<button type="button" class="category-btn ${activeCategory===category?'active':''}" data-category="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join('');
 document.getElementById('category-count').textContent=`${categories.length-1} categorías`;
}
function getVisibleProducts(){
 const term=searchInput.value.trim().toLocaleLowerCase('es-MX');
 let items=products.filter(p=>p.active!==false&&(activeCategory==='Todos'||(p.category||'Sin categoría')===activeCategory)&&[p.code,p.oem,p.name,p.brand,p.category].some(v=>String(v||'').toLocaleLowerCase('es-MX').includes(term)));
 const sort=sortSelect.value;
 if(sort==='price-asc')items.sort((a,b)=>(Number(a.price)||0)-(Number(b.price)||0));
 if(sort==='price-desc')items.sort((a,b)=>(Number(b.price)||0)-(Number(a.price)||0));
 if(sort==='stock-desc')items.sort((a,b)=>(Number(b.stock)||0)-(Number(a.stock)||0));
 if(sort==='name')items.sort((a,b)=>String(a.name||'').localeCompare(String(b.name||''),'es'));
 return items;
}
function renderProducts(){
 const items=getVisibleProducts();
 document.getElementById('results-label').textContent=`${items.length} ${items.length===1?'producto encontrado':'productos encontrados'}`;
 productGrid.innerHTML=items.map(p=>{const status=stockStatus(p);const stock=Number(p.stock)||0;const category=p.category||'Sin categoría';return `
 <article class="product-card">
  <div class="product-visual"><span class="product-category">${escapeHTML(category)}</span><i class="bi ${categoryIcon(category)}"></i></div>
  <div class="product-info">
   <div class="product-code">CÓDIGO ${escapeHTML(p.code||'—')}${p.oem?` · OEM ${escapeHTML(p.oem)}`:''}</div><h3>${escapeHTML(p.name||'Producto sin nombre')}</h3><div class="product-brand">Marca: ${escapeHTML(p.brand||'No especificada')}</div>
   <div class="product-price">${money(p.price)}</div>
   <div class="stock-line"><span class="stock-qty">Existencias: <strong>${stock} ${stock===1?'unidad':'unidades'}</strong></span><span class="stock-state ${status.className}">${status.label}</span></div>
  </div>
 </article>`;}).join('');
 document.getElementById('empty-state').hidden=items.length!==0;
 productGrid.hidden=items.length===0;
 document.getElementById('clear-search').hidden=!searchInput.value;
}
function refreshCatalog(){
 const previousCategory=activeCategory;
 products=readProducts();
 activeCategory=previousCategory;
 renderCategories();
 renderProducts();
 const stamp=document.getElementById('catalog-updated');
 if(stamp)stamp.textContent=`Actualizado: ${new Intl.DateTimeFormat('es-MX',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date())}`;
}
categoryFilters.addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;activeCategory=button.dataset.category;renderCategories();renderProducts();});
searchInput.addEventListener('input',renderProducts);
sortSelect.addEventListener('change',renderProducts);
document.getElementById('clear-search').addEventListener('click',()=>{searchInput.value='';renderProducts();searchInput.focus();});
document.getElementById('reset-filters').addEventListener('click',()=>{activeCategory='Todos';searchInput.value='';sortSelect.value='name';renderCategories();renderProducts();});
// storage se dispara en otras pestañas del mismo navegador y origen.
window.addEventListener('storage',event=>{if(event.key===PUBLIC_CATALOG_STORAGE_KEY||event.key===null)refreshCatalog();});
window.addEventListener('focus',refreshCatalog);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshCatalog();});
document.getElementById('year').textContent=new Date().getFullYear();
refreshCatalog();
