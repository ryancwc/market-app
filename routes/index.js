var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.collection('itemcollection');
    collection.find().toArray((err, items) => {
    	res.render('index', { "itemlist" : items});
    })
});

/* GET add page. */
router.get('/add', function(req, res) {
    var db = req.db;
    var collection = db.collection('itemcollection');
    collection.find().toArray((err, items) => {
    	res.render('add', { "itemlist" : items});
    })
});

/* GET specific item page */
router.get('/item/:id', function(req, res, next) {
	var mongo = require('mongodb');
    var db = req.db;
    var itemid = req.params.id;
    var oid = new mongo.ObjectID(itemid);
    console.log(itemid);
    var collection = db.collection('itemcollection');
    collection.findOne({'_id': oid}, (err, item) => {
    	console.log("Hi");
    	console.log(item);
    	res.render('item', { "item" : item});
    })

});

/* POST to Add Item */
router.post('/additem', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var itemTitle = req.body.name;
    var itemText = req.body.description;
    var itemPrice = req.body.price;
    var itemCondi = req.body.condition;
    var itemContact = req.body.contact;
    var itemLong = req.body.longitude;
    var itemLat = req.body.latitude;
    var itemImage = req.body.image;

    // Set our collection
    var collection = db.collection('itemcollection');

    // Submit to the DB
    collection.insert({
        "title" : itemTitle,
        "text" : itemText,
        "price" : itemPrice,
        "condition" : itemCondi,
        "contact" : itemContact,
        "longitude" : itemLong,
        "latitude" : itemLat,
        "image" : itemImage

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });

});
module.exports = router;
