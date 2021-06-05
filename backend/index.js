const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const portNumber = process.env.PORT || 8010;

const mongoose = require('mongoose');

const UserRoutes = require("./routes/Auth");
const WHITE_LIST = ['http://localhost:3000',"https://aryamannrsm.netlify.app/"];

const corsOptions = {
    origin : (origin,callback)=>{
        if (!origin || WHITE_LIST.indexOf(origin) != -1){
            callback(null,true);
        }else{
            callback(new Error("CORS NOT ALLOWED!"));
        }
    }
}

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
});


mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@rsmtaskphase.i1wsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
     useUnifiedTopology: true
  }).then(client=>{
    console.log("Connected!");

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json({extended:true}));

    app.listen(portNumber,()=>{
        console.log("Listening on " + portNumber.toString());
    });
    
    app.get('/',(req,res,next)=>{
        return res.json({
            success:true,
            message : "Deployed baby!"
        })
    })

    app.use('/auth',UserRoutes);
  }).catch(e=>{
      console.log("ERROR!");
      console.log(e);
  })



