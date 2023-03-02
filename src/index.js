const { json, urlencoded } = require('express')
const express=require('express')
const app=express()





const hbs=require('hbs')
const path=require('path')
const port=process.env.PORT||3000

const static_path=path.join(__dirname,'../views')
const partial_path=path.join(__dirname,'../views/partials')

const contactUserData=require('./model/model.js')
const connectDB=require('./database/db.js')
const { start } = require('repl')
require('dotenv').config()

app.set('view engine','hbs')
app.set('views',static_path)

app.use('/public',express.static(path.join(__dirname,'../public')))
app.use('/css',express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
hbs.registerPartials(partial_path)

app.use(express.json())
app.use(express.urlencoded({extended:false}))






app.get('/',(req,res)=> {
    res.render("home")                        //responds with HTMl  whereas ,res.send() responds with any data
})


const startServer=async () =>{
    try{
        await connectDB(process.env.MONGO_URI)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  })

    }
    catch(err){
        console.log('Not connected',err)
    }
}

startServer() 




     
  
   







app.post('/contactdata', async(req,res) =>{
    try{
        
        const userName=req.body.user;
        const email=req.body.email;
        const message=req.body.msg;
        const saveContact=new contactUserData({
            name:userName,
            email:email,
            message:message
        });
        const saveData=await saveContact.save()
        if(saveData){
            res.render('home')
        }

    }
    catch(error){
        res.status(401).send(error)
        console.log(error)

    }


})


