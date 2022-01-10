const mysql = require("../config/db")

// Inventory class is a collection of functions to interact with mysql database's "inventory" table. "inventory" table has the following
// column specifications: item_id (INT), item_name (VARCHAR(45)), item_count (INT), warehouse(Enum('Vancouver', 'Toronto', 'Calgary', 'Montreal', 'Halifax')), last_updated(DATE)
//
// Relevant error codes: - Duplicate entry error no: 1062
//                       - ItemCount is not int or Warehouse is not one of allowed values: 1265 <= Can probably be handled in front-end, but handle in server just in case
//                       - item_name exceeds maximum of 45 characters: 1406
class Inventory {
    
    // Return: rows of "inventory" table
    static getItems = async ()=>{
        // Ordering by item_id in descending order will make it so that the most recent 
        // created items are at top and updates to inventory items do not change the 
        // order of the list
        const sql = "SELECT item_id, item_name, item_count, warehouse, last_updated FROM inventory ORDER BY item_id DESC"

        const [result, _] = await mysql.execute(sql, [])
        return result
    }

    // Parameters: - itemName (string): value of item_name in the new item
    //             - itemCount (INT): value of item_count in the new item
    //             - warehouse (enum('Vancouver', 'Toronto', 'Calgary', 'Montreal', 'Halifax')): value of warehouse in the new item
    //             - lastUpdated (date string in format: "yyyy-mm-dd"): value of last_updated in the new item
    //
    // Return: new row in "inventory" table with parameter values as column values
    static insertItem = async (itemName, itemCount, warehouse, lastUpdated)=>{
        const sql = "INSERT INTO inventory(item_name, item_count, warehouse, last_updated) VALUES (?, ?, ?, ?)"
        const [result, _] = await mysql.execute(sql, [itemName, itemCount, warehouse, lastUpdated])
        return result
    }

    // Parameters: - itemID (INT): value of item_id of the item we want to update
    //             - itemCount (INT): value of item_count in the updated item
    //             - warehouse (enum('Vancouver', 'Toronto', 'Calgary', 'Montreal', 'Halifax')): value of warehouse in the updated item
    //             - lastUpdated (date string in format: "yyyy-mm-dd"): value of last_updated in the updated item
    //
    // Return: update of row with item_id = itemID
    static updateItem = async(itemID, itemCount, warehouse, lastUpdated)=>{
        // Disallow updating item_name. User can create new item if they want an item with a certain item_name. 
        const sql = "UPDATE inventory SET item_count = ?, warehouse = ?, last_updated = ? WHERE item_id = ?"

        const [result, _] = await mysql.execute(sql, [itemCount, warehouse, lastUpdated, itemID])
        return result
    }

    // Parameters: - itemID (INT): value of item_id of the item we want to delete
    //
    // Return: delete row in "inventory table" with item_id = itemID
    static deleteItem = async(itemID)=>{
        const sql = "DELETE FROM inventory WHERE item_id = ?"
        const [result, _] = await mysql.execute(sql, [itemID])
        return result
    }
}

module.exports = Inventory



