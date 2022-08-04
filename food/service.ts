import { Client, Query, QueryResult } from "pg";
import { Food } from "./interface";
import dotenv from 'dotenv';
import format from 'pg-format';
dotenv.config()


 interface DatabaseService {
    client: Client
    table: string
}
    




export class DataService implements DatabaseService {
    client: Client
    table: string
    constructor() {
        this.client = new Client({
            host: process.env.dbhost,
            user: process.env.dbuser,
            password: process.env.dbpassword,
            database: process.env.dbdatabase
        })
        this.client.connect().catch(e => {
            console.log("DB connection error...\n" + e)
        })
        this.table = 'food'

    }

    get allItems() {
        return this.client.query({ text: `select row_to_json(${this.table}) from ${this.table}`, rowMode: 'array' })
    }

    async newItem(obj: object) {
        const objValues = Object.values(obj)
        console.log(objValues)
        console.log(`insert into food (${Object.keys(obj)}) values ('', , ARRAY [$])`)
        return await this.client.query(`insert into ${this.table} (name, price, ingredients) values ('Butter Toast', 20, ARRAY ['Bread', 'Butter'])`)

        // console.log(`insert into food (name, price, ingredients) values ('${food.name}', ${food.price}, ARRAY [${food.ingredients}])`)
        // try {
        //     return await this.client.query(`insert into food (name, price, ingredients) values ('Butter Toast', 20, ARRAY ['Bread', 'Butter'])`, (err, res) => {
        //         if (err) {
        //             return cb(err);
        //         }
        //     })
        // }catch(e){
        //     console.log("Bubbled...")
        //     throw e;
        // }

        // .catch(e => {
        //     throw "Duplicate food Error from newFood func"
        // }) 
    }

}