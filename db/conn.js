const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/server3',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
     console.log(err);
})