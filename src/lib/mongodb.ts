import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

// High-Concurrency Connection Pooling Options for 100% Scalability
const options: MongoClientOptions = {
  maxPoolSize: 50, // Maintain up to 50 socket connections for multi-user requests
  minPoolSize: 5,  // Keep 5 warm connections ready instantly
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, reuse global variable across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, maintain global client caching across serverless invocations
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;
