/* #__PURE__ */
export const uniqueID = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString();
};
