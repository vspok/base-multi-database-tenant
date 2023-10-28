export const booleanString = (word: any) => {
    switch (String(word).toLowerCase().trim()) {
        case 'yes':
        case 'true':
        case '1':
            return true;
        case 'no':
        case 'false':
        case '0':
        case null:
            return false;
        default:
            return Boolean(word);
    }
};
