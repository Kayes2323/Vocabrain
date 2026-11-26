import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(new URL('../../../package.json', import.meta.url));
const sharp = require('sharp');
const N=1536*1024; const OWN=fs.readFileSync('../out/ownership.bin'); const st=JSON.parse(fs.readFileSync('../out/stats.json'));
const src=await sharp('master.png').ensureAlpha().raw().toBuffer(); const rc=await sharp('../out/recomposite.png').ensureAlpha().raw().toBuffer();
const by={}; 
for(let i=0;i<N;i++){ const sa=src[i*4+3]/255, ca=rc[i*4+3]/255; let d=Math.abs(src[i*4+3]-rc[i*4+3]); for(let c=0;c<3;c++){ d=Math.max(d,Math.abs(src[i*4+c]*sa+217*(1-sa)-(rc[i*4+c]*ca+217*(1-ca)))); }
  if(d>0){ const n=st.LAYERS[OWN[i]-1]||'none'; by[n]=by[n]||{px:0,max:0}; by[n].px++; by[n].max=Math.max(by[n].max,d);} }
console.log(JSON.stringify(by));
