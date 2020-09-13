const catModel = require('../models/category');

module.exports.get_cat = (req, res) => {
    catModel.find({})
    .then((data) => {
        res.render('category', {
            cats: data });
    })
    .catch(err => console.log(err));
}

module.exports.add_cat = (req, res) => {
            
            const datas = {
                name: req.body.name
            }

            const cat = new catModel(datas);
            cat.save()
            .then((data) => {
                console.log(data);
                res.redirect('/getcat');
            })
            .catch(err => console.log(err));
}

module.exports.get_catid = (req, res) => {
    res.send('get category by id');
}

module.exports.editget_cat = (req, res) => {
    const {id} = req.params;
    catModel.findById(id)
    .then((data) => {
        res.render('editcat', {
            data:data
        })
    })
    .catch(err => console.log(err));
}

module.exports.editpost_cat = (req, res) => {
    const {id} = req.params;
    catModel.findByIdAndUpdate(id, req.body)
    .then((data) => {
        res.redirect('/getcat');
    })
    .catch(err => console.log(err));
}

module.exports.delete_cat = (req, res) => {
    const {id} = req.params;
    catModel.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/getcat');
    })
    .catch(err => console.log(err));
}
