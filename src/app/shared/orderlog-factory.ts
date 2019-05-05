import { Book } from './book';
import {Order} from './order';
import {Orderlog} from "./orderlog";

export class OrderlogFactory {

    static empty(): Orderlog {
        return new Orderlog(null, 0, '', '', 0, 0);
    }

    static fromObject(rawOrderlog: any): Orderlog {
        return new Orderlog(
            rawOrderlog.id,
            rawOrderlog.state,
            rawOrderlog.description,
            rawOrderlog.commentAdmin,
            rawOrderlog.order_id,
            rawOrderlog.user_id
        );
    }
}
