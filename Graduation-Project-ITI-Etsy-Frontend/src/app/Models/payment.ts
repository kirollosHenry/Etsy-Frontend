export interface Payment {
    paymentId?: number;
    totalPrice: number;
    response: string;
    customerId?: number;
    orderId?: number;
}
