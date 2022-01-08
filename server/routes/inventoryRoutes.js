const express = require('express')

// Allows for use of ExpressJS routing framework.
const router = express.Router()

// Controller functions initialization.
const {getInventoryItems, 
    postInventoryItem, 
    updateInventoryItem, 
    deleteInventoryItem, 
    getInventoryItemsAsCSV} = require('../controller/inventoryController')

// Assigns controller functions based on http method and right-most relative path.
router.get('/', getInventoryItems)
router.get('/csv', getInventoryItemsAsCSV)
router.post('/', postInventoryItem)
router.put('/:itemID', updateInventoryItem)
router.delete('/:itemID', deleteInventoryItem)




module.exports = router