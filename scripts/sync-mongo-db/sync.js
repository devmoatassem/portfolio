const { MongoClient } = require('mongodb');
require('dotenv').config();

async function syncMongoDB() {
  const sourceUri = process.env.SOURCE_MONGODB_URI;
  const targetUri = process.env.TARGET_MONGODB_URI;
  const sourceDbName = process.env.SOURCE_DB_NAME;
  const targetDbName = process.env.TARGET_DB_NAME;
  const specificCollection = process.env.COLLECTION_NAME; // New: optional specific collection

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

    let collectionsToSync;

    if (specificCollection) {
      // Sync only the specified collection
      console.log(`🎯 Syncing specific collection: ${specificCollection}\n`);
      collectionsToSync = [{ name: specificCollection }];
    } else {
      // Sync all collections
      console.log('📋 Getting collections list...');
      collectionsToSync = await sourceDb.listCollections().toArray();
      console.log(`Found ${collectionsToSync.length} collections\n`);
    }

    const syncResults = [];

    for (const collInfo of collectionsToSync) {
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