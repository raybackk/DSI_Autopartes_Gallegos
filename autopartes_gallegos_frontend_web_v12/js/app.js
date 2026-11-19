const seedProducts = [
  {code:"AG-001",oem:"FILT-001",name:"Filtro de aceite",brand:"Bosch",category:"Filtros",price:120,cost:75,stock:25,min:5,description:"Filtro para mantenimiento de motor.",active:true},
  {code:"AG-002",oem:"BRM-220",name:"Pastillas de freno",brand:"Brembo",category:"Frenos",price:850,cost:620,stock:12,min:5,description:"Juego de pastillas para freno delantero.",active:true},
  {code:"AG-003",oem:"BAG-009",name:"Bomba de agua",brand:"WPS",category:"Motor",price:1250,cost:920,stock:4,min:10,description:"Bomba de agua para sistema de enfriamiento.",active:true},
  {code:"AG-004",oem:"MON-450",name:"Amortiguador",brand:"Monroe",category:"Suspensión",price:1480,cost:1100,stock:15,min:5,description:"Amortiguador de suspensión.",active:true},
  {code:"AG-005",oem:"NGK-101",name:"Bujías",brand:"NGK",category:"Encendido",price:280,cost:180,stock:32,min:8,description:"Bujía para sistema de encendido.",active:true},
  {code:"AG-006",oem:"BAL-778",name:"Balero delantero",brand:"SKF",category:"Transmisión",price:430,cost:290,stock:0,min:4,description:"Rodamiento para conjunto delantero.",active:true}
];
const PRODUCT_STORAGE_KEY = "ag_demo_products_v1";
const PUBLIC_CATALOG_STORAGE_KEY = "ag_public_catalog_products_v1";
const INVENTORY_MOVEMENTS_KEY = "ag_demo_inventory_movements_v1";
const PROVIDERS_STORAGE_KEY = "ag_demo_providers_v1";
const PURCHASES_STORAGE_KEY = "ag_demo_purchases_v1";
let products = loadProducts();
// Inicializa/actualiza la proyección pública, incluso al migrar datos de una versión anterior.
saveProducts();
let inventoryMovements = loadInventoryMovements();
const seedProviders = [
 {id:"PROV-001",name:"Distribuidora Bosch México",rfc:"DBM910215AB1",contact:"Laura Méndez",phone:"55 5555 1200",email:"ventas@bosch-demo.mx",category:"Refacciones",city:"Ciudad de México",address:"Av. Industria 120, Vallejo",payment:"Crédito 30 días",notes:"Distribuidor de filtros y componentes de motor.",active:true},
 {id:"PROV-002",name:"Frenos y Clutch del Centro",rfc:"FCC080612CD2",contact:"Roberto Salas",phone:"55 5555 2380",email:"contacto@frenos-demo.mx",category:"Frenos",city:"Naucalpan",address:"Calle Taller 45, Parque Industrial",payment:"Contado",notes:"Proveedor de balatas y componentes de freno.",active:true},
 {id:"PROV-003",name:"Rodamientos Industriales SKF",rfc:"RIS850920EF3",contact:"Mariana Torres",phone:"81 5555 4600",email:"pedidos@rodamientos-demo.mx",category:"Baleros y rodamientos",city:"Monterrey",address:"Av. del Acero 300",payment:"Crédito 15 días",notes:"Proveedor de baleros y rodamientos.",active:true},
 {id:"PROV-004",name:"Suministros Automotrices del Bajío",rfc:"SAB120307GH4",contact:"Carlos Vega",phone:"477 555 0910",email:"compras@suministros-demo.mx",category:"Multimarca",city:"León",address:"Blvd. Autopartes 88",payment:"Por acordar",notes:"Registro de demostración inactivo.",active:false}
];
let providers = loadProviders();
let purchases = loadPurchases();
const productCategories = ["Balatas","Baleros","Bandas","Dirección","Eléctrico","Encendido","Filtros","Frenos","Motor","Suspensión","Transmisión","Otros"];
function loadProducts(){
  try { const saved=localStorage.getItem(PRODUCT_STORAGE_KEY); if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed;} } catch(error){console.warn("No fue posible recuperar los productos de demostración.",error);}
  return seedProducts.map(p=>({...p}));
}
function saveProducts(){
 try{
  localStorage.setItem(PRODUCT_STORAGE_KEY,JSON.stringify(products));
  // Publica únicamente los campos necesarios; nunca expone costos ni datos internos.
  const publicProducts=products.map(p=>({code:p.code,oem:p.oem||"",name:p.name,brand:p.brand||"",category:p.category||"Sin categoría",price:Number(p.price)||0,stock:Number(p.stock)||0,min:Number(p.min)||0,active:p.active!==false}));
  localStorage.setItem(PUBLIC_CATALOG_STORAGE_KEY,JSON.stringify(publicProducts));
 }catch(error){console.warn("No fue posible guardar los cambios localmente.",error);}
}
function loadInventoryMovements(){
 try{const saved=localStorage.getItem(INVENTORY_MOVEMENTS_KEY);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed;}}
 catch(error){console.warn("No fue posible recuperar el historial de inventario.",error);}
 return [];
}
function saveInventoryMovements(){try{localStorage.setItem(INVENTORY_MOVEMENTS_KEY,JSON.stringify(inventoryMovements));}catch(error){console.warn("No fue posible guardar el historial de inventario.",error);}}
function loadProviders(){
 try{const saved=localStorage.getItem(PROVIDERS_STORAGE_KEY);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed;}}
 catch(error){console.warn("No fue posible recuperar los proveedores de demostración.",error);}
 return seedProviders.map(p=>({...p}));
}
function saveProviders(){try{localStorage.setItem(PROVIDERS_STORAGE_KEY,JSON.stringify(providers));}catch(error){console.warn("No fue posible guardar los proveedores localmente.",error);}}
function loadPurchases(){try{const saved=localStorage.getItem(PURCHASES_STORAGE_KEY);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed;}}catch(error){console.warn("No fue posible recuperar las compras de demostración.",error);}return [];}
function savePurchases(){try{localStorage.setItem(PURCHASES_STORAGE_KEY,JSON.stringify(purchases));}catch(error){console.warn("No fue posible guardar las compras localmente.",error);}}
function nextProviderId(){const max=providers.reduce((n,p)=>Math.max(n,Number(String(p.id).replace(/\D/g,""))||0),0);return `PROV-${String(max+1).padStart(3,"0")}`;}

function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}

const SALES_STORAGE_KEY = "ag_demo_sales_v1";
const seedSales = [
  {folio:"VTA-00124",date:"2026-11-11",user:"Usuario demo",total:1250,payment:"Efectivo",status:"Confirmada",items:[]},
  {folio:"VTA-00123",date:"2026-11-10",user:"Usuario demo",total:980,payment:"Tarjeta",status:"Confirmada",items:[]},
  {folio:"VTA-00122",date:"2026-11-09",user:"Usuario demo",total:675,payment:"Transferencia",status:"Cancelada",items:[]},
  {folio:"VTA-00121",date:"2026-11-08",user:"Usuario demo",total:2340,payment:"Efectivo",status:"Confirmada",items:[]}
];
function loadSales(){try{const saved=localStorage.getItem(SALES_STORAGE_KEY);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))return parsed;}}catch(error){console.warn("No fue posible recuperar las ventas locales.",error);}return seedSales.map(s=>({...s}));}
function saveSales(){try{localStorage.setItem(SALES_STORAGE_KEY,JSON.stringify(sales));}catch(error){console.warn("No fue posible guardar las ventas localmente.",error);}}
let sales = loadSales();

// Autenticación y permisos locales de demostración. En producción se sustituirá por el backend.
const USERS_STORAGE_KEY = "ag_demo_users_v1";
const SESSION_STORAGE_KEY = "ag_demo_session_v1";
const ALL_PAGES = ["dashboard","pos","catalog","inventory","movements","providers","purchases","sales","reports","scraping","market","users"];
const ROLE_PERMISSIONS = {
  "Super Admin": [...ALL_PAGES],
  "Administrador": ["dashboard","pos","catalog","inventory","movements","providers","purchases","sales","reports"],
  "Empleado": ["dashboard","pos","catalog","inventory","movements"]
};
const ROLE_DESCRIPTIONS = {
  "Super Admin":"Control total del sistema, usuarios, roles, permisos y configuración.",
  "Administrador":"Gestiona la operación diaria y consulta reportes; no administra usuarios ni permisos.",
  "Empleado":"Acceso operativo limitado a consulta de productos, inventario y punto de venta."
};
function loadUsers(){
  try{const raw=localStorage.getItem(USERS_STORAGE_KEY);if(raw){const parsed=JSON.parse(raw);if(Array.isArray(parsed)&&parsed.length)return parsed;}}
  catch(error){console.warn("No fue posible recuperar los usuarios locales.",error);}
  const initial=[{id:"USR-001",name:"Super Administrador",username:"admin",password:"Admin123!",role:"Super Admin",active:true,permissions:[...ALL_PAGES],createdAt:new Date().toISOString()}];
  localStorage.setItem(USERS_STORAGE_KEY,JSON.stringify(initial));return initial;
}
let users=loadUsers();
function saveUsers(){try{localStorage.setItem(USERS_STORAGE_KEY,JSON.stringify(users));}catch(error){alert("No fue posible guardar los usuarios en este navegador.");}}
let currentUser=null;
function currentPermissions(){return currentUser?.role==="Super Admin"?ALL_PAGES:(currentUser?.permissions||ROLE_PERMISSIONS[currentUser?.role]||[]);}
function canAccess(page){return !!currentUser&&(currentUser.role==="Super Admin"||currentPermissions().includes(page));}
function refreshUserChrome(){
  if(!currentUser)return;
  document.getElementById("sidebar-user-name").textContent=currentUser.name;
  document.getElementById("sidebar-user-role").textContent=currentUser.role;
  document.getElementById("sidebar-avatar").textContent=currentUser.name.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  document.querySelectorAll("#main-nav [data-page]").forEach(a=>{a.hidden=!canAccess(a.dataset.page);});
}
function showLogin(){document.getElementById("app-shell").hidden=true;document.getElementById("login-screen").classList.remove("d-none");document.getElementById("login-password").value="";}
function startSession(user){currentUser=user;sessionStorage.setItem(SESSION_STORAGE_KEY,user.id);document.getElementById("login-screen").classList.add("d-none");document.getElementById("app-shell").hidden=false;refreshUserChrome();navigate("dashboard");}
function logout(){sessionStorage.removeItem(SESSION_STORAGE_KEY);currentUser=null;showLogin();}
function initializeAuth(){
  document.getElementById("login-form").addEventListener("submit",event=>{event.preventDefault();const username=document.getElementById("login-username").value.trim().toLowerCase();const password=document.getElementById("login-password").value;const user=users.find(u=>u.username.toLowerCase()===username&&u.password===password&&u.active!==false);if(!user){document.getElementById("login-error").classList.remove("d-none");return;}document.getElementById("login-error").classList.add("d-none");startSession(user);});
  document.getElementById("logout-button").addEventListener("click",logout);
  const id=sessionStorage.getItem(SESSION_STORAGE_KEY);const user=users.find(u=>u.id===id&&u.active!==false);
  if(user)startSession(user);else{sessionStorage.removeItem(SESSION_STORAGE_KEY);showLogin();}
}
function nextUserId(){const max=users.reduce((n,u)=>Math.max(n,Number(String(u.id).replace(/\D/g,""))||0),0);return `USR-${String(max+1).padStart(3,"0")}`;}
const pageNames = {dashboard:"Panel principal",pos:"Punto de venta",catalog:"Gestión de productos",inventory:"Inventario",movements:"Movimientos",providers:"Proveedores",purchases:"Compras",sales:"Ventas",reports:"Reportes",scraping:"Web scraping",market:"Inteligencia de mercado",users:"Usuarios y permisos"};
const content = document.getElementById("page-content");
let currentPage = "dashboard";
let cart = [];

