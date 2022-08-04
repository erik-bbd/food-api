import { Food, Item } from "./interface";
import { DataService } from './service';


export class FoodController {
    items?: Food[]

    constructor(private dataService: DataService) {
        this.loadData()
    }

    async loadData() {
        try {
            let itemBuffer: any[] = []
            this.dataService.allItems.then((res) => {
                res.rows.map(row => row.map(item => itemBuffer.push(item)))
            })
            this.items = itemBuffer
        } catch (e) {
            console.log("Controller error")
        }
    }

    get allItems() {
        return this.items
    }

    async newItem(item: any) {
        try {
            const result = await this.dataService.newItem(item)
            await this.loadData()
        } catch (error) {
            console.log("Controller error")
            throw "Controller error"
        }
            
                 
    }
}