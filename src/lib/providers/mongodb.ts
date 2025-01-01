import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

export async function connect() {
    const client = new MongoClient(uri, options);
    return await client.connect();
}

export async function close(client: { close: () => any; }) {
    await client.close();
}