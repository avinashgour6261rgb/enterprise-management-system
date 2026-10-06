const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 8.x has sensible defaults, no need for deprecated options
    });

    isConnected = true;

    console.log(`\n🍃 MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}\n`);

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('\n⚠️  MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('\n❌ MongoDB Connection Error:', error.message);
    console.error('\n💡 Tip: Make sure MongoDB is running on your machine.');
    console.error('   Run: mongod  (or start MongoDB service)\n');
    process.exit(1);
  }
};

module.exports = connectDB;
