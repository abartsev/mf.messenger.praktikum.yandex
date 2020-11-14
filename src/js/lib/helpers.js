export const isEqual = (a, b) => {
    let arrRes = [];
    if (typeof a === 'object' && typeof b === 'object') {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        for (const key in a) {
            if (typeof a[key] === 'object' && typeof b[key] === 'object') {
                arrRes.push(isEqual(a[key], b[key]));
            }
            else {
                if (a[key] === b[key]) {
                    arrRes.push(true);
                }
                else {
                    arrRes.push(false);
                }
            }
        }
    }
    else {
        arrRes.push(a === b);
    }
    return !arrRes.includes(false);
};
//# sourceMappingURL=helpers.js.map