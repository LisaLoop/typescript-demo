class Video {
  play () { /* ... */ }
}

class VideoPlayer {
  #video: Video | null = null;

  play () {
    if (this.#video === null)
      return;

    this.#video.play();
  }

  setVideo (nextVideo: Video) {
    this.#video = nextVideo;
  }
}


class Page {
  #videoPlayer: VideoPlayer;
  #videos: Video[];
  constructor (videoPlayer: VideoPlayer, videos: Video[]) {
    this.#videoPlayer = videoPlayer;
    this.#videos = videos;
  }
  pick (video: Video) {
    this.#videoPlayer.setVideo(video);
    this.#videoPlayer.play();
  }
  render () {}
}

const page = new Page(new VideoPlayer(), [new Video(), new Video()]);
page.render();



/***  INHERITANCE-BASED POLYMORPHISM IN NOMINALLY-TYPED, SINGLE-INHERITANCE LANGUAGES LIKE JAVA  ***/
// In this case, polymorphism depends on the NAME of a COMMON ANCESTOR in the INHERITANCE TREE

class Bird {
  fly () {}
}

class Duck extends Bird {
  swim () {}
  quack () {}
}

class BirdCantFlyError extends Error {
  constructor () {
    super("Bird can't fly");
  }
}

class Penguin extends Bird {
  swim () {}
  fly () {
    throw new BirdCantFlyError();
  }
}

class Ostrich extends Bird {
  fly () {
    throw new BirdCantFlyError();
  }
}

class Chicken extends Bird {
  cluck () {}
  scratch () {}
  fly () {
    throw new BirdCantFlyError();
  }
}

class FoghornLeghorn extends Chicken {
  wellISay () {}
  cluck () { throw new ChickenCantCluckError(); }
  scratch () { throw new ChickenBasedEntityCantScratchError(); }
}

const makeBirdFly = (bird: Bird) => {
  try {
    bird.fly();
  } catch (birdCantFlyError) {
    // log error and pretend nothing happened
  }
};



const birds: Bird[] = getAShitTonneOfBirds();
birds.forEach(makeBirdFly);




/***  COMPOSITIONAL POLYMORPHISM IN NOMINALLY-TYPED LANGUAGES LIKE JAVA  ***/
// In this case, polymorphism depends on the NAME of an INTERFACE
// which is an ANCESTOR to the INTERFACES IMPLEMENTED by the CLASS
interface Flying {
  fly (): void;
}

interface DiveBombing extends Flying {
  dive (): void;
}

interface Swimming {
  swim (): void;
}

class Ostrich {}

class Duck implements Flying, Swimming {
  fly () {}
  swim () {}
  quack () {}
}

class Cormorant implements DiveBombing {
  fly () {}
  dive () {}
}

class QueenAnt implements Flying {
  fly () {}
}

class DocBrownDelorean implements Flying {
  fly () {}
}

const makeThingFly = (flyer: Flying) => flyer.fly();

makeThingFly(new Cormorant());


const flyingThings: Flying[] = getAShitTonneOfFlyingThings();
flyingThings.forEach(makeThingFly); // THIS EXPLODES




/***  COMPOSITIONAL POLYMORPHISM IN STRUCTURALLY-TYPED LANGUAGES LIKE TYPESCRIPT  ***/
type Flying = {
  fly: () => void;
};

type Swimming = {
  swim: () => void;
};

type Diving = { dive: () => void; };

type SwimmingDuck = { type: "SWIMMING_DUCK" } & Swimming;
type DivingDuck   = { type: "DIVING_DUCK"   } & Diving;
// ALGEBRAIC DATA TYPES (A + B) or (A * B)
// A & B = A + B = 1 new type
// A | B = A * B = 2 new types
type DuckType = Flying
  & (SwimmingDuck | DivingDuck)
  & ({ quack: () => void } | { waddle: () => void } | { flap: () => {} })
  & ({ x: () => {} } | { y: () => {} });
// Flying + (SwimmingDuck | DivingDuck) + { quack () }
// { fly () } + (SwimmingDuck | DivingDuck) + { quack () }
// { fly () } +
   // ({ swim (), type: SWIMMING_DUCK } | { dive (), type: DIVING_DUCK }) + { quack () }
// ({ fly (), swim (), type: SWIMMING_DUCK, quack () }) | ({ fly (), dive (), type: DIVING_DUCK, quack () })

type Penguin = Swimming;

const duck1: DuckType = {
  type: "SWIMMING_DUCK",
  fly () { },
  quack () { },
  swim () { }
};

const duck2: DuckType = {
  type: "DIVING_DUCK",
  fly () { },
  quack () { },
  dive () { }
};

const makeQuack = (duck: DuckType) => duck.quack();
makeQuack(duck);
makeQuack({ fly: () => {}, swim: () => {}, quack: () => {} });

const makeThingFly = (thing: Flying) => thing.fly();
const flyingThings: Flying[] = getAShitTonneOfFlyingThings();
flyingThings.forEach(makeThingFly);





export default {};

type UPDATE_USER = "USER:UPDATE";

const UPDATE_TODO = "TODO:UPDATE";
const DELETE_TODO = "TODO:DELETE";
const CREATE_TODO = "TODO:CREATE";
const UPDATE_USER: UPDATE_USER = "USER:UPDATE";

type User = { name: string; };
type ToDo = { id: string; name: string; };

type UserUpdateAction = {
  type: UPDATE_USER;
  payload: User;
};

type ToDoUpdateAction = {
  type: typeof UPDATE_TODO;
  payload: ToDo;
};

type ToDoDeleteAction = {
  type: typeof DELETE_TODO;
  payload: ToDo["id"];
};


type AppActions = UserUpdateAction | ToDoUpdateAction | ToDoDeleteAction;
// (type: "USER:UPDATE" | type: "TODO:UPDATE" | )


type AppState = {
  user: User;
  todos: ToDo[];
};

const reducer = (state: AppState, action: AppActions): AppState => {

  switch (action.type) {
    case UPDATE_USER: {
      const user = action.payload;
      break;
    }
    case UPDATE_TODO: {
      const todo = action.payload;
      break;
    }
    case DELETE_TODO: {
      const id = action.payload;
      break;
    }
    default: {}
  }
  return state;
};

reducer({ user: { name: "" }, todos: [] }, { type: UPDATE_USER, payload: { name:"asd" } });
