const db = require('../models');

//return all the posts.
exports.getTodos =function(req,res,next){
        db.Todos.find({}).sort({'date': -1}).populate("User",{
            username:true
        }).exec((err,todos)=>{
            if(err)
                return next(e);
            else
                return res.status(200).json(todos);
        })
}

exports.createTodo = async function(req,res,next){
    try{
        let id = req.params.id;
        let foundUser = await db.User.findById(id);
        if(foundUser===null)
            throw Error("invaid user id")
        let todo = await db.Todos.create({
            todo: req.body.todo,
            user: id,
            done: false
        });
        foundUser.todos.push(todo._id);
        await foundUser.save();
        let foundTodo = await db.Todos.findById(todo._id).populate("user",{
            username: true
        });
        return res.status(200).json(foundTodo);
    }catch(e){
        return next(e);
    }
}

exports.editTodo = async function(req, res, next){
    try{
        let todo_id = req.params.todo_id;
        let foundTodo = await db.Todos.findById(todo_id);
        foundTodo.todo = req.body.todo;
        await foundTodo.save();
        return res.status(201).json(foundTodo);
    }catch(e){
        return next(e);
    }
}

exports.deleteTodo = async function(req,res,next){
    try{
        let id = req.params.id;
        let todo_id = req.params.todo_id;
        await db.Todos.deleteOne({_id:todo_id});
        let foundUser = await db.User.findById(id);
        if(foundUser===null)
            throw Error("invaid user id")
        foundUser.todos = foundUser.todos.filter((todo)=> todo._id !== todo_id);
        await foundUser.save();
        return res.status(204).end();
    }catch(e){
        return next(e);
    }
}

