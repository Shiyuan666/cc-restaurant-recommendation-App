const express = require('express');
const {createTodo, getTodos, editTodo, deleteTodo} = require('../handlers/todos');
const {authentication, authorization} = require('../middlewares/auth')

const router = express.Router({mergeParams:true});

router.post('/user/:id', authentication, authorization, createTodo);
router.get('/user/:id', authentication, authorization, getTodos);
router.put('/user/:id/:todo_id', authentication, authorization, editTodo);
router.delete('/user/:id/:todo_id', authentication, authentication, deleteTodo);

module.exports = router;