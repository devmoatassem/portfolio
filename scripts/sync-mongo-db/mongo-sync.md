# MongoDB Sync - Local Setup Guide

## Prerequisites
- Node.js installed (v14 or higher)
- MongoDB installed locally or access to MongoDB instances

## Step 1: Create Project Folder

```bash
mkdir mongodb-sync
cd mongodb-sync
```

## Step 2: Initialize Node.js Project

```bash
npm init -y
```

## Step 3: Install Dependencies

```bash
npm install mongodb dotenv
```

## Step 4: Create Project Files

### File 1: `sync.js`

```javascript
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function syncMongoDB() {
  const sourceUri = process.env.SOURCE_MONGODB_URI;
  const targetUri = process.env.TARGET_MONGODB_URI;
  const sourceDbName = process.env.SOURCE_DB_NAME;
  const targetDbName = process.env.TARGET_DB_NAME;

  if (!sourceUri || !targetUri || !sourceDbName || !targetDbName) {
    console.error('❌ Missing required environment variables');
    process.exit(1);
  }

  let sourceClient, targetClient;

  try {
    console.log('🔌 Connecting to source MongoDB...');
    sourceClient = new MongoClient(sourceUri);
    await sourceClient.connect();
    const sourceDb = sourceClient.db(sourceDbName);

    console.log('🔌 Connecting to target MongoDB...');
    targetClient = new MongoClient(targetUri);
    await targetClient.connect();
    const targetDb = targetClient.db(targetDbName);

    console.log('📋 Getting collections list...');
    const collections = await sourceDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections\n`);

    const syncResults = [];

    for (const collInfo of collections) {
      const collName = collInfo.name;
      console.log(`📦 Syncing collection: ${collName}`);

      try {
        const sourceCollection = sourceDb.collection(collName);
        const targetCollection = targetDb.collection(collName);

        const documents = await sourceCollection.find({}).toArray();

        if (documents.length === 0) {
          console.log(`   ⚠️  No documents found, skipping\n`);
          syncResults.push({
            collection: collName,
            status: 'skipped',
            count: 0
          });
          continue;
        }

        // Clear target collection
        await targetCollection.deleteMany({});
        console.log(`   🗑️  Cleared target collection`);

        // Insert documents
        const result = await targetCollection.insertMany(documents);
        console.log(`   ✅ Synced ${result.insertedCount} documents\n`);

        syncResults.push({
          collection: collName,
          status: 'success',
          count: result.insertedCount
        });
      } catch (collError) {
        console.error(`   ❌ Error: ${collError.message}\n`);
        syncResults.push({
          collection: collName,
          status: 'error',
          error: collError.message
        });
      }
    }

    console.log('\n═══════════════════════════════════');
    console.log('📊 SYNC SUMMARY');
    console.log('═══════════════════════════════════');
    
    const successful = syncResults.filter(r => r.status === 'success');
    const failed = syncResults.filter(r => r.status === 'error');
    const skipped = syncResults.filter(r => r.status === 'skipped');
    
    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);
    console.log(`⚠️  Skipped: ${skipped.length}`);
    console.log(`📝 Total Documents Synced: ${successful.reduce((sum, r) => sum + r.count, 0)}`);
    console.log('═══════════════════════════════════\n');

    if (failed.length > 0) {
      console.log('Failed Collections:');
      failed.forEach(r => console.log(`  - ${r.collection}: ${r.error}`));
    }

  } catch (error) {
    console.error('❌ Fatal Error:', error.message);
    process.exit(1);
  } finally {
    if (sourceClient) {
      await sourceClient.close();
      console.log('🔌 Disconnected from source');
    }
    if (targetClient) {
      await targetClient.close();
      console.log('🔌 Disconnected from target');
    }
  }
}

// Run the sync
syncMongoDB()
  .then(() => {
    console.log('✅ Sync completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  });
```

### File 2: `.env`

```env
# Source MongoDB Configuration
SOURCE_MONGODB_URI=mongodb://localhost:27017
SOURCE_DB_NAME=source_database

# Target MongoDB Configuration
TARGET_MONGODB_URI=mongodb://localhost:27017
TARGET_DB_NAME=target_database
```

### File 3: `.gitignore`

```
node_modules/
.env
*.log
```

### File 4: `package.json` (update scripts)

Add this to your package.json:

```json
{
  "scripts": {
    "sync": "node sync.js"
  }
}
```

## Step 5: Configure Your MongoDB URIs

Edit the `.env` file with your actual MongoDB connection strings:

### For Local MongoDB:
```env
SOURCE_MONGODB_URI=mongodb://localhost:27017
SOURCE_DB_NAME=mySourceDB

TARGET_MONGODB_URI=mongodb://localhost:27017
TARGET_DB_NAME=myTargetDB
```

### For MongoDB with Authentication:
```env
SOURCE_MONGODB_URI=mongodb://username:password@localhost:27017
SOURCE_DB_NAME=mySourceDB

TARGET_MONGODB_URI=mongodb://username:password@localhost:27017
TARGET_DB_NAME=myTargetDB
```

### For MongoDB Atlas (Cloud):
```env
SOURCE_MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
SOURCE_DB_NAME=mySourceDB

TARGET_MONGODB_URI=mongodb+srv://username:password@cluster1.mongodb.net/?retryWrites=true&w=majority
TARGET_DB_NAME=myTargetDB
```

## Step 6: Run the Sync

```bash
npm run sync
```

Or directly:

```bash
node sync.js
```

## Folder Structure

Your project should look like this:

```
mongodb-sync/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── sync.js
```

## Troubleshooting

### MongoDB Connection Issues

1. **Check if MongoDB is running:**
   ```bash
   # For Windows
   net start MongoDB
   
   # For macOS/Linux
   sudo systemctl status mongod
   ```

2. **Test connection:**
   ```bash
   mongosh
   ```

3. **Check firewall settings** if connecting to remote MongoDB

### Common Errors

- **"ECONNREFUSED"**: MongoDB is not running
- **"Authentication failed"**: Wrong username/password
- **"Database not found"**: The database will be created automatically when you insert data

## Optional: Add Scheduling

To run sync automatically, you can use:

### Using node-cron:

```bash
npm install node-cron
```

Create `scheduled-sync.js`:

```javascript
const cron = require('node-cron');
const { exec } = require('child_process');

// Run every day at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('Starting scheduled sync...');
  exec('node sync.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(stdout);
  });
});

console.log('Scheduler started. Sync will run daily at 2 AM');
```

Run with: `node scheduled-sync.js`

## Notes

- ⚠️ **This script DELETES all data in target collections before syncing**
- 💾 **Make backups before running in production**
- 🔒 **Never commit `.env` file to version control**
- 📈 **For large databases, consider implementing batch processing**