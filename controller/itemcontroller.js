const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const {v1: uuidv1} = require('uuid');
const itemModel = require('../models/item');
const catModel = require('../models/category');
const comModel = require('../models/comment');
const { populate } = require('../models/item');

module.exports.get_item = async (req, res) => {
    var perPage = 5;
    var page = req.params.page || 1;
    const cat = await catModel.find({});
    const item = await itemModel.find({}).populate('category').skip((perPage * page) - perPage)
    .limit(perPage);
    itemModel.countDocuments({}).exec((err,count)=>{
        res.render('additem', {
            cats: cat,
            items: item,
            current: page,
            pages: Math.ceil(count / perPage)
         });
        })
    }

module.exports.get_item = async (req, res) => {
        var perPage = 5;
        var page = req.params.page || 1;
        const cat = await catModel.find({});
        const item = await itemModel.find({}).populate('category').skip((perPage * page) - perPage)
        .limit(perPage);
        itemModel.countDocuments({}).exec((err,count)=>{
        res.render('additem', {
            cats: cat,
            items: item,
            current: page,
            pages: Math.ceil(count / perPage)
         });
        })
        }


module.exports.add_item = (req, res) => {
    let form = new formidable.IncomingForm(); 
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){ 
  
        var oldPath = files.image.path; 
        var newPath = 'uploads/' + uuidv1() + files.image.name ; 
      
        fs.rename(oldPath, newPath, function(err){ 
            if(err) 
                {
                    console.log(err);
                }
            else{
            const datas = {

                title: fields.title,
                image: newPath,
                category: fields.category,
                content: fields.content
                
            }

            const item = new itemModel(datas);
            item.save()
            .then((data) => {
                res.redirect('/getitem');
            })
            .catch(err => console.log(err));
        }
       })
    })
}

module.exports.get_itemid = (req, res) => {
    res.send('get category by id');
}

module.exports.editget_item = async (req, res) => {
    const {id} = req.params;
    await itemModel.findById(id).populate('category')
    .then((data) => {
        res.render('edititem', {
            datas:data
        })
    })
    .catch(err => console.log(err));
}

module.exports.editpost_item = (req, res) => {
    const {id} = req.params;
    let form = new formidable.IncomingForm(); 
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files){ 
  
        var oldPath = files.image.path; 
        var newPath = 'uploads/' + uuidv1() + files.image.name ; 
      
        fs.rename(oldPath, newPath, function(err){ 
            if(err) 
                {
                    console.log(err);
                }
            else{
            const datas = {

                title: fields.title,
                image: newPath,
                category: fields.category,
                content: fields.content
                
            }

            itemModel.findByIdAndUpdate(id, datas)
            .then(() => {
                res.redirect('/getitem');
            })
            .catch(err => console.log(err));
        }
       })
    })
}

module.exports.delete_item = (req, res) => {
    const {id} = req.params;
    itemModel.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/getitem');
    })
    .catch(err => console.log(err));
}

//UserView

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.show_item = (req, res) => {
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        itemModel.find({title: regex}, function(err, allitems){
           if(err){
               console.log(err);
           } else{
                if(allitems.length < 1) {
                  noMatch = "No result match that query, please try again.";
              }
              res.render('userview',{items:allitems, noMatch: noMatch});
           }
        });
    } else {
    itemModel.find({})
    .then((item) => {
        res.render('userview', {
            items: item,
            noMatch: noMatch
        })
    })
}
}

module.exports.show_detail = async (req, res) => {
    const {id} = req.params;
    const detail = await itemModel.findById(id).populate('category comments');
        res.render('showdetail', {
            datas:detail  
        })
}

//comments
module.exports.post_com = async(req, res) => {
    const datas = {
        username: req.body.username,
        comments: req.body.comment
    }
    const comment = new comModel(datas);
    const item = await itemModel.findById(req.body.data_id);
    await comment.save()
    if(Array.isArray(item.comments)){
    item.comments.push(comment);
    await item.save()
    .then(() => {
        res.redirect(`/showdetail/${req.body.data_id}`);
    })
    .catch(err => console.log(err));
    }
}


