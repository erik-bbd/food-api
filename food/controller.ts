import { Food } from "./interface";
import { FoodService } from './service';


export class FoodController {
    foods?: Food[]

    constructor(private foodService: FoodService) {
        this.loadFood()
    }

    loadFood(): void {
        let foodArr: Food[] = []
        this.foodService.allFood.then((res) => {
            res.rows.map(row => row.map(item => foodArr.push(item)))
        })
        this.foods = foodArr
    }

    get allFood() {
        return this.foods
    }
}