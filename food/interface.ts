export interface Item {
    id: number
    name: string
    price: number
}

export interface Food extends Item {
    ingredients: string[]
}