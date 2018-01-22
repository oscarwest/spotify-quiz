// WTF??
export type Game = {
  id: string,
  songs: Songs,
};

export type Songs = {
  song: Song[],
};

export type Song = {
  name: string,
};


export declare class Game2 {
  constructor(id: string, songs: Songs);
  id: string;
  songs: Songs;
}
