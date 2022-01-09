const mysql = require("../config/db")

// Inventory class is a collection of functions to interact with mysql database's "inventory" table.
//
// Note: - warehouse column can only have predetermined values ('Vancouver', 'Toronto', 'Calgary', 'Montreal', 'Halifax').
//
// Relevant error codes: - Duplicate entry error no: 1062
//                       - Warehouse not one of allowed values: 1265 <= Can probably be handled in front-end, but handle in server just in case
//                       - item_name exceeds maximum of 45 characters: 1406
class Inventory {
    
    static getItems = async ()=>{
        // Ordering by item_id in descending order will make it so that the most recent 
        // created items are at top and updates to inventory items do not change the 
        // order of the list
        const sql = "SELECT item_name, item_count, warehouse, last_updated FROM inventory ORDER BY item_id DESC"
        const [result, _] = await mysql.execute(sql, [])
        return result
    }

    static insertItem = async (itemName, itemCount, warehouse, lastUpdated)=>{
        const sql = "INSERT INTO inventory(item_name, item_count, warehouse, last_updated) VALUES (?, ?, ?, ?)"
        const [result, _] = await mysql.execute(sql, [itemName, itemCount, warehouse, lastUpdated])
        return result
    }

    static updateItem = async(itemID, itemCount, warehouse, lastUpdated)=>{
        const sql = "UPDATE inventory SET item_count = ?, warehouse = ?, last_updated = ? WHERE item_id = ?"
        const [result, _] = await mysql.execute(sql, [itemCount, warehouse, lastUpdated, itemID])
        return result
    }

    static deleteItem = async(itemID)=>{
        const sql = "DELETE FROM inventory WHERE item_id = ?"
        const [result, _] = await mysql.execute(sql, [itemID])
        return result
    }
}

module.exports = Inventory



