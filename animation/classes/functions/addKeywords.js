export const addKeywords = (source, keywords) => {
    if (keywords == null) { return source;}
    let keywordsString = '';
    for(let k = 0;k < keywords.length;k++){
        const keyword = keywords[k]
        keywordsString += '#define ' + keyword + '\n';
    }
    return keywordsString + source;
}
