const ItemModel = require('../models/ItemModel');

class InventoryManager {

    static allItems = [];

    static async loadAllItems(){
        this.allItems = await ItemModel.find();
    }

    getItemById(id) {
        for(var element in this.allItems) {
            if(element.id && element.id == id){
                return element;
            }
        }
    }

    getallItems() {
        return this.allItems;
    }

    delete(item) {
        this.allItems.filter(function(e){ 
            return e.id != item.id; 
        });
    }
}

module.exports = { 
    InventoryManager,
};
