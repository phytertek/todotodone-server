const bcrypt = require('bcrypt');

module.exports.hashPassword = async password => bcrypt.hash(password, 11);

module.exports.comparePassword = async (password, hash) =>
  bcrypt.compare(password, hash);
