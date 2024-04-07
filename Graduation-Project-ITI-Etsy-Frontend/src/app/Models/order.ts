export interface Order {
    ordersId: number,

    address: string,

    totalPrice: number,

    orderedAt: Date,

    arrivedOn: Date,

    customerId: string
}

export interface IOrderAPI {
    entity: Order,
    message: string
}