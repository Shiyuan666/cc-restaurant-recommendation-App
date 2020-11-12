const mongoose = require('mongoose');
const User = require('./User');

todoSchema = new mongoose.Schema({
    todo:{
        type: String,
        required: true,
        maxlength:160,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    done: {
        type: Boolean,
        default: false
    }
});

todoSchema.pre('remove', async function (next){
    try{
        let user = await User.findById(this.user);
        user.posts.remove(this.id);
        await user.save();
        return next();
    }
    catch(e){
        return next(e);
    }
})

const todo = new mongoose.model('todo', todoSchema);

module.exports = todo;