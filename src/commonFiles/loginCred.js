import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: String,
  phone: Number,
  password: String
});

const LoginCred = mongoose.model('loginCred', userSchema);

export default LoginCred;
