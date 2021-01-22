
const isEmptyString = (x?: string) => {
    if (x === undefined) {}
    else {
        return x.length == 0;
    }
}
isEmptyString("");
isEmptyString(someValueFromTheInternet.aStringProperty);
isEmptyString(undefined);
undefined.length

type Media = { play: () => void };
type Video = Media & { type: "Video" /* ... */ };
type Music = Media & { type: "Song" /* ... */ };
type AudioBook = Media & { type: "AudioBook" /* ... */ };


interface MediaInterface {
    play():void;
}
interface VideoInterface extends MediaInterface {}
interface MusicInterface extends MediaInterface {}
interface AudioBookInterface extends MediaInterface {}

class MediaPlayer<MediaType extends MediaInterface> {
  #media?: MediaType;
  play () {
    this.#media?.play?.();
  }
  setMedia (media: MediaType) {
    this.#media = media;
    this.play();
  }
}

const videoPlayer = new MediaPlayer<Video>();
videoPlayer.setMedia({ type: "Video", play () {} });
const musicPlayer = new MediaPlayer<Music>();




const playMedia = <T extends Media>(media: T) => media.play();
playMedia<AudioBook>({ type: "AudioBook", play: () => {} });
playMedia<Music>({ type: "Song", play: () => {} });


type ValidTypes = Video | Music | AudioBook;
playMedia<ValidTypes>({ type: "Video", play: () => {} });


