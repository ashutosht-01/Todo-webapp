const express=require('express');
const bodyParser=require('body-parser');
const date=require(__dirname+'/date.js');
const ejs=require('ejs');
const { urlencoded } = require('body-parser');
const { redirect } = require('statuses');
const { push } = require('methods');
const mongoose=require('mongoose');
mongoose.set('useCreateIndex', true);
const app=express();
app.use(bodyParser.urlencoded({extended :true}))
app.use(express.static('public'))
app.set('view engine','ejs')
mongoose.connect("mongodb://localhost",{useNewUrlParser: true});
const itemSchema=new mongoose.Schema({
    name:String
});
const Item=mongoose.model('item',itemSchema);
const item1=new Item({name:'welcome to your to do list'});
const item2=new Item ({    name:"Hit the + button to add new item"});
const item3=new Item({name:'<-- Hit this to delete the item'});
const defaultItems=[item1,item2,item3];
// Item.insertMany(defaultItems,function(err){
//     if(err)
//     console.log(err);
//     else
//     console.log('successfully saved default item to db');
// })
app.get('/',function(req,res){
    var day=date();
    Item.find({},function(err,foundItems){
        if(foundItems.length==0)
        {
            Item.insertMany(defaultItems,function(err){
                if(err)
                console.log(err);
                else
                console.log('successfully saved default item to db');
            })
        }
        else
        res.render('list',{ListTitle:day,newitems:foundItems});
    })
})
const ListSchema=new mongoose.Schema({
    name:String,
    items:[itemSchema]
});
const List=mongoose.model('list',ListSchema);
//route parameters to create dynamic routes
app.get('/:customlistname',function(req,res){
const customlistname=req.params.customlistname;
List.findOne({name:customlistname},function(err,foundlist){
    if(!err){
        //if there is no route then it will create it & it will hang in there
     if(!foundlist){
        const list=new List({
            name:customlistname,
            items:defaultItems
        })
        list.save();
        res.redirect('/'+customlistname);
     }
     else{
         res.render('list',{ListTitle:foundlist.name,newitems:foundlist.items});
     }
    }

})
})
app.post('/',function(req,res){
var itemname=req.body.inp;
var item=new Item({
    name:itemname
});
item.save();
res.redirect('/')
})
app.post('/work',function(req,res){
    console.log(req.body)
    var item=req.body.inp;
    workitems.push(item)
    res.redirect('/work')
})
app.post('/delete',function(req,res){
   const checkitemid=req.body.checkbox;
  Item.findByIdAndRemove(checkitemid,function(err){
      if(!err) 
      console.log('successfully removed checked item');
      res.redirect('/');
  })
})
app.get('/about',function(req,res){
    res.render('about')
})
//this process object is define by heroku
app.listen(process.env.PORT || 4000,function(){
    console.log('app started on port 4000')
})
