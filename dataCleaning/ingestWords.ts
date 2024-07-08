import { CSW, CNSW } from '../words/stringWords.js';

type CoolWordDocument = { word: string };
export const parseCSW = (csw: string): CoolWordDocument[] => {
    return csw.split(', ').filter((word) => word.length > 0).map((word) => {
        return { word }
    });
}

export const parseCNSW = (cnsw: string): CoolWordDocument[] => {
    let word: string = '';
    let documents: CoolWordDocument[] = [];
    Array.from(cnsw).forEach((char) => {
        if (isNotOneOf(char, [' ', ',', '.']) && isNotANumChar(char)) {
            word = word.concat(char);
        }
        if(char === ',') { // word is finished and we should add to documents
            documents.push({ word });
            word = '';
        }

    });
    if (word.length > 0) {
        documents.push({word});
    }
    return documents;
};

const isNotANumChar = (c: string): Boolean =>  !(+c) || +c === 'NaN';
const isNotOneOf = (char: string, these: string[]): Boolean => {
    return these.every((s) => char !== s);
};

export const WORDS:CoolWordDocument[] = [...parseCSW(CSW), ...parseCNSW(CNSW)]