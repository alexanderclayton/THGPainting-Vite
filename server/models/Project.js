import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  projectType: {
    type: String,
    enum: ['PAINTING', 'CHRISTMAS_LIGHTS', 'OTHER'],
    required: true,
  },
  paintColors: {
    type: [String],
    required: false,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paymentType: {
    type: String,
    enum: ['CASH', 'CHECK', 'VENMO', 'NONE'],
    required: false,
  },
  images: {
    type: [String],
    required: false,
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
