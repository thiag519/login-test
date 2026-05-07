"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Math = void 0;
exports.Math = {
    sum: (n1, n2) => {
        return n1 + n2;
    },
    sub: (n1, n2) => {
        return n1 - n2;
    },
    div: (n1, n2) => {
        return n2 === 0 ? false : n1 / n2;
    },
    mut: (n1, n2) => {
        return n1 * n2;
    },
};
