const { Firestore } = require("@google-cloud/firestore");
const path = require("path");

// Path to the service account key file
const pathKey = path.resolve("./submissionmlgc-aripsaputra-95173e03d18b.json");

async function storeData(id, data) {
  try {
    // Initialize Firestore client
    const db = new Firestore({
      projectId: "submissionmlgc-aripsaputra",
      keyFilename: pathKey,
    });

    // Reference to the 'predictions' collection
    const predictCollection = db.collection("predictions");

    // Store data
    await predictCollection.doc(id).set(data);
    console.log(`Data successfully stored with ID: ${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error storing data:", error);
    throw new Error("Failed to store data in Firestore.");
  }
}

module.exports = storeData;
