const connectToDatabase = require('./db');

const initialGifts = [
  { name: 'Sofa', category: 'Furniture', condition: 'Good', description: 'A comfortable 3-seater sofa.' },
  { name: 'Dining Table', category: 'Furniture', condition: 'Excellent', description: 'Wooden dining table.' },
  { name: 'Microwave', category: 'Appliances', condition: 'Fair', description: 'Working microwave.' },
  { name: 'Refrigerator', category: 'Appliances', condition: 'Good', description: 'Double door fridge.' },
  { name: 'Bicycle', category: 'Sports', condition: 'Good', description: 'Mountain bike.' },
  { name: 'Guitar', category: 'Instruments', condition: 'Excellent', description: 'Acoustic guitar.' },
  { name: 'Bookshelf', category: 'Furniture', condition: 'Good', description: 'Tall wooden bookshelf.' },
  { name: 'Monitor', category: 'Electronics', condition: 'Good', description: '24-inch LED monitor.' },
  { name: 'Keyboard', category: 'Electronics', condition: 'Excellent', description: 'Mechanical keyboard.' },
  { name: 'Office Chair', category: 'Furniture', condition: 'Fair', description: 'Ergonomic chair.' },
  { name: 'Blender', category: 'Appliances', condition: 'Good', description: 'Smoothie blender.' },
  { name: 'Washing Machine', category: 'Appliances', condition: 'Good', description: 'Front-load washer.' },
  { name: 'Tennis Racket', category: 'Sports', condition: 'Good', description: 'Lightweight racket.' },
  { name: 'Coffee Maker', category: 'Appliances', condition: 'Excellent', description: 'Drip coffee maker.' },
  { name: 'Desk Lamp', category: 'Electronics', condition: 'Good', description: 'LED desk lamp.' },
  { name: 'Wardrobe', category: 'Furniture', condition: 'Good', description: '2-door wardrobe.' }
];

async function seedDB() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    
    // Clear existing
    await collection.deleteMany({});
    
    // Insert 16 documents
    const result = await collection.insertMany(initialGifts);
    
    console.log(`Successfully inserted ${result.insertedCount} documents into MongoDB.`);
    console.log('Inserted Document IDs:', result.insertedIds);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
}

seedDB();
