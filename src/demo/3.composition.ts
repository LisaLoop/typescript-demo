export default {}
/** COMPOSITION */

// TypeScript has algebraic types! 

// & (AND)
type A = { a: string }
type B = { b: string }

type AB = A & B;
// type AB = {a: string, b: string}
// A & B is like A + B


type Incrementer = { count: number, increment: () => void }
type Decrementer = { count: number, decrement: () => void }

type Counter = Incrementer & Decrementer;

const counter: Counter = { count: 5, increment: () => { }, decrement: () => { } };









// | (OR)
type TrafficLight = "yellow" | "red" | "green";

const setTrafficLight = (color: TrafficLight) => { }
// setTrafficLight("blue");
















type Nickel = { name: "nickel", value: 5 }
type Dime = { name: "dime", value: 10 }
type Quarter = { name: "quarter", value: 25 }

type Coin = Nickel | Dime | Quarter;

const insertCoin = (coin: Coin) => {}

insertCoin({ name: "dime", value: 10 })
insertCoin({ name: "penny", value: 1 })
insertCoin({ name: "quarter", value: 10 })


















