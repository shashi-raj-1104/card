const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./model/user')


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('index');
})
app.get('/read', async (req, res)=>{
    let allUsers = await userModel.find();
    res.render('read', {users: allUsers});
})

app.post('/create', async (req, res)=>{
    let {name, email, phone, image} = req.body;
    let newUser = await userModel.create({
        name,
        email, 
        phone, 
        image
    })
    // res.send(newUser);
    res.redirect('/read');
})

app.get('/delete/:id', async (req, res)=>{
    await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
})

app.get('/edit/:id', async (req, res)=>{
    let user = await userModel.findOne({_id: req.params.id});
    res.render('edit', {user});
})

app.post('/edit/:id', async (req, res)=>{
    let {name, email, phone, image} = req.body;
    await userModel.findByIdAndUpdate(req.params.id, {name, email, phone, image});
    res.redirect('/read');
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})