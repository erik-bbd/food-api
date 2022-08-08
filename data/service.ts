import { Client, Query, QueryResult } from "pg";
import dotenv from 'dotenv';
import format, { string } from 'pg-format';
dotenv.config()


 interface DataService {
    client: any
}
    




export class DatabaseService implements DataService {
    client: Client
    table: string

    constructor(table: string) {
        this.client = new Client({
            host: process.env.dbhost,
            user: process.env.dbuser,
            password: process.env.dbpassword,
            database: process.env.dbdatabase
        })
        this.client.connect().catch(e => {
            console.log("DB connection error...\n" + e)
        })
        this.table = table

    }

    allItems() {
        return this.client.query({ text: `select row_to_json(${this.table}) from ${this.table}`, rowMode: 'array' })
    }

    async singleItem(obj: object) {
        const object = Object.entries(obj)[0]
        const condition = object[0] + ` = '${object[1]}'`
        return await this.client.query({ text: `select row_to_json(${this.table}) from ${this.table} where ${condition}`, rowMode: 'array' })
    }


    async newItem(obj: object, IObjectParser: Function) {
        const {columns, values} = IObjectParser(obj)
        return await this.client.query(`insert into ${this.table} (${columns}) values (${values})`)
    }

    async updateItem(obj: object, IObjectParser: Function) {
        const {columns, values} = IObjectParser(obj)
        console.log(`update ${this.table} set ${columns} values (${values}) where name=${values[0]}`)
        return await this.client.query(`update ${this.table} (${columns}) values (${values}) where name=${values[0]}`)
    }

    async deleteItem(obj: object) {
        console.log(obj)
        console.log(`delete from ${this.table} where name='${obj}'`)
        return await this.client.query(`delete from ${this.table} where name='${obj}'`)
    }

}

