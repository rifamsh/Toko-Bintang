export const setCode = (key) => {
    const code = Math.floor(Math.random() * Date.now()).toString(36);
    return `${key}-${code}`;
};

export const setOrderCode = (key) => {
    const order = Math.floor(Date.now());
    return `${key}-${order}`;
}