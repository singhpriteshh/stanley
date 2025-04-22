const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerLocation: { type: String, required: true },
    equipment: { type: String, required: true },
    partNo: { type: String, required: true },
    orderNo: { type: String, required: true },
    studSize: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contactPersonEmail: { type: String, required: true },
    plannedActivity: { type: String, required: true },
    activityPerformed: { type: String, required: true },
    activityPoints: { type: String, required: true },
    visitStatus: { type: String, required: true },
    reason: { type: String, default: '' },
    product: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
