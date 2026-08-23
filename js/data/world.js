const R=(x,y,w,h,type='solid',extra={})=>({x,y,w,h,type,...extra});
export const BUILDINGS=[
  {id:'home',name:'Your Cottage',x:170,y:1180,w:240,h:185,roof:'#744a38',door:{x:276,y:1334,w:36,h:31},interior:'home'},
  {id:'general',name:'Merewyn’s Mercantile',x:865,y:620,w:270,h:200,roof:'#70413a',door:{x:982,y:786,w:38,h:34},interior:'general'},
  {id:'smith',name:'Rook & Anvil',x:1325,y:650,w:265,h:200,roof:'#4e5050',door:{x:1439,y:817,w:38,h:33},interior:'smith'},
  {id:'tavern',name:'The Crown & Thistle',x:890,y:1030,w:320,h:220,roof:'#704035',door:{x:1030,y:1216,w:40,h:34},interior:'tavern'},
  {id:'chapel',name:'Chapel of Saint Edda',x:1645,y:400,w:240,h:265,roof:'#57545a',door:{x:1745,y:630,w:40,h:35},interior:'chapel'},
  {id:'apothecary',name:'The Green Mortar',x:520,y:600,w:245,h:190,roof:'#4d623d',door:{x:622,y:756,w:38,h:33},interior:'apothecary'},
  {id:'mill',name:'River Mill',x:1935,y:1100,w:260,h:200,roof:'#695343',door:{x:2047,y:1266,w:38,h:34},interior:null},
  {id:'manor',name:'Briarhold Manor',x:1480,y:1160,w:420,h:260,roof:'#54515a',door:{x:1665,y:1385,w:42,h:35},interior:null}
];
export const TREES=[
  [70,160],[170,210],[300,130],[440,210],[600,120],[740,190],[2140,180],[2250,260],[2050,350],[2180,480],[2250,650],[2050,790],[120,820],[240,720],[330,860],[80,970],[205,1030],[420,980],[2240,970],[2150,1430],[2020,1510],[1850,1570],[560,1540],[370,1580],[160,1510],[760,1450],[670,1300],[430,1290],[1510,180],[1650,145],[1800,170]
].map(([x,y],i)=>({id:'tree'+i,x,y,r:28}));
export const COLLIDERS=[
  R(0,0,2400,24),R(0,1736,2400,24),R(0,0,24,1760),R(2376,0,24,1760),
  R(0,310,780,150,'water'),R(1890,310,510,150,'water'),R(780,310,1110,55,'bridgebank'),
  R(1875,310,35,850,'water'),R(1910,845,490,155,'water'),
  ...BUILDINGS.map(b=>R(b.x,b.y,b.w,b.h-28,'building',{id:b.id})),
  ...TREES.map(t=>R(t.x-22,t.y-16,44,32,'tree',{id:t.id})),
  R(1080,350,65,180,'well'),R(1260,1130,120,40,'fence'),R(1260,1450,500,34,'fence'),R(1760,1420,34,65,'fence')
];
export const INTERIORS={
  home:{name:'Your Cottage',w:760,h:480,spawn:{x:380,y:398},exit:{x:340,y:420,w:80,h:45},floor:'#9d805d',walls:[R(0,0,760,44),R(0,0,44,480),R(716,0,44,480),R(0,436,335,44),R(425,436,335,44)],props:[R(100,95,140,90,'bed'),R(500,88,120,60,'fireplace'),R(285,160,160,72,'table'),R(110,310,110,55,'chest')],shop:null},
  general:{name:'Merewyn’s Mercantile',w:820,h:500,spawn:{x:410,y:415},exit:{x:360,y:438,w:100,h:45},floor:'#a9895c',walls:[R(0,0,820,44),R(0,0,44,500),R(776,0,44,500),R(0,456,360,44),R(460,456,360,44)],props:[R(130,120,560,50,'counter'),R(90,250,140,45,'shelf'),R(590,250,140,45,'shelf'),R(310,300,200,55,'display')],shop:'general'},
  smith:{name:'Rook & Anvil',w:820,h:500,spawn:{x:410,y:415},exit:{x:360,y:438,w:100,h:45},floor:'#6f6860',walls:[R(0,0,820,44),R(0,0,44,500),R(776,0,44,500),R(0,456,360,44),R(460,456,360,44)],props:[R(100,120,155,80,'forge'),R(320,140,150,60,'anvil'),R(530,110,180,55,'counter'),R(555,255,145,48,'rack')],shop:'smith'},
  tavern:{name:'The Crown & Thistle',w:900,h:540,spawn:{x:450,y:460},exit:{x:400,y:485,w:100,h:45},floor:'#805f45',walls:[R(0,0,900,44),R(0,0,44,540),R(856,0,44,540),R(0,496,400,44),R(500,496,400,44)],props:[R(105,100,690,45,'bar'),R(130,235,180,70,'table'),R(365,235,180,70,'table'),R(600,235,180,70,'table'),R(705,380,90,60,'fireplace')],shop:null},
  chapel:{name:'Chapel of Saint Edda',w:720,h:600,spawn:{x:360,y:525},exit:{x:310,y:550,w:100,h:45},floor:'#8a8577',walls:[R(0,0,720,44),R(0,0,44,600),R(676,0,44,600),R(0,556,310,44),R(410,556,310,44)],props:[R(260,80,200,70,'altar'),R(125,235,170,40,'pew'),R(425,235,170,40,'pew'),R(125,340,170,40,'pew'),R(425,340,170,40,'pew')],shop:null},
  apothecary:{name:'The Green Mortar',w:760,h:500,spawn:{x:380,y:420},exit:{x:330,y:438,w:100,h:45},floor:'#817557',walls:[R(0,0,760,44),R(0,0,44,500),R(716,0,44,500),R(0,456,330,44),R(430,456,330,44)],props:[R(120,110,520,50,'counter'),R(90,240,130,50,'shelf'),R(540,240,130,50,'shelf'),R(310,285,140,80,'table')],shop:'apothecary'}
};
export const LANDMARKS=[
 {x:1110,y:455,label:'Old Bridge'},{x:1080,y:530,label:'Brackenvale Square'},{x:360,y:520,label:'West Fields'},{x:2050,y:1030,label:'Millwater'},{x:1600,y:1080,label:'Briarhold Rise'}
];
