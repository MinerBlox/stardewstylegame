import {Game} from './Game.js';

const baseDrawWorld=Game.prototype.drawWorld;
Game.prototype.drawWorld=function(c){baseDrawWorld.call(this,c);this.drawWorldDetails(c)};

Game.prototype.drawBuilding=function(c,b){
 const night=this.time.h>=19||this.time.h<6;
 c.fillStyle='#00000025';c.fillRect(b.x+12,b.y+78,b.w,b.h-35);
 c.fillStyle='#716b5e';c.fillRect(b.x,b.y+58,b.w,b.h-58);
 c.fillStyle='#817a69';c.fillRect(b.x+6,b.y+64,b.w-12,b.h-70);
 c.fillStyle='#594434';c.fillRect(b.x+18,b.y+72,6,b.h-86);c.fillRect(b.x+b.w-24,b.y+72,6,b.h-86);c.fillRect(b.x+18,b.y+116,b.w-36,5);
 c.fillStyle=b.roof;c.beginPath();c.moveTo(b.x-18,b.y+70);c.lineTo(b.x+b.w/2,b.y-4);c.lineTo(b.x+b.w+18,b.y+70);c.closePath();c.fill();
 c.strokeStyle='#3d2d29aa';c.lineWidth=3;for(let yy=b.y+20;yy<b.y+68;yy+=13){c.beginPath();c.moveTo(b.x+18,yy);c.lineTo(b.x+b.w-18,yy);c.stroke()}
 c.fillStyle='#b18a58';c.fillRect(b.x-8,b.y+66,b.w+16,7);
 const winY=b.y+94;for(let x=b.x+34;x<b.x+b.w-36;x+=82){c.fillStyle='#443a32';c.fillRect(x-3,winY-3,34,36);c.fillStyle=night?'#d8a85b':'#5d7b82';c.fillRect(x+2,winY+2,24,26);c.fillStyle=night?'#f0cb7b55':'#cce0d122';c.fillRect(x+4,winY+4,8,20);c.fillStyle='#8e774c';c.fillRect(x+13,winY+2,2,26);c.fillRect(x+2,winY+14,24,2)}
 c.fillStyle='#3a2922';c.fillRect(b.door.x-4,b.door.y-4,b.door.w+8,b.door.h+4);c.fillStyle='#9a7043';c.fillRect(b.door.x,b.door.y,b.door.w,b.door.h);c.fillStyle='#cda45f';c.fillRect(b.door.x+5,b.door.y+5,b.door.w-10,5);c.fillStyle='#2a211b';c.fillRect(b.door.x+b.door.w-8,b.door.y+18,3,3);
 if(['smith','tavern','general'].includes(b.id)){c.fillStyle='#57443b';c.fillRect(b.x+b.w-48,b.y+8,22,46);c.fillStyle='#665046';c.fillRect(b.x+b.w-52,b.y+5,30,8);const t=performance.now()/1000;c.fillStyle='#d8d2c455';for(let i=0;i<3;i++){const sx=b.x+b.w-38+Math.sin(t+i)*6,sy=b.y-5-i*14;c.beginPath();c.arc(sx,sy,8+i*2,0,Math.PI*2);c.fill()}}
 c.font='bold 13px Georgia';c.textAlign='center';c.fillStyle='#211914dd';c.fillRect(b.x+b.w/2-82,b.y+b.h+8,164,23);c.strokeStyle='#85643e';c.strokeRect(b.x+b.w/2-82,b.y+b.h+8,164,23);c.fillStyle='#ead9a9';c.fillText(b.name,b.x+b.w/2,b.y+b.h+24)
};

Game.prototype.drawTree=function(c,x,y){
 const sway=Math.sin(performance.now()/900+x*.02)*1.4;
 c.fillStyle='#00000028';c.beginPath();c.ellipse(x+6,y+40,33,12,0,0,Math.PI*2);c.fill();
 c.fillStyle='#4e3627';c.fillRect(x-8,y+8,17,42);c.fillStyle='#7b5838';c.fillRect(x-4,y+10,5,34);
 c.save();c.translate(sway,0);const blobs=[[-18,-4,26,'#2b4a31'],[14,-8,28,'#35593a'],[-2,-26,28,'#3d653f'],[-26,-23,20,'#315438'],[24,-28,20,'#467047']];for(const [dx,dy,r,col] of blobs){c.fillStyle=col;c.beginPath();c.arc(x+dx,y+dy,r,0,Math.PI*2);c.fill()}c.fillStyle='#709153';for(const [dx,dy] of [[-30,-27],[-10,-43],[18,-43],[32,-19],[-3,-12],[14,-21]])c.fillRect(x+dx,y+dy,5,5);c.fillStyle='#93a966';for(const [dx,dy] of [[-16,-34],[24,-35],[4,-48]])c.fillRect(x+dx,y+dy,3,3);c.restore()
};

