import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Worker from '../models/Worker';
import connectDB from '../config/database';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Worker.deleteMany({});

    // Create demo users
    console.log('👥 Creating demo users...');
    
    // Demo customer
    const customer = new User({
      name: 'Priya Sharma',
      email: 'customer@demo.com',
      password: 'Demo123!',
      phone: '+919876543210',
      address: '123 Main Street, Green Park',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110016',
      userType: 'customer',
      isVerified: true,
      isActive: true
    });
    await customer.save();

    // Demo workers data
    const workersData = [
      {
        name: 'Ramesh Kumar',
        email: 'ramesh@demo.com',
        password: 'Demo123!',
        phone: '+919876543211',
        address: 'Sector 12, Dwarka',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110078',
        services: ['Electrical Work'],
        skills: ['House Wiring', 'Appliance Repair', 'Circuit Installation', 'LED Installation'],
        experience: 8,
        hourlyRate: 300,
        description: 'Experienced electrician with 8+ years in residential and commercial electrical work. Specialized in house wiring, appliance repair, and modern LED installations. Available for emergency calls.',
        rating: 4.8,
        totalRatings: 156,
        totalJobs: 142,
        languages: ['Hindi', 'English'],
        workRadius: 25
      },
      {
        name: 'Suresh Patel',
        email: 'suresh@demo.com',
        password: 'Demo123!',
        phone: '+919876543212',
        address: 'Lajpat Nagar IV',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110024',
        services: ['Plumbing'],
        skills: ['Pipe Installation', 'Leak Repair', 'Bathroom Fitting', 'Water Tank Cleaning'],
        experience: 12,
        hourlyRate: 350,
        description: 'Professional plumber with over 12 years of experience. Expert in pipe installation, leak repairs, and bathroom fittings. Quick response for emergency plumbing issues.',
        rating: 4.9,
        totalRatings: 203,
        totalJobs: 189,
        languages: ['Hindi', 'English', 'Gujarati'],
        workRadius: 30
      },
      {
        name: 'Maya Singh',
        email: 'maya@demo.com',
        password: 'Demo123!',
        phone: '+919876543213',
        address: 'Vasant Kunj, Sector C',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110070',
        services: ['House Cleaning', 'Gardening'],
        skills: ['Deep Cleaning', 'Kitchen Cleaning', 'Plant Care', 'Lawn Maintenance'],
        experience: 5,
        hourlyRate: 200,
        description: 'Dedicated house cleaner and gardener with 5 years of experience. Specializes in deep cleaning and plant care. Reliable and trustworthy service.',
        rating: 4.7,
        totalRatings: 89,
        totalJobs: 76,
        languages: ['Hindi', 'English', 'Punjabi'],
        workRadius: 20
      },
      {
        name: 'Rajesh Yadav',
        email: 'rajesh@demo.com',
        password: 'Demo123!',
        phone: '+919876543214',
        address: 'Karol Bagh, Central Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110005',
        services: ['Painting', 'Carpentry'],
        skills: ['Wall Painting', 'Furniture Repair', 'Wood Polishing', 'Interior Painting'],
        experience: 10,
        hourlyRate: 280,
        description: 'Skilled painter and carpenter with 10+ years of experience. Expert in wall painting, furniture repair, and wood polishing. Quality work guaranteed.',
        rating: 4.6,
        totalRatings: 124,
        totalJobs: 118,
        languages: ['Hindi', 'English'],
        workRadius: 35
      },
      {
        name: 'Anita Kumari',
        email: 'anita@demo.com',
        password: 'Demo123!',
        phone: '+919876543215',
        address: 'Rohini, Sector 18',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110089',
        services: ['House Cleaning'],
        skills: ['Deep Cleaning', 'Kitchen Sanitization', 'Bathroom Cleaning', 'Floor Mopping'],
        experience: 6,
        hourlyRate: 180,
        description: 'Professional house cleaner with 6 years of experience. Specializes in deep cleaning and sanitization. Regular and one-time cleaning services available.',
        rating: 4.8,
        totalRatings: 67,
        totalJobs: 65,
        languages: ['Hindi', 'English'],
        workRadius: 15
      },
      {
        name: 'Vikram Singh',
        email: 'vikram@demo.com',
        password: 'Demo123!',
        phone: '+919876543216',
        address: 'Mayur Vihar Phase 1',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110091',
        services: ['Appliance Repair'],
        skills: ['AC Repair', 'Refrigerator Repair', 'Washing Machine Repair', 'Microwave Repair'],
        experience: 7,
        hourlyRate: 400,
        description: 'Expert appliance repair technician with 7+ years of experience. Specializes in AC, refrigerator, and washing machine repairs. Same-day service available.',
        rating: 4.7,
        totalRatings: 98,
        totalJobs: 92,
        languages: ['Hindi', 'English', 'Punjabi'],
        workRadius: 25
      }
    ];

    // Create workers
    for (const workerData of workersData) {
      // Create user account
      const user = new User({
        name: workerData.name,
        email: workerData.email,
        password: workerData.password,
        phone: workerData.phone,
        address: workerData.address,
        city: workerData.city,
        state: workerData.state,
        pincode: workerData.pincode,
        userType: 'worker',
        isVerified: true,
        isActive: true
      });
      await user.save();

      // Create worker profile
      const worker = new Worker({
        userId: user._id,
        services: workerData.services,
        skills: workerData.skills,
        experience: workerData.experience,
        hourlyRate: workerData.hourlyRate,
        description: workerData.description,
        rating: workerData.rating,
        totalRatings: workerData.totalRatings,
        totalJobs: workerData.totalJobs,
        verificationStatus: 'verified',
        languages: workerData.languages,
        workRadius: workerData.workRadius,
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '+919999999999',
          relation: 'Family'
        }
      });
      await worker.save();

      console.log(`✅ Created worker: ${workerData.name}`);
    }

    console.log(`
🎉 Seed data created successfully!

Demo Accounts:
📧 Customer: customer@demo.com | Password: Demo123!
📧 Worker: ramesh@demo.com | Password: Demo123!
📧 Worker: suresh@demo.com | Password: Demo123!
📧 Worker: maya@demo.com | Password: Demo123!
📧 Worker: rajesh@demo.com | Password: Demo123!
📧 Worker: anita@demo.com | Password: Demo123!
📧 Worker: vikram@demo.com | Password: Demo123!

Total Users Created: ${workersData.length + 1}
Total Workers Created: ${workersData.length}
    `);

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed function
if (require.main === module) {
  seedData();
}

export default seedData;