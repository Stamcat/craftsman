const fs = require("fs");

fs.readFile("package-lock.json", function (err, data) {
    if (err) {
        throw err;
    }
    if (data.includes("change-me")) {
        process.stderr.write(
            "\nERROR: package-lock contains invalid references to the Banned registry\n",
        );
        process.exit(1);
    }
});
