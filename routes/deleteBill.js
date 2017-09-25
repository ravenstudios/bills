var express = require('express');
var router = express.Router();

var mdb;

var url;


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.q);
  mdb = req.db;
  url = req.dbURL;
  var name;
  //var url = "mongodb://ravenstudios.ddns.net:27017/test";

  mdb.connect(url, (err, db)=>{
    if(err){
      throw err;
    }
    console.log("DB connection");
    // db.collection("usercollection").findOne({email: "rob"}, (err, result)=>{
    //   if(err){
    //     throw err;
    //   }
    //   console.log("result: " + result.username);
    //   name = result.email;
    //   db.close;
    //
    //   res.render('index', {
    //       varToDisplay : name,
    //       title: "Express"
    //   });
    // })

    db.collection('bills', function(err, collection) {
      if(err){
        throw err
      }

     collection.deleteOne({billName: req.query.q});
     db.close();
     console.log("Item " + req.query.q + " deleted");
     res.send("Item deleted")
    });
  });

  //res.send("delete page")
  // res.render('index', { title: 'Express' });
});


// router.post('/', function (req, res) {//gets data from page
//     // console.log(req.body.title);
//     // console.log(req.body.description);
//     //console.log(req);
//     console.log(req.body.title);
//     //res.send('index');
//
//     mdb.connect(url, (err, db)=>{
//       if(err){
//         throw err;
//       }
//       db.collection("usercollection").insertOne({username: "test user for posting from form", email: req.body.title}, (err, res)=>{
//         if(err){
//           throw err;
//         }
//         console.log("insert");
//         db.close();
//
//       })
//     })
//     //res.render('index');
//     res.send("saved to db");
// });


module.exports = router;
