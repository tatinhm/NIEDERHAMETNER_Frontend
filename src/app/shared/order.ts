import {Book} from "./book";
import {User} from "./user";


export class Order {
    constructor(
        public id : number,
        public books : Book[],
        public nettoPrice : number,
        public bruttoPrice: number,
        public state : number,
        public userAddress : string,
        public user_id : number
    ){}
}
