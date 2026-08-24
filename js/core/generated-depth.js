import {Game} from './Game.js';

// The original depth pass redrew procedural green tree circles over the player.
// Generated trees already include complete canopies, so keep entity sorting but remove that placeholder overlay.
Game.prototype.drawEntities=function(c){
  const list=[];
  for(const n of this.npcs)if(n.scene===this.scene)list.push({kind:'npc',y:n.y,obj:n});
  list.push({kind:'player',y:this.player.y,obj:this.player});
  list.sort((a,b)=>a.y-b.y);
  for(const e of list)this.drawPerson(c,e.obj,e.kind==='player');
};
