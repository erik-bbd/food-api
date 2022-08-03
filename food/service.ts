import { Client, Query, QueryResult } from "pg";
import { Food } from "./interface";

export class FoodService {

    client: Client

    constructor() {
        this.client = new Client({
            // host: process.env.dbhost,
            // user: process.env.dbuser,
            // password: process.env.dbpassword,
            // database: process.env.dbdatabase
            host: "localhost",
            user: "postgres",
            password: "password",
            database: "postgres"
        })
        this.client.connect().catch(e => {
            console.log("DB connection error..." + e)
        })
        
    }

    get allFood() {
            return this.client.query({text: 'select row_to_json(food) from food', rowMode: 'array'})
    }

    newFood(food: Food) {
        return this.client.query(`insert into food (name, price, ingredients) values ('Butter Toast', 20, ARRAY ['Bread', 'Butter'])`).catch(e => {
            throw "Duplicate food Error from newFood func"
        }) 
    }

}