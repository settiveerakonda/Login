
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },  // Adding password field
});

const User = mongoose.model('User', UserSchema);
export default User;
