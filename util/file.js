const fs = require('fs');

const deletFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    });
};

exports.deletFile = deletFile;