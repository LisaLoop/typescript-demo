export default {}
/** Type System */

//TS has types
type Aircraft = {
    fly(): void;
}

const helicopter: Aircraft = {fly: () => {}}
// const car: Aircraft = {drive: () => {}}



















// TS has interfaces
interface Bird {
    fly(): void;
}

const seagull: Bird = {fly: () => {}}
























// Type aliasing

// type Tweet = {userId: string, date: string, content: string}

type UTCDate = string;
type Id = string;
type Tweet = {userId: Id, date: UTCDate, content: string}






















// Aside from aliasing and compiler messaging, types and interfaces are 
// mostly interchangable. 




















// TS is structurally typed
type Superhero = {
    fly(): void;
}

const iNeedAHero = (hero: Superhero) => {/* */}

iNeedAHero(seagull)
iNeedAHero(helicopter)
iNeedAHero({fly:() => {}})

