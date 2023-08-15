const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const serviceAccount = require("../../serviceAccountKey.json");


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const getProducts = async (_req, res) => {
	db
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