(()=>{
const seedInput=document.getElementById('world-seed'),host=document.getElementById('world-map-host'),notice=document.getElementById('map-notice');
state.worldMap??={lastSeed:'',recent:[]};state.worldMap.mask??=32767;seedInput.value=state.worldMap.lastSeed||'';let activeSeed='',iframe=null;
const mapUrl=seed=>'https://vegvisr.vercel.app/?seed='+encodeURIComponent(seed)+'&k='+state.worldMap.mask.toString(36);
const pageUrl=seed=>mapUrl(seed);
function history(){document.getElementById('seed-history').innerHTML=state.worldMap.recent.map(seed=>`<button type="button" data-seed="${safe(seed)}" aria-label="Cargar semilla ${safe(seed)}">${safe(seed)}</button>`).join('')}
function load(seed){if(!seed.trim()||seed.length>10){seedInput.setCustomValidity('Introduce una semilla de 1 a 10 caracteres.');seedInput.reportValidity();return}seedInput.setCustomValidity('');activeSeed=seed;seedInput.value=seed;state.worldMap.lastSeed=seed;state.worldMap.recent=[seed,...state.worldMap.recent.filter(s=>s!==seed)].slice(0,5);save();history();document.getElementById('map-actions').hidden=false;const link=document.getElementById('map-external');link.href=pageUrl(seed);link.textContent='Abrir mapa de '+seed+' ↗';notice.textContent='Visor del mundo «'+seed+'». El terreno y las ubicaciones se generan en tu navegador y pueden tardar en aparecer. Usa los filtros para elegir qué puntos mostrar.';iframe=document.createElement('iframe');iframe.title='Mapa completo de Valheim · semilla '+seed;iframe.allow='fullscreen';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.src=mapUrl(seed);host.replaceChildren(iframe)}
document.getElementById('worldmap-form').addEventListener('submit',e=>{e.preventDefault();load(seedInput.value)});seedInput.addEventListener('input',()=>seedInput.setCustomValidity(''));
document.getElementById('seed-history').addEventListener('click',e=>{const b=e.target.closest('[data-seed]');if(b)load(b.dataset.seed)});
document.getElementById('map-reload').addEventListener('click',()=>{if(activeSeed)load(activeSeed)});
document.getElementById('map-fullscreen').addEventListener('click',async()=>{try{if(!document.fullscreenElement)await host.requestFullscreen();else await document.exitFullscreen()}catch{notice.textContent='Pantalla completa no disponible aquí. Usa «Abrir mapa completo» para verlo en otra pestaña.'}});
const categories=['Inicio','Bosses','Comerciantes','Criptas','Campamentos','Cuevas','Minas','Fortalezas','Piedras rúnicas','Ruinas','Aldeas','Naufragios','Monumentos','Recursos y nidos','Misterios'];
function filters(){document.getElementById('map-categories').innerHTML=categories.map((name,id)=>`<label><input type="checkbox" data-map-kind="${id}" ${state.worldMap.mask&(1<<id)?'checked':''}>${name}</label>`).join('')}
function applyMask(mask){state.worldMap.mask=mask;filters();save();if(activeSeed)load(activeSeed)}
document.getElementById('map-categories').addEventListener('change',e=>{if(e.target.dataset.mapKind===undefined)return;const bit=1<<Number(e.target.dataset.mapKind);applyMask(e.target.checked?state.worldMap.mask|bit:state.worldMap.mask&~bit)});
document.getElementById('map-all').addEventListener('click',()=>applyMask(32767));document.getElementById('map-essentials').addEventListener('click',()=>applyMask(7));
history();filters();
})();
