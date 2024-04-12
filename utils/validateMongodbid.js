const mongoose = require('mongoose');

const validateMongodbid = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid) {
        throw new Error('This id is not a valid ObjectId');
    }
}

module.exports = validateMongodbid;


