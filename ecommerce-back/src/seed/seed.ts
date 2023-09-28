// seed/seed.ts
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

export async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
     client.connect();
    const db = client.db("EcommerceIberis");
    let countries= [
      { code: "TND", description: "Tunisia" },
      { code: "FR", description: "France" },
      { code: "UK", description: "United Kingdom" },
      { code: "GR", description: "Germany" },
      { code: "USA", description: "United States" },
      { code: "TR", description: "Turc" },

    ];
    db.collection("countries").insertMany(countries);
  } catch (err) {
    console.error(err);
  } finally {
  }
}
