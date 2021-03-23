const fs = require("fs");

const readfile = async (path) => {
  let test = await fs.readFileSync(path, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
    }
    test = data;
  });
  const removeRAndSplitLines = test.replace(/\r/g, "").split(/\n/);

  let linesSplitted = [];
  removeRAndSplitLines.forEach((line) => {
    linesSplitted.push(line.split(/\|/));
  });
  let personArray = [];
  linesSplitted.forEach((row) => {
    let object = {};
    row.forEach((line, index) => {
      object[index] = line;
    });
    personArray.push(object);
  });

  personArray.forEach((row) => {
    console.log(row[0]);
  });

  // console.log(personArray);
};

readfile("../file-to-convert/plaintext.txt");
