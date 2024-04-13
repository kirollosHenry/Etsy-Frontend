export interface Order {
  ordersId: number;

  address: string;

  totalPrice: number;

  orderedAt: Date;

  arrivedOn: Date;

  status: string;

  customerId: string;
}

export interface IOrderAPI {
  order: {
    entities: Order[];
    count: number;
    message: string;
  };
}
