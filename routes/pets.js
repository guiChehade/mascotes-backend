const express = require('express');
const db = require('../config/firebase');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
  const snapshot = await db.collection('pets').get();
  const pets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(pets);
});

router.post('/', async (req, res) => {
  const newPet = req.body;
  await db.collection('pets').add(newPet);
  res.status(201).send('As informações do Mascotinho foram inseridas com sucesso!');
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPet = req.body;
  await db.collection('pets').doc(id).update(updatedPet);
  res.send('As informações do Mascotinho foram atualizadas com sucesso!');
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.collection('pets').doc(id).delete();
  res.send('O Mascotinho foi excluído com sucesso!');
});

module.exports = router;
