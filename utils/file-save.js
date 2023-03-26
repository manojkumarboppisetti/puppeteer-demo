'use strict';

const fs = require("fs");
const moment = require('moment');

const saveFile = function (data, name = moment().unix()) {
    fs.writeFile(name + '.csv', data, 'utf8', function (err) {
        if (err) {
            console.log('Some error occurred - file either not saved or corrupted file saved.');
        } else {
            console.log('It\'s saved!');
        }
    });
};

module.exports = {
    saveFile
};
