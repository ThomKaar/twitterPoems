import { parseCNSW, parseCSW } from './ingestWords';

const CNSWInputEmpty = '';
const CNSWInputOne = '1. Pick, 2. A, 3. Posy';
const CSNWExpectedOne = [{ word: 'Pick' } , { word: 'A' } , { word: 'Posy' }];

const CSWEmpty ='';
const CSWInputOne = 'Imma, Firing, My, Lazer, Blahhh';
const CSWExpectedOne = [{ word: 'Imma'}, { word: 'Firing'}, { word: 'My'}, { word: 'Lazer'}, { word: 'Blahhh' }];

console.log(parseCNSW(CNSWInputEmpty).length === 0);
const outputOne = parseCNSW(CNSWInputOne);
console.log(outputOne.length === CSNWExpectedOne.length);
console.log(outputOne.every((e, i) => e.word === CSNWExpectedOne[i].word));

console.log(parseCSW(CSWEmpty).length === 0);
const outputCSWOne = parseCSW(CSWInputOne);
console.log(outputCSWOne.length === CSWExpectedOne.length);
console.log(outputCSWOne.every((e, i) => e.word === CSWExpectedOne[i].word));