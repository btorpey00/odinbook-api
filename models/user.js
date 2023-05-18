const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    profile_pic: { type: String },
    outbound_friend_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    inbound_friend_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }]
});

UserSchema.virtual('full_name').get(function() {
    return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('User', UserSchema);