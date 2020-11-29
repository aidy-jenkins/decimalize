import { dec, Decimalize } from "../src/Decimalize";
import { Big } from "big.js";

describe("dec", () => {

    it("Can accept arguments", () => {
        dec`a${"foo"}${"bar"}b`;
    });

    it("Can add numbers two numbers together", () => {
        expect(dec`1 + 2`.toString()).toEqual(Big(3).toString());
    });
});

describe("Decimalize", () => {
    describe("combineElements", () => {
        it("Combines strings and expression elements into a single ordered array", () => {
            let result = Decimalize.combineElements(["A", "B", "C"], 1, 2, 3);
            let param = <T>(x: T) => ({parameter: x});

            expect(result).toEqual(["A", param(1), "B", param(2), "C", param(3)]);
        });
    });

    describe("parseExpression", () => {
        it("Separates an expression into symbols", () => {
            let result = Decimalize.parseExpression(["1 + 2"]);

            expect(result).toEqual(["1", "+", "2"]);
        });
    });
});