import {Book} from "./book";

export class Cart {
    constructor(
        public id : number,
        public books : Book[],
        public bruttoPrice: number
    ){}
}