const money = n => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN"}).format(n);
const heading = (title,sub,action="") => `<div class="page-heading"><div><div class="eyebrow">Autopartes Gallegos</div><h1>${title}</h1><p>${sub}</p></div>${action}</div>`;
const panel = (title,body,action="") => `<div class="card-panel h-100"><div class="panel-head"><h2>${title}</h2>${action}</div><div class="panel-body">${body}</div></div>`;
const table = (headers, rows) => `<div class="table-responsive"><table class="table align-middle"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
function metric(label,value,icon,foot){return `<div class="metric-card"><div class="metric-top"><span>${label}</span><span class="metric-icon"><i class="bi ${icon}"></i></span></div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></div>`}
function statusBadge(status){let c=status==="Confirmada"||status==="Activo"||status==="Disponible"?"green":status==="Stock bajo"?"yellow":status==="Agotado"?"red":status==="Inactivo"?"gray":"blue";return `<span class="badge-soft badge-${c}">${status}</span>`}

function renderDashboard(){
 const confirmed=sales.filter(s=>s.status==="Confirmada").reduce((a,s)=>a+s.total,0);
 const low=products.filter(p=>p.stock<=p.min).length;
 const recent=sales.slice(0,4).map(s=>`<tr><td><strong>#${s.folio}</strong></td><td>${s.date}</td><td>${s.user}</td><td>${money(s.total)}</td><td>${statusBadge(s.status)}</td></tr>`).join("");
 const lowRows=products.filter(p=>p.stock<=p.min).map(p=>`<tr><td>${p.name}</td><td>${p.brand}</td><td>${p.stock}</td><td>${p.min}</td></tr>`).join("")||`<tr><td colspan="4">No hay alertas de stock en los datos de muestra.</td></tr>`;
 content.innerHTML=heading("Panel principal","Resumen general de operación y actividad reciente.")+
 `<div class="row g-3 mb-3">
 <div class="col-12 col-sm-6 col-xl-3">${metric("Ventas confirmadas",money(confirmed),"bi-currency-dollar","Suma de registros ilustrativos")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Operaciones",sales.length,"bi-receipt","Ventas de muestra")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Productos en catálogo",products.length,"bi-box-seam","Registros ilustrativos")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Alertas de stock",low,"bi-exclamation-triangle","Productos en o debajo del mínimo")}</div></div>
 <div class="row g-3"><div class="col-12 col-xl-7">${panel("Ventas recientes",table(["Folio","Fecha","Usuario","Total","Estado"],recent),`<button class="btn btn-light btn-sm" data-go="sales">Ver ventas</button>`)}</div>
 <div class="col-12 col-xl-5">${panel("Productos que requieren revisión",table(["Producto","Marca","Existencia","Mínimo"],lowRows),`<button class="btn btn-light btn-sm" data-go="inventory">Inventario</button>`)}</div></div>`;
}
function productStockStatus(p){return p.stock===0?"Agotado":p.stock<=p.min?"Stock bajo":"Disponible";}
function renderCatalog(){
 const active=products.filter(p=>p.active!==false).length;
 const low=products.filter(p=>p.active!==false&&p.stock>0&&p.stock<=p.min).length;
 const out=products.filter(p=>p.active!==false&&p.stock===0).length;
 content.innerHTML=heading("Gestión de productos","Administra el catálogo interno, los precios y los niveles de existencias.",`<button class="btn btn-outline-primary btn-sm me-2" id="export-products"><i class="bi bi-download me-1"></i> Exportar CSV</button><button class="btn btn-primary btn-sm" id="add-product"><i class="bi bi-plus-lg me-1"></i> Nuevo producto</button>`)+
 `<div class="row g-3 mb-3"><div class="col-12 col-sm-4">${metric("Productos activos",active,"bi-box-seam","Registros disponibles para operación")}</div><div class="col-12 col-sm-4">${metric("Stock bajo",low,"bi-exclamation-triangle","En o debajo del mínimo")}</div><div class="col-12 col-sm-4">${metric("Agotados",out,"bi-box2","Productos sin existencias")}</div></div>
 <div class="card-panel"><div class="panel-head flex-wrap"><div><h2>Productos registrados</h2><span class="small text-muted">Consulta, registra y actualiza la información de cada autoparte.</span></div><span class="small text-muted" id="product-count"></span></div>
 <div class="p-3 border-bottom"><div class="row g-2"><div class="col-12 col-lg-5"><input class="form-control" id="product-search" placeholder="Buscar por código, OEM, descripción o marca"></div><div class="col-6 col-lg-3"><select class="form-select" id="product-category"><option value="">Todas las categorías</option>${productCategories.map(c=>`<option>${c}</option>`).join("")}</select></div><div class="col-6 col-lg-2"><select class="form-select" id="product-status"><option value="active">Activos</option><option value="all">Todos</option><option value="inactive">Inactivos</option></select></div><div class="col-12 col-lg-2"><select class="form-select" id="product-stock"><option value="">Todo el stock</option><option value="low">Stock bajo</option><option value="out">Agotados</option></select></div></div></div>
 <div class="panel-body p-0" id="products-table"></div></div>
 <div class="small text-muted mt-2"><i class="bi bi-info-circle me-1"></i>Modo demostración: los cambios se guardan en el almacenamiento local de este navegador. Todavía no se sincronizan con otros usuarios ni con el catálogo público.</div>
 <div class="modal fade" id="product-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><form id="product-form" novalidate><div class="modal-header"><div><h5 class="modal-title" id="product-modal-title">Nuevo producto</h5><div class="small text-muted">Completa los datos principales de la autoparte.</div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><input type="hidden" id="product-original-code"><div class="row g-3">
 <div class="col-md-4"><label class="form-label" for="p-code">Código interno *</label><input class="form-control" id="p-code" maxlength="30" required></div><div class="col-md-4"><label class="form-label" for="p-oem">Código OEM</label><input class="form-control" id="p-oem" maxlength="40"></div><div class="col-md-4"><label class="form-label" for="p-brand">Marca *</label><input class="form-control" id="p-brand" maxlength="60" required></div>
 <div class="col-md-6"><label class="form-label" for="p-name">Descripción / nombre *</label><input class="form-control" id="p-name" maxlength="100" required></div><div class="col-md-6"><label class="form-label" for="p-category">Categoría *</label><select class="form-select" id="p-category" required><option value="">Selecciona una categoría</option>${productCategories.map(c=>`<option>${c}</option>`).join("")}</select></div>
 <div class="col-md-4"><label class="form-label" for="p-cost">Precio de compra (MXN) *</label><input class="form-control" id="p-cost" type="number" min="0" step="0.01" required></div><div class="col-md-4"><label class="form-label" for="p-price">Precio de venta (MXN) *</label><input class="form-control" id="p-price" type="number" min="0" step="0.01" required></div><div class="col-md-4"><label class="form-label" for="p-stock">Existencia actual *</label><input class="form-control" id="p-stock" type="number" min="0" step="1" required></div>
 <div class="col-md-4"><label class="form-label" for="p-min">Stock mínimo *</label><input class="form-control" id="p-min" type="number" min="0" step="1" required></div><div class="col-md-8"><label class="form-label" for="p-description">Descripción adicional</label><input class="form-control" id="p-description" maxlength="180" placeholder="Características o compatibilidad"></div>
 <div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="p-active" checked><label class="form-check-label small" for="p-active">Producto activo</label></div></div>
 </div><div class="alert alert-danger py-2 small mt-3 d-none" id="product-form-error" role="alert"></div></div><div class="modal-footer"><button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-primary btn-sm"><i class="bi bi-check2 me-1"></i> Guardar producto</button></div></form></div></div></div>`;
 renderProductRows();
 ["product-search","product-category","product-status","product-stock"].forEach(id=>document.getElementById(id).addEventListener(id==="product-search"?"input":"change",renderProductRows));
 document.getElementById("add-product").addEventListener("click",()=>openProductModal());
 document.getElementById("product-form").addEventListener("submit",saveProductForm);
 document.getElementById("products-table").addEventListener("click",handleProductAction);
 document.getElementById("export-products").addEventListener("click",exportProductsCSV);
}
function renderProductRows(){
 const q=(document.getElementById("product-search")?.value||"").trim().toLowerCase();
 const category=document.getElementById("product-category")?.value||"";
 const status=document.getElementById("product-status")?.value||"active";
 const stock=document.getElementById("product-stock")?.value||"";
 const filtered=products.filter(p=>{
  const isActive=p.active!==false;
  const text=[p.code,p.oem,p.name,p.brand,p.category,p.description].join(" ").toLowerCase();
  return (!q||text.includes(q))&&(!category||p.category===category)&&(status==="all"||(status==="active"&&isActive)||(status==="inactive"&&!isActive))&&(!stock||(stock==="low"&&p.stock>0&&p.stock<=p.min)||(stock==="out"&&p.stock===0));
 });
 document.getElementById("product-count").textContent=`${filtered.length} de ${products.length} productos`;
 const rows=filtered.map(p=>`<tr><td><strong>${escapeHTML(p.code)}</strong><div class="small text-muted">OEM: ${escapeHTML(p.oem||"—")}</div></td><td><strong>${escapeHTML(p.name)}</strong><div class="small text-muted">${escapeHTML(p.description||"")}</div></td><td>${escapeHTML(p.brand)}</td><td>${escapeHTML(p.category)}</td><td class="text-end">${money(p.price)}</td><td class="text-center"><strong>${p.stock}</strong><div class="small text-muted">Mín. ${p.min}</div></td><td>${statusBadge(p.active===false?"Inactivo":productStockStatus(p))}</td><td class="text-end text-nowrap"><button class="btn btn-light btn-sm" data-product-action="edit" data-code="${escapeHTML(p.code)}" title="Editar"><i class="bi bi-pencil"></i></button> <button class="btn btn-light btn-sm" data-product-action="toggle" data-code="${escapeHTML(p.code)}" title="${p.active===false?"Activar":"Desactivar"}"><i class="bi ${p.active===false?"bi-toggle-off":"bi-toggle-on"}"></i></button></td></tr>`).join("");
 document.getElementById("products-table").innerHTML=filtered.length?table(["Código / OEM","Producto","Marca","Categoría","Precio venta","Existencia","Estado","Acciones"],rows):`<div class="empty-state"><i class="bi bi-search"></i><strong>No se encontraron productos</strong><span>Modifica los filtros o registra un nuevo producto.</span></div>`;
}
function openProductModal(code=null){
 const form=document.getElementById("product-form");form.reset();document.getElementById("product-form-error").classList.add("d-none");
 const p=code?products.find(x=>x.code===code):null;
 document.getElementById("product-modal-title").textContent=p?"Editar producto":"Nuevo producto";
 document.getElementById("product-original-code").value=p?.code||"";
 const values={code:p?.code||nextProductCode(),oem:p?.oem||"",brand:p?.brand||"",name:p?.name||"",category:p?.category||"",cost:p?.cost??0,price:p?.price??0,stock:p?.stock??0,min:p?.min??0,description:p?.description||""};
 Object.entries(values).forEach(([key,value])=>document.getElementById(`p-${key}`).value=value);
 document.getElementById("p-active").checked=p?p.active!==false:true;
 bootstrap.Modal.getOrCreateInstance(document.getElementById("product-modal")).show();
}
function nextProductCode(){let max=0;products.forEach(p=>{const n=Number((p.code.match(/(\d+)$/)||[])[1]);if(Number.isFinite(n))max=Math.max(max,n);});return `AG-${String(max+1).padStart(3,"0")}`;}
function saveProductForm(event){
 event.preventDefault();const original=document.getElementById("product-original-code").value;
 const value=id=>document.getElementById(`p-${id}`).value.trim();
 const data={code:value("code").toUpperCase(),oem:value("oem").toUpperCase(),brand:value("brand"),name:value("name"),category:value("category"),cost:Number(value("cost")),price:Number(value("price")),stock:Number(value("stock")),min:Number(value("min")),description:value("description"),active:document.getElementById("p-active").checked};
 const error=document.getElementById("product-form-error");let message="";
 if(!data.code||!data.brand||!data.name||!data.category)message="Completa todos los campos obligatorios.";
 else if([data.cost,data.price,data.stock,data.min].some(n=>!Number.isFinite(n)||n<0))message="Los precios y las existencias deben ser valores iguales o mayores que cero.";
 else if(!Number.isInteger(data.stock)||!Number.isInteger(data.min))message="La existencia y el stock mínimo deben ser números enteros.";
 else if(products.some(p=>p.code.toLowerCase()===data.code.toLowerCase()&&p.code!==original))message="Ya existe un producto con ese código interno.";
 if(message){error.textContent=message;error.classList.remove("d-none");return;}
 if(original){const index=products.findIndex(p=>p.code===original);products[index]=data;}else products.unshift(data);
 saveProducts();const modalEl=document.getElementById("product-modal");modalEl.addEventListener("hidden.bs.modal",()=>renderCatalog(),{once:true});bootstrap.Modal.getInstance(modalEl).hide();
}
function handleProductAction(event){const button=event.target.closest("[data-product-action]");if(!button)return;const code=button.dataset.code;const p=products.find(x=>x.code===code);if(!p)return;
 if(button.dataset.productAction==="edit")openProductModal(code);
 if(button.dataset.productAction==="toggle"){p.active=p.active===false;saveProducts();renderCatalog();}
}
function exportProductsCSV(){
 const headers=["Código","OEM","Producto","Marca","Categoría","Precio compra","Precio venta","Existencia","Stock mínimo","Estado"];
 const rows=products.map(p=>[p.code,p.oem,p.name,p.brand,p.category,p.cost,p.price,p.stock,p.min,p.active===false?"Inactivo":"Activo"]);
 const csv=[headers,...rows].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="autopartes_gallegos_productos.csv";a.click();URL.revokeObjectURL(url);
}

