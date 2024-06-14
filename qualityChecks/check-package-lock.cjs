const fs = require("fs");

fs.readFile("package-lock.json", function (err, data) {
    if (err) {
        throw err;
    }
});
