export const ITEMS={
  bread:{id:'bread',name:'Hearth Loaf',icon:'🥖',description:'A warm village loaf. Restores a little vigour.',category:'food',value:8,stackLimit:20,usable:true},
  apple:{id:'apple',name:'Red Orchard Apple',icon:'🍎',description:'Crisp fruit from Brackenvale orchards.',category:'food',value:5,stackLimit:30,usable:true},
  herb:{id:'herb',name:'Kingsfoil Sprig',icon:'🌿',description:'A fragrant medicinal herb prized by healers.',category:'material',value:12,stackLimit:30,usable:false},
  seed:{id:'seed',name:'Barley Seed',icon:'🌾',description:'A small sack of hardy barley seed.',category:'seed',value:10,stackLimit:40,usable:false},
  torch:{id:'torch',name:'Pitch Torch',icon:'🔥',description:'A stout torch wrapped with resin-soaked cloth.',category:'tool',value:22,stackLimit:5,usable:true},
  rod:{id:'rod',name:'Ashwood Rod',icon:'🎣',description:'A flexible fishing rod made near the river mill.',category:'tool',value:45,stackLimit:1,usable:false},
  pick:{id:'pick',name:'Iron Pick',icon:'⛏️',description:'Made for stone, ore and stubborn old walls.',category:'tool',value:65,stackLimit:1,usable:false},
  axe:{id:'axe',name:'Woodsman Axe',icon:'🪓',description:'A balanced iron axe with an oiled ash handle.',category:'tool',value:58,stackLimit:1,usable:false},
  sword:{id:'sword',name:'Militia Sword',icon:'🗡️',description:'Plain, dependable steel issued to village guards.',category:'weapon',value:95,stackLimit:1,usable:false},
  shield:{id:'shield',name:'Oak Buckler',icon:'🛡️',description:'Layered oak edged with a narrow iron band.',category:'weapon',value:80,stackLimit:1,usable:false},
  ore:{id:'ore',name:'Bog Iron',icon:'🪨',description:'A heavy lump of workable local iron ore.',category:'material',value:16,stackLimit:40,usable:false},
  cloth:{id:'cloth',name:'Linen Roll',icon:'🧶',description:'Undyed linen traded from the southern road.',category:'material',value:20,stackLimit:20,usable:false},
  trout:{id:'trout',name:'Silver Trout',icon:'🐟',description:'A clean river fish from beneath the old bridge.',category:'food',value:18,stackLimit:20,usable:true}
};
export const SHOPS={
  general:{name:'Merewyn’s Mercantile',subtitle:'Food, seed and useful household goods',stock:[['bread',8],['apple',5],['seed',10],['torch',22],['cloth',20]]},
  smith:{name:'Rook & Anvil',subtitle:'Tools and honest ironwork',stock:[['pick',65],['axe',58],['sword',95],['shield',80],['ore',16]]},
  apothecary:{name:'The Green Mortar',subtitle:'Herbs, simples and river remedies',stock:[['herb',12],['bread',9],['trout',18]]}
};