function inventoryStatus(p){return Number(p.stock)===0?"Agotado":Number(p.stock)<=Number(p.min)?"Stock bajo":"Disponible";}
function renderInventory(){
 const activeProducts=products.filter(p=>p.active!==false);
 const units=activeProducts.reduce((sum,p)=>sum+Number(p.stock||0),0);
 const low=activeProducts.filter(p=>Number(p.stock)>0&&Number(p.stock)<=Number(p.min)).length;
 const out=activeProducts.filter(p=>Number(p.stock)===0).length;
 const categories=[...new Set(products.map(p=>p.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"es"));
 content.innerHTML=heading("Inventario","Controla las existencias, registra entradas y salidas, y consulta el historial de cambios.",`<button class="btn btn-outline-primary btn-sm me-2" id="export-inventory"><i class="bi bi-download me-1"></i> Exportar CSV</button><button class="btn btn-primary btn-sm" id="add-inventory-movement"><i class="bi bi-plus-lg me-1"></i> Registrar movimiento</button>`)+
 `<div class="row g-3 mb-3">
 <div class="col-12 col-sm-6 col-xl-3">${metric("Productos activos",activeProducts.length,"bi-box-seam","Productos disponibles para operación")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Unidades en existencia",units,"bi-boxes","Suma de las cantidades actuales")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Stock bajo",low,"bi-exclamation-triangle","Productos por debajo del mínimo")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Agotados",out,"bi-box2","Productos sin existencias")}</div></div>
 <div class="card-panel mb-3"><div class="panel-head flex-wrap"><div><h2>Existencias por producto</h2><span class="small text-muted">El estado se calcula con base en el stock mínimo configurado en cada producto.</span></div><span class="small text-muted" id="inventory-count"></span></div>
 <div class="p-3 border-bottom"><div class="row g-2"><div class="col-12 col-lg-5"><input class="form-control" id="inventory-search" placeholder="Buscar por código, OEM, producto o marca"></div><div class="col-6 col-lg-3"><select class="form-select" id="inventory-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("")}</select></div><div class="col-6 col-lg-4"><select class="form-select" id="inventory-status"><option value="">Todos los estados</option><option value="Disponible">Disponible</option><option value="Stock bajo">Stock bajo</option><option value="Agotado">Agotado</option></select></div></div></div>
 <div class="panel-body p-0" id="inventory-table"></div></div>
 <div class="card-panel"><div class="panel-head flex-wrap"><div><h2>Historial de movimientos</h2><span class="small text-muted">Entradas, salidas y ajustes registrados desde este módulo.</span></div><span class="small text-muted" id="movement-count"></span></div><div class="p-3 border-bottom"><div class="row g-2"><div class="col-12 col-md-6"><input class="form-control" id="movement-search" placeholder="Buscar en el historial por folio, producto o motivo"></div><div class="col-12 col-md-3"><select class="form-select" id="movement-type-filter"><option value="">Todos los movimientos</option><option value="Entrada">Entradas</option><option value="Salida">Salidas</option><option value="Ajuste">Ajustes</option></select></div></div></div><div class="panel-body p-0" id="inventory-history"></div></div>
 <div class="small text-muted mt-2"><i class="bi bi-info-circle me-1"></i>Demostración local: las existencias y el historial se guardan en este navegador. Los movimientos no representan transacciones reales ni están sincronizados con otros usuarios.</div>
 <div class="modal fade" id="inventory-movement-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><form id="inventory-movement-form" novalidate><div class="modal-header"><div><h5 class="modal-title">Registrar movimiento de inventario</h5><div class="small text-muted">Selecciona el producto y el tipo de operación.</div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><div class="row g-3">
 <div class="col-md-6"><label class="form-label" for="im-type">Tipo de movimiento *</label><select class="form-select" id="im-type" required><option value="Entrada">Entrada — aumenta existencias</option><option value="Salida">Salida — disminuye existencias</option><option value="Ajuste">Ajuste — establece la existencia real</option></select></div>
 <div class="col-md-6"><label class="form-label" for="im-product">Producto *</label><select class="form-select" id="im-product" required><option value="">Selecciona un producto</option>${activeProducts.map(p=>`<option value="${escapeHTML(p.code)}">${escapeHTML(p.code)} · ${escapeHTML(p.name)} (Stock: ${Number(p.stock)})</option>`).join("")}</select></div>
 <div class="col-md-6"><label class="form-label" for="im-quantity">Cantidad *</label><input class="form-control" id="im-quantity" type="number" min="1" step="1" required placeholder="Ej. 5"><div class="form-text" id="im-quantity-help">Ingresa una cantidad entera mayor que cero.</div></div>
 <div class="col-md-6"><label class="form-label" for="im-date">Fecha *</label><input class="form-control" id="im-date" type="date" required value="${new Date().toISOString().slice(0,10)}"></div>
 <div class="col-12"><label class="form-label" for="im-reason">Motivo / referencia *</label><input class="form-control" id="im-reason" maxlength="180" required placeholder="Ej. Recepción de compra, devolución, merma, conteo físico..."></div>
 <div class="col-12"><div class="inventory-preview" id="im-preview">Selecciona un producto para consultar sus existencias actuales.</div></div>
 </div></div><div class="modal-footer"><button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-primary btn-sm">Guardar movimiento</button></div></form></div></div></div>`;
 renderInventoryRows();renderInventoryHistory();
 ["inventory-search","inventory-category","inventory-status"].forEach(id=>document.getElementById(id).addEventListener(id==="inventory-search"?"input":"change",renderInventoryRows));
 document.getElementById("movement-search").addEventListener("input",renderInventoryHistory);
 document.getElementById("movement-type-filter").addEventListener("change",renderInventoryHistory);
 document.getElementById("add-inventory-movement").onclick=openInventoryMovementModal;
 document.getElementById("export-inventory").onclick=exportInventoryCSV;
 document.getElementById("im-type").addEventListener("change",updateInventoryMovementPreview);
 document.getElementById("im-product").addEventListener("change",updateInventoryMovementPreview);
 document.getElementById("im-quantity").addEventListener("input",updateInventoryMovementPreview);
 document.getElementById("inventory-movement-form").addEventListener("submit",saveInventoryMovement);
}
function renderInventoryRows(){
 const search=(document.getElementById("inventory-search")?.value||"").trim().toLowerCase();
 const category=document.getElementById("inventory-category")?.value||"";
 const state=document.getElementById("inventory-status")?.value||"";
 const filtered=products.filter(p=>{
  const text=[p.code,p.oem,p.name,p.brand].join(" ").toLowerCase();
  return p.active!==false&&(!search||text.includes(search))&&(!category||p.category===category)&&(!state||inventoryStatus(p)===state);
 }).sort((a,b)=>a.name.localeCompare(b.name,"es"));
 const rows=filtered.map(p=>`<tr><td><strong>${escapeHTML(p.code)}</strong><div class="small text-muted">${escapeHTML(p.oem||"Sin OEM")}</div></td><td><strong>${escapeHTML(p.name)}</strong><div class="small text-muted">${escapeHTML(p.brand)} · ${escapeHTML(p.category)}</div></td><td><span class="inventory-quantity">${Number(p.stock)}</span> <span class="small text-muted">pzas.</span></td><td>${Number(p.min)} pzas.</td><td>${statusBadge(inventoryStatus(p))}</td><td><button class="btn btn-outline-primary btn-sm" data-inventory-product="${escapeHTML(p.code)}" title="Registrar movimiento"><i class="bi bi-arrow-left-right me-1"></i> Movimiento</button></td></tr>`).join("");
 document.getElementById("inventory-count").textContent=`${filtered.length} de ${products.filter(p=>p.active!==false).length} productos`;
 document.getElementById("inventory-table").innerHTML=filtered.length?table(["Código / OEM","Producto","Existencia","Stock mínimo","Estado","Acción"],rows):`<div class="empty-state"><i class="bi bi-search"></i><strong>No se encontraron productos</strong><span>Modifica los filtros o revisa que existan productos activos.</span></div>`;
 document.querySelectorAll("[data-inventory-product]").forEach(btn=>btn.addEventListener("click",()=>openInventoryMovementModal(btn.dataset.inventoryProduct)));
}
function renderInventoryHistory(){
 const search=(document.getElementById("movement-search")?.value||"").trim().toLowerCase();
 const type=document.getElementById("movement-type-filter")?.value||"";
 const filtered=inventoryMovements.filter(m=>[m.folio,m.code,m.product,m.reason].join(" ").toLowerCase().includes(search)&&(!type||m.type===type)).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));
 const rows=filtered.map(m=>{const color=m.type==="Entrada"?"green":m.type==="Salida"?"red":"blue";const quantity=m.type==="Entrada"?`+${m.quantity}`:m.type==="Salida"?`-${m.quantity}`:`${m.after}`;return `<tr><td><strong>${escapeHTML(m.folio)}</strong><div class="small text-muted">${escapeHTML(m.date)}</div></td><td>${escapeHTML(m.product)}<div class="small text-muted">${escapeHTML(m.code)}</div></td><td><span class="badge-soft badge-${color}">${escapeHTML(m.type)}</span></td><td><strong>${quantity}</strong></td><td>${Number(m.before)} → ${Number(m.after)}</td><td>${escapeHTML(m.reason)}</td></tr>`;}).join("");
 document.getElementById("movement-count").textContent=`${filtered.length} registros`;
 document.getElementById("inventory-history").innerHTML=filtered.length?table(["Folio / Fecha","Producto","Tipo","Cantidad","Antes → Después","Motivo"],rows):`<div class="empty-state"><i class="bi bi-clock-history"></i><strong>No hay movimientos registrados</strong><span>Cuando registres una entrada, salida o ajuste, aparecerá aquí.</span></div>`;
}
function openInventoryMovementModal(code=""){
 const form=document.getElementById("inventory-movement-form");form.reset();
 document.getElementById("im-date").value=new Date().toISOString().slice(0,10);
 document.getElementById("im-product").value=code;
 document.getElementById("im-type").value="Entrada";
 updateInventoryMovementPreview();
 bootstrap.Modal.getOrCreateInstance(document.getElementById("inventory-movement-modal")).show();
}
function updateInventoryMovementPreview(){
 const p=products.find(x=>x.code===document.getElementById("im-product")?.value);
 const type=document.getElementById("im-type")?.value||"Entrada";
 const qty=Number(document.getElementById("im-quantity")?.value||0);
 const el=document.getElementById("im-preview");if(!el)return;
 if(!p){el.textContent="Selecciona un producto para consultar sus existencias actuales.";return;}
 const before=Number(p.stock)||0;const after=type==="Entrada"?before+qty:type==="Salida"?before-qty:qty;
 document.getElementById("im-quantity-help").textContent=type==="Ajuste"?"Ingresa la existencia física final; no la diferencia.":"Ingresa la cantidad de piezas del movimiento.";
 el.innerHTML=`<div class="d-flex flex-wrap justify-content-between gap-2"><span>Existencia actual: <strong>${before} piezas</strong></span><span>Existencia resultante: <strong>${qty>0&&after>=0?after:"—"} piezas</strong></span></div>${type==="Salida"&&qty>before?'<div class="text-danger small mt-2">La cantidad solicitada supera las existencias disponibles.</div>':type==="Ajuste"?'<div class="small text-muted mt-2">El ajuste establecerá la existencia en la cantidad indicada.</div>':''}`;
}
function saveInventoryMovement(event){
 event.preventDefault();
 const type=document.getElementById("im-type").value,code=document.getElementById("im-product").value;
 const quantity=Number(document.getElementById("im-quantity").value),date=document.getElementById("im-date").value,reason=document.getElementById("im-reason").value.trim();
 const p=products.find(x=>x.code===code);
 if(!p||p.active===false){alert("Selecciona un producto activo.");return;}
 if(!Number.isInteger(quantity)||quantity<=0){alert("La cantidad debe ser un número entero mayor que cero.");return;}
 if(!date||!reason){alert("Completa la fecha y el motivo del movimiento.");return;}
 const before=Number(p.stock)||0;let after=type==="Entrada"?before+quantity:type==="Salida"?before-quantity:quantity;
 if(type==="Salida"&&quantity>before){alert(`No es posible registrar la salida. Solo hay ${before} piezas disponibles.`);return;}
 if(!Number.isSafeInteger(after)||after<0){alert("La existencia resultante no es válida.");return;}
 p.stock=after;
 const folio=`INV-${String(Date.now()).slice(-8)}`;
 inventoryMovements.push({folio,type,code:p.code,product:p.name,quantity,date,reason,before,after,createdAt:new Date().toISOString()});
 saveProducts();saveInventoryMovements();
 const modal=document.getElementById("inventory-movement-modal");modal.addEventListener("hidden.bs.modal",()=>renderInventory(),{once:true});bootstrap.Modal.getInstance(modal).hide();
}
function exportInventoryCSV(){
 const headers=["Código","OEM","Producto","Marca","Categoría","Existencia","Stock mínimo","Estado"];
 const rows=products.filter(p=>p.active!==false).map(p=>[p.code,p.oem,p.name,p.brand,p.category,p.stock,p.min,inventoryStatus(p)]);
 const csv=[headers,...rows].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="autopartes_gallegos_inventario.csv";a.click();URL.revokeObjectURL(url);
}
function renderProviders(){
 const active=providers.filter(p=>p.active!==false).length;
 const inactive=providers.length-active;
 const categories=[...new Set(providers.map(p=>p.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"es"));
 content.innerHTML=heading("Proveedores","Administra los datos de contacto y las condiciones comerciales de tus proveedores.",`<button class="btn btn-outline-primary btn-sm me-2" id="export-providers"><i class="bi bi-download me-1"></i> Exportar CSV</button><button class="btn btn-primary btn-sm" id="add-provider"><i class="bi bi-plus-lg me-1"></i> Nuevo proveedor</button>`)+
 `<div class="row g-3 mb-3"><div class="col-12 col-sm-4">${metric("Proveedores registrados",providers.length,"bi-truck","Todos los registros")}</div><div class="col-12 col-sm-4">${metric("Activos",active,"bi-check-circle","Disponibles para futuras compras")}</div><div class="col-12 col-sm-4">${metric("Inactivos",inactive,"bi-pause-circle","Conservados en el historial")}</div></div>
 <div class="card-panel"><div class="panel-head flex-wrap"><div><h2>Directorio de proveedores</h2><div class="small text-muted mt-1" id="provider-count">${providers.length} registros</div></div><span class="products-table-note">Los proveedores podrán asociarse a órdenes de compra.</span></div>
 <div class="panel-body border-bottom"><div class="row g-2"><div class="col-12 col-lg-5"><input class="form-control" id="provider-search" placeholder="Buscar por nombre, RFC, contacto, teléfono o correo"></div><div class="col-6 col-lg-3"><select class="form-select" id="provider-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("")}</select></div><div class="col-6 col-lg-2"><select class="form-select" id="provider-status"><option value="">Todos los estados</option><option value="Activo">Activos</option><option value="Inactivo">Inactivos</option></select></div><div class="col-12 col-lg-2"><button class="btn btn-light btn-sm w-100" id="clear-provider-filters"><i class="bi bi-eraser me-1"></i> Limpiar filtros</button></div></div></div>
 <div class="panel-body p-0" id="providers-table"></div></div>
 <div class="small text-muted mt-2"><i class="bi bi-info-circle me-1"></i>Demostración local: los datos se guardan en este navegador. Los registros no están conectados al backend ni representan proveedores reales.</div>
 <div class="modal fade" id="provider-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><form id="provider-form" novalidate><div class="modal-header"><div><h5 class="modal-title" id="provider-modal-title">Registrar proveedor</h5><div class="small text-muted">Completa los datos generales y comerciales.</div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><input type="hidden" id="provider-id"><div class="row g-3">
 <div class="col-md-8"><label class="form-label" for="provider-name">Nombre o razón social *</label><input class="form-control" id="provider-name" maxlength="120" required placeholder="Ej. Distribuidora de autopartes"></div>
 <div class="col-md-4"><label class="form-label" for="provider-rfc">RFC</label><input class="form-control text-uppercase" id="provider-rfc" maxlength="13" minlength="12" pattern="[A-Za-z&Ññ]{3,4}[0-9]{6}[A-Za-z0-9]{3}" placeholder="12 o 13 caracteres"><div class="form-text">Opcional; si se captura debe tener formato válido.</div></div>
 <div class="col-md-6"><label class="form-label" for="provider-contact">Persona de contacto</label><input class="form-control" id="provider-contact" maxlength="100" placeholder="Nombre del contacto"></div>
 <div class="col-md-3"><label class="form-label" for="provider-phone">Teléfono</label><input class="form-control" id="provider-phone" maxlength="25" type="tel" placeholder="Teléfono"></div>
 <div class="col-md-3"><label class="form-label" for="provider-email">Correo electrónico</label><input class="form-control" id="provider-email" maxlength="120" type="email" placeholder="correo@empresa.com"></div>
 <div class="col-md-5"><label class="form-label" for="provider-category-input">Tipo de proveedor</label><select class="form-select" id="provider-category-input"><option>Multimarca</option><option>Refacciones</option><option>Frenos</option><option>Baleros y rodamientos</option><option>Filtros</option><option>Lubricantes</option><option>Eléctrico</option><option>Otro</option></select></div>
 <div class="col-md-4"><label class="form-label" for="provider-city">Ciudad</label><input class="form-control" id="provider-city" maxlength="80" placeholder="Ciudad o municipio"></div>
 <div class="col-md-3"><label class="form-label" for="provider-payment">Condiciones de pago</label><select class="form-select" id="provider-payment"><option>Por acordar</option><option>Contado</option><option>Crédito 7 días</option><option>Crédito 15 días</option><option>Crédito 30 días</option><option>Crédito 60 días</option></select></div>
 <div class="col-12"><label class="form-label" for="provider-address">Dirección</label><input class="form-control" id="provider-address" maxlength="180" placeholder="Calle, número, colonia y código postal"></div>
 <div class="col-12"><label class="form-label" for="provider-notes">Notas</label><textarea class="form-control" id="provider-notes" rows="2" maxlength="500" placeholder="Productos que suministra, horarios, observaciones..."></textarea></div>
 <div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="provider-active" checked><label class="form-check-label small" for="provider-active">Proveedor activo (disponible para futuras compras)</label></div></div>
 </div></div><div class="modal-footer"><button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-primary btn-sm">Guardar proveedor</button></div></form></div></div></div>`;
 renderProviderRows();
 document.getElementById("add-provider").onclick=()=>openProviderModal();
 document.getElementById("export-providers").onclick=exportProvidersCSV;
 document.getElementById("provider-search").addEventListener("input",renderProviderRows);
 ["provider-category","provider-status"].forEach(id=>document.getElementById(id).addEventListener("change",renderProviderRows));
 document.getElementById("clear-provider-filters").onclick=()=>{document.getElementById("provider-search").value="";document.getElementById("provider-category").value="";document.getElementById("provider-status").value="";renderProviderRows();};
 document.getElementById("provider-form").addEventListener("submit",saveProvider);
 document.getElementById("provider-rfc").addEventListener("input",e=>e.target.value=e.target.value.toUpperCase());
}
function renderProviderRows(){
 const search=(document.getElementById("provider-search")?.value||"").trim().toLowerCase();
 const category=document.getElementById("provider-category")?.value||"";
 const state=document.getElementById("provider-status")?.value||"";
 const filtered=providers.filter(p=>{const hay=[p.id,p.name,p.rfc,p.contact,p.phone,p.email,p.city].join(" ").toLowerCase();const status=p.active===false?"Inactivo":"Activo";return (!search||hay.includes(search))&&(!category||p.category===category)&&(!state||status===state);}).sort((a,b)=>a.name.localeCompare(b.name,"es"));
 const rows=filtered.map(p=>`<tr><td><strong>${escapeHTML(p.name)}</strong><div class="small text-muted">${escapeHTML(p.id)} · ${escapeHTML(p.rfc||"Sin RFC")}</div></td><td>${escapeHTML(p.contact||"—")}<div class="small text-muted">${escapeHTML(p.phone||"Sin teléfono")}</div></td><td>${escapeHTML(p.email||"—")}<div class="small text-muted">${escapeHTML(p.city||"Sin ciudad")}</div></td><td>${escapeHTML(p.category||"—")}</td><td>${escapeHTML(p.payment||"Por acordar")}</td><td>${statusBadge(p.active===false?"Inactivo":"Activo")}</td><td><div class="d-flex gap-1"><button class="btn btn-outline-primary btn-sm" data-provider-edit="${escapeHTML(p.id)}" title="Editar"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-secondary btn-sm" data-provider-toggle="${escapeHTML(p.id)}" title="${p.active===false?"Activar":"Desactivar"}"><i class="bi ${p.active===false?"bi-check-circle":"bi-pause-circle"}"></i></button></div></td></tr>`).join("");
 document.getElementById("provider-count").textContent=`${filtered.length} de ${providers.length} proveedores`;
 document.getElementById("providers-table").innerHTML=filtered.length?`<div class="table-responsive"><table class="table align-middle provider-table"><thead><tr><th>Proveedor / RFC</th><th>Contacto</th><th>Correo / Ciudad</th><th>Tipo</th><th>Condiciones</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="empty-state"><i class="bi bi-truck"></i><strong>No se encontraron proveedores</strong><span>Modifica los filtros o registra un nuevo proveedor.</span></div>`;
 document.querySelectorAll("[data-provider-edit]").forEach(btn=>btn.addEventListener("click",()=>openProviderModal(btn.dataset.providerEdit)));
 document.querySelectorAll("[data-provider-toggle]").forEach(btn=>btn.addEventListener("click",()=>toggleProvider(btn.dataset.providerToggle)));
}
function openProviderModal(id=""){
 const form=document.getElementById("provider-form");form.reset();
 const p=providers.find(x=>x.id===id);
 document.getElementById("provider-modal-title").textContent=p?"Editar proveedor":"Registrar proveedor";
 document.getElementById("provider-id").value=p?.id||"";
 document.getElementById("provider-name").value=p?.name||"";
 document.getElementById("provider-rfc").value=p?.rfc||"";
 document.getElementById("provider-contact").value=p?.contact||"";
 document.getElementById("provider-phone").value=p?.phone||"";
 document.getElementById("provider-email").value=p?.email||"";
 document.getElementById("provider-category-input").value=p?.category||"Multimarca";
 document.getElementById("provider-city").value=p?.city||"";
 document.getElementById("provider-payment").value=p?.payment||"Por acordar";
 document.getElementById("provider-address").value=p?.address||"";
 document.getElementById("provider-notes").value=p?.notes||"";
 document.getElementById("provider-active").checked=p?.active!==false;
 bootstrap.Modal.getOrCreateInstance(document.getElementById("provider-modal")).show();
}
function saveProvider(event){
 event.preventDefault();const form=event.currentTarget;form.classList.add("was-validated");if(!form.checkValidity())return;
 const id=document.getElementById("provider-id").value;
 const data={id:id||nextProviderId(),name:document.getElementById("provider-name").value.trim(),rfc:document.getElementById("provider-rfc").value.trim().toUpperCase(),contact:document.getElementById("provider-contact").value.trim(),phone:document.getElementById("provider-phone").value.trim(),email:document.getElementById("provider-email").value.trim(),category:document.getElementById("provider-category-input").value,city:document.getElementById("provider-city").value.trim(),payment:document.getElementById("provider-payment").value,address:document.getElementById("provider-address").value.trim(),notes:document.getElementById("provider-notes").value.trim(),active:document.getElementById("provider-active").checked};
 if(!data.phone&&!data.email){alert("Registra al menos un medio de contacto: teléfono o correo electrónico.");return;}
 if(data.rfc&&providers.some(p=>p.id!==id&&String(p.rfc||"").toUpperCase()===data.rfc)){alert("Ya existe un proveedor registrado con ese RFC.");return;}
 if(id){const index=providers.findIndex(p=>p.id===id);if(index<0){alert("No se encontró el proveedor que intentas editar.");return;}providers[index]={...providers[index],...data};}else providers.push(data);
 saveProviders();const modal=document.getElementById("provider-modal");bootstrap.Modal.getInstance(modal).hide();
 modal.addEventListener("hidden.bs.modal",()=>{renderProviders();}, {once:true});
}
function toggleProvider(id){const p=providers.find(x=>x.id===id);if(!p)return;const next=p.active===false;if(!confirm(`${next?"¿Activar":"¿Desactivar"} al proveedor "${p.name}"? ${next?"Volverá a estar disponible para futuras compras.":"Se conservará el registro y no estará disponible para nuevas compras."}`))return;p.active=next;saveProviders();renderProviders();}
function exportProvidersCSV(){
 const headers=["ID","Nombre o razón social","RFC","Contacto","Teléfono","Correo","Tipo","Ciudad","Dirección","Condiciones de pago","Notas","Estado"];
 const rows=providers.map(p=>[p.id,p.name,p.rfc,p.contact,p.phone,p.email,p.category,p.city,p.address,p.payment,p.notes,p.active===false?"Inactivo":"Activo"]);
 const csv=[headers,...rows].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="autopartes_gallegos_proveedores.csv";a.click();URL.revokeObjectURL(url);
}

function localDateISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function nextPurchaseFolio(){const max=purchases.reduce((n,p)=>Math.max(n,Number(String(p.folio||"").replace(/\D/g,""))||0),0);return `COM-${String(max+1).padStart(5,"0")}`;}
function purchaseStatusBadge(status){const c=status==="Recibida"?"green":status==="Pendiente"?"yellow":"gray";return `<span class="badge-soft badge-${c}">${escapeHTML(status)}</span>`;}
function renderPurchases(){
 const pending=purchases.filter(p=>p.status==="Pendiente").length;
 const received=purchases.filter(p=>p.status==="Recibida").length;
 const totalReceived=purchases.filter(p=>p.status==="Recibida").reduce((sum,p)=>sum+Number(p.total||0),0);
 content.innerHTML=heading("Compras","Registra órdenes de compra, administra sus estados y recibe mercancía para actualizar las existencias.",`<button class="btn btn-outline-primary btn-sm me-2" id="export-purchases"><i class="bi bi-download me-1"></i> Exportar CSV</button><button class="btn btn-primary btn-sm" id="add-purchase"><i class="bi bi-plus-lg me-1"></i> Nueva compra</button>`)+
 `<div class="row g-3 mb-3"><div class="col-12 col-sm-4">${metric("Órdenes registradas",purchases.length,"bi-receipt","Todas las órdenes")}</div><div class="col-12 col-sm-4">${metric("Pendientes de recepción",pending,"bi-hourglass-split","Aún no afectan inventario")}</div><div class="col-12 col-sm-4">${metric("Compras recibidas",received,"bi-box-seam",`Importe recibido: ${money(totalReceived)}`)}</div></div>
 <div class="card-panel"><div class="panel-head flex-wrap"><div><h2>Órdenes de compra</h2><span class="small text-muted" id="purchase-count">${purchases.length} registros</span></div><span class="products-table-note">Solo las compras recibidas incrementan las existencias.</span></div>
 <div class="panel-body border-bottom"><div class="row g-2"><div class="col-12 col-lg-5"><input class="form-control" id="purchase-search" placeholder="Buscar por folio o proveedor"></div><div class="col-6 col-lg-3"><select class="form-select" id="purchase-status-filter"><option value="">Todos los estados</option><option>Pendiente</option><option>Recibida</option><option>Cancelada</option></select></div><div class="col-6 col-lg-2"><input class="form-control" id="purchase-date-filter" type="date" aria-label="Filtrar por fecha"></div><div class="col-12 col-lg-2"><button class="btn btn-light btn-sm w-100" id="clear-purchase-filters"><i class="bi bi-eraser me-1"></i> Limpiar</button></div></div></div>
 <div class="panel-body p-0" id="purchases-table"></div></div>
 <div class="small text-muted mt-2"><i class="bi bi-info-circle me-1"></i>Demostración local: las órdenes se guardan en este navegador. La recepción actualiza los productos y genera movimientos de entrada en Inventario; no existe conexión con backend ni SQL Server.</div>
 <div class="modal fade" id="purchase-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-xl modal-dialog-scrollable"><div class="modal-content"><form id="purchase-form" novalidate><div class="modal-header"><div><h5 class="modal-title">Nueva orden de compra</h5><div class="small text-muted">Selecciona un proveedor y agrega los productos solicitados.</div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><div class="row g-3 mb-3"><div class="col-md-6"><label class="form-label" for="purchase-provider">Proveedor *</label><select class="form-select" id="purchase-provider" required><option value="">Selecciona un proveedor activo</option>${providers.filter(x=>x.active!==false).map(x=>`<option value="${escapeHTML(x.id)}">${escapeHTML(x.name)}</option>`).join("")}</select><div class="form-text">Los proveedores inactivos no están disponibles para nuevas órdenes.</div></div><div class="col-md-3"><label class="form-label" for="purchase-date">Fecha de compra *</label><input class="form-control" id="purchase-date" type="date" required value="${localDateISO()}"></div><div class="col-md-3"><label class="form-label" for="purchase-reference">Referencia / factura</label><input class="form-control" id="purchase-reference" maxlength="80" placeholder="Folio del proveedor"></div><div class="col-12"><label class="form-label" for="purchase-notes">Observaciones</label><textarea class="form-control" id="purchase-notes" rows="2" maxlength="400" placeholder="Notas de la orden, condiciones de entrega, etc."></textarea></div></div>
 <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2"><div><h6 class="mb-0">Productos de la compra</h6><span class="small text-muted">El costo unitario se puede ajustar para esta orden.</span></div><button type="button" class="btn btn-outline-primary btn-sm" id="add-purchase-line"><i class="bi bi-plus-lg me-1"></i> Agregar producto</button></div>
 <div class="table-responsive"><table class="table align-middle"><thead><tr><th style="min-width:240px">Producto</th><th style="width:130px">Cantidad</th><th style="width:170px">Costo unitario</th><th style="width:150px" class="text-end">Importe</th><th style="width:55px"></th></tr></thead><tbody id="purchase-lines"></tbody></table></div>
 <div class="row justify-content-end"><div class="col-12 col-md-5 col-lg-4"><div class="d-flex justify-content-between py-2 border-bottom"><span class="text-muted">Subtotal</span><strong id="purchase-subtotal">${money(0)}</strong></div><div class="d-flex justify-content-between py-3"><span class="fw-semibold">Total</span><strong class="fs-5" id="purchase-total">${money(0)}</strong></div></div></div>
 <div class="alert alert-light border small mb-0"><i class="bi bi-info-circle me-1"></i>Al guardar, la orden quedará <strong>Pendiente</strong>. El inventario solo cambiará cuando confirmes la recepción.</div>
 </div><div class="modal-footer"><button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-primary btn-sm">Guardar orden pendiente</button></div></form></div></div></div>
 <div class="modal fade" id="purchase-detail-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><div class="modal-header"><div><h5 class="modal-title" id="purchase-detail-title">Detalle de compra</h5><div class="small text-muted" id="purchase-detail-subtitle"></div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body" id="purchase-detail-body"></div><div class="modal-footer" id="purchase-detail-actions"><button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cerrar</button></div></div></div></div>`;
 renderPurchaseRows();
 document.getElementById("add-purchase").onclick=openPurchaseModal;
 document.getElementById("export-purchases").onclick=exportPurchasesCSV;
 document.getElementById("purchase-search").addEventListener("input",renderPurchaseRows);
 ["purchase-status-filter","purchase-date-filter"].forEach(id=>document.getElementById(id).addEventListener("change",renderPurchaseRows));
 document.getElementById("clear-purchase-filters").onclick=()=>{document.getElementById("purchase-search").value="";document.getElementById("purchase-status-filter").value="";document.getElementById("purchase-date-filter").value="";renderPurchaseRows();};
 document.getElementById("purchase-form").addEventListener("submit",savePurchase);
 document.getElementById("add-purchase-line").onclick=()=>addPurchaseLine();
 addPurchaseLine();
}
function renderPurchaseRows(){
 const search=(document.getElementById("purchase-search")?.value||"").trim().toLowerCase();
 const state=document.getElementById("purchase-status-filter")?.value||"";
 const date=document.getElementById("purchase-date-filter")?.value||"";
 const filtered=purchases.filter(p=>(!search||`${p.folio} ${p.providerName}`.toLowerCase().includes(search))&&(!state||p.status===state)&&(!date||p.date===date)).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));
 const rows=filtered.map(p=>`<tr><td><strong>${escapeHTML(p.folio)}</strong><div class="small text-muted">${escapeHTML(p.date)}</div></td><td>${escapeHTML(p.providerName)}<div class="small text-muted">${escapeHTML(p.reference||"Sin referencia")}</div></td><td>${p.items.length} productos<div class="small text-muted">${p.items.reduce((n,i)=>n+Number(i.quantity),0)} unidades</div></td><td><strong>${money(p.total)}</strong></td><td>${purchaseStatusBadge(p.status)}</td><td><button class="btn btn-outline-primary btn-sm" data-purchase-view="${escapeHTML(p.folio)}" title="Ver detalle"><i class="bi bi-eye"></i></button>${p.status==="Pendiente"?` <button class="btn btn-outline-success btn-sm" data-purchase-receive="${escapeHTML(p.folio)}" title="Recibir compra"><i class="bi bi-box-arrow-in-down"></i></button>`:""}</td></tr>`).join("");
 document.getElementById("purchase-count").textContent=`${filtered.length} de ${purchases.length} órdenes`;
 document.getElementById("purchases-table").innerHTML=filtered.length?`<div class="table-responsive"><table class="table align-middle"><thead><tr><th>Folio / Fecha</th><th>Proveedor / Referencia</th><th>Artículos</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="empty-state"><i class="bi bi-bag-plus"></i><strong>No hay órdenes de compra</strong><span>Modifica los filtros o registra una nueva compra.</span></div>`;
 document.querySelectorAll("[data-purchase-view]").forEach(b=>b.onclick=()=>showPurchaseDetail(b.dataset.purchaseView));
 document.querySelectorAll("[data-purchase-receive]").forEach(b=>b.onclick=()=>receivePurchase(b.dataset.purchaseReceive));
}
function addPurchaseLine(item={}){
 const body=document.getElementById("purchase-lines");if(!body)return;
 const options=products.filter(p=>p.active!==false).map(p=>`<option value="${escapeHTML(p.code)}" ${item.code===p.code?"selected":""}>${escapeHTML(p.code)} · ${escapeHTML(p.name)}</option>`).join("");
 const tr=document.createElement("tr");tr.className="purchase-line";
 tr.innerHTML=`<td><select class="form-select form-select-sm purchase-line-product" required><option value="">Selecciona un producto</option>${options}</select></td><td><input class="form-control form-control-sm purchase-line-qty" type="number" min="1" step="1" required value="${item.quantity||1}"></td><td><div class="input-group input-group-sm"><span class="input-group-text">$</span><input class="form-control purchase-line-cost" type="number" min="0.01" step="0.01" required value="${item.unitCost??""}" placeholder="0.00"></div></td><td class="text-end fw-semibold purchase-line-total">${money(0)}</td><td><button type="button" class="btn btn-light btn-sm text-danger purchase-line-remove" title="Quitar producto"><i class="bi bi-trash"></i></button></td>`;
 body.appendChild(tr);
 const select=tr.querySelector(".purchase-line-product"),cost=tr.querySelector(".purchase-line-cost");
 select.addEventListener("change",()=>{const product=products.find(p=>p.code===select.value);if(product&&(!cost.value||Number(cost.value)===0))cost.value=Number(product.cost||0).toFixed(2);updatePurchaseTotals();});
 tr.querySelectorAll("input").forEach(input=>input.addEventListener("input",updatePurchaseTotals));
 tr.querySelector(".purchase-line-remove").onclick=()=>{tr.remove();updatePurchaseTotals();};
 if(item.code){const product=products.find(p=>p.code===item.code);if(product&&!item.unitCost)cost.value=Number(product.cost||0).toFixed(2);}
 updatePurchaseTotals();
}
function updatePurchaseTotals(){
 let total=0;document.querySelectorAll(".purchase-line").forEach(row=>{const qty=Number(row.querySelector(".purchase-line-qty").value)||0,cost=Number(row.querySelector(".purchase-line-cost").value)||0,line=qty*cost;total+=line;row.querySelector(".purchase-line-total").textContent=money(line);});
 const sub=document.getElementById("purchase-subtotal"),grand=document.getElementById("purchase-total");if(sub)sub.textContent=money(total);if(grand)grand.textContent=money(total);
}
function openPurchaseModal(){
 if(!providers.some(p=>p.active!==false)){alert("Primero registra o activa al menos un proveedor.");return;}
 if(!products.some(p=>p.active!==false)){alert("Primero registra o activa al menos un producto.");return;}
 const form=document.getElementById("purchase-form");form.reset();form.classList.remove("was-validated");document.getElementById("purchase-date").value=localDateISO();document.getElementById("purchase-lines").innerHTML="";addPurchaseLine();bootstrap.Modal.getOrCreateInstance(document.getElementById("purchase-modal")).show();
}
function savePurchase(event){
 event.preventDefault();const form=event.currentTarget;form.classList.add("was-validated");if(!form.checkValidity())return;
 const provider=providers.find(p=>p.id===document.getElementById("purchase-provider").value&&p.active!==false);if(!provider){alert("Selecciona un proveedor activo.");return;}
 const lines=[...document.querySelectorAll(".purchase-line")].map(row=>({code:row.querySelector(".purchase-line-product").value,quantity:Number(row.querySelector(".purchase-line-qty").value),unitCost:Number(row.querySelector(".purchase-line-cost").value)}));
 if(!lines.length){alert("Agrega al menos un producto a la compra.");return;}
 for(const line of lines){const product=products.find(p=>p.code===line.code&&p.active!==false);if(!product){alert("Hay un producto inválido o inactivo en la orden.");return;}if(!Number.isSafeInteger(line.quantity)||line.quantity<=0||!Number.isFinite(line.unitCost)||line.unitCost<=0){alert("Verifica que las cantidades sean enteros positivos y los costos sean mayores que cero.");return;}}
 const duplicate=lines.find((line,index)=>lines.findIndex(x=>x.code===line.code)!==index);if(duplicate){alert("No repitas un producto en varias líneas. Modifica la cantidad en su línea existente.");return;}
 const total=lines.reduce((sum,line)=>sum+line.quantity*line.unitCost,0);if(!Number.isFinite(total)||total<=0){alert("El total de la compra no es válido.");return;}
 purchases.push({folio:nextPurchaseFolio(),providerId:provider.id,providerName:provider.name,date:document.getElementById("purchase-date").value,reference:document.getElementById("purchase-reference").value.trim(),notes:document.getElementById("purchase-notes").value.trim(),items:lines.map(line=>({...line,productName:products.find(p=>p.code===line.code).name})),subtotal:total,total,status:"Pendiente",createdAt:new Date().toISOString(),receivedAt:null});
 savePurchases();const modal=document.getElementById("purchase-modal");bootstrap.Modal.getInstance(modal).hide();modal.addEventListener("hidden.bs.modal",()=>renderPurchases(),{once:true});
}
function showPurchaseDetail(folio){
 const p=purchases.find(x=>x.folio===folio);if(!p)return;
 document.getElementById("purchase-detail-title").textContent=`Compra ${p.folio}`;document.getElementById("purchase-detail-subtitle").textContent=`${p.providerName} · ${p.date} · ${p.status}`;
 const rows=p.items.map(i=>`<tr><td>${escapeHTML(i.productName)}<div class="small text-muted">${escapeHTML(i.code)}</div></td><td>${i.quantity}</td><td>${money(i.unitCost)}</td><td class="text-end">${money(i.quantity*i.unitCost)}</td></tr>`).join("");
 document.getElementById("purchase-detail-body").innerHTML=`<div class="row g-3 mb-3"><div class="col-sm-6"><div class="small text-muted">Proveedor</div><strong>${escapeHTML(p.providerName)}</strong></div><div class="col-sm-6"><div class="small text-muted">Referencia</div><strong>${escapeHTML(p.reference||"Sin referencia")}</strong></div><div class="col-sm-6"><div class="small text-muted">Fecha de orden</div><strong>${escapeHTML(p.date)}</strong></div><div class="col-sm-6"><div class="small text-muted">Estado</div>${purchaseStatusBadge(p.status)}</div></div><div class="table-responsive"><table class="table align-middle"><thead><tr><th>Producto</th><th>Cantidad</th><th>Costo unitario</th><th class="text-end">Importe</th></tr></thead><tbody>${rows}</tbody></table></div><div class="d-flex justify-content-end"><div class="fs-5 fw-semibold">Total: ${money(p.total)}</div></div>${p.notes?`<div class="mt-3 small"><strong>Observaciones:</strong> ${escapeHTML(p.notes)}</div>`:""}${p.receivedAt?`<div class="alert alert-success mt-3 mb-0 small">Recepción registrada: ${new Date(p.receivedAt).toLocaleString("es-MX")}. Las existencias fueron actualizadas.</div>`:""}${p.status==="Cancelada"?`<div class="alert alert-secondary mt-3 mb-0 small">Orden cancelada. No se modificó el inventario.</div>`:""}`;
 const actions=document.getElementById("purchase-detail-actions");actions.innerHTML=`<button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cerrar</button>${p.status==="Pendiente"?`<button type="button" class="btn btn-outline-danger btn-sm" id="cancel-purchase">Cancelar orden</button><button type="button" class="btn btn-success btn-sm" id="confirm-purchase-receipt">Confirmar recepción</button>`:""}`;
 document.getElementById("cancel-purchase")?.addEventListener("click",()=>cancelPurchase(folio));document.getElementById("confirm-purchase-receipt")?.addEventListener("click",()=>receivePurchase(folio));
 bootstrap.Modal.getOrCreateInstance(document.getElementById("purchase-detail-modal")).show();
}
function receivePurchase(folio){
 const p=purchases.find(x=>x.folio===folio);if(!p||p.status!=="Pendiente"){alert("Esta orden ya no está pendiente y no puede recibirse nuevamente.");return;}
 if(!confirm(`¿Confirmas la recepción completa de ${p.folio}? Se agregarán ${p.items.reduce((n,i)=>n+Number(i.quantity),0)} unidades al inventario.`))return;
 for(const item of p.items){const product=products.find(x=>x.code===item.code);if(!product){alert(`No se encontró el producto ${item.code}. No se aplicó la recepción.`);return;}}
 for(const item of p.items){const product=products.find(x=>x.code===item.code),before=Number(product.stock)||0,after=before+Number(item.quantity);product.stock=after;product.cost=Number(item.unitCost);inventoryMovements.push({folio:`INV-C${p.folio.replace(/\D/g,"")}-${item.code}`,type:"Entrada",code:product.code,product:product.name,quantity:Number(item.quantity),date:localDateISO(),reason:`Recepción de compra ${p.folio}`,before,after,createdAt:new Date().toISOString()});}
 p.status="Recibida";p.receivedAt=new Date().toISOString();saveProducts();saveInventoryMovements();savePurchases();
 const detailModal=document.getElementById("purchase-detail-modal"),detailInstance=bootstrap.Modal.getInstance(detailModal);if(detailInstance&&detailModal.classList.contains("show")){detailModal.addEventListener("hidden.bs.modal",()=>renderPurchases(),{once:true});detailInstance.hide();}else renderPurchases();alert(`Compra ${p.folio} recibida. El inventario fue actualizado correctamente.`);
}
function cancelPurchase(folio){const p=purchases.find(x=>x.folio===folio);if(!p||p.status!=="Pendiente")return;if(!confirm(`¿Cancelar la orden ${p.folio}? Esta acción no modificará las existencias.`))return;p.status="Cancelada";savePurchases();const detailModal=document.getElementById("purchase-detail-modal"),detailInstance=bootstrap.Modal.getInstance(detailModal);if(detailInstance&&detailModal.classList.contains("show")){detailModal.addEventListener("hidden.bs.modal",()=>renderPurchases(),{once:true});detailInstance.hide();}else renderPurchases();}
function exportPurchasesCSV(){
 const headers=["Folio","Fecha","Proveedor","Referencia","Estado","Código producto","Producto","Cantidad","Costo unitario","Importe","Total orden"];
 const rows=[];purchases.forEach(p=>p.items.forEach(i=>rows.push([p.folio,p.date,p.providerName,p.reference,p.status,i.code,i.productName,i.quantity,i.unitCost,i.quantity*i.unitCost,p.total])));
 const csv=[headers,...rows].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="autopartes_gallegos_compras.csv";a.click();URL.revokeObjectURL(url);
}

