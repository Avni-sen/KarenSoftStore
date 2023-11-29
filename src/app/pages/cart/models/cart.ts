export interface Cart {
    items: Array<CartItem>
}

export interface CartItem {
    id: number
    product: string
    name: string
    description: string
    price: number
    quantity: number
}