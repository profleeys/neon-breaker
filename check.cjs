const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements=new Map(),saved={};const context={console,Math,localStorage:{getItem:k=>saved[k],setItem:(k,v)=>saved[k]=v},requestAnimationFrame:()=>{},window:{addEventListener:()=>{}},document:{querySelector:s=>{if(!elements.has(s))elements.set(s,{style:{},textContent:'',innerHTML:'',addEventListener:()=>{},getContext:()=>({})});return elements.get(s)},addEventListener:()=>{}}};vm.createContext(context);vm.runInContext(fs.readFileSync('dist/game.js','utf8'),context);vm.runInContext(`
start(); if(mode!=='ready'||lives!==3)throw Error('start');launch();if(mode!=='playing'||balls[0].vy>=0)throw Error('launch');
effect('multi');if(balls.length!==3)throw Error('multi');effect('wide');if(paddle.w!==180)throw Error('wide');effect('fast');if(speedEffect!==1)throw Error('fast');effect('slow');if(speedEffect!==-1)throw Error('slow');
bricks.forEach(b=>b.hp=0);update(.01);if(score!==1||mode!=='next'||best!==1)throw Error('level scoring');start();if(level!==2||mode!=='ready'||!bricks.some(b=>b.hp>1))throw Error('difficulty');
launch();pause();if(mode!=='paused')throw Error('pause');start();if(mode!=='playing')throw Error('resume');
for(let i=0;i<3;i++){balls=[];mode='playing';update(.01)}if(mode!=='over'||lives!==0)throw Error('gameover');
`,context);assert.equal(saved['neon-breaker-best'],'1');console.log('PASS: launch, all power-ups, scoring, persistence, difficulty, pause, game over');
