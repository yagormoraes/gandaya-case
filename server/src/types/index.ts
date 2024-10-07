import { 
    User as PrismaUser, 
    PurshaceHistory as PrismaPurshaceHistory,
    Menu as PrismaMenu,
    Checkout as PrismaCheckout,
    CheckoutItems as PrismaCheckoutItems,
    Checkout_status as PrismaCheckoutStatus
} from '@prisma/client';

export type User = PrismaUser;
export type PurchaseHistory = PrismaPurshaceHistory[];
export type MenuItem = PrismaMenu;
export type Checkout = PrismaCheckout;
export type CheckoutItem = PrismaCheckoutItems;
export type CheckoutStatus = PrismaCheckoutStatus;


export interface CheckoutItemInput {
    menuItemId: number;
    quantity: number;
}


export interface PurchaseHistoryResponse {
    userId: number;
    history: PurchaseHistory;
}


export interface StockUpdateItem {
    menuItemId: number;
    quantity: number;
}

export type StockOperation = 'increment' | 'decrement';

export interface UpdateBalancePayload {
    amount: number;
}

export interface ErrorResponse {
    error: string;
}

export interface BaseResponse<Json = any, Status = number> {
    json: Json;
    status: Status;
  }
  
