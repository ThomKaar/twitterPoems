import OpenAI from "openai";
import { ORG, PROJECT, TEST_KEY } from './secrets/openai';

// question template
const templateQuery = (word) => `Make a rhyming couplet using the word ${word} with an unserious tone.`; 

const openai = new OpenAI({
    organization: ORG,
    project: PROJECT,
    apiKey: TEST_KEY
});

export const getPoem = async (word: string): Promise<string> => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: templateQuery(word)}],
    });
    const { choices } = completion;
    const [firstChoice] = choices;
    const { message: { content = '' } = {} } = firstChoice;
    return content;
};


