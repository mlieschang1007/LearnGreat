import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(path.join(dist,'src'),{recursive:true});
for(const f of ['index.html','public/favicon.svg','src/app.js','src/style.css','src/generated-data.js']) {
 const destination=f.startsWith('public/')?f.slice(7):f;
 fs.copyFileSync(path.join(root,f),path.join(dist,destination));
}
fs.writeFileSync(path.join(dist,'.nojekyll'),'');
console.log('✓ dist/ 已建立，可部署至 GitHub Pages');
