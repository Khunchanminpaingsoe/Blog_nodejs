const express = require('express');
const catController = require('../controller/catcontroller');
const itemController = require('../controller/itemcontroller');
const item = require('../models/item');
const router = express.Router();

//Categories
router.get('/getcat', catController.get_cat);
router.post('/addcat', catController.add_cat);
router.get('/getcat/:id', catController.get_catid);
router.get('/editcatget/:id', catController.editget_cat);
router.post('/editcatpost/:id', catController.editpost_cat);
router.get('/deletecat/:id', catController.delete_cat);

//Items
router.get('/getitem', itemController.get_item);
router.get('/getitem/:page', itemController.get_item);
router.post('/additem', itemController.add_item);
router.get('/getitem/:id', itemController.get_itemid);
router.get('/edititem/:id', itemController.editget_item);
router.post('/edititem/:id', itemController.editpost_item);
router.get('/deleteitem/:id', itemController.delete_item);

//userView
router.get('/showitem', itemController.show_item);
router.get('/showdetail/:id', itemController.show_detail); 

//comments
router.post('/postcomment', itemController.post_com);

module.exports = router;