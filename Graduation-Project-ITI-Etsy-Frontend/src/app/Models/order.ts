export interface Order {
    ordersId: number,

    address: string,

    totalPrice: number,

    orderedAt: string,

    arrivedOn: string,

    customerId: string
}

export interface IOrderAPI {
    entity: Order,
    message: string
}