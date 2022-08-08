import { Food, Item } from "./interface";
import { DataController } from '../data/controller';
import { FoodService } from './service';


function foodObjectParser(obj: object) {
    console.log(obj)
    const columns = Object.keys(obj).join(", ")
    let values = []
    for (var value of Object.values(obj)) {
        Array.isArray(value) ? values.push( `ARRAY ['${value.join(`','`)}']`): values.push(value.toString() === value ? `'${value}'` : value)
    }
    return { columns, values }
}

export class FoodController extends DataController {
    items?: Food[]
    constructor (dataService: FoodService) {
        super(dataService, foodObjectParser)
    }
}

