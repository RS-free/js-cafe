import menu from './db/menu.js';
import tables from './db/tables.js';
import workers from './db/workers.js';

class Cafe {
    constructor({menu, tables, workers}){
        this.menu = menu;
        this.tables = tables;
        this.workers = workers;
    }

    getPresentWorkers(){
        this.presentWorkers = [];
        for(const worker of this.workers){
            if(worker.isPresent === true){
                this.presentWorkers.push(worker);
            }
        }
    }
    checkTables(){
        this.getPresentWorkers()
        for(let i=0; i<this.tables.length; i++){
            const workerIndex = i % this.presentWorkers.length
            this.tables[i].service = this.presentWorkers[workerIndex].name
            this.presentWorkers[workerIndex].tables.push(this.tables[i].table)
        }
    }
    getOrder(tableNum, dishId, quantity){
        const curTable = this.findTable(tableNum)
        if (!curTable.currentOrder) {
            curTable.currentOrder = {}
        }
        if (curTable.currentOrder[dishId]) {
            return curTable.currentOrder[dishId] = curTable.currentOrder[dishId] + quantity
        }
        curTable.currentOrder = {...curTable.currentOrder, [dishId]: quantity}
        console.log(curTable);
    }
    findTable(tableNum){
        for (const table of tables){
            if(tableNum === table.table){
                return table
            }
        }
    }
    addDish(tableNum, dishId){
        const curTable = this.findTable(tableNum)
        if (!curTable.currentOrder) {
            curTable.currentOrder = {}
        }
        if (curTable.currentOrder[dishId]) {
            return curTable.currentOrder[dishId] = curTable.currentOrder[dishId] + 1
        }
        curTable.currentOrder = {...curTable.currentOrder, [dishId]: 1}
        console.log(curTable);
    }
    removeDish(tableNum, dishId){
        const curTable = this.findTable(tableNum)
        if (!curTable.currentOrder || !curTable.currentOrder[dishId]) return
        curTable.currentOrder[dishId] = curTable.currentOrder[dishId] - 1
    }
}
console.log(Cafe);
const cafeArgs = {menu, tables, workers}
const cafe = new Cafe(cafeArgs);
console.log(cafe);
// cafe.getPresentWorkers();
cafe.checkTables();
console.log(cafe);
cafe.getOrder(1, "late", 1);
cafe.getOrder(1, "napoleon", 2);
cafe.getOrder(1, "late", 1);
cafe.addDish(1, "zavarnoe", 1);
cafe.addDish(1, "zavarnoe", 1);
cafe.addDish(1, "zavarnoe", 1);
cafe.addDish(1, "zavarnoe", 1);
cafe.removeDish(1, "late");
cafe.removeDish(1, "late");
cafe.removeDish(1, "late");

const getOrder = (table, dishId, num) => {
    // 1 знайти столик 
    // 2 добавити властивість карОрдер
    // 3 в карОрдер добавити пару ключ: значення dishId: num
}