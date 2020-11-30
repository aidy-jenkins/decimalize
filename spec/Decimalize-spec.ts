import BigNumber from "bignumber.js";
import { dec } from "../src/Decimalize";

describe("dec", () => {

    it("Can add numbers two numbers together", () => {
        expect(dec`1 + 2`.toString()).toEqual("3");
    });
    
    it("Can accept interpolated arguments", () => {
        expect(dec`${2} + ${3}`.toString()).toEqual("5");
    });

    it("Maintains better decimal accuracy than floating point numbers", () => {
        expect(dec`${0.1}+${0.2}`).toEqual(dec`0.3`);
    });

    it("Allows mixing of literal and interpolated arguments", () => {
        expect(dec`2 + ${5}`).toEqual(dec`7`);
    });

    it("Accepts strings as interpolated arguments", () => {
        expect(dec`1 + ${"7"}`).toEqual(dec`8`);
    });

    it("Accepts a BigNumber type as interpolated argument", () => {
        expect(dec`10 + ${new BigNumber(5)}`).toEqual(dec`15`);
    });

    it("Accepts a bigint as an interpolated argument", () => {
        expect()
    });

    describe("Operands", () => {
        it("Handles + operator", () => {
            expect(dec`1 + 2`).toEqual(dec`3`);
        });

        it("Handles - operator", () => {
            expect(dec`3 - 1`).toEqual(dec`2`);
        });

        it("Handles * operator", () => {
            expect(dec`2 * 4`).toEqual(dec`8`);
        });

        it("Handles / operator", () => {
            expect(dec`16 / 2`).toEqual(dec`8`);
        });

        it("Handles () operators", () => {
            expect(dec`(2 + 16) / 2`).toEqual(dec`9`);
        });
    });
    
    it("Handles multiple simple operations", () => {
        expect(dec`1 + 2 + 3`).toEqual(dec`6`);
        expect(dec`1 + 2 - 3`).toEqual(dec`0`);
    });

    it("Handles mixed operator expressions", () => {
        expect(dec`1 + 2 - 4`).toEqual(dec`-1`);
    });

    it("Handles operator precedence correctly", () => {
        expect(dec`18 + 4 * 3`).toEqual(dec`30`);
        expect(dec`18 - 3 / 4`).toEqual(dec`17.25`);
        expect(dec`(4 + 2) * 8`).toEqual(dec`48`);
    });

    it("Returns NaN for an expression involving NaN", () => {
        expect(+(dec`1 + ${NaN}`)).toBeNaN();
    });

    it("Returns NaN for an expression involving null", () => {
        expect(+(dec`1 + ${null}`)).toBeNaN();
    });

    it("Returns NaN for an expression involving undefined", () => {
        expect(+(dec`1 + ${void 0}`)).toBeNaN();
    });

    it("Returns NaN for an invalid input", () => {
        let abc = (dec`1 + ${"foo"}`);
        expect(+abc).toBeNaN();
    });
});