import {Game} from './Game.js';
import {ITEMS,SHOPS} from '../data/items.js';
import {INTERIORS} from '../data/world.js';

const iconArt={
 bread:'<rect x="6" y="11" width="21" height="12" rx="5" fill="#d8a049" transform="rotate(-28 16 16)"/><path d="M11 18l3-4M16 15l3-4M21 13l2-3" stroke="#7e4d27" stroke-width="2"/>',
 apple:'<rect x="16" y="4" width="3" height="8" fill="#65422d"/><path d="M18 8c4-5 8-2 8-2-2 4-5 5-8 2" fill="#4f7b3f"/><circle cx="13" cy="18" r="8" fill="#b94336"/><circle cx="20" cy="18" r="8" fill="#c84c3b"/>',
 herb:'<path d="M16 27V7" stroke="#426b3d" stroke-width="3"/><ellipse cx="10" cy="12" rx="7" ry="4" fill="#5f8f50" transform="rotate(28 10 12)"/><ellipse cx="22" cy="16" rx="7" ry="4" fill="#6d9e58" transform="rotate(-28 22 16)"/>',
 seed:'<path d="M9 9h14l4 17H5L9 9z" fill="#b58a55"/><rect x="9" y="7" width="14" height="4" fill="#6f5034"/><circle cx="12" cy="18" r="2" fill="#d1b65d"/><circle cx="20" cy="18" r="2" fill="#d1b65d"/>',
 torch:'<rect x="14" y="14" width="5" height="15" fill="#70472d"/><path d="M16 16c-8-4-3-12 2-14-1 5 6 5 4 11 0 4-3 6-6 3z" fill="#d65e32"/><path d="M17 14c-4-3-1-7 2-9 0 3 3 4 1 8-1 2-2 2-3 1z" fill="#f3bd50"/>',
 rod:'<path d="M7 27C8 12 14 5 26 5" fill="none" stroke="#7a5636" stroke-width="3"/><path d="M25 5v17c0 4-5 4-5 0" fill="none" stroke="#b6aa86" stroke-width="1.5"/>',
 pick:'<rect x="15" y="10" width="4" height="20" fill="#765032" transform="rotate(25 17 20)"/><path d="M5 9c7-5 15-5 23 0l-2 4c-7-4-13-4-19 0L5 9z" fill="#70757a"/>',
 axe:'<rect x="15" y="9" width="4" height="22" fill="#765032" transform="rotate(18 17 20)"/><path d="M8 7h13l5 5-8 7-10-3V7z" fill="#73787a"/>',
 sword:'<path d="M8 25l16-18 3 3-17 17-2-2z" fill="#aab0b1"/><rect x="7" y="21" width="11" height="3" fill="#8b6a3c" transform="rotate(-45 12 22)"/>',
 shield:'<path d="M6 6h20v11c0 7-5 11-10 14C11 28 6 24 6 17V6z" fill="#765234"/><path d="M16 7v19M8 14h16" stroke="#9b9b91" stroke-width="3"/>',
 ore:'<path d="M5 22l4-12 11-5 8 8-3 12-13 3-7-6z" fill="#646862"/><rect x="11" y="12" width="5" height="4" fill="#8c7d63"/>',
 cloth:'<path d="M8 8c10-4 16 0 16 7v11H8V8z" fill="#80614f"/><path d="M10 11h12M10 15h12M10 19h12M10 23h12" stroke="#b89978" stroke-width="1.5"/>',
 trout:'<path d="M5 17c6-8 14-9 21-2l4-4v11l-4-4c-7 7-15 6-21-1z" fill="#638697"/><circle cx="11" cy="15" r="1.5" fill="#172026"/>'
};

Game.prototype.itemIcon=function(id){return `<svg class="item-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${iconArt[id]||iconArt.ore}</svg>`};

const baseUpdate=Game.prototype.update;
Game.prototype.update=function(dt){for(let i=1;i<=8;i++)if(this.input.hit(String(i)))this.selected=i-1;baseUpdate.call(this,dt)};

Game.prototype.render=function(){const c=this.ctx;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,this.viewW,this.viewH);c.fillStyle='#132019';c.fillRect(0,0,this.viewW,this.viewH);const room=this.scene==='world'?null:INTERIORS[this.interiorId],ox=room?Math.max(0,(this.viewW-room.w)/2):0,oy=room?Math.max(0,(this.viewH-room.h)/2):0;c.save();c.translate(ox-Math.round(this.camera.x),oy-Math.round(this.camera.y));if(this.scene==='world')this.drawWorld(c);else this.drawInterior(c,room);this.drawEntities(c);c.restore();this.drawLighting(c)};

Game.prototype.handleInteractions=function(){const it=this.interactable();if(this.isLocked()&&!this.dialogue){this.ui.prompt.classList.add('hidden')}else if(it){this.ui.prompt.textContent=`E — ${it.label}`;this.ui.prompt.classList.remove('hidden')}else this.ui.prompt.classList.add('hidden');if(this.dialogue&&this.input.hit('e','E',' ','Enter')){this.advanceDialogue();return}if(!it||this.isLocked()||!this.input.hit('e','E'))return;this.playTone(360,.04);if(it.type==='door')this.enter(it.data);else if(it.type==='exit')this.exitInterior();else if(it.type==='shop')this.openShop(it.shop);else if(it.type==='npc')this.talk(it.data)};

Game.prototype.openShop=function(id){const s=SHOPS[id];this.ui.shopName.textContent=s.name;this.ui.shopSubtitle.textContent=s.subtitle;this.ui.shopGrid.innerHTML='';s.stock.forEach(([itemId,price])=>{const d=ITEMS[itemId],el=document.createElement('div');el.className='shop-item';el.innerHTML=`<div class="icon">${this.itemIcon(itemId)}</div><div><strong>${d.name}</strong><small>${d.description}</small></div><div class="price">◉ ${price}</div>`;el.onclick=()=>this.buy(itemId,price);this.ui.shopGrid.append(el)});this.ui.shop.classList.remove('hidden')};

Game.prototype.renderInventory=function(){this.ui.inventoryGrid.innerHTML='';this.inventory.slots.forEach(s=>{const el=document.createElement('div');el.className='inventory-slot';if(s){const d=ITEMS[s.id];el.innerHTML=`<span class="icon">${this.itemIcon(s.id)}</span><span class="qty">${s.qty>1?s.qty:''}</span>`;el.onclick=()=>{this.ui.itemDetails.innerHTML=`<h3>${d.name}</h3><p>${d.description}</p><p><small>${d.category.toUpperCase()} · value ◉ ${d.value}</small></p>`}}this.ui.inventoryGrid.append(el)});this.renderHotbar()};

Game.prototype.renderHotbar=function(){this.ui.hotbar.innerHTML='';for(let i=0;i<8;i++){const s=this.inventory.slots[i],el=document.createElement('div');el.className='hot-slot'+(i===this.selected?' selected':'');if(s)el.innerHTML=`<b>${this.itemIcon(s.id)}</b><small>${s.qty>1?s.qty:''}</small>`;this.ui.hotbar.append(el)}};

const style=document.createElement('style');style.textContent='.item-svg{width:30px;height:30px;display:block;margin:auto;shape-rendering:geometricPrecision}.hot-slot .item-svg{width:28px;height:28px}';document.head.append(style);
