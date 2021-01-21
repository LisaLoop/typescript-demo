/** BASIC TYPES */
export default {}
// Types are on the RHS! 
const a: number = 5;
const b: string = "ABC";
const c: number[] = [1, 2, 3];
const d: boolean = true;
const add: (x: number, y: number) => number = (x: number, y: number): number => x + y;

const w = 5;
const x = "ABC";
const y = [1,2,3];
const z = true;
const subtract = (x: number, y: number) => (x - y).toFixed(3);

const sum = add(1, 2);
const difference = subtract(3, 1);

let e = 6;
e = add(2,3);
e = subtract(1, 2);

const compoundSum = add( add(1, 2), add(3, 4) );


