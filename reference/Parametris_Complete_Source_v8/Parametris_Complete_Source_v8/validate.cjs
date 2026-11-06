const fs=require('fs'),vm=require('vm'),assert=require('assert');
const input=['data.js','products.js','app.js'].map(f=>fs.readFileSync('dist/'+f,'utf8')).join('\n');
const routes=['home','software','iot','manufacturing','healthcare','energy','smart-city','services','training','consulting','engineering','about','contact'];
for(const route of routes)for(const lang of ['id','en']){
const container={innerHTML:''},stub={addEventListener(){},setAttribute(){},classList:{toggle(){}}};const c={URLSearchParams,location:{pathname:route==='home'?'/':'/'+route+'/',search:'?lang='+lang,hash:''},history:{replaceState(){}},window:{scrollY:0,scrollTo(){}},document:{documentElement:{},querySelector(s){return stub},getElementById(){return container},querySelectorAll(){return []},addEventListener(){}}};
vm.runInNewContext(input,c);assert(container.innerHTML.includes('<h1>'));assert(!container.innerHTML.includes('undefined'));
for(const m of container.innerHTML.matchAll(/(?:href|src)="(\/[^"?]*)(?:\?[^"#]*)?(?:#[^"]*)?"/g)) {let path=m[1].split('#')[0];if(path.endsWith('/'))path+='index.html';assert(fs.existsSync('dist'+path),'Missing '+path);}
}
console.log('Validated 13 pages in both languages; local navigation and assets resolve.');
