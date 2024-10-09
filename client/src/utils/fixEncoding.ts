export const fixEncoding = (str: string) => {
    try {
        return decodeURIComponent(escape(str));
    } catch (e) {
        return str;
    }
};