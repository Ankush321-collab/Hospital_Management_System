import { Activity } from '../model/activity.schema.js';
import { catchasyncerror } from '../middleware/catchasyncerror.js';

export const getRecentActivities = catchasyncerror(async (req, res, next) => {
  // Fetch the 10 most recent activities
  const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json({
    success: true,
    activities
  });
}); 