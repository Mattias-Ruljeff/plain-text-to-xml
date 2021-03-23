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
  let personsArray = [];
  linesSplitted.forEach((row, index) => {
    let array = [];
    row.forEach((line, index) => {
      let test = array.push(line);
    });
    personsArray[index] = array;
  });

  let foundP = false;
  let people = [];
  // personsObject.forEach((row) => {
  //   let person = {};
  //   if (row[0] === "P" && foundP) {
  //     foundP = false;
  //     people.push(person);
  //   }

  //   if (row[0] !== "P" && foundP) {
  //     if (row[0] === "T") person.phonenumber = row;
  //     if (row[0] === "A") person.adress = row;
  //     if (row[0] === "F") person.family = row;
  //   }

  //   if (row[0] === "P" && !foundP) {
  //     foundP = true;
  //     person.name = row;
  //   }
  // });

  console.log(personsArray);
};

readfile("../file-to-convert/plaintext.txt");
