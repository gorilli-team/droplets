const mongoose = require("mongoose");

const VaultSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ownerAddress: {
    type: String,
  },
  vaultAddress: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  backers: [
    {
      address: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
  ],
});

const Vault = mongoose.model("Vault", VaultSchema);

module.exports = Vault;
