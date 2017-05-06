import { Author } from "./author";
import { Category } from "./category";

export class Book {
    constructor(
        public Id: number,
        public Title: string,
        public Author: Author,
        public Price: string,
        public Description: string
    ){}
}