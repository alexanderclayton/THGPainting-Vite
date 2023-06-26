import mongoose from 'mongoose';
import User from '../models/User.js';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thgpainting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Chris = new User({
    name: 'Chris',
    email: 'firegbt@gmail.com',
    password: 'NewPassword'
});

const Alex = new User({
    name: 'Alex',
    email: 'alexander.clayton.email@gmail.com',
    password: 'NewPassword'
});

async function createUsers() {
    try {
        await Chris.save();
        await Alex.save();
        console.log('Successfully added users!');
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.disconnect();
    }
}

createUsers();