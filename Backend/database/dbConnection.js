import mongoose from 'mongoose';

export const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: 'hospital_management_system'
  }).then(() => {
    console.log(`✅ MongoDB Connected: hospital_management_system `);
  }).catch((err) => {
    console.log(`❌ DB Connection Error: ${err.message}`);
  });
};