Game.prototype.drawPerson=function(c,p,isPlayer=false){
 const x=p.x,y=p.y,bob=(p.moving||!isPlayer)?Math.sin(p.walk)*1.2:0,step=Math.sin(p.walk)*3;
 c.save();c.translate(Math.round(x),Math.round(y+bob));c.fillStyle='#0005';c.beginPath();c.ellipse(0,14,12,5,0,0,Math.PI*2);c.fill();
 const skin=isPlayer?'#d6a071':p.skin,hair=isPlayer?'#5c402e':p.hair,clothes=isPlayer?'#3f6257':p.clothes;
 c.fillStyle='#2d2926';c.fillRect(-9+step*.3,15,7,8);c.fillRect(2-step*.3,15,7,8);
 c.fillStyle=clothes;c.fillRect(-10,-3,20,20);c.fillStyle='#ffffff18';c.fillRect(-8,-1,4,13);c.fillStyle='#7a5834';c.fillRect(-10,9,20,3);
 c.fillStyle=skin;c.fillRect(-12,0,4,13);c.fillRect(8,0,4,13);c.fillRect(-8,-19,16,15);
 c.fillStyle=hair;if(p.dir==='north'){c.fillRect(-9,-22,18,11);c.fillRect(-9,-13,4,5);c.fillRect(5,-13,4,5)}else{c.fillRect(-9,-22,18,7);c.fillRect(-9,-18,4,6);c.fillRect(5,-18,4,6)}
 c.fillStyle='#29201c';if(p.dir==='west')c.fillRect(-8,-12,2,2);else if(p.dir==='east')c.fillRect(6,-12,2,2);else if(p.dir==='south'){c.fillRect(-5,-12,2,2);c.fillRect(3,-12,2,2)}
 if(isPlayer){c.fillStyle='#b9954e';c.fillRect(-11,-5,3,17);c.fillRect(8,-5,3,17)}c.restore();
 if(!isPlayer&&Math.hypot(this.player.x-p.x,this.player.y-p.y)<165){c.font='11px Georgia';c.textAlign='center';const w=Math.max(54,c.measureText(p.name).width+14);c.fillStyle='#1b1510d9';c.fillRect(x-w/2,y+28,w,17);c.strokeStyle='#6f5738';c.strokeRect(x-w/2,y+28,w,17);c.fillStyle='#eadfbf';c.fillText(p.name,x,y+40)}
};

Game.prototype.drawWorldDetails=function(c){
 const phase=performance.now()/700;
 for(const s of [{x:940,y:455,col:'#8a4d43'},{x:1225,y:455,col:'#4f6d68'}]){c.fillStyle='#493326';c.fillRect(s.x,s.y+18,8,58);c.fillRect(s.x+82,s.y+18,8,58);c.fillStyle=s.col;c.fillRect(s.x-6,s.y,102,23);for(let i=0;i<5;i++){c.fillStyle=i%2?'#d3b36e':s.col;c.fillRect(s.x-6+i*20,s.y,20,23)}c.fillStyle='#765337';c.fillRect(s.x,s.y+50,90,14);c.fillStyle='#c89c52';for(let i=0;i<4;i++)c.fillRect(s.x+9+i*19,s.y+43,8,7)}
 for(const [x,y] of [[820,845],[1610,880],[1260,1010],[790,1060]]){c.fillStyle='#6d4d31';c.fillRect(x,y,26,24);c.strokeStyle='#a27645';c.strokeRect(x+3,y+3,20,18);c.beginPath();c.moveTo(x+4,y+4);c.lineTo(x+22,y+20);c.moveTo(x+22,y+4);c.lineTo(x+4,y+20);c.stroke()}
 for(const [x,y] of [[850,850],[1638,882],[1230,1015]]){c.fillStyle='#705038';c.fillRect(x,y,18,26);c.fillStyle='#9b7248';c.fillRect(x-2,y+5,22,3);c.fillRect(x-2,y+18,22,3)}
 for(const [x,y] of [[590,920],[610,960],[520,1380]]){c.fillStyle='#b99b49';c.fillRect(x,y,34,20);c.strokeStyle='#d2b762';c.strokeRect(x+3,y+3,28,14);c.fillStyle='#7d6736';c.fillRect(x+16,y,3,20)}
 const flowers=[[470,520],[510,540],[450,570],[720,610],[745,590],[1380,530],[1410,510],[1780,760],[1810,780],[680,1120],[710,1140],[2130,1180],[2160,1200]];
 const cols=['#d8c06b','#d5817c','#b79bd2','#e5ddd0'];flowers.forEach(([x,y],i)=>{c.fillStyle='#3f6b3e';c.fillRect(x,y+3,2,6);c.fillStyle=cols[i%cols.length];c.fillRect(x-2,y,5,4)});
 for(const [x,y] of [[980,575],[1270,575]]){c.fillStyle='#63452f';c.fillRect(x,y,65,8);c.fillRect(x+5,y+8,5,15);c.fillRect(x+55,y+8,5,15);c.fillStyle='#86603d';c.fillRect(x+2,y-10,61,7)}
 for(const [x,y] of [[930,530],[1280,530],[1515,965],[1040,940]]){c.fillStyle='#44362b';c.fillRect(x,y,5,50);c.fillRect(x-6,y,17,4);c.fillStyle='#d9aa52';c.fillRect(x-4,y+4,13,14);if(this.time.h>=19||this.time.h<6){const g=c.createRadialGradient(x+2,y+12,2,x+2,y+12,42);g.addColorStop(0,'rgba(244,190,91,.30)');g.addColorStop(1,'rgba(244,190,91,0)');c.fillStyle=g;c.fillRect(x-40,y-30,84,84)}}
 c.save();c.globalAlpha=.45;c.fillStyle='#9ac1c7';for(let yy=480;yy<980;yy+=38){const xx=1900+((Math.sin(phase+yy*.04)+1)*70);c.fillRect(xx,yy,70,3)}c.restore();
 for(let i=0;i<3;i++){const bx=690+i*120+Math.sin(phase+i)*12,by=820+i*55+Math.cos(phase*1.3+i)*8;c.fillStyle=i%2?'#e2c46f':'#d9a2c7';c.fillRect(bx-4,by,3,3);c.fillRect(bx+2,by,3,3);c.fillStyle='#453628';c.fillRect(bx,by+1,2,3)}
};
