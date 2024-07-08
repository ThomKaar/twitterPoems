import { fetchWord } from './fetchWord.mongo';
import { getPoem } from './postPoemQuery.gpt';
import { cleanPoem } from './dataCleaning/utils';
import { postTweet } from './postTweet2.js';

(async () => {
    // // fetch a word from mongoDb
    const maxCount = 1;
    const baseWord: string = await fetchWord(maxCount);

    console.log('baseWord: ', baseWord);
    // ask chat gpt to make the poem
    const poem = await getPoem(baseWord);
    // clean the poem
    const parsedPoem = cleanPoem(poem);
    // post the poem to twitter
    postTweet(parsedPoem)

    console.log('--------------------------------------------------------post Tweet info: ');
    console.log('baseWord: ', baseWord);
    console.log('unparsed poem: ', poem);
    console.log('parsed poem: ', parsedPoem);
    console.log('-------------------------------------------------------------------------');
})();