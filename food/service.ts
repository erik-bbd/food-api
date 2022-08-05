import { DatabaseService } from "../data/service";

export class FoodService extends DatabaseService {

    constructor() {
        super('food')
    }

}

