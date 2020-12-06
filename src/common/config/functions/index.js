function writeLogsToTxt(data) {
  const fs = require("fs");
  const currentDate = new Date().toUTCString();

  fs.appendFile("logs.txt", `${currentDate}:${data}\n`, function (err) {
    if (err) throw err;
    console.log(`${currentDate}: Error Saved!`);
  });
}

module.exports = {
  writeLogsToTxt,
};
