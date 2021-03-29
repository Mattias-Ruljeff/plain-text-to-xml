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

  // Create array of information from rows.
  let rowsOfInformation = [];
  linesSplitted.forEach((row, index) => {
    let array = [];
    row.forEach((line, index) => {
      array.push(line);
    });
    rowsOfInformation[index] = array;
  });
  console.log(rowsOfInformation);

  // Creating person objects.
  let foundP = false;
  let listOfPeopleObjects = [];
  let person = {
    name: [],
    phonenumber: [],
    adress: [],
    family: [],
  };

  // Filtering content in the rows of information, adding the information to the person-object
  rowsOfInformation.forEach((row) => {
    if (row[0] === "P" && foundP) {
      foundP = false;
      listOfPeopleObjects.push(person);
      person = {
        name: [],
        phonenumber: [],
        adress: [],
        family: [],
      };
    }

    if (row[0] === "P" && !foundP) {
      foundP = true;
      row.forEach((value, index) => {
        if (index !== 0) {
          person.name = [...person.name, value];
        }
      });
    }

    if (row[0] !== "P" && foundP) {
      if (row[0] === "T") {
        row.forEach((value, index) => {
          if (index !== 0) {
            person.phonenumber = [...person.phonenumber, value];
          }
        });
      }

      if (row[0] === "A") {
        row.forEach((value, index) => {
          if (index !== 0) {
            person.adress = [...person.adress, value];
          }
        });
      }

      if (row[0] === "F") {
        row.forEach((value, index) => {
          if (index !== 0) {
            person.family = [...person.family, value];
          }
        });
      }
    }

    // console.log(person, "Person");
  });

  console.log(listOfPeopleObjects);
};

readfile("../file-to-convert/plaintext.txt");
