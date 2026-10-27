import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {GRID,coordinate,stars,stones,BOARD_SIZE} from '../src/board.ts';
assert.equal(GRID,19);
assert.equal(new Set(Array.from({length:GRID},(_,i)=>coordinate(i))).size,19);
assert.equal(stars.length,9);
assert(stars.every(([x,y])=>[3,9,15].includes(x)&&[3,9,15].includes(y)));
assert.equal(new Set(stones.map(s=>`${s.x},${s.y}`)).size,stones.length);
for(const s of stones){assert(Number.isInteger(s.x)&&Number.isInteger(s.y));assert(s.x>=0&&s.x<GRID&&s.y>=0&&s.y<GRID);assert(coordinate(s.x)>7&&coordinate(s.x)<BOARD_SIZE-7);}
for(let i=0;i<6;i++) assert(existsSync(`public/audio/voice-${i}.wav`),`Voice ${i} missing`);
const pkg=JSON.parse(readFileSync('package.json','utf8'));const lock=JSON.parse(readFileSync('package-lock.json','utf8'));
assert.deepEqual(lock.packages[''].dependencies,pkg.dependencies);
for(const [k,v] of Object.entries(pkg.dependencies))assert.equal(lock.packages[`node_modules/${k}`].version,v);
console.log('PASS: 19×19 grid; nine correct stars; unique valid stone positions; six voice assets; dependency lock versions.');
