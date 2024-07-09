// fetch a single word from mongo db
import { type WithId, Document, MongoClient, ServerApiVersion } from 'mongodb';
import { USER_PASSWORD, USERNAME } from './secrets/mongoSecrets';
const dbName = 'RhymingCouplets';
const collectionName = 'coolWords';
const uri = `mongodb+srv://${USERNAME}:${USER_PASSWORD}@words.amxz6ms.mongodb.net/?retryWrites=true&w=majority&appName=words`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// fetch an intersting word from mongo db and return it
export const fetchWord = async (maxCount: number = 0): Promise<string> => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // find a single word and bump the number of times it has been used.
        const result: WithId<Document> = await collection.findOneAndUpdate({ count: maxCount - 1 }, { $inc: { count: 1 } }, { returnDocument: 'after' });
        // TODO: update db to hold maxCount and run process to update the maxCount when this query fails.
        const { word = '' } = result;
        if (!word.length){
          throw new Error('no data found in result');
        }
        return word; 
    } catch (error) {
        console.error('Error fetching word:', error);
    } finally {
        // Close the connection
        await client.close();
    }
};