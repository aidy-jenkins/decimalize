import { Big, BigSource } from "big.js";

export const dec = (strings: TemplateStringsArray, ...args: ExpressionElement[]) => {
    let elements = Decimalize.combineElements(strings, ...args);

    let expression = Decimalize.parseExpression(elements);

    let result = Decimalize.evaluate(expression);

    return result;
};

type ExpressionElement = number | Big | string | bigint;
type ExpressionParameter = { parameter: ExpressionElement };
type ExpressionInput = (string | ExpressionParameter);
type Expression = ExpressionInput[];

export module Decimalize {

    export function combineElements(strings: TemplateStringsArray | string[], ...elements: ExpressionElement[]) {
        let combined = [] as ExpressionInput[];

        for (let i = 0; i < strings.length; ++i) {
            combined.push(strings[i]);
            if (i < elements.length) {
                combined.push({ parameter: elements[i] });
            }
        }

        return combined;
    }

    export function parseExpression(elements: ExpressionInput[]) {
        return elements.flatMap(element => {
            if (typeof element === "string")
                return element.split(' ') as ExpressionInput[];

            return element;
        });
    }

    export const operands = [
        ['(', ')'],
        ['*', '/'],
        ['+', '-']
    ];

    export function evaluate(expression: Expression) {
        for (let precedence of operands) {

            let left: ExpressionInput;
            let operand: string;

            let next = [] as Expression;

            while(expression.some(item => precedence.includes(item as string))) {

                for (let item of expression) {
                    if (typeof item === "string") {
                        if (item.trim() === '') continue;

                        if (precedence.includes(item)) {
                            operand = item;
                            continue;
                        }

                        let isOperand = operands.some(precedence => precedence.includes(item as string));
                        if(isOperand) {
                            next.push(item);
                            continue;
                        }
                    }

                    if(operand != null) {
                        next.push({ parameter: resolve(operand, left, item)});
                    }

                    left = item;
                }

                expression = next;
            }
        }

        return (expression.pop() as ExpressionParameter)?.parameter as Big;
    }

    export function resolve(operand: string, left: ExpressionInput, right: ExpressionInput) {
        let leftValue = typeof left === "object" ? Big(left.parameter as any as BigSource) : Big(left);
        let rightValue = typeof right === "object" ? Big(right.parameter as any as BigSource) : Big(right);

        try {
            switch(operand) {
                case '*': 
                    return leftValue.mul(rightValue);
                case '/':
                    return leftValue.div(rightValue);
                case '+':
                    return leftValue.add(rightValue);
                case '-':
                    return leftValue.minus(rightValue);
                default:
                    return NaN;
            }
        }
        catch(err) {
            return NaN;
        }
    }
}