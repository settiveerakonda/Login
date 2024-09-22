
import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
    },
  address: {
     type: String,
      required: true 
    },
});

const Address = mongoose.model('Address', AddressSchema);
export default Address;
