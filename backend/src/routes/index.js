const express = require('express');
const errorMiddleware = require('../middleware/ErrorMiddleware');
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

const router = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

router.use('/products', async (req, res) => {
	admin.firestore()
		.collection('products')
		.get()
		.then(snapshot => {
			const transactions = snapshot.docs.map((doc) => ({
				...doc.data()
			}));
			res.json(transactions)
		})
});
router.use(errorMiddleware);

module.exports = router;
