export const cleanPoem = (poem: string): string => {
    // if it's empty... you're bad, try again
    if (!poem.length) return '';

    // remove non alpha symbols besides question mark, exclaimation, period, comma, and dash
    const newStr = poem.replace(/[^a-zA-Z,.!? \n]/g, "");

    return newStr.replace('\n', ' / ');
};