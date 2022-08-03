import { Food } from "./interface";
import { FoodService } from './service';


export class FoodController {
    foods?: Food[]

    constructor(private foodService: FoodService) {
        this.loadFood()
    }

    async loadFood() {
        try {
            // let foodArr: Food[] = []
            const result = this.foodService.allFood

            // console.log(result)
            
            // ((), (res) => {
            //     res.rows.map(row => row.map(item => foodArr.push(item)))
            // })
            // this.foods = foodArr
        } catch (e) {
            console.log("Controller error")
        }
    }

    allFood() {
        return this.foods
    }

    async newFood(food: Food): Promise<boolean> {
        try {
            const result = await this.foodService.newFood(food)
            console.log(result)
            this.loadFood()
            return true
        } catch (error) {
            console.log("Controller error")
            throw "Controller error"
        }
            
                 
    }
}