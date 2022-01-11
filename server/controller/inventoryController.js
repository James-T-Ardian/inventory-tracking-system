const Inventory = require('../model/Inventory')
const ApiError = require('../error/ApiError')
const {Parser} = require('json2csv')

//
// File holds all controller functions (or as Express names it: RequestHandler functions) for inventoryRoutes.
//
// These functions are in the form of a NodeJS request handler. For more information regarding request handlers 
// and how NodeJS handles HTTP transfers please refer to: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
//

const getInventoryItems = (req, res, next)=>{
    Inventory.getItems()
        .then((result)=>{
            return res.status(200).json({items: result, msg: "Successfuly obtained items"})
        }).catch((err)=>{
            next(ApiError.internalError())
            return
        })
}

const postInventoryItem = (req, res, next)=>{
    const {itemName, itemCount, warehouse} = req.body

    if(itemName == undefined || itemCount == undefined || warehouse == undefined){
        next(ApiError.badRequest("ItemName, itemCount and/or warehouse variable must not have undefined values"))
        return
    }

    if(itemName == "" || itemCount == "" || warehouse == ""){
        next(ApiError.badRequest("ItemName, itemCount and/or warehouse variable must not be empty"))
        return
    }

    // Checks if itemCount is int or not so that errorcode 1265 only corresponds to bad warehouse input
    if(/^-?\d+$/.test(itemCount) == false){
        next(ApiError.badRequest("Item count must be an integer"))
        return
    }

    // Gets current date in yyyy-mm-dd format. We let system handle filling the lastUpdated parameter of Inventory.insertItem
    let currDate = new Date()
    const offset = currDate.getTimezoneOffset()
    currDate = new Date(currDate.getTime() - (offset*60*1000))
    currDate.toISOString().split('T')[0]

    Inventory.insertItem(itemName, itemCount, warehouse, currDate)
        .then((result)=>{
            return res.status(200).json({msg: "Item has been successfully created"})
        }).catch((err)=>{
            if(err.errno == 1062){
                next(ApiError.conflict("An item with the same name and warehouse combination already exists"))
                return
            } else if(err.errno == 1265){
                next(ApiError.badRequest("Warehouse can only have one of the following values: Vancouver, Toronto, Calgary, Montreal, Halifax"))
                return
            } else if(err.errno == 1406){
                next(ApiError.badRequest("itemName must not exceed 45 characters"))
            } else {
                next(ApiError.internalError())
                return
            }
        })
}

const updateInventoryItem = (req, res, next) => {
    const {itemCount, warehouse} = req.body
    const {itemID} = req.params

    if(itemCount == undefined || warehouse == undefined){
        next(ApiError.badRequest("ItemCount and/or warehouse variable must not have undefined values"))
        return
    }

    if(itemCount == "" || warehouse == ""){
        next(ApiError.badRequest("ItemCount and/or warehouse variable must not be empty"))
        return
    }

    // Checks if itemCount is int or not so that errorcode 1265 only corresponds to bad warehouse input
    if(/^-?\d+$/.test(itemCount) == false){
        next(ApiError.badRequest("Item count must be an integer"))
        return
    }

    // Gets current date in yyyy-mm-dd format. We let system handle filling the lastUpdated parameter of Inventory.updateItem
    let currDate = new Date()
    const offset = currDate.getTimezoneOffset()
    currDate = new Date(currDate.getTime() - (offset*60*1000))
    currDate.toISOString().split('T')[0]

    Inventory.updateItem(itemID, itemCount, warehouse, currDate)
        .then((result)=>{
            if(result.affectedRows == 0){
                next(ApiError.resourceNotFound("Item does not exists"))
                return
            } else {
                return res.status(200).json({msg: "Item has been successfully updated"})
            }
        }).catch((err)=>{
            if(err.errno == 1062){
                next(ApiError.conflict("An item with the same name and warehouse combination already exists"))
                return
            } else if(err.errno == 1265){
                next(ApiError.badRequest("Warehouse can only have one of the following values: Vancouver, Toronto, Calgary, Montreal, Halifax"))
                return
            } else {
                next(ApiError.internalError())
                return
            }
        })

}

const deleteInventoryItem = (req, res, next)=>{
    const {itemID} = req.params

    Inventory.deleteItem(itemID)
        .then((result)=>{
            if(result.affectedRows == 0){
                next(ApiError.resourceNotFound("Item does not exists"))
                return
            } else {
                return res.status(200).json({msg: "Item has been successfully deleted"})
            }
        }).catch((err)=>{
            next(ApiError.internalError())
            return
        })
}

const getInventoryItemsAsCSV = (req, res, next)=>{
    
    Inventory.getItems()
        .then((result)=>{
            const json2csv = new Parser();
            const csv = json2csv.parse(result);
            res.status(200)
            res.header('Content-Type', 'text/csv');
            res.attachment("inventory.csv");
            return res.send(csv);
        }).catch((err)=>{
            next(ApiError.internalError())
            return 
        })
}

module.exports = {
    getInventoryItems,
    postInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItemsAsCSV
}