var express = require('express');
var router = express.Router();
let mdb;
let url;
let testVAr = "good luck";
/* GET users listing. */
router.get('/', function(req, res, next) {

  mdb = req.db;
  url= req.dbURL;
  console.log(url);


  //db.members.createIndex( { "user_id": 1 }, { unique: true } )
  mdb.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("bills").find({}).toArray(function(err, result) {
    if (err) throw err;

    db.close();
    res.render('addBill', {billsArr: result});
  });
});










});




router.post('/', function (req, res) {//gets data from page

    let data = {
      billName: req.body.billName,
      dueDate: req.body.dueDate,
      ammount: req.body.ammount,
      recurring: req.body.recurring,
      paid: "no"
    }


    mdb.connect(url, (err, db)=>{
      if(err){
        throw err;
      }
      db.collection("bills").insertOne(data, (err, res)=>{
        if(err){
          throw err;
        }
        console.log("insert");
        db.close();

      })
    })

    //res.render('addBill');
    res.redirect('back');
});

module.exports = router;
