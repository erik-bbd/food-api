import { Client } from "pg";
import { Food } from "./interface";

export class FoodService {

    client: Client

    constructor() {
        this.client = new Client({
            host: "localhost",
            user: "postgres",
            password: "password",
            database: "postgres"
        })
    }

    get allFood() {
        return this.client.query({text: 'select row_to_json(food) from food', rowMode: 'array'})
    }

    set newFood(food: Food) {
        this.client.query({text: `insert into food (food) values ('Butter Toast', 20, ARRAY ['Bread', 'Butter'])`})
    }

}