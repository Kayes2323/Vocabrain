import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const sharp = require('sharp');
const OUT='../out/';
const order = ['backpack','body','footR','footL','tag','mask','notebook','armRight','armLeft','mouth','eyeR','eyeL','pencil']; // back -> front
const base = await sharp({create:{width:1536,height:1024,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).png().toBuffer();
const comp = await sharp(base).composite(order.map(n=>({input:OUT+`layer-${n}.png`}))).raw().toBuffer();
await sharp(comp,{raw:{width:1536,height:1024,channels:4}}).png().toFile(OUT+'recomposite.png');
const src = await sharp('master.png').ensureAlpha().raw().toBuffer();
const N=1536*1024; let diffPx=0, maxD=0, sum=0, alphaDiff=0; const vis = Buffer.alloc(N*4);
const hist={0:0,'1-2':0,'3-8':0,'9-32':0,'33+':0};
for(let i=0;i<N;i++){
  // compare premultiplied-on-lavender so invisible rgb of alpha 0 is ignored
  const sa=src[i*4+3]/255, ca=comp[i*4+3]/255;
  let d=0;
  for(let c=0;c<3;c++){ const s=src[i*4+c]*sa+217*(1-sa), q=comp[i*4+c]*ca+217*(1-ca); d=Math.max(d,Math.abs(s-q)); }
  d=Math.max(d,Math.abs(src[i*4+3]-comp[i*4+3]));
  if(d>0){diffPx++; sum+=d;} if(d>maxD)maxD=d;
  if(d===0)hist[0]++; else if(d<=2)hist['1-2']++; else if(d<=8)hist['3-8']++; else if(d<=32)hist['9-32']++; else hist['33+']++;
  const v=Math.min(255,d*8); vis[i*4]=v; vis[i*4+1]=0; vis[i*4+2]=0; vis[i*4+3]=255;
}
await sharp(vis,{raw:{width:1536,height:1024,channels:4}}).png().toFile(OUT+'diff-heat.png');
console.log(JSON.stringify({diffPx, pct:(100*diffPx/N).toFixed(4), maxD, meanOverDiff:(sum/Math.max(1,diffPx)).toFixed(2), hist},null,1));
