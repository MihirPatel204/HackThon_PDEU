import mongoose, { Document, Schema } from 'mongoose';

// Define validation context type
interface ValidationContext {
  value: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  ssn: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    ssn: { 
      type: String, 
      required: true, 
      unique: true,
      // In a real application, this would be encrypted or hashed
      validate: {
        validator: function(v: string) {
          return /^\d{3}-\d{2}-\d{4}$/.test(v);
        },
        message: (props: { value: string }) => `${props.value} is not a valid SSN format (XXX-XX-XXXX)!`
      }
    },
    dateOfBirth: { type: Date, required: true },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema); 