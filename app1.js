// var MongoClient = require('mongodb').MongoClient

// //var myobj = { name: "Company Inc", address: "Highway 37" };

// MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
//   if (err) throw err

// //   db.collection('zxy').find().toArray(function (err, result) {
// // if (err) throw err

// // console.log(result)
// // })
// })



var MongoClient = require('mongodb').MongoClient

var myobj = { name: "Mandar Kirad1", address: "asdasd" };

MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
  if (err) throw err
  var query={address : "asdasd"}
  

    db.collection('emp_detail').find().toArray(function (err, result) {
        if (err) throw err
        if(result){
          console.log(result)
        }
       db.close()
    })
})