import { Food } from "./interface";
import { FoodService } from './service';


export class FoodController {
    foods?: Food[]

    constructor(private foodService: FoodService) {
        this.loadFood()
    }

    async loadFood() {
        try {
            let foodArr: Food[] = []
            this.foodService.allFood.then((res) => {
                res.rows.map(row => row.map(item => foodArr.push(item)))
            })
            this.foods = foodArr
        } catch (e) {
            console.log("Controller error")
        }
    }

    get allFood() {
        return this.foods
    }

    async newFood(food: Food) {
        try {
            const result = await this.foodService.newFood(food)
            await this.loadFood()
        } catch (error) {
            console.log("Controller error")
            throw "Controller error"
        }
            
                 
    }
}