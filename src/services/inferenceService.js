const tf = require("@tensorflow/tfjs-node");
const { v4: uuidv4 } = require("uuid"); // UUID untuk ID unik
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
  try {
    // Preprocessing image
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    // Predict using the model
    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    console.log("score: ", score);
    console.log("confidenceScore: ", confidenceScore);

    // Determine label and suggestion
    const label = confidenceScore > 50 ? "Cancer" : "Non-cancer";
    const suggestion =
      label === "Cancer"
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.";

    // Build response data
    const response = {
      status: "success",
      message: "Model is predicted successfully",
      data: {
        id: uuidv4(),
        result: label,
        suggestion,
        createdAt: new Date().toISOString(),
      },
    };

    return response;
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
}

module.exports = predictClassification;
