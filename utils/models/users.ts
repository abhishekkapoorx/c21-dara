// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  },
  phone: {
    type: String,
    unique: true,
    match: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
  },
  password: {
    type: String,
    minlength: 8,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    required: false
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'manager', 'employee'],
    default: 'user'
  },
  authProviderId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  },
  googleId: {
    type: String,
    required: false
  }
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
