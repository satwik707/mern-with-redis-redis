const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const UserModel = require("./model/Users");
const app = express();
const redis = require('redis');
const client_redis = redis.createClient();
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var data=[]
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   console.log("database connected")
//   const collection = client.db("admin").collection("mock");
//   data = collection.find({gender : "Male"})
  
//   client.close();
// });

// mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: false}).then (()=>
// {
//     console.log("connection success")
// }).catch(err=> console.log(err))
client_redis.on("connect", () => {
  console.log('connected to Redis');
});

// const MONGO = require('mongodb').MongoClient;
// MONGO.connect(uri,{useNewUrlParser: true, useUnifiedTopology: false}).then (()=>
// { 
    
//      console.log("connection success")
//  }).catch(err=> console.log(err))

var MyCollection = null;
(async () => {MongoClient.connect(uri, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        console.log(chalk.red(err));
        process.exit(0);
    }
    MyCollection = db.db('admin').collection("cars");
    console.log('connected to the database');
});
})()


  // const MyCollection = await dbo.collection("country")
function getArticle() {
  return new Promise((resolve, reject) => {
    client_redis.get("query",(err, reply) => {
        if(err) {
            console.log(err);
        } else if(reply) {
            console.log('sending from redis')
            resolve(reply);
        } else {
          MyCollection.aggregate([{$group: {_id:"$maker", Avg_Price: {$avg:"$price_eur"  } }}])
          .toArray((err, articleData) => {
                if(err) {
                    return reject(err);
                }
                if(articleData.length > 0) {
                    // set in redis
                    client_redis.set("query", JSON.stringify(articleData));
                }
                console.log('sending from database')
                
                resolve(JSON.stringify(articleData));
            });
        }
    });
});
}
app.get('/', async function(req, res) {
  
//   const result = await MyCollection.find({gender:"Male"}).toArray()
//  const result2= await MyCollection.aggregate([{$group: {_id:"$country", Avg_age: {$avg:"$Age"  } }}]).toArray()
const result2 = await getArticle();
  res.send(JSON.stringify(result2));
  
  //console.log(result2)
    // res.writeHead(200, {
    //   'Content-Type': 'application/json',
    // });
    // console.log('data : ', JSON.stringify(data));
    // res.end(JSON.stringify(data));
  });

//   // app.post("/create", async (request, response) => {
//   //   const User = new UserModel(request.body);
  
//   //   try {
//   //     await User.save();
//   //     response.send(User);
//   //   } catch (error) {
//   //     response.status(500).send(error);
//   //   }
//   // });

// app.post('/create', function(req, res) {
//     console.log(req.body)
//     if(req.body==[])
//         {
//             return
//         }
//     const newdata={
//         Email : req.body.Email,
//         Password : req.body.Password
//     }
//     data.push(newdata)
    
//    console.log(data)
//   })





//start your server on port 3000
app.listen(3000, () => {
  console.log('Server Listening on port 3000');
});
