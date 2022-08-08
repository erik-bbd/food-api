export interface Item {
    name: string
    price: number
}

export interface Food extends Item {
    ingredients: string[]
}