export class Orderlog {
    constructor(
        public id : number,
        public state : number,
        public description : string,
        public commentAdmin : string,
        public user_id : number,
        public order_id : number
    ){}
}
