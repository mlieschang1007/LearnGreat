import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const dir = path.join(root, 'content/notes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
const allowed = new Set(['每日紀錄', '每週回顧', '學習反思']);
const requiredSections = {'每日紀錄':['今天學到什麼','遇到的困難','下一步行動'],'每週回顧':['本週完成','遇到的困難','下週計畫'],'學習反思':['這次的問題','我的觀察','下一次調整']};
const records = [];
let errors = [];
for (const filename of files) {
  const source = fs.readFileSync(path.join(dir, filename), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) { errors.push(`${filename}: 缺少正確的 YAML frontmatter`); continue; }
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z]+):\s*(.*?)\s*$/);
    if (!m) { errors.push(`${filename}: 無效的 metadata 欄位 ${line}`); continue; }
    const value = m[2];
    if (m[1] === 'tags') meta.tags = value.startsWith('[') && value.endsWith(']') ? value.slice(1, -1).split(',').map(t=>t.trim()).filter(Boolean) : null;
    else if (m[1] === 'readingMinutes') meta.readingMinutes = Number(value);
    else if (m[1] === 'featured') meta.featured = value === 'true';
    else meta[m[1]] = value;
  }
  for (const field of ['title', 'slug', 'category', 'date', 'summary', 'tags', 'readingMinutes', 'featured']) if (meta[field] === undefined || meta[field] === null || meta[field] === '') errors.push(`${filename}: 缺少 ${field}`);
  if (!/^featured: (true|false)$/m.test(match[1])) errors.push(`${filename}: featured 必須為 true 或 false`);
  if (meta.slug !== filename.replace(/\.md$/, '')) errors.push(`${filename}: slug 必須與檔名一致`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug ?? '')) errors.push(`${filename}: slug 必須為 kebab-case`);
  if (!allowed.has(meta.category)) errors.push(`${filename}: 未知分類 ${meta.category}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date ?? '') || Number.isNaN(Date.parse(meta.date))) errors.push(`${filename}: 無效日期`);
  if (!Array.isArray(meta.tags) || !meta.tags.length) errors.push(`${filename}: tags 至少一個`);
  if (!Number.isInteger(meta.readingMinutes) || meta.readingMinutes < 1) errors.push(`${filename}: readingMinutes 必須為正整數`);
  if (!match[2].trim().startsWith('# ')) errors.push(`${filename}: 正文必須以 H1 開始`);
  if (match[2].trim().split(/\r?\n/)[0] !== '# ' + meta.title) errors.push(`${filename}: H1 標題必須等於 title`);
  if (requiredSections[meta.category]) for(const section of requiredSections[meta.category]) if(!match[2].includes('## '+section)) errors.push(`${filename}: 缺少必要段落 ${section}`);
  if (!match[2].includes('## ')) errors.push(`${filename}: 正文至少要有一個 H2`);
  // Short-journal rule: 100–200 Chinese characters across prose (exclude headings / metadata).
  const proseOnly = match[2].split(/\r?\n/).filter(line => !/^\s*#/.test(line)).join(' ');
  const chineseCount = (proseOnly.match(/[\u3400-\u9fff]/g) || []).length;
  if (chineseCount < 100 || chineseCount > 200) errors.push(`${filename}: 日記正文應為 100–200 個中文字（不含標題），目前 ${chineseCount} 字`);

  records.push({...meta, body: match[2].trim()});
}
if (new Set(records.map(x=>x.slug)).size !== records.length) errors.push('文章 slug 重複');
if (!records.length) errors.push('至少需要一篇文章');
if(records.filter(x=>x.featured).length>1) errors.push('精選日記最多一篇');
if (errors.length) { console.error('內容檢查失敗:\n' + errors.map(e=>'✗ '+e).join('\n')); process.exit(1); }
records.sort((a,b)=>b.date.localeCompare(a.date));
if (!process.argv.includes('--check')) fs.writeFileSync(path.join(root,'src/generated-data.js'), `// AUTO-GENERATED — Do not edit. Run npm run build.\nexport const notes = ${JSON.stringify(records,null,2)};\n`);
console.log(`✓ 已驗證 ${records.length} 篇文章、${new Set(records.map(n=>n.category)).size} 個分類`);
