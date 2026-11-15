"use strict";
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const KEY = "struny-hub-v1";
  const CATS = {
    sites: {name:"Сайты и школа", short:"Сайт", icon:"globe"},
    trainers: {name:"Тренажёры", short:"Тренажёр", icon:"music"},
    admin: {name:"CRM и управление", short:"Управление", icon:"shield"},
    development: {name:"Разработка", short:"Исходный код", icon:"code"},
    social: {name:"Соцсети и связь", short:"Связь", icon:"users"}
  };
  const repo = name => "https://github.com/strunibb/" + name;
  const items = [
    {id:"school",category:"sites",name:"Онлайн-школа «Струны будущего»",description:"Главная страница школы, обучение и варианты занятий.",url:"https://strunibb.github.io/struny-school/",repo:repo("struny-school"),icon:"graduation",tag:"Главный сайт",quick:true},
    {id:"songs",category:"sites",name:"Каталог разборов песен",description:"Табулатуры, видеоразборы, песни для разных уровней.",url:"https://strunibb.github.io/struny-songs/",repo:repo("struny-songs"),icon:"music",tag:"Каталог",quick:true},
    {id:"trial",category:"sites",name:"Пробный урок",description:"Отдельная страница для знакомства и записи на занятие.",url:"https://strunibb.github.io/probnoe/",repo:repo("probnoe"),icon:"sparkles",tag:"Запись"},
    {id:"info",category:"sites",name:"Памятка ученика",description:"Информация для учеников и правила занятий.",url:"https://strunibb.github.io/struny-school/student-info/",icon:"book",tag:"Школа"},
    {id:"schedule",category:"sites",name:"Свободное расписание",description:"Страница с доступными окнами занятий.",url:"https://strunibb.github.io/struny-school/schedule/",icon:"calendar",tag:"Расписание"},
    {id:"booking",category:"sites",name:"Онлайн-запись YCLIENTS",description:"Внешняя система записи на занятия.",url:"https://n1313298.yclients.ru",icon:"calendar",tag:"Запись"},
    {id:"strumming",category:"sites",name:"Strumming.ru",description:"Ссылка на проект из твоей истории.",url:"https://strumming.ru/",icon:"globe",tag:"Дополнительный"},
    {id:"boi",category:"trainers",name:"Тренажёр гитарных боёв",description:"Ритмы, метроном, глушение и тренировка аккордов.",url:"https://strunibb.github.io/boi/",repo:repo("boi"),icon:"sliders",tag:"Тренажёр",quick:true},
    {id:"chords",category:"trainers",name:"Тренажёр аккордов",description:"Аппликатуры и упражнения с гитарными аккордами.",url:"https://strunibb.github.io/akkordi_guitarpro/",repo:repo("akkordi_guitarpro"),icon:"guitar",tag:"Тренажёр"},
    {id:"metronome",category:"trainers",name:"Метроном «Струны будущего»",description:"Ссылка на метроном из истории проектов. Доступность проверь при открытии.",url:"https://strunibb.github.io/struny-metronome/",repo:repo("struny-metronome"),icon:"timer",tag:"Из истории"},
    {id:"roulette",category:"trainers",name:"Рулетка боёв",description:"Рулетка с упражнениями и ритмическими заданиями.",url:"https://strunibb.github.io/struny-roulette/",repo:repo("struny-roulette"),icon:"disc",tag:"Из истории"},
    {id:"crm",category:"admin",name:"CRM / Админ-панель MAX",description:"Управление ботом, занятиями и уведомлениями. Требует собственной авторизации.",url:"https://struny-max-bot.onrender.com/",repo:repo("struny-max-bot"),icon:"layout",tag:"Вход в CRM",quick:true},
    {id:"leads",category:"admin",name:"Бот для заявок",description:"Исходный код проекта struny-leads-bot на GitHub.",url:repo("struny-leads-bot"),icon:"users",tag:"GitHub"},
    {id:"payment",category:"admin",name:"Проект оплаты",description:"Исходный код проекта oplataa на GitHub.",url:repo("oplataa"),icon:"wallet",tag:"GitHub"},
    {id:"telegram",category:"social",name:"Telegram",description:"Канал и материалы для учеников.",url:"https://t.me/nikguita",icon:"send",tag:"Канал"},
    {id:"vk",category:"social",name:"ВКонтакте",description:"Страница школы в VK.",url:"https://vk.com/strunib",icon:"users",tag:"Соцсеть"},
    {id:"instagram",category:"social",name:"Instagram",description:"Профиль преподавателя.",url:"https://www.instagram.com/osadchukguitar/",icon:"camera",tag:"Соцсеть"},
    {id:"maxprofile",category:"social",name:"Профиль в MAX",description:"Личная ссылка для связи в MAX.",url:"https://max.ru/u/f9LHodD0cOLnhoaVPE4XlJR0_kJ4r8Y8Jthz1AUVskBB7IYJq0IT75zK0qI",icon:"message",tag:"MAX"},
    {id:"maxinvite",category:"social",name:"Приглашение в MAX",description:"Ссылка-приглашение, использовавшаяся в проектах школы.",url:"https://max.ru/join/Xv5fdtLwJ_vyuJxWFR49qypLBF8MdnLdA9VRr-fppXk",icon:"message",tag:"Из истории"},
    {id:"github",category:"development",name:"Все репозитории GitHub",description:"Профиль strunibb и полный список проектов.",url:"https://github.com/strunibb",icon:"github",tag:"Профиль"},
    {id:"schoolold",category:"development",name:"Ранняя версия сайта школы",description:"Ссылка на прежнюю версию проекта в Sites.",url:"https://struny-budushchego.strunib.chatgpt.site/",icon:"archive",tag:"Из истории"},
    {id:"rouletteold",category:"development",name:"Рулетка — версия Sites",description:"Альтернативный адрес проекта из истории.",url:"https://struny-roulette.strunib.chatgpt.site",icon:"archive",tag:"Из истории"}
  ];
  // Репозитории обнаружены в аккаунте strunibb. Для них не придумываются публичные URL демо.
  const sourceRepos = [
    ["nota_websyte","Нотный сайт"],["calculator_websyte","Калькулятор · веб-проект"],
    ["penta_tonik","Пентатоника"],["akkord_metronom","Аккорды и метроном"],
    ["metronom_web","Веб-метроном"],["baby","Проект baby"],
    ["dr","Проект dr"],["calkul","Проект calkul"],
    ["sbornik","Сборник"],["strunib","Проект strunib"],
    ["trenagher","Проект trenagher"],["leonidaastrolog","Проект leonidaastrolog"],
    ["tuna","Проект tuna"],["4withX","Проект 4withX"]
  ];
  sourceRepos.forEach(([r, name]) => items.push({id:"repo-" + r,category:"development",name,description:"Репозиторий " + r + ". Открыть код и файлы проекта на GitHub.",url:repo(r),icon:"code",tag:"Исходники"}));
  const icons = {
    grid:'<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18m0-18c5 5 5 13 0 18"/>',
    sliders:'<path d="M4 7h16M4 17h16M8 4v6m8 4v6"/><circle cx="8" cy="7" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="17" r="2" fill="currentColor" stroke="none"/>',
    shield:'<path d="M12 2 21 6v6c0 6-4 9-9 10-5-1-9-4-9-10V6l9-4Z"/><path d="m8 12 2.5 2.5L16 9"/>',
    code:'<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-5 20"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2H3Zm14-14a3 3 0 0 1 0 6m.5 4a5 5 0 0 1 3.5 4"/>',
    star:'<path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7.1-6-3.3-6.1 3.3 1.1-7.1-5.2-5 7.1-1L12 2Z"/>',
    github:'<path d="M9 19c-4.5 1.2-4.5-2-6-2.5m12 5v-4a3.6 3.6 0 0 0-1-2.7c3.3-.4 6.7-1.6 6.7-7.2a5.8 5.8 0 0 0-1.6-4 5.1 5.1 0 0 0-.1-4s-1.4-.4-4.1 1.6a14.1 14.1 0 0 0-7.4 0C4.8-.8 3.4-.4 3.4-.4a5.1 5.1 0 0 0-.1 4 5.8 5.8 0 0 0-1.6 4c0 5.6 3.4 6.8 6.7 7.2a3.6 3.6 0 0 0-1 2.7v4" transform="translate(2 2) scale(.84)"/>',
    "arrow-up-right":'<path d="M7 17 17 7M8 7h9v9"/>',
    plus:'<path d="M12 4v16M4 12h16"/>',
    search:'<circle cx="10.8" cy="10.8" r="7.6"/><path d="m16.3 16.3 5.1 5.1"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    upload:'<path d="M12 17V5m-5 5 5-5 5 5M4 17v4h16v-4"/>',
    graduation:'<path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v6c4 3 8 3 12 0v-6M22 9v7"/>',
    music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    book:'<path d="M12 6a8 8 0 0 0-9-1v14a8 8 0 0 1 9 1 8 8 0 0 1 9-1V5a8 8 0 0 0-9 1Zm0 0v14"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-12 5h2"/>',
    guitar:'<path d="m18 2 4 4-8 8m-1-1a5 5 0 0 0-7 1 6 6 0 1 0 7 7 5 5 0 0 0 1-7m-9 4h4m1-5 6 6M16 6l2 2"/>',
    timer:'<circle cx="12" cy="13" r="9"/><path d="M9 2h6m-3 7v5l3 2"/>',
    disc:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v3m0 12v3"/>',
    layout:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
    wallet:'<rect x="2" y="6" width="20" height="15" rx="2"/><path d="M5 6V3h14v3m-3 8h6"/>',
    send:'<path d="m22 2-7 20-4.5-8.5L2 9l20-7Zm0 0L10.5 13.5"/>',
    camera:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 10h8m-8 4h5"/>',
    archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v12h14V9M10 14h4"/>',
    sparkles:'<path d="m12 2 2 7 7 3-7 2-2 8-2-8-7-2 7-3 2-7Zm7 1v4m-2-2h4"/>',
    folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z"/>',
    layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
    link:'<path d="M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-2 2m3 5a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l2-2"/>',
    edit:'<path d="M13 5 19 11m-14 8 4-.8L21 6a2 2 0 0 0-3-3L6 15l-1 4ZM4 22h16"/>',
    trash:'<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7"/>'
  };
  function svg(name) {
    return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (icons[name] || icons.link) + '</svg>';
  }
  $$("[data-icon]").forEach(el => el.innerHTML = svg(el.dataset.icon));
  function safeText(x) {return String(x ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function safeUrl(raw) {
    try {const url = new URL(String(raw).trim()); if (!["https:","http:"].includes(url.protocol) || !url.hostname || url.username || url.password) return null; return url.href;}
    catch {return null;}
  }
  let saved = {custom:[],favorites:[],theme:"paper"};
  try {
    const obj = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (obj && typeof obj === "object") {
      saved.custom = Array.isArray(obj.custom) ? obj.custom.filter(validCustom).slice(0,100) : [];
      saved.favorites = Array.isArray(obj.favorites) ? obj.favorites.filter(v => typeof v === "string").slice(0,200) : [];
      saved.theme = ["paper","night","sage"].includes(obj.theme) ? obj.theme : "paper";
    }
  } catch {}
  function validCustom(x) {
    return x && typeof x.id === "string" && /^custom-[a-z0-9-]+$/.test(x.id) && typeof x.name === "string" && x.name.trim().length > 0 && x.name.length <= 90 && typeof x.description === "string" && x.description.length <= 220 && !!safeUrl(x.url) && Object.hasOwn(CATS,x.category);
  }
  function persist() {try {localStorage.setItem(KEY, JSON.stringify(saved));} catch {toast("Не удалось сохранить в браузере. Проверь свободное место.");}}
  let section = "all", filter = "all", search = "", sort = "default", toastTimeout;
  const all = () => items.concat(saved.custom);
  const isFav = id => saved.favorites.includes(id);
  const titleFor = s => ({all:"Все проекты",favorites:"Избранное",...Object.fromEntries(Object.entries(CATS).map(([k,v])=>[k,v.name]))}[s] || "Все проекты");
  function toast(message) {const el = $("#toast"); el.textContent=message; el.classList.add("show"); clearTimeout(toastTimeout); toastTimeout=setTimeout(()=>el.classList.remove("show"),3000);}
  function showMenu(open) {
    $("#sidebar").classList.toggle("open",open); $("#scrim").hidden=!open;
    if(open) $("#closeMenu").focus();
  }
  $("#openMenu").addEventListener("click",()=>showMenu(true));
  $("#closeMenu").addEventListener("click",()=>showMenu(false));
  $("#scrim").addEventListener("click",()=>showMenu(false));
  function setSection(v) {
    section=v; filter="all";
    $(".filter-pill").forEach(x=>x.classList.toggle("active",x.dataset.filter==="all"));
    $(".nav-button").forEach(btn=>btn.classList.toggle("selected",btn.dataset.section===v));
    $("#breadcrumb").textContent= titleFor(v);
    $("#catalogTitle").textContent=titleFor(v);
    $("#catalogSubtitle").textContent=v==="favorites"?"Твои сохранённые проекты в одном месте.":v==="all"?"Выбери нужный инструмент и переходи к работе.":"Проекты и сервисы выбранного раздела.";
    $("#filterPills").hidden=v!=="all";
    $("#hero").hidden=v!=="all";
    $("#quickSection").hidden=v!=="all";
    $("#catalog").classList.toggle("short-view",v!=="all");
    showMenu(false);render();
  }
  $$(".nav-button").forEach(btn=>btn.addEventListener("click",()=>setSection(btn.dataset.section)));
  $$(".filter-pill").forEach(btn=>btn.addEventListener("click",()=>{
    filter=btn.dataset.filter; section="all";
    $$(".filter-pill").forEach(x=>x.classList.toggle("active",x===btn));
    $$(".nav-button").forEach(x=>x.classList.toggle("selected",x.dataset.section==="all"));
    $("#catalogTitle").textContent=filter==="all"?"Все проекты":titleFor(filter);
    render();
  }));
  $("#search").addEventListener("input",e=>{search=e.target.value.trim().toLocaleLowerCase("ru");render();});
  $("#sortSelect").addEventListener("change",e=>{sort=e.target.value;render();});
  function theme(value) {
    if(!["paper","night","sage"].includes(value))return;
    document.body.dataset.theme=value;$("#themeSelect").value=value;saved.theme=value;persist();
  }
  $("#themeSelect").addEventListener("change",e=>theme(e.target.value)); theme(saved.theme);
  function cardHTML(p) {
    const favorite=isFav(p.id);
    const badge=p.id.startsWith("custom-")?"Моя ссылка":p.tag || CATS[p.category].short;
    const short=p.url.includes("github.com/")?"Открыть GitHub":"Открыть сайт";
    return '<article class="project-card">' +
      '<div class="card-top"><span class="card-icon '+safeText(p.category)+'">'+svg(p.icon||CATS[p.category].icon)+'</span><span class="card-opts">' +
      (p.id.startsWith("custom-")?'<button class="card-icon-button" data-action="edit" data-id="'+safeText(p.id)+'" aria-label="Изменить ссылку">'+svg("edit")+'</button><button class="card-icon-button" data-action="delete" data-id="'+safeText(p.id)+'" aria-label="Удалить ссылку">'+svg("trash")+'</button>':"") +
      '<button class="card-icon-button '+(favorite?"favorited":"")+'" data-action="favorite" data-id="'+safeText(p.id)+'" aria-label="'+(favorite?"Убрать из избранного":"Добавить в избранное")+'" aria-pressed="'+String(favorite)+'">'+svg("star")+'</button></span></div>' +
      '<div class="card-category">'+safeText(CATS[p.category].name)+'</div><h3>'+safeText(p.name)+'</h3><p>'+safeText(p.description)+'</p>' +
      '<div class="card-bottom"><div class="card-links"><a class="card-open" href="'+safeText(p.url)+'" target="_blank" rel="noopener noreferrer">'+short+svg("arrow-up-right")+'</a>' +
      (p.repo?'<a class="card-repo" href="'+safeText(p.repo)+'" target="_blank" rel="noopener noreferrer">'+svg("github")+' Код</a>':"")+'</div><span class="card-badge '+(p.id.startsWith("custom-")?"local":p.tag==="Из истории"?"legacy":"")+'">'+safeText(badge)+'</span></div></article>';
  }
  function render() {
    const collection=all();
    let result=collection.filter(p => (section==="all" || section==="favorites"&&isFav(p.id) || p.category===section) && (filter==="all" || section!=="all" || p.category===filter) &&
      (!search || [p.name,p.description,p.url,p.tag,CATS[p.category].name].join(" ").toLocaleLowerCase("ru").includes(search)));
    if(sort==="alphabet")result.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
    if(sort==="favorites")result.sort((a,b)=>Number(isFav(b.id))-Number(isFav(a.id)));
    $("#cards").innerHTML=result.map(cardHTML).join("");
    $("#resultCount").textContent=result.length+" "+(result.length===1?"ссылка":result.length>=2&&result.length<=4?"ссылки":"ссылок");
    $("#empty").hidden=result.length>0;
    $("#statAll").textContent=collection.length;
    $("#statSites").textContent=collection.filter(p=>p.category==="sites").length;
    $("#statTrainers").textContent=collection.filter(p=>p.category==="trainers").length;
    $("#statFav").textContent=collection.filter(p=>isFav(p.id)).length;
    $$("[data-count]").forEach(el=>{
      const cat=el.dataset.count;
      el.textContent=cat==="all"?collection.length:cat==="favorites"?collection.filter(p=>isFav(p.id)).length:collection.filter(p=>p.category===cat).length;
    });
    const selected=collection.filter(p=>p.quick).slice(0,4);
    $("#quickGrid").innerHTML=selected.map(p=>'<a class="quick-card" href="'+safeText(p.url)+'" target="_blank" rel="noopener noreferrer"><span class="quick-icon">'+svg(p.icon)+'</span><span class="copy"><b>'+safeText(p.name)+'</b><small>'+safeText(CATS[p.category].name)+'</small></span>'+svg("arrow-up-right")+'</a>').join("");
  }
  $("#cards").addEventListener("click",e=>{
    const btn=e.target.closest("button[data-action]");if(!btn)return;
    const {action,id}=btn.dataset;
    if(action==="favorite") {
      saved.favorites=isFav(id)?saved.favorites.filter(x=>x!==id):saved.favorites.concat(id);
      persist();render();return;
    }
    if(action==="edit"){openEditor(id);return;}
    if(action==="delete") {
      const entry=saved.custom.find(p=>p.id===id);if(!entry)return;
      if(!confirm('Удалить ссылку «'+entry.name+'» из этой панели?'))return;
      saved.custom=saved.custom.filter(p=>p.id!==id);
      saved.favorites=saved.favorites.filter(x=>x!==id);
      persist();render();toast("Ссылка удалена");
    }
  });
  function openEditor(id=null) {
    const found=id?saved.custom.find(p=>p.id===id):null;
    $("#projectForm").reset();$("#editId").value=found?.id || "";
    $("#dialogTitle").textContent=found?"Изменить ссылку":"Новая ссылка";
    $("#projectName").value=found?.name||"";$("#projectUrl").value=found?.url||"";
    $("#projectDescription").value=found?.description||"";
    $("#projectCategory").value=found?.category||"sites";
    $("#projectFavorite").checked=found?isFav(found.id):false;
    $("#formError").hidden=true;$("#projectDialog").showModal();$("#projectName").focus();
  }
  ["addTop","addHero","emptyAdd"].forEach(id=>$("#"+id).addEventListener("click",()=>openEditor()));
  $("#favoritesHero").addEventListener("click",()=>setSection("favorites"));
  ["closeDialog","cancelDialog"].forEach(id=>$("#"+id).addEventListener("click",()=>$("#projectDialog").close()));
  $("#projectForm").addEventListener("submit",e=>{
    e.preventDefault();
    const id=$("#editId").value, name=$("#projectName").value.trim(),url=safeUrl($("#projectUrl").value),description=$("#projectDescription").value.trim(),category=$("#projectCategory").value;
    let error="";
    if(!name || name.length>90)error="Укажи название до 90 символов.";
    else if(!url)error="Укажи ссылку с http:// или https:// без логина и пароля.";
    else if(!Object.hasOwn(CATS,category))error="Выбери раздел.";
    else if(!id && saved.custom.length>=100)error="Достигнут лимит 100 добавленных ссылок.";
    if(error){$("#formError").textContent=error;$("#formError").hidden=false;return;}
    const item={id:id||"custom-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8),name,url,description,category,icon:CATS[category].icon,tag:"Моя ссылка"};
    if(id)saved.custom=saved.custom.map(p=>p.id===id?item:p);
    else saved.custom.push(item);
    saved.favorites=saved.favorites.filter(x=>x!==item.id);
    if($("#projectFavorite").checked)saved.favorites.push(item.id);
    persist();$("#projectDialog").close();search="";$("#search").value="";setSection(category);render();toast(id?"Ссылка обновлена":"Ссылка добавлена");
  });
  function downloadSettings() {
    const data={version:1,exportedAt:new Date().toISOString(),custom:saved.custom,favorites:saved.favorites,theme:saved.theme};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json;charset=utf-8"});
    const href=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=href;a.download="struny-hub-backup.json";
    document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),1000);
    toast("Резервная копия сохранена");
  }
  $("#exportButton").addEventListener("click",downloadSettings);
  $("#importButton").addEventListener("click",()=>{$("#importError").hidden=true;$("#importFile").value="";$("#importDialog").showModal();});
  ["closeImport","cancelImport"].forEach(id=>$("#"+id).addEventListener("click",()=>$("#importDialog").close()));
  $("#confirmImport").addEventListener("click",async()=>{
    const input=$("#importFile").files?.[0], err=$("#importError");err.hidden=true;
    if(!input){err.textContent="Выбери JSON-файл.";err.hidden=false;return;}
    if(input.size>1024*512){err.textContent="Файл слишком большой (максимум 512 КБ).";err.hidden=false;return;}
    try {
      const data=JSON.parse(await input.text());
      if(!data || data.version!==1 || !Array.isArray(data.custom)||data.custom.length>100||!data.custom.every(validCustom)||!Array.isArray(data.favorites)||data.favorites.length>200||!data.favorites.every(x=>typeof x==="string"))throw Error("Неверная структура данных");
      if(new Set(data.custom.map(x=>x.id)).size!==data.custom.length)throw Error("Повторяющиеся идентификаторы");
      saved.custom=data.custom.map(x=>({id:x.id,name:x.name,url:safeUrl(x.url),description:x.description,category:x.category,icon:CATS[x.category].icon,tag:"Моя ссылка"}));
      saved.favorites=data.favorites;
      saved.theme=["paper","night","sage"].includes(data.theme)?data.theme:"paper";
      theme(saved.theme);persist();$("#importDialog").close();setSection("all");toast("Настройки импортированы");
    }catch(e){err.textContent="Не удалось импортировать: "+(e.message||"неверный файл");err.hidden=false;}
  });
  document.addEventListener("keydown",e=>{
    const typing=["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#search").focus();$("#search").select();}
    else if(e.key==="/"&&!typing&&!e.ctrlKey&&!e.metaKey){e.preventDefault();$("#search").focus();}
    else if(e.key==="Escape"){if(!$("#sidebar").classList.contains("open"))return;showMenu(false);}
  });
  $("#year").textContent=new Date().getFullYear();
  render();
})();
