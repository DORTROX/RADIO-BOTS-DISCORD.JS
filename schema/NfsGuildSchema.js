const mongoose = require("mongoose");

const NfsGuildSchema = new mongoose.Schema({
  vcID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  guildID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model('NfsGuild', NfsGuildSchema);
