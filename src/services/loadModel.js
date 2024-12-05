const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    return tf.loadGraphModel('https://');// isi sesuai bucket model jika tidak menggunakan env
}
module.exports = loadModel;