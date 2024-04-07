export interface Payment {
    paymentID?: number;
    totalPrice: number;
    response: string;
    customerId?: string;
    orderId?: number;
}
