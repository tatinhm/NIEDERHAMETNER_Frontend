import { Order } from './order';

export class OrderFactoryFactory {

    static empty(): Order {
        return new Order(null, [], 0, 0, 0, '', 0);
    }


    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.books,
            rawOrder.nettoPrice,
            rawOrder.bruttoPrice,
            rawOrder.state,
            rawOrder.userAddress,
            rawOrder.user_id
        );
    }
}

