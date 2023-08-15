const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const getProducts = async (_req, res) => {
	admin.firestore()
		.collection('products')
		.get()
		.then(snapshot => {
			const transactions = snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data()
			}));
      
			res.json(transactions)
		})
}

module.exports = {
  getProducts,
}