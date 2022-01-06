const mysql = require("../config/db")

// Interact with database's "inventory" table
//
// Note:        - warehouse column can only have predetermined values ('Vancouver', 'Toronto', 'Calgary', 'Montreal', 'Halifax')
//
// Error codes: - Duplicate entry error no: 1062
//              - Incorrect last_updated date: 1292
//              - Warehouse not one of allowed values: 1265

class Inventory {
    getItems = async ()=>{
        const sql = "SELECT * FROM inventory"
        const [result, _] = await mysql.execute(sql, [])
        return result
    }

    insertItem = async (item_name, item_count, warehouse, last_updated)=>{
        const sql = "INSERT INTO inventory(item_name, item_count, warehouse, last_updated) VALUES (?, ?, ?, ?)"
        const [result, _] = await mysql.execute(sql, [item_name, item_count, warehouse, last_updated])
        return result
    }

    updateItem = async(old_item_name, old_warehouse, item_name, item_count, warehouse, last_updated)=>{
        const sql = "UPDATE inventory SET item_name = ?, item_count = ?, warehouse = ?, last_updated = ? WHERE item_name = ? AND warehouse = ?"
        const [result, _] = await mysql.execute(sql, [item_name, item_count, warehouse, last_updated, old_item_name, old_warehouse])
        return result
    }

    deleteItem = async(item_name, warehouse)=>{
        const sql = "DELETE FROM inventory WHERE item_name = ? AND warehouse = ?"
        const [result, _] = await mysql.execute(sql, [item_name, warehouse])
        return result
    }
}

module.exports = Inventory