function nextSaleFolio(){const max=sales.reduce((n,s)=>Math.max(n,Number(String(s.folio||"").replace(/\D/g,""))||0),0);return `VTA-${String(max+1).padStart(5,"0")}`;}
function renderSales(){
 const confirmed=sales.filter(s=>s.status==="Confirmada");
 const rows=sales.slice().sort((a,b)=>String(b.createdAt||b.date).localeCompare(String(a.createdAt||a.date))).map(s=>`<tr><td><strong>#${escapeHTML(s.folio)}</strong></td><td>${escapeHTML(s.date||"")}</td><td>${escapeHTML(s.customer||"Público en general")}</td><td>${escapeHTML(s.payment||"—")}</td><td>${money(s.total)}</td><td>${statusBadge(s.status)}</td><td><button class="btn btn-light btn-sm" data-sale-detail="${escapeHTML(s.folio)}" title="Ver detalle"><i class="bi bi-eye"></i></button></td></tr>`).join("")||`<tr><td colspan="7" class="text-center text-muted py-4">Todavía no hay ventas registradas.</td></tr>`;
 content.innerHTML=heading("Ventas","Consulta las operaciones generadas desde el punto de venta.",`<button class="btn btn-primary btn-sm" data-go="pos"><i class="bi bi-cart-plus me-1"></i> Nueva venta</button>`)+
 `<div class="row g-3 mb-3"><div class="col-sm-4">${metric("Ventas registradas",sales.length,"bi-receipt","Incluye todos los estados")}</div><div class="col-sm-4">${metric("Ventas confirmadas",confirmed.length,"bi-check-circle","Operaciones completadas")}</div><div class="col-sm-4">${metric("Importe confirmado",money(confirmed.reduce((n,s)=>n+Number(s.total||0),0)),"bi-currency-dollar","Suma de ventas confirmadas")}</div></div>
 <div class="card-panel"><div class="panel-head flex-wrap"><h2>Historial de ventas</h2><div class="d-flex gap-2"><input class="form-control form-control-sm" id="sales-search" placeholder="Buscar folio o cliente" style="max-width:230px"><button class="btn btn-outline-primary btn-sm" id="export-sales"><i class="bi bi-download me-1"></i> CSV</button></div></div><div class="panel-body p-0"><div class="table-responsive"><table class="table align-middle mb-0" id="sales-table"><thead><tr><th>Folio</th><th>Fecha</th><th>Cliente</th><th>Pago</th><th>Total</th><th>Estado</th><th>Detalle</th></tr></thead><tbody>${rows}</tbody></table></div></div></div>`;
 document.getElementById("sales-search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();document.querySelectorAll("#sales-table tbody tr").forEach(row=>row.hidden=!row.textContent.toLowerCase().includes(q));});
 document.getElementById("export-sales").onclick=exportSalesCSV;
 content.querySelectorAll("[data-sale-detail]").forEach(btn=>btn.addEventListener("click",()=>showSaleDetail(btn.dataset.saleDetail)));
}
function renderPOS(){
 cart=cart.filter(i=>products.some(p=>p.code===i.code&&p.active!==false));
 const categories=[...new Set(products.filter(p=>p.active!==false).map(p=>p.category).filter(Boolean))].sort();
 content.innerHTML=heading("Punto de venta","Registra ventas, calcula importes y descuenta automáticamente las existencias.",`<span class="badge-soft badge-blue">Caja de demostración</span>`)+
 `<div class="row g-3 mb-3"><div class="col-sm-4">${metric("Productos disponibles",products.filter(p=>p.active!==false&&p.stock>0).length,"bi-box-seam","Con existencias para venta")}</div><div class="col-sm-4">${metric("Artículos en carrito",cart.reduce((n,i)=>n+i.qty,0),"bi-cart3","Unidades agregadas")}</div><div class="col-sm-4">${metric("Total de la venta",money(cartTotal()),"bi-currency-dollar","Importe antes de confirmar")}</div></div>
 <div class="row g-3"><div class="col-xl-7"><div class="card-panel h-100"><div class="panel-head"><h2>Seleccionar autopartas</h2><span class="small text-muted">${products.filter(p=>p.active!==false).length} productos activos</span></div><div class="panel-body"><div class="row g-2 mb-3"><div class="col-md-8"><input class="form-control" id="pos-search" placeholder="Buscar por código, OEM, nombre o marca"></div><div class="col-md-4"><select class="form-select" id="pos-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("")}</select></div></div><div id="pos-product-list" class="row g-2"></div></div></div></div>
 <div class="col-xl-5"><div class="card-panel"><div class="panel-head"><h2>Carrito de venta</h2><button class="btn btn-light btn-sm" id="clear-cart" ${cart.length?"":"disabled"}>Vaciar</button></div><div class="panel-body"><div id="cart-lines"></div><div class="d-flex justify-content-between border-top pt-3 mt-3"><span class="fw-semibold">Total</span><strong class="fs-5" id="cart-total">${money(cartTotal())}</strong></div><div class="mt-3"><label class="form-label" for="pos-customer">Cliente (opcional)</label><input class="form-control" id="pos-customer" maxlength="100" placeholder="Público en general"></div><div class="mt-3"><label class="form-label" for="pos-payment">Método de pago</label><select class="form-select" id="pos-payment"><option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option></select></div><div id="pos-cash-wrap" class="mt-3"><label class="form-label" for="pos-cash">Efectivo recibido</label><input class="form-control" id="pos-cash" type="number" min="0" step="0.01" placeholder="Importe recibido"><div class="small text-muted mt-1" id="pos-change">Ingresa el efectivo recibido para calcular el cambio.</div></div><button class="btn btn-primary w-100 mt-3" id="checkout" ${cart.length?"":"disabled"}><i class="bi bi-check2-circle me-1"></i> Confirmar venta</button><div class="small text-muted mt-2">La confirmación actualizará existencias y generará movimientos de salida.</div></div></div></div></div>`;
 renderPOSProducts();updateCart();
 document.getElementById("pos-search").addEventListener("input",renderPOSProducts);document.getElementById("pos-category").addEventListener("change",renderPOSProducts);
 document.getElementById("clear-cart").onclick=()=>{if(!cart.length)return;if(confirm("¿Vaciar todos los artículos del carrito?")){cart=[];updateCart();}};
 document.getElementById("pos-payment").addEventListener("change",updatePaymentFields);document.getElementById("pos-cash").addEventListener("input",updateCashChange);
 document.getElementById("checkout").onclick=confirmSale;updatePaymentFields();
}
function cartTotal(){return cart.reduce((sum,i)=>{const p=products.find(x=>x.code===i.code);return sum+(p?Number(p.price)*i.qty:0);},0);}
function renderPOSProducts(){const list=document.getElementById("pos-product-list");if(!list)return;const q=document.getElementById("pos-search").value.trim().toLowerCase(),cat=document.getElementById("pos-category").value;const matches=products.filter(p=>p.active!==false&&Number(p.stock)>0&&(!cat||p.category===cat)&&[p.code,p.oem,p.name,p.brand,p.category].some(v=>String(v||"").toLowerCase().includes(q)));list.innerHTML=matches.length?matches.map(p=>`<div class="col-md-6"><div class="pos-product-card"><div class="d-flex justify-content-between gap-2"><div><strong>${escapeHTML(p.name)}</strong><div class="small text-muted">${escapeHTML(p.code)} · ${escapeHTML(p.brand||"Sin marca")}</div></div><span class="badge-soft badge-green">${p.stock} pzas.</span></div><div class="d-flex justify-content-between align-items-center mt-3"><strong>${money(p.price)}</strong><button class="btn btn-outline-primary btn-sm" data-pos-add="${escapeHTML(p.code)}"><i class="bi bi-plus-lg me-1"></i> Agregar</button></div></div></div>`).join(""):`<div class="col-12"><div class="empty-state"><i class="bi bi-search"></i><strong>No hay productos disponibles</strong><span>Prueba otra búsqueda o revisa las existencias.</span></div></div>`;list.querySelectorAll("[data-pos-add]").forEach(btn=>btn.onclick=()=>addToCart(btn.dataset.posAdd,1));}
function addToCart(code,qty){const p=products.find(x=>x.code===code&&x.active!==false);if(!p){alert("El producto no está disponible para venta.");return;}const item=cart.find(x=>x.code===code),next=(item?.qty||0)+qty;if(!Number.isInteger(qty)||qty<=0){alert("La cantidad debe ser un entero mayor que cero.");return;}if(next>Number(p.stock)){alert(`No hay existencias suficientes de ${p.name}. Disponibles: ${p.stock}.`);return;}if(item)item.qty=next;else cart.push({code,qty});updateCart();}
function changeCartQuantity(code,value){const item=cart.find(x=>x.code===code),p=products.find(x=>x.code===code);if(!item||!p)return;const qty=Number(value);if(!Number.isInteger(qty)||qty<1){alert("La cantidad debe ser un entero mayor que cero.");updateCart();return;}if(qty>Number(p.stock)){alert(`Solo hay ${p.stock} piezas disponibles de ${p.name}.`);updateCart();return;}item.qty=qty;updateCart();}
function removeCartItem(code){cart=cart.filter(i=>i.code!==code);updateCart();}
function updateCart(){const el=document.getElementById("cart-lines");if(!el)return;el.innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.code===i.code);if(!p)return "";return `<div class="pos-cart-line"><div class="d-flex justify-content-between gap-2"><div><strong>${escapeHTML(p.name)}</strong><div class="small text-muted">${escapeHTML(p.code)} · ${money(p.price)} c/u</div></div><button class="btn btn-link text-danger p-0" data-cart-remove="${escapeHTML(i.code)}" aria-label="Quitar producto"><i class="bi bi-trash"></i></button></div><div class="d-flex justify-content-between align-items-center mt-2"><div class="input-group input-group-sm" style="max-width:118px"><button class="btn btn-outline-secondary" data-cart-minus="${escapeHTML(i.code)}" type="button">−</button><input class="form-control text-center" data-cart-qty="${escapeHTML(i.code)}" type="number" min="1" max="${p.stock}" value="${i.qty}"><button class="btn btn-outline-secondary" data-cart-plus="${escapeHTML(i.code)}" type="button">+</button></div><strong>${money(p.price*i.qty)}</strong></div></div>`;}).join(""):`<div class="empty-state py-4"><i class="bi bi-cart3"></i><strong>El carrito está vacío</strong><span>Agrega productos para comenzar una venta.</span></div>`;document.getElementById("cart-total").textContent=money(cartTotal());document.getElementById("checkout").disabled=!cart.length;document.getElementById("clear-cart").disabled=!cart.length;document.querySelectorAll("[data-cart-remove]").forEach(b=>b.onclick=()=>removeCartItem(b.dataset.cartRemove));document.querySelectorAll("[data-cart-minus]").forEach(b=>b.onclick=()=>{const i=cart.find(x=>x.code===b.dataset.cartMinus);if(i)changeCartQuantity(i.code,i.qty-1);});document.querySelectorAll("[data-cart-plus]").forEach(b=>b.onclick=()=>{const i=cart.find(x=>x.code===b.dataset.cartPlus);if(i)changeCartQuantity(i.code,i.qty+1);});document.querySelectorAll("[data-cart-qty]").forEach(input=>input.onchange=()=>changeCartQuantity(input.dataset.cartQty,input.value));if(document.getElementById("pos-cash"))updateCashChange();}
function updatePaymentFields(){const cash=document.getElementById("pos-payment")?.value==="Efectivo",wrap=document.getElementById("pos-cash-wrap");if(wrap)wrap.hidden=!cash;updateCashChange();}
function updateCashChange(){const input=document.getElementById("pos-cash"),label=document.getElementById("pos-change");if(!input||!label)return;const received=Number(input.value),total=cartTotal();if(input.value===""){label.textContent="Ingresa el efectivo recibido para calcular el cambio.";label.className="small text-muted mt-1";}else if(received<total){label.textContent=`Faltan ${money(total-received)}.`;label.className="small text-danger mt-1";}else{label.textContent=`Cambio: ${money(received-total)}.`;label.className="small text-success mt-1";}}
function confirmSale(){if(!cart.length){alert("Agrega al menos un producto al carrito.");return;}const lines=[];for(const item of cart){const p=products.find(x=>x.code===item.code&&x.active!==false);if(!p){alert(`El producto ${item.code} ya no está disponible.`);return;}if(!Number.isInteger(item.qty)||item.qty<1||item.qty>Number(p.stock)){alert(`Existencias insuficientes para ${p.name}. Disponibles: ${p.stock}. No se registró la venta.`);return;}lines.push({code:p.code,productName:p.name,brand:p.brand,quantity:item.qty,unitPrice:Number(p.price),subtotal:Number(p.price)*item.qty});}const total=lines.reduce((n,i)=>n+i.subtotal,0);if(!Number.isFinite(total)||total<=0){alert("El total de la venta no es válido.");return;}const payment=document.getElementById("pos-payment").value,received=payment==="Efectivo"?Number(document.getElementById("pos-cash").value):total;if(payment==="Efectivo"&&(!Number.isFinite(received)||received<total)){alert("El efectivo recibido debe ser igual o mayor al total.");return;}if(!confirm(`¿Confirmas la venta por ${money(total)}? Esta operación descontará las existencias y registrará los movimientos.`))return;for(const line of lines){const p=products.find(x=>x.code===line.code);const before=Number(p.stock),after=before-line.quantity;p.stock=after;inventoryMovements.push({folio:`INV-${nextSaleFolio().replace("VTA-", "V")}-${line.code}`,type:"Salida",code:p.code,product:p.name,quantity:line.quantity,date:localDateISO(),reason:`Venta ${nextSaleFolio()}`,before,after,createdAt:new Date().toISOString()});}const sale={folio:nextSaleFolio(),date:localDateISO(),createdAt:new Date().toISOString(),user:"Usuario demo",customer:document.getElementById("pos-customer").value.trim()||"Público en general",payment,total,received:payment==="Efectivo"?received:null,change:payment==="Efectivo"?received-total:0,status:"Confirmada",items:lines};sales.push(sale);saveProducts();saveInventoryMovements();saveSales();cart=[];renderPOS();showSaleDetail(sale.folio);}
function showSaleDetail(folio){const sale=sales.find(s=>s.folio===folio);if(!sale)return;let modal=document.getElementById("sale-detail-modal");if(!modal){modal=document.createElement("div");modal.className="modal fade";modal.id="sale-detail-modal";modal.tabIndex=-1;modal.innerHTML=`<div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header"><div><h5 class="modal-title" id="sale-detail-title">Comprobante de venta</h5><div class="small text-muted" id="sale-detail-subtitle"></div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body" id="sale-detail-body"></div><div class="modal-footer"><button class="btn btn-light btn-sm" data-bs-dismiss="modal">Cerrar</button><button class="btn btn-primary btn-sm" id="print-sale"><i class="bi bi-printer me-1"></i> Imprimir comprobante</button></div></div></div>`;document.body.appendChild(modal);}document.getElementById("sale-detail-title").textContent=`Comprobante ${sale.folio}`;document.getElementById("sale-detail-subtitle").textContent=`${sale.date} · ${sale.status}`;const rows=(sale.items||[]).map(i=>`<tr><td>${escapeHTML(i.productName)}<div class="small text-muted">${escapeHTML(i.code)}</div></td><td>${i.quantity}</td><td>${money(i.unitPrice)}</td><td class="text-end">${money(i.subtotal)}</td></tr>`).join("")||`<tr><td colspan="4" class="text-muted">Venta histórica de demostración sin detalle de artículos.</td></tr>`;document.getElementById("sale-detail-body").innerHTML=`<div class="text-center mb-4"><div class="fw-bold">AUTOPARTES GALLEGOS</div><div class="small text-muted">Comprobante de venta · No es factura fiscal</div></div><div class="row g-2 mb-3 small"><div class="col-6"><span class="text-muted">Folio</span><div class="fw-semibold">${escapeHTML(sale.folio)}</div></div><div class="col-6"><span class="text-muted">Fecha</span><div class="fw-semibold">${escapeHTML(sale.date)}</div></div><div class="col-6"><span class="text-muted">Cliente</span><div class="fw-semibold">${escapeHTML(sale.customer||"Público en general")}</div></div><div class="col-6"><span class="text-muted">Método de pago</span><div class="fw-semibold">${escapeHTML(sale.payment||"—")}</div></div></div><div class="table-responsive"><table class="table"><thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th class="text-end">Importe</th></tr></thead><tbody>${rows}</tbody></table></div><div class="text-end fs-5 fw-bold">Total: ${money(sale.total)}</div>${sale.payment==="Efectivo"&&sale.received!=null?`<div class="text-end small text-muted">Recibido: ${money(sale.received)} · Cambio: ${money(sale.change||0)}</div>`:""}<div class="mt-3">${statusBadge(sale.status)}</div>`;document.getElementById("print-sale").onclick=()=>printSaleReceipt(sale.folio);bootstrap.Modal.getOrCreateInstance(modal).show();}
function printSaleReceipt(folio){const sale=sales.find(s=>s.folio===folio);if(!sale)return;const rows=(sale.items||[]).map(i=>`<tr><td>${escapeHTML(i.productName)} (${escapeHTML(i.code)})</td><td>${i.quantity}</td><td>${money(i.unitPrice)}</td><td>${money(i.subtotal)}</td></tr>`).join("");const w=window.open("","_blank","width=800,height=700");if(!w){alert("Permite las ventanas emergentes para imprimir el comprobante.");return;}w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${escapeHTML(sale.folio)}</title><style>body{font:14px Arial;margin:32px;color:#222}h2,p{text-align:center}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{padding:9px;border-bottom:1px solid #ddd;text-align:left}.total{text-align:right;font-size:20px;font-weight:bold;margin-top:20px}.note{text-align:center;color:#666;font-size:11px;margin-top:30px}</style></head><body><h2>AUTOPARTES GALLEGOS</h2><p>Comprobante de venta · ${escapeHTML(sale.folio)}<br>${escapeHTML(sale.date)}<br>Cliente: ${escapeHTML(sale.customer||"Público en general")}<br>Pago: ${escapeHTML(sale.payment||"—")}</p><table><thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Importe</th></tr></thead><tbody>${rows}</tbody></table><div class="total">Total: ${money(sale.total)}</div><div class="note">Documento demostrativo. No es factura fiscal.</div><script>window.onload=()=>window.print();<\/script></body></html>`);w.document.close();}
function exportSalesCSV(){const headers=["Folio","Fecha","Cliente","Método de pago","Estado","Código","Producto","Cantidad","Precio unitario","Importe","Total venta"];const rows=[];sales.forEach(s=>(s.items||[]).forEach(i=>rows.push([s.folio,s.date,s.customer,s.payment,s.status,i.code,i.productName,i.quantity,i.unitPrice,i.subtotal,s.total])));const csv=[headers,...rows].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="autopartes_gallegos_ventas.csv";a.click();URL.revokeObjectURL(url);}
function movementDateValue(m){
 const value=m.date||m.createdAt||"";
 return String(value).slice(0,10);
}
function getFilteredMovements(){
 const search=(document.getElementById("all-movements-search")?.value||"").trim().toLowerCase();
 const type=document.getElementById("all-movements-type")?.value||"";
 const from=document.getElementById("all-movements-from")?.value||"";
 const to=document.getElementById("all-movements-to")?.value||"";
 return inventoryMovements.filter(m=>{
  const text=[m.folio,m.code,m.product,m.reason,m.type].join(" ").toLowerCase();
  const date=movementDateValue(m);
  return (!search||text.includes(search))&&(!type||m.type===type)&&(!from||date>=from)&&(!to||date<=to);
 }).sort((a,b)=>String(b.createdAt||b.date||"").localeCompare(String(a.createdAt||a.date||"")));
}
function renderMovements(){
 const entries=inventoryMovements.filter(m=>m.type==="Entrada").length;
 const exits=inventoryMovements.filter(m=>m.type==="Salida").length;
 const adjustments=inventoryMovements.filter(m=>m.type==="Ajuste").length;
 const net=inventoryMovements.reduce((sum,m)=>sum+(Number(m.after)||0)-(Number(m.before)||0),0);
 content.innerHTML=heading("Movimientos","Consulta la trazabilidad de las entradas, salidas y ajustes que afectan las existencias.",`<button class="btn btn-outline-primary btn-sm" id="export-all-movements"><i class="bi bi-download me-1"></i> Exportar CSV</button>`)+
 `<div class="row g-3 mb-3">
 <div class="col-12 col-sm-6 col-xl-3">${metric("Entradas",entries,"bi-box-arrow-in-down","Movimientos registrados")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Salidas",exits,"bi-box-arrow-up","Movimientos registrados")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Ajustes",adjustments,"bi-arrow-repeat","Correcciones de existencia")}</div>
 <div class="col-12 col-sm-6 col-xl-3">${metric("Variación neta",`${net>0?"+":""}${net} pzas.`,"bi-graph-up-arrow","Cambio acumulado de existencias")}</div></div>
 <div class="card-panel">
 <div class="panel-head flex-wrap"><div><h2>Historial de movimientos</h2><span class="small text-muted">Incluye operaciones registradas desde Inventario, Compras y Punto de venta.</span></div><span class="small text-muted" id="all-movements-count"></span></div>
 <div class="p-3 border-bottom"><div class="row g-2 align-items-end">
 <div class="col-12 col-lg-4"><label class="form-label small" for="all-movements-search">Buscar</label><input class="form-control" id="all-movements-search" placeholder="Folio, código, producto o motivo"></div>
 <div class="col-12 col-sm-4 col-lg-2"><label class="form-label small" for="all-movements-type">Tipo</label><select class="form-select" id="all-movements-type"><option value="">Todos</option><option value="Entrada">Entrada</option><option value="Salida">Salida</option><option value="Ajuste">Ajuste</option></select></div>
 <div class="col-6 col-sm-4 col-lg-2"><label class="form-label small" for="all-movements-from">Desde</label><input class="form-control" type="date" id="all-movements-from"></div>
 <div class="col-6 col-sm-4 col-lg-2"><label class="form-label small" for="all-movements-to">Hasta</label><input class="form-control" type="date" id="all-movements-to"></div>
 <div class="col-12 col-lg-2"><button class="btn btn-light w-100" id="clear-movement-filters"><i class="bi bi-x-circle me-1"></i> Limpiar filtros</button></div>
 </div></div>
 <div class="panel-body p-0" id="all-movements-table"></div>
 </div>
 <div class="small text-muted mt-3"><i class="bi bi-shield-check me-1"></i>Los movimientos son registros históricos de consulta. No se pueden editar ni eliminar desde este módulo. Los datos se almacenan localmente en este navegador.</div>`;
 ["all-movements-search","all-movements-type","all-movements-from","all-movements-to"].forEach(id=>document.getElementById(id).addEventListener(id==="all-movements-search"?"input":"change",renderMovementsRows));
 document.getElementById("clear-movement-filters").addEventListener("click",()=>{["all-movements-search","all-movements-type","all-movements-from","all-movements-to"].forEach(id=>document.getElementById(id).value="");renderMovementsRows();});
 document.getElementById("export-all-movements").addEventListener("click",exportMovementsCSV);
 renderMovementsRows();
}
function renderMovementsRows(){
 const filtered=getFilteredMovements();
 const rows=filtered.map(m=>{
  const color=m.type==="Entrada"?"green":m.type==="Salida"?"red":"blue";
  const qty=m.type==="Entrada"?`+${Number(m.quantity)||0}`:m.type==="Salida"?`-${Number(m.quantity)||0}`:`Ajuste a ${Number(m.after)||0}`;
  return `<tr><td><strong>${escapeHTML(m.folio||"—")}</strong><div class="small text-muted">${escapeHTML(m.date||movementDateValue(m)||"—")}</div></td><td><strong>${escapeHTML(m.product||"Producto no disponible")}</strong><div class="small text-muted">${escapeHTML(m.code||"Sin código")}</div></td><td><span class="badge-soft badge-${color}">${escapeHTML(m.type||"Sin tipo")}</span></td><td><strong>${qty}</strong></td><td>${Number(m.before)||0} <i class="bi bi-arrow-right text-muted mx-1"></i> <strong>${Number(m.after)||0}</strong></td><td>${escapeHTML(m.reason||"—")}</td></tr>`;
 }).join("");
 document.getElementById("all-movements-count").textContent=`${filtered.length} de ${inventoryMovements.length} registros`;
 document.getElementById("all-movements-table").innerHTML=filtered.length?table(["Folio / Fecha","Producto","Tipo","Cantidad","Existencia anterior / posterior","Motivo"],rows):`<div class="empty-state"><i class="bi bi-clock-history"></i><strong>${inventoryMovements.length?"No hay resultados para estos filtros":"Todavía no hay movimientos registrados"}</strong><span>${inventoryMovements.length?"Cambia los criterios de búsqueda o limpia los filtros.":"Los movimientos aparecerán aquí cuando registres operaciones de inventario, recibas compras o confirmes ventas."}</span></div>`;
}
function exportMovementsCSV(){
 const rows=getFilteredMovements();
 const headers=["Folio","Fecha","Tipo","Código","Producto","Cantidad","Existencia anterior","Existencia posterior","Motivo"];
 const data=rows.map(m=>[m.folio,m.date||movementDateValue(m),m.type,m.code,m.product,m.quantity,m.before,m.after,m.reason]);
 const csv=[headers,...data].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="autopartes_gallegos_movimientos.csv";a.click();URL.revokeObjectURL(url);
}

function renderUsers(){
 if(currentUser?.role!=="Super Admin"){content.innerHTML=heading("Acceso restringido","Solo el Super Admin puede administrar usuarios y permisos.");return;}
 const active=users.filter(u=>u.active!==false).length;
 const admins=users.filter(u=>u.role==="Administrador"&&u.active!==false).length;
 const employees=users.filter(u=>u.role==="Empleado"&&u.active!==false).length;
 const rows=users.map(u=>`<tr><td><strong>${escapeHTML(u.name)}</strong><div class="small text-muted">${escapeHTML(u.username)} · ${escapeHTML(u.id)}</div></td><td><span class="badge-soft ${u.role==="Super Admin"?"badge-blue":u.role==="Administrador"?"badge-green":"badge-gray"}">${escapeHTML(u.role)}</span></td><td>${u.role==="Super Admin"?"Todos los módulos":`${(u.permissions||ROLE_PERMISSIONS[u.role]||[]).length} módulos`}</td><td>${statusBadge(u.active===false?"Inactivo":"Activo")}</td><td><div class="d-flex gap-1"><button class="btn btn-outline-primary btn-sm" data-user-edit="${escapeHTML(u.id)}"><i class="bi bi-pencil"></i> Editar</button>${u.id!==currentUser.id?`<button class="btn btn-outline-secondary btn-sm" data-user-toggle="${escapeHTML(u.id)}">${u.active===false?"Activar":"Desactivar"}</button>`:"<span class=\"small text-muted align-self-center\">Sesión actual</span>"}</div></td></tr>`).join("");
 content.innerHTML=heading("Usuarios y permisos","Crea cuentas, asigna roles y controla el acceso a cada módulo.",`<button class="btn btn-primary btn-sm" id="add-user"><i class="bi bi-person-plus me-1"></i> Nuevo usuario</button>`)+
 `<div class="row g-3 mb-3"><div class="col-12 col-sm-4">${metric("Usuarios activos",active,"bi-people","Cuentas habilitadas")}</div><div class="col-12 col-sm-4">${metric("Administradores",admins,"bi-person-gear","Sin acceso a gestión de usuarios")}</div><div class="col-12 col-sm-4">${metric("Empleados",employees,"bi-person","Acceso operativo limitado")}</div></div>
 <div class="row g-3 mb-3"><div class="col-12 col-lg-4">${panel("Super Admin",`<p class="small mb-2">${ROLE_DESCRIPTIONS["Super Admin"]}</p><span class="badge-soft badge-blue">Todos los módulos</span>`)}</div><div class="col-12 col-lg-4">${panel("Administrador",`<p class="small mb-2">${ROLE_DESCRIPTIONS.Administrador}</p><span class="badge-soft badge-green">Operación y reportes</span>`)}</div><div class="col-12 col-lg-4">${panel("Empleado",`<p class="small mb-2">${ROLE_DESCRIPTIONS.Empleado}</p><span class="badge-soft badge-gray">Acceso operativo</span>`)}</div></div>
 <div class="card-panel"><div class="panel-head"><h2>Cuentas registradas</h2><span class="small text-muted">${users.length} usuarios</span></div><div class="panel-body p-0" id="users-table">${table(["Usuario","Rol","Permisos","Estado","Acciones"],rows)}</div></div>
 <div class="alert alert-warning small mt-3 mb-0"><i class="bi bi-shield-exclamation me-1"></i> Prototipo local: las credenciales y permisos se guardan en este navegador. Esto no constituye autenticación segura para producción; el backend deberá validar contraseñas cifradas y permisos en el servidor.</div>
 <div class="modal fade" id="user-modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-scrollable"><div class="modal-content"><form id="user-form"><div class="modal-header"><div><h5 class="modal-title" id="user-modal-title">Nuevo usuario</h5><div class="small text-muted">Los permisos se aplican al iniciar sesión.</div></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><input type="hidden" id="user-id"><div class="row g-3"><div class="col-md-6"><label class="form-label" for="user-name">Nombre completo *</label><input class="form-control" id="user-name" maxlength="90" required></div><div class="col-md-6"><label class="form-label" for="user-username">Nombre de usuario *</label><input class="form-control" id="user-username" maxlength="30" pattern="[A-Za-z0-9._-]+" required><div class="form-text">Usa letras, números, punto, guion o guion bajo.</div></div><div class="col-md-6"><label class="form-label" for="user-role">Rol *</label><select class="form-select" id="user-role" required><option>Administrador</option><option>Empleado</option><option>Super Admin</option></select></div><div class="col-md-6"><label class="form-label" for="user-password">Contraseña <span id="password-required-label">*</span></label><input class="form-control" id="user-password" type="password" minlength="8" autocomplete="new-password"><div class="form-text" id="password-help">Mínimo 8 caracteres. Para edición, déjala vacía si no deseas cambiarla.</div></div><div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" id="user-active" checked><label class="form-check-label small" for="user-active">Cuenta activa</label></div></div><div class="col-12" id="user-permissions-wrap"><div class="d-flex justify-content-between align-items-center mb-2"><div><strong class="small">Permisos por módulo</strong><div class="form-text">El rol define los permisos iniciales. Puedes personalizarlos para este usuario.</div></div><button class="btn btn-light btn-sm" type="button" id="reset-role-permissions">Restablecer permisos del rol</button></div><div class="row g-2" id="user-permissions">${ALL_PAGES.map(key=>`<div class="col-6 col-md-4"><div class="form-check"><input class="form-check-input user-permission" type="checkbox" value="${key}" id="perm-${key}"><label class="form-check-label small" for="perm-${key}">${pageNames[key]}</label></div></div>`).join("")}</div></div></div><div class="alert alert-danger py-2 small mt-3 d-none" id="user-form-error"></div></div><div class="modal-footer"><button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn btn-primary btn-sm">Guardar usuario</button></div></form></div></div></div>`;
 document.getElementById("add-user").addEventListener("click",()=>openUserModal());
 document.getElementById("user-role").addEventListener("change",()=>applyRolePermissions());
 document.getElementById("reset-role-permissions").addEventListener("click",applyRolePermissions);
 document.getElementById("user-form").addEventListener("submit",saveUserForm);
 document.querySelectorAll("[data-user-edit]").forEach(b=>b.addEventListener("click",()=>openUserModal(b.dataset.userEdit)));
 document.querySelectorAll("[data-user-toggle]").forEach(b=>b.addEventListener("click",()=>toggleUser(b.dataset.userToggle)));
}
function applyRolePermissions(selected){
 const role=document.getElementById("user-role").value;
 const allowed=selected||ROLE_PERMISSIONS[role]||[];
 document.querySelectorAll(".user-permission").forEach(c=>{c.checked=allowed.includes(c.value);c.disabled=role==="Super Admin";});
 document.getElementById("user-permissions-wrap").classList.toggle("opacity-50",role==="Super Admin");
}
function openUserModal(id=""){
 const form=document.getElementById("user-form");form.reset();document.getElementById("user-form-error").classList.add("d-none");
 const user=users.find(u=>u.id===id);document.getElementById("user-modal-title").textContent=user?"Editar usuario":"Nuevo usuario";
 document.getElementById("user-id").value=user?.id||"";document.getElementById("user-name").value=user?.name||"";document.getElementById("user-username").value=user?.username||"";document.getElementById("user-role").value=user?.role||"Empleado";document.getElementById("user-active").checked=user?user.active!==false:true;document.getElementById("user-password").required=!user;
 document.getElementById("user-password").value="";document.getElementById("password-help").textContent=user?"Déjala vacía si no deseas cambiar la contraseña.":"Mínimo 8 caracteres.";
 const roleSelect=document.getElementById("user-role");roleSelect.disabled=!!user&&user.id===currentUser.id;
 applyRolePermissions(user?(user.permissions||ROLE_PERMISSIONS[user.role]||[]):undefined);
 bootstrap.Modal.getOrCreateInstance(document.getElementById("user-modal")).show();
}
function saveUserForm(event){
 event.preventDefault();const error=document.getElementById("user-form-error");error.classList.add("d-none");
 const id=document.getElementById("user-id").value,name=document.getElementById("user-name").value.trim(),username=document.getElementById("user-username").value.trim(),password=document.getElementById("user-password").value,role=document.getElementById("user-role").value,active=document.getElementById("user-active").checked;
 const existing=users.find(u=>u.id===id);const duplicate=users.some(u=>u.username.toLowerCase()===username.toLowerCase()&&u.id!==id);
 let message="";if(duplicate)message="Ese nombre de usuario ya está registrado.";else if(!/^[A-Za-z0-9._-]{3,30}$/.test(username))message="El usuario debe tener entre 3 y 30 caracteres y usar solo letras, números, punto, guion o guion bajo.";else if(!existing&&password.length<8)message="La contraseña inicial debe tener al menos 8 caracteres.";else if(existing&&password&&password.length<8)message="La nueva contraseña debe tener al menos 8 caracteres.";else if(existing&&existing.id===currentUser.id&&(!active||role!==existing.role))message="No puedes desactivar ni cambiar el rol de tu propia cuenta.";
 if(message){error.textContent=message;error.classList.remove("d-none");return;}
 const permissions=role==="Super Admin"?[...ALL_PAGES]:[...document.querySelectorAll(".user-permission:checked")].map(c=>c.value);
 const projectedSuperAdmins=users.filter(u=>u.id!==id&&u.active!==false&&u.role==="Super Admin").length+((role==="Super Admin"&&active)?1:0);
 if(projectedSuperAdmins<1){error.textContent="Debe existir al menos un Super Admin activo.";error.classList.remove("d-none");return;}
 if(existing){existing.name=name;existing.username=username;existing.role=role;existing.active=active;existing.permissions=permissions;if(password)existing.password=password;}
 else users.push({id:nextUserId(),name,username,password,role,active,permissions,createdAt:new Date().toISOString()});
 saveUsers();const updated=users.find(u=>u.id===currentUser.id);if(updated)currentUser=updated;refreshUserChrome();bootstrap.Modal.getInstance(document.getElementById("user-modal")).hide();renderUsers();
}
function toggleUser(id){const user=users.find(u=>u.id===id);if(!user)return;if(user.id===currentUser.id){alert("No puedes desactivar la cuenta con la que tienes la sesión iniciada.");return;}const next=user.active===false;if(!next&&user.role==="Super Admin"&&users.filter(u=>u.active!==false&&u.role==="Super Admin").length===1){alert("Debe existir al menos un Super Admin activo.");return;}if(!confirm(`${next?"¿Activar":"¿Desactivar"} la cuenta de ${user.name}?`))return;user.active=next;saveUsers();renderUsers();}

function reportDateInRange(value,from,to){const date=String(value||"").slice(0,10);return (!from||date>=from)&&(!to||date<=to);}
function getReportData(){
 const type=document.getElementById("report-type")?.value||"sales";
 const from=document.getElementById("report-from")?.value||"";
 const to=document.getElementById("report-to")?.value||"";
 const category=document.getElementById("report-category")?.value||"";
 const validSales=sales.filter(s=>s.status==="Confirmada"&&reportDateInRange(s.date,from,to));
 const validPurchases=purchases.filter(p=>p.status==="Recibida"&&reportDateInRange(p.receivedAt||p.date,from,to));
 const validMovements=inventoryMovements.filter(m=>reportDateInRange(m.date||m.createdAt,from,to));
 const categoryProducts=products.filter(p=>!category||p.category===category);
 return {type,from,to,category,validSales,validPurchases,validMovements,categoryProducts};
}
function renderReports(){
 const categories=[...new Set(products.map(p=>p.category).filter(Boolean))].sort();
 content.innerHTML=heading("Reportes","Analiza ventas, compras, inventario y movimientos mediante información registrada en el sistema.",`<button class="btn btn-outline-primary btn-sm me-2" id="export-report"><i class="bi bi-download me-1"></i> Exportar CSV</button><button class="btn btn-light btn-sm" id="print-report"><i class="bi bi-printer me-1"></i> Imprimir</button>`)+
 `<div class="card-panel mb-3"><div class="panel-body"><div class="row g-2 align-items-end">
 <div class="col-12 col-md-4"><label class="form-label small" for="report-type">Tipo de reporte</label><select class="form-select" id="report-type"><option value="sales">Ventas</option><option value="purchases">Compras</option><option value="inventory">Inventario</option><option value="movements">Movimientos</option></select></div>
 <div class="col-6 col-md-2"><label class="form-label small" for="report-from">Desde</label><input class="form-control" type="date" id="report-from"></div>
 <div class="col-6 col-md-2"><label class="form-label small" for="report-to">Hasta</label><input class="form-control" type="date" id="report-to"></div>
 <div class="col-12 col-md-3" id="report-category-wrap"><label class="form-label small" for="report-category">Categoría</label><select class="form-select" id="report-category"><option value="">Todas las categorías</option>${categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("")}</select></div>
 <div class="col-12 col-md-1"><button class="btn btn-light w-100" id="clear-report-filters" title="Limpiar filtros"><i class="bi bi-eraser"></i></button></div>
 </div></div></div><div id="report-output"></div>
 <div class="small text-muted mt-3"><i class="bi bi-info-circle me-1"></i>Los reportes se calculan con los registros locales disponibles. Las ventas canceladas y las compras pendientes o canceladas no se incluyen en los totales operativos.</div>`;
 ["report-type","report-from","report-to","report-category"].forEach(id=>document.getElementById(id).addEventListener("change",renderReportOutput));
 document.getElementById("clear-report-filters").onclick=()=>{["report-from","report-to","report-category"].forEach(id=>document.getElementById(id).value="");renderReportOutput();};
 document.getElementById("export-report").onclick=exportCurrentReportCSV;
 document.getElementById("print-report").onclick=()=>window.print();
 renderReportOutput();
}
function renderReportOutput(){
 const d=getReportData(),out=document.getElementById("report-output");if(!out)return;
 const range=d.from||d.to?`${d.from||"Inicio"} — ${d.to||"Hoy"}`:"Todo el periodo disponible";
 let cards="",body="",title="";
 if(d.type==="sales"){
  title="Reporte de ventas";const total=d.validSales.reduce((n,s)=>n+Number(s.total||0),0),count=d.validSales.length,avg=count?total/count:0;
  const payment={};d.validSales.forEach(s=>payment[s.payment||"Sin especificar"]=(payment[s.payment||"Sin especificar"]||0)+Number(s.total||0));
  const top={};d.validSales.forEach(s=>(s.items||[]).forEach(i=>{const k=i.productName||i.code||"Producto";top[k]=(top[k]||0)+Number(i.quantity||0);}));
  cards=`<div class="col-12 col-sm-4">${metric("Total vendido",money(total),"bi-currency-dollar",range)}</div><div class="col-12 col-sm-4">${metric("Ventas confirmadas",count,"bi-receipt","No incluye canceladas")}</div><div class="col-12 col-sm-4">${metric("Ticket promedio",money(avg),"bi-graph-up","Total vendido / ventas")}</div>`;
  const payRows=Object.entries(payment).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${escapeHTML(k)}</td><td class="text-end">${money(v)}</td><td class="text-end">${total?(v/total*100).toFixed(1):"0.0"}%</td></tr>`).join("");
  const topRows=Object.entries(top).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([k,v])=>`<tr><td>${escapeHTML(k)}</td><td class="text-end">${v}</td></tr>`).join("");
  body=`<div class="row g-3"><div class="col-12 col-lg-6">${panel("Ventas por método de pago",table(["Método","Importe","Participación"],payRows||`<tr><td colspan="3" class="text-muted">Sin datos de ventas.</td></tr>`))}</div><div class="col-12 col-lg-6">${panel("Productos más vendidos",table(["Producto","Unidades"],topRows||`<tr><td colspan="2" class="text-muted">No hay detalle de artículos en las ventas del periodo.</td></tr>`))}</div></div>`;
 }else if(d.type==="purchases"){
  title="Reporte de compras";const total=d.validPurchases.reduce((n,p)=>n+Number(p.total||0),0),count=d.validPurchases.length;
  const byProvider={};d.validPurchases.forEach(p=>byProvider[p.providerName||"Proveedor no identificado"]=(byProvider[p.providerName||"Proveedor no identificado"]||0)+Number(p.total||0));
  cards=`<div class="col-12 col-sm-4">${metric("Importe recibido",money(total),"bi-bag-check",range)}</div><div class="col-12 col-sm-4">${metric("Compras recibidas",count,"bi-receipt","Órdenes que ingresaron mercancía")}</div><div class="col-12 col-sm-4">${metric("Promedio por compra",money(count?total/count:0),"bi-calculator","Importe / órdenes recibidas")}</div>`;
  const rows=Object.entries(byProvider).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<tr><td>${escapeHTML(k)}</td><td class="text-end">${money(v)}</td></tr>`).join("");
  body=panel("Compras por proveedor",table(["Proveedor","Importe recibido"],rows||`<tr><td colspan="2" class="text-muted">No hay compras recibidas en el periodo.</td></tr>`));
 }else if(d.type==="inventory"){
  title="Reporte de inventario";const list=d.categoryProducts,units=list.reduce((n,p)=>n+Number(p.stock||0),0),cost=list.reduce((n,p)=>n+Number(p.stock||0)*Number(p.cost||0),0),low=list.filter(p=>Number(p.stock||0)>0&&Number(p.stock||0)<=Number(p.min||0)),empty=list.filter(p=>Number(p.stock||0)<=0);
  cards=`<div class="col-12 col-sm-6 col-xl-3">${metric("Productos",list.length,"bi-box-seam","Según filtro de categoría")}</div><div class="col-12 col-sm-6 col-xl-3">${metric("Unidades disponibles",units,"bi-stack","Existencia actual")}</div><div class="col-12 col-sm-6 col-xl-3">${metric("Valor a costo",money(cost),"bi-currency-dollar","Existencia × costo registrado")}</div><div class="col-12 col-sm-6 col-xl-3">${metric("Bajo mínimo / agotados",`${low.length} / ${empty.length}`,"bi-exclamation-triangle","Alertas actuales")}</div>`;
  const rows=list.slice().sort((a,b)=>Number(a.stock)-Number(b.stock)).map(p=>`<tr><td><strong>${escapeHTML(p.name)}</strong><div class="small text-muted">${escapeHTML(p.code)}</div></td><td>${escapeHTML(p.category||"—")}</td><td class="text-end">${Number(p.stock)||0}</td><td class="text-end">${Number(p.min)||0}</td><td class="text-end">${money(Number(p.cost||0))}</td><td class="text-end">${money(Number(p.stock||0)*Number(p.cost||0))}</td><td>${Number(p.stock||0)<=0?statusBadge("Agotado"):Number(p.stock||0)<=Number(p.min||0)?statusBadge("Stock bajo"):statusBadge("Disponible")}</td></tr>`).join("");
  body=panel("Existencias y valoración",table(["Producto","Categoría","Existencia","Mínimo","Costo unitario","Valor a costo","Estado"],rows||`<tr><td colspan="7">No hay productos para mostrar.</td></tr>`));
  document.getElementById("report-category-wrap").hidden=false;
 }else{
  title="Reporte de movimientos";const entries=d.validMovements.filter(m=>m.type==="Entrada"),exits=d.validMovements.filter(m=>m.type==="Salida"),adjust=d.validMovements.filter(m=>m.type==="Ajuste"),qty=a=>a.reduce((n,m)=>n+Number(m.quantity||0),0);
  cards=`<div class="col-12 col-sm-4">${metric("Entradas",`${entries.length} · ${qty(entries)} pzas.`,"bi-box-arrow-in-down","Operaciones registradas")}</div><div class="col-12 col-sm-4">${metric("Salidas",`${exits.length} · ${qty(exits)} pzas.`,"bi-box-arrow-up","Operaciones registradas")}</div><div class="col-12 col-sm-4">${metric("Ajustes",adjust.length,"bi-arrow-repeat","Correcciones de existencia")}</div>`;
  const rows=d.validMovements.slice().sort((a,b)=>String(b.createdAt||b.date||"").localeCompare(String(a.createdAt||a.date||""))).map(m=>`<tr><td>${escapeHTML(m.date||String(m.createdAt||"").slice(0,10))}</td><td>${escapeHTML(m.folio||"—")}</td><td>${escapeHTML(m.type||"—")}</td><td>${escapeHTML(m.product||"—")}<div class="small text-muted">${escapeHTML(m.code||"")}</div></td><td class="text-end">${Number(m.quantity)||0}</td><td>${escapeHTML(m.reason||"—")}</td></tr>`).join("");
  body=panel("Detalle de movimientos",table(["Fecha","Folio","Tipo","Producto","Cantidad","Motivo"],rows||`<tr><td colspan="6" class="text-muted">No hay movimientos en el periodo.</td></tr>`));
 }
 if(d.type!=="inventory")document.getElementById("report-category-wrap").hidden=true;
 out.innerHTML=`<div class="mb-2"><h2 class="h5 mb-1">${title}</h2><div class="small text-muted">${range}${d.category?` · ${escapeHTML(d.category)}`:""}</div></div><div class="row g-3 mb-3">${cards}</div>${body}`;
}
function exportCurrentReportCSV(){
 const d=getReportData();let headers=[],rows=[],filename=`autopartes_gallegos_reporte_${d.type}.csv`;
 if(d.type==="sales"){headers=["Folio","Fecha","Cliente","Método de pago","Estado","Total"];rows=d.validSales.map(s=>[s.folio,s.date,s.customer,s.payment,s.status,s.total]);}
 else if(d.type==="purchases"){headers=["Folio","Fecha","Proveedor","Referencia","Estado","Total"];rows=d.validPurchases.map(p=>[p.folio,p.receivedAt||p.date,p.providerName,p.reference,p.status,p.total]);}
 else if(d.type==="inventory"){headers=["Código","Producto","Categoría","Existencia","Mínimo","Costo unitario","Valor a costo"];rows=d.categoryProducts.map(p=>[p.code,p.name,p.category,p.stock,p.min,p.cost,Number(p.stock||0)*Number(p.cost||0)]);}
 else{headers=["Fecha","Folio","Tipo","Código","Producto","Cantidad","Existencia anterior","Existencia posterior","Motivo"];rows=d.validMovements.map(m=>[m.date||String(m.createdAt||"").slice(0,10),m.folio,m.type,m.code,m.product,m.quantity,m.before,m.after,m.reason]);}
 const csv=[headers,...rows].map(row=>row.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}

function renderPlaceholder(key){
 const desc={movements:"Registro y consulta de entradas, salidas y ajustes de inventario.",providers:"Administración de proveedores y sus datos de contacto.",purchases:"Registro de compras y recepción de mercancía.",reports:"Indicadores, filtros y exportación de información.",scraping:"Configuración de fuentes y ejecución de extracción de datos públicos autorizados.",market:"Comparación de precios externos e identificación de oportunidades comerciales.",users:"Administración de usuarios, roles y permisos de acceso."};
 const icon={movements:"bi-arrow-left-right",providers:"bi-truck",purchases:"bi-bag-plus",reports:"bi-bar-chart",scraping:"bi-globe2",market:"bi-graph-up-arrow",users:"bi-people"};
 content.innerHTML=heading(pageNames[key],desc[key])+`<div class="card-panel"><div class="empty-state"><i class="bi ${icon[key]}"></i><strong>Módulo preparado para desarrollo</strong><span>La estructura visual está contemplada. La funcionalidad se implementará por iteraciones y se conectará con el backend.</span></div></div>`;
}
function navigate(key){
 if(!pageNames[key]||!currentUser)return;
 if(!canAccess(key)){alert("Tu cuenta no tiene permiso para acceder a este módulo.");return;}
 currentPage=key;
 document.querySelectorAll("#main-nav .nav-link").forEach(a=>a.classList.toggle("active",a.dataset.page===key));
 document.getElementById("breadcrumb").textContent=pageNames[key];
 ({dashboard:renderDashboard,catalog:renderCatalog,inventory:renderInventory,movements:renderMovements,pos:renderPOS,sales:renderSales,providers:renderProviders,purchases:renderPurchases,reports:renderReports,users:renderUsers}[key]||(()=>renderPlaceholder(key)))();
 document.getElementById("sidebar").classList.remove("open");
}
document.getElementById("main-nav").addEventListener("click",e=>{const a=e.target.closest("[data-page]");if(!a)return;e.preventDefault();navigate(a.dataset.page);});
content.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)navigate(b.dataset.go);});
document.getElementById("menu-toggle").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
initializeAuth();
