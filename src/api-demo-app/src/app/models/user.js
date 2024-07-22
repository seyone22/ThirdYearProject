// models/user.js
import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true, },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
})

const User = models.User || model("User", userSchema);
User.schema.set('collection', 'users');

export default User;