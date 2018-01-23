const express = require('express')
const bodyParser = require('body-parser');

const app = express()
let logs = Array()
var MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });


    app.get(
        '/',
        (req, res) => res.send('Hello World!')
    )
    
    app.post(
        '/login',
        (req, res) => {
            let custRes = {}
            //var MongoClient = require('mongodb').MongoClient
                 
            MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
              if (err) throw err
              
                db.collection('login').findOne({"username":req.body.usNm},function (err, result) {
                    if (err) throw err
                    
                    else{
                        console.log(result.username)
                     
                            if (result) {
                                custRes = {
                                            sts: 200,
                                            msg: 'Successful',
                                            res: result.username
                                    }                     
                        }
                        else{
                            custRes = {
                                        sts: 400,
                                        msg: 'error',
                                        res: 0
                                    }                                       
                        }
            
                    }
                    res.json(custRes)
                }) 
          })
      }
    )

    app.post(
        '/register',
        (req, res) => {
            let custRes = {}
           // var MongoClient = require('mongodb').MongoClient
                // console.log(req.body)
            MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
              if (err) throw err
              else{
                db.collection('register').insertOne(req.body,function (err, result) {
                    if (err) throw err
                    else{
                       // console.log(result)    
                        if (result) {
                            console.log(result)
                                custRes = {
                                            sts: 200,
                                            msg: 'Successful',
                                            res: result.username
                                    }                     
                        }
                        else{
                            console.log(err)
                            custRes = {
                                        sts: 400,
                                        msg: 'error',
                                        res: 0
                                    }                                       
                        }
            
                    }
                    res.json(custRes)
                }) 
            }
          })
      }
    )

    app.get(
        '/reg',
        (req, res) => {
           // console.log(req.body)
            let custRes = {}
           // var MongoClient = require('mongodb').MongoClient
                MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
                if (err) throw err
                else{
                    db.collection('register').find().toArray(function (err, result) {
                        if (err) throw err
                        else {
                            if (result) {
                                res.json(result)
                                db.close()
                            }
                           
                        }
                        
      
                    })
                }
                })
            
        }
    )

    app.post(
        '/view',
        (req, res) => {
            let custRes = {}
          //  var MongoClient = require('mongodb').MongoClient
                // console.log(req.body.email)
            MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
              if (err) throw err
              else{
                db.collection('register').findOne({"email":req.body.email},function (err, result) {
                    if (err) throw err
                    else{
                       // console.log(result)    
                        if (result) {
                           
                                custRes = {
                                            sts: 200,
                                            msg: 'Successful',
                                            res: result
                                    }                     
                        }
                        else{
                            console.log(err)
                            custRes = {
                                        sts: 400,
                                        msg: 'error',
                                        res: 0
                                    }                                       
                        }
            
                    }
                    res.json(result)
                }) 
            }
          })
      }
    )

    app.post(
        '/edit',
        (req, res) => {
            let custRes = {}
           // var MongoClient = require('mongodb').MongoClient
                // console.log(req.body.email)
            MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
              if (err) throw err
              else{
                db.collection('register').update({"email":req.body.email},{$set:{"email":req.body.email,"name":req.body.name,"state":req.body.state,"password":req.body.password}},function (err, result) {
                    if (err) throw err
                    else{
                      //  console.log(result)    
                        if (result) {
                           
                                custRes = {
                                            sts: 200,
                                            msg: 'Successful',
                                            res: result
                                    }                     
                        }
                        else{
                            console.log(err)
                            custRes = {
                                        sts: 400,
                                        msg: 'error',
                                        res: 0
                                    }                                       
                        }
            
                    }
                    res.json(result)
                }) 
            }
          })
      }
    )

    app.post(
        '/delete',
        (req, res) => {
            let custRes = {}
           
                // console.log(req.body.email)
            MongoClient.connect('mongodb://localhost:27017/emp_detail', function (err, db) {
              if (err) throw err
              else{
                db.collection('register').remove({"email":req.body.email},function (err, result) {
                    if (err) throw err
                    else{
                     //   console.log(result)    
                        if (result) {
                           
                                custRes = {
                                            sts: 200,
                                            msg: 'Successful',
                                            res: result
                                    }                     
                        }
                        else{
                            console.log(err)
                            custRes = {
                                        sts: 400,
                                        msg: 'error',
                                        res: 0
                                    }                                       
                        }
            
                    }
                    res.json(result)
                }) 
            }
          })
      }
    )


    app.listen(
        3000,
        () => console.log('Example app listening on port 3000!')
    )  