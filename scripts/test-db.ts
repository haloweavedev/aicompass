// scripts/test-db.ts
import prisma from '../lib/prisma'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test query
    const userCount = await prisma.user.count()
    console.log(`Found ${userCount} users in database`)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()