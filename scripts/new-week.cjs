const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../src/presentations');
const existing = fs.readdirSync(root).filter(name => /^week-\d+$/.test(name));
const requested = process.argv[2];
const number = requested === undefined
  ? Math.max(0, ...existing.map(name => Number(name.slice(5)))) + 1
  : Number(requested);

if (!Number.isSafeInteger(number) || number < 1) {
  console.error('주차는 1 이상의 정수로 입력하세요. 예: npm run new-week -- 2');
  process.exit(1);
}

const week = String(number).padStart(2, '0');
const directory = path.join(root, `week-${week}`);
if (existing.some(name => Number(name.slice(5)) === number)) {
  console.error(`${number}주차 폴더가 이미 있습니다. 기존 파일은 변경하지 않았습니다.`);
  process.exit(1);
}

const presentation = {
  week,
  title: `${number}주차 발표`,
  summary: '이번 주 발표 내용을 입력하세요',
  date: '',
  slides: [
    { type: 'cover', title: `${number}주차 발표`, description: '이번 주 발표의 핵심 내용을 입력하세요.' },
    { type: 'bullets', title: '이번 주 진행한 일', description: '', items: ['진행한 내용을 입력하세요.', '결과나 확인한 내용을 입력하세요.'] },
    { type: 'bullets', title: '다음 주 계획', description: '', items: ['다음 주에 완성할 내용을 입력하세요.'] },
  ],
};

fs.mkdirSync(directory);
const file = path.join(directory, 'presentation.json');
fs.writeFileSync(file, JSON.stringify(presentation, null, 2) + '\n', { flag: 'wx' });
for (const name of ['Design.js', 'Slide.js', 'style.css']) {
  const template = fs.readFileSync(path.join(root, 'week-01', name), 'utf8');
  fs.writeFileSync(path.join(directory, name), template.replaceAll('week01', `week${week}`), { flag: 'wx' });
}
console.log(`생성 완료: ${directory}\npresentation.json: 내용·순서 / Slide.js: 슬라이드 배치 / style.css: 디자인 / Design.js: 전체 화면\n1주차 디자인을 독립 복사했습니다. 수정해도 다른 주차에 영향을 주지 않습니다.`);
