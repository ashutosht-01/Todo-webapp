const express=require('express')
const bodyParser=require('body-parser')
const date=require(__dirname+'/date.js')
const ejs=require('ejs');
const { urlencoded } = require('body-parser');
const { redirect } = require('statuses');
const { push } = require('methods');
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
var items=["eat","sleep","code","repeat"]
var workitems=[]
//the code that is not releated to route should not be in app.js
app.get('/',function(req,res){
var day=date();
res.render('list',{ListTitle:day,newitems:items})
})
app.post('/',function(req,res){
var item=req.body.inp
if(req.body.btn='Work List'){
workitems.push(item)
res.redirect('/work')
}
else{
items.push(item);
res.redirect('/')
}
})
app.get('/work',function(req,res){
res.render('list',{ListTitle:'Work List',newitems:workitems})
})
app.post('/work',function(req,res){
    console.log(req.body)
    var item=req.body.inp;
    workitems.push(item)
    res.redirect('/work')
})
app.get('/about',function(req,res){
    res.render('about')
})
//this process object is define by heroku
app.listen(process.env.PORT || 3000,function(){
    console.log('app started on port 3000')
})
