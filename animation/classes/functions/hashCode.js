export const hashCode = (s) => {
    const sLength = s.length
    if (sLength == 0) {return 0;}
    let hash = 0;
    for (let i = 0; i < sLength; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
