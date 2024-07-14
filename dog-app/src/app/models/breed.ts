export type Breed = {
  id: string;
  subbreeds?: Subbreed[];
  imagesUrl?: string[];
}

export type Subbreed = {
  id: string;
  imagesUrl?: string[];
}

