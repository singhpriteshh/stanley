const Visit = require('../../models/Data');

// Controller to save visit data
const saveVisitData = async (req, res) => {
  try {
    const {
      customerName,
      customerLocation,
      equipment,
      partNo,
      orderNo,
      studSize,
      contactPersonName,
      contactPersonEmail,
      plannedActivity,
      activityPerformed,
      activityPoints,
      visitStatus,
      reason,
      product,
      category,
      date,
    } = req.body;

    const newVisit = new Visit({
      customerName,
      customerLocation,
      equipment,
      partNo,
      orderNo,
      studSize,
      contactPersonName,
      contactPersonEmail,
      plannedActivity,
      activityPerformed,
      activityPoints,
      visitStatus,
      reason,
      product,
      category,
      date,
    });

    // Save the visit data to MongoDB
    await newVisit.save();

    return res.status(200).json({ message: 'Visit data saved successfully' });
  } catch (error) {
    console.error('Error while saving visit data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  saveVisitData,
};
