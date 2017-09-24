let express = require('express');
let router = express.Router();

let mdb;
let month;
let url = "mongodb://ravenstudios.ddns.net:27017/test";
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let billsArr =[
  {
    bill: "Rent",
    dueDate: 1,
    ammount: 800,
    recurring: "m"
  },
  {
    bill: "Google Music",
    dueDate: 11,
    ammount: 16,
    recurring: "m"
  },
  {
    bill: "Netflix",
    dueDate: 9,
    ammount: 13,
    recurring: "m"
  },
  {
    bill: "Go Daddy",
    dueDate: 17,
    ammount: 11,
    recurring: "m"
  },
  {
    bill: "Gas",
    dueDate: 13,
    ammount: 30,
    recurring: "m"
  },
  {
    bill: "Electric",
    dueDate: 12,
    ammount: 250,
    recurring: "m"
  },
  {
    bill: "Cable / Internet",
    dueDate: 12,
    ammount: 150,
    recurring: "m"
  },
  {
    bill: "Car Ins",
    dueDate: 13,
    ammount: 90,
    recurring: "m"
  },
  {
    bill: "Water",
    dueDate: 15,
    ammount: 100,
    recurring: "m"
  },
  {
    bill: "Hulu",
    dueDate: 18,
    ammount: 13,
    recurring: "m"
  },
  {
    bill: "iCloud",
    dueDate: 15,
    ammount: 5,
    recurring: "m"
  },
  {
    bill: "Car",
    dueDate: 26,
    ammount: 225,
    recurring: "m"
  },
  {
    bill: "Phone",
    dueDate: 16,
    ammount: 285,
    recurring: "m"
  },
  {
    bill: "Bottle Water",
    dueDate: 15,
    ammount: 30,
    recurring: "m"
  },
  {
    bill: "Moto",
    dueDate: 15,
    ammount: 145,
    recurring: "m"
  },
  {
    bill: "Savings",
    dueDate: 0,
    ammount: 50,
    recurring: "w"
  },
  {
    bill: "W",
    dueDate: 0,
    ammount: 30,
    recurring: "w"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {


  let monthName = months[new Date().getMonth()];



  res.render('bills', {
    monthName: monthName,
    month: month + 1,
    paydays: getPaydays(),
    bills: sortBills(getPaydays(), billsArr)
  }

  );




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

getPaydays();

function getPaydays() {
    let paydays = [];
    let index = 0;
    let d = new Date();//getsDate
    let year = d.getFullYear();//gets year
    month = d.getMonth();//gets month
    let totalDays = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();//gets total days
    for (var i = 1; i <= totalDays; i++) {
      if(new Date(year, month, i).getDay() === 6){//finds all saturdays
        // paydays[index] = (month + 1) + "/" + i + "/" + year;
        // index ++;
        //paydays.push((month + 1) + "/" + i + "/" + year)
        paydays.push(i)
      }
    }

    return paydays;

}

function sortBills(dates, bills){

  let arr = [];
  for (var i = 0; i < dates.length; i++) {
    let tempArr = [];

    for (var j = 0; j < bills.length; j++) {

      if(i === 0){
        if(bills[j].dueDate > 0 && bills[j].dueDate < dates[i]){

          tempArr.push(bills[j]);

        }
      }
      if(bills[j].dueDate > dates[i - 1] && bills[j].dueDate < dates[i] || bills[j].recurring === "w"){
        tempArr.push(bills[j]);
      }
    }
    arr.push(tempArr);
  }





return arr;
}


module.exports = router;
