const express = require('express');
const router = express.Router();
const Vault = require('../models/vault');

router.get('/:id', async (req, res) => {
  try {
    const vault = await Vault.findById(req.params.id);
    res.send(vault);
  } catch (error) {
    res.status(500).send({
      error: error.toString(),
    });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('getting vaults');
    const { ownerAddress } = req.query;
    let vaults;

    console.log('req.query', req.query);

    if (ownerAddress) {
      vaults = await Vault.find({ ownerAddress });
    } else {
      vaults = await Vault.find();
    }

    console.log('vaults', vaults);

    res.send({ vaults, count: vaults.length });
  } catch (error) {
    res.status(500).send({
      error: error.toString(),
    });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Adding Vault');
    const vault = new Vault(req.body);
    await vault.save();

    res.send(vault);
  } catch (error) {
    res.status(500).send({
      error: error.toString(),
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const vault = await Vault.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(vault);
  } catch (error) {
    res.status(500).send({
      error: error.toString(),
    });
  }
});

module.exports = router;
