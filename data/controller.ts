import { DatabaseService } from "./service"

export class DataController {
    items?: any[]

    constructor(private dataService: DatabaseService, private objectParser: Function) {
        this.loadData()
    }

    async loadData() {
        try {
            let itemBuffer: any[] = []
            this.dataService.allItems().then((res) => {
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

    async singleItem(item: any) {
        return await this.dataService.singleItem(item)
    }

    async newItem(item: any) {
        try {
            const result = await this.dataService.newItem(item, this.objectParser)
            await this.loadData()
        } catch (error) {
            console.log("Controller error")
            throw "Controller error"
        }
    }
}