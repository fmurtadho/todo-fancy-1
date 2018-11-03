const Todo = require('../models/todo')
const User = require('../models/user')

class Controller {
    static create(req,res){
        let due_date = new Date('2011-04-11T10:20:30Z')

        Todo.create({
            name : req.body.name,
            description : req.body.description,
            author : req.userId, //dapet dari middleware
            due_date : due_date //jangan lupa diganti nanti
        })
        .then((todo)=>{
            User.findOneAndUpdate({
                _id : req.userId
            },{
                $push : {
                    todo_list : todo._id
                }
            })
            .populate('todo_list')
            .then((updated)=>{
                // res.status(200).json(updated)
                
                res.status(201).json({
                    message : "Add Task Success",
                    data : todo
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : 'error in finding task creator from database'
                })
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Create Task Failed'
            })
        })
    }

    static read(req,res){
        Todo.find({})
        .then((resp)=>{
            res.status(200).json({
                data : resp
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Internal Server Error'
            })
        })
    }

    static readOne(req,res){
        Todo.findOne({
            _id : req.params.id
        })
        .then((task)=>{
            res.status(200).json(task)
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Error in searching specified Task'
            })
        })
    }

    static update(req,res){
        // let due_date = new Date('2011-04-11T10:20:30Z')

        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            name : req.body.name,
            description : req.body.description,
            // due_date : req.body.due_date
        })
        .then((updated)=>{
            res.status(200).json({
                message : 'Update Success',
                updated : updated
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Update Failed',
                error : err
            })
        })
    }

    static delete(req,res){
        Todo.findOneAndRemove(req.params.id)
        .then((resp)=>{
            res.status(200).json({
                message : `Task deleted`
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'Failed to delete task'
            })
        })
    }

    static complete(req,res){
        Todo.findOneAndUpdate({
            _id : req.params.id
        },{
            status : true
        })
        .then((resp)=>{
            res.status(200).json({
                message : 'task completed'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : 'failed to complete task'
            })
        })
        
    }

    static uncomplete(req,res){
        Todo.findByIdAndUpdate({
            _id : req.params.id
        },{
            status : false
        })
        .then((resp)=>{
            res.status(200).json({
                message : 'Uncomplete task success'
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : "Uncomplete task failed"
            })
        })

    }
}

module.exports = Controller