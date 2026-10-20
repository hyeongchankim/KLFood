// JSON 문서 저장소.
// - DATABASE_URL(Neon Postgres) 이 있으면 kv 테이블에, 없으면 기존처럼 data/*.json 파일에 저장.
//   → 로컬은 지금처럼 파일, Vercel(읽기 전용 파일시스템)에서는 Neon 으로 동작.
// - 문서가 DB 에 아직 없으면 data/*.json 을 시드로 한 번 넣는다. (정적 require 라 Vercel 번들에 포함됨)
// ponytail: 문서 통째 read-modify-write (동시 쓰기 시 마지막 쓰기가 이김). 트래픽이 생기면 테이블 분리 + 행 단위 UPDATE 로.
const fs = require('fs');
const path = require('path');

const seeds = {
    users: require('./data/users.json'),
    orders: require('./data/orders.json'),
    mealPlans: require('./data/mealPlans.json'),
    settings: require('./data/settings.json'),
};

const filePath = (name) => path.resolve(__dirname, `./data/${name}.json`);

const sql = process.env.DATABASE_URL ? require('@neondatabase/serverless').neon(process.env.DATABASE_URL) : null;
let tableReady;
const ensureTable = () =>
    (tableReady ||= sql`CREATE TABLE IF NOT EXISTS kv (name text PRIMARY KEY, data jsonb NOT NULL)`);

exports.readDoc = async (name) => {
    if (!sql) {
        if (!fs.existsSync(filePath(name))) fs.writeFileSync(filePath(name), JSON.stringify(seeds[name], null, 2));
        return JSON.parse(fs.readFileSync(filePath(name), 'utf8'));
    }
    await ensureTable();
    let rows = await sql`SELECT data FROM kv WHERE name = ${name}`;
    if (!rows.length) {
        await sql`INSERT INTO kv (name, data) VALUES (${name}, ${JSON.stringify(seeds[name])}::jsonb) ON CONFLICT (name) DO NOTHING`;
        rows = await sql`SELECT data FROM kv WHERE name = ${name}`;
    }
    return rows[0].data;
};

exports.writeDoc = async (name, data) => {
    if (!sql) return fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
    await ensureTable();
    await sql`INSERT INTO kv (name, data) VALUES (${name}, ${JSON.stringify(data)}::jsonb)
              ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data`;
};
