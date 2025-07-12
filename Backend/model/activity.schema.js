import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['doctor_added', 'doctor_deleted', 'appointment_scheduled', 'message_received'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  meta: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Activity = mongoose.model('Activity', activitySchema); 