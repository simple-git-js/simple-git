
export interface TagResult {
   all: string[];
   latest: string;
}


export class TagList implements TagResult {

   constructor (
      public all: string[],
      public latest: string,
   ) {}

}

