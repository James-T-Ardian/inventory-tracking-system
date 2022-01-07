const Inventory = require('../model/Inventory')
const ApiError = require('../error/ApiError')

//
// File holds all controller functions for inventoryRoutes.
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
        next(ApiError.badRequest("Request body must contain itemName, itemCount and warehouse variable with non-undefined values"))
        return
    }

    // Gets current date in yyyy-mm-dd format.
    let currDate = new Date()
    const offset = currDate.getTimezoneOffset()
    currDate = new Date(currDate.getTime() - (offset*60*1000))
    currDate.toISOString().split('T')[0]

    Inventory.insertItem(itemName, itemCount, warehouse, currDate)
        .then((result)=>{
            return res.status(200).json({msg: "item has been successfully created"})
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
        next(ApiError.badRequest("Request body must contain itemCount and warehouse variable with non-undefined values"))
        return
    }

    // Gets current date in yyyy-mm-dd format.
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
                return res.status(200).json({msg: "item has been successfully updated"})
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
                return res.status(200).json({msg: "item has been successfully deleted"})
            }
        }).catch((err)=>{
            next(ApiError.internalError())
            return
        })
}

module.exports = {
    getInventoryItems,
    postInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
}