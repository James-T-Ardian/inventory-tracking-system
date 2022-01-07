const express = require('express')

// Allows for use of ExpressJS routing framework.
const router = express.Router()

// Controller functions initialization.
const {getInventoryItems, postInventoryItem, updateInventoryItem, deleteInventoryItem} = require('../controller/inventoryController')

// Assigns controller functions based on right-most relative path and http method.
router.get('/', getInventoryItems)
router.post('/', postInventoryItem)
router.put('/:itemID', updateInventoryItem)
router.delete('/:itemID', deleteInventoryItem)




module.exports = router