export interface Payment {
    paymentId?: number;
    totalPrice: number;
    response: string;
    customerId?: string;
    orderId?: number;
}
