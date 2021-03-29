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

    // Creating person objects.
    let foundPerson = false;
    let foundFamilyMember = false;
    let listOfPeopleObjects = [];

    let person = {
        name: [],
        phonenumber: [],
        adress: [],
        family: [],
    };
    let familyPerson = {
        name: [],
        phonenumber: [],
        address: [],
    };

    const emptyPersonInfo = () => {
        person = {
            name: [],
            phonenumber: [],
            adress: [],
            family: [],
        };
    };
    const emptyFamilyPersonInfo = () => {
        familyPerson = {
            name: [],
            phonenumber: [],
            address: [],
        };
    };

    // Filtering content in the rows of information, adding the information to the person-object
    rowsOfInformation.forEach((row, index) => {
        if (row[0] === "P" && foundPerson && !foundFamilyMember) {
            foundPerson = false;
            foundFamilyMember = false;
            listOfPeopleObjects.push(person);

            emptyPersonInfo;
            emptyFamilyPersonInfo();
        }

        if (row[0] === "P" && foundPerson && foundFamilyMember) {
            foundPerson = false;
            foundFamilyMember = false;
            person.family.push(familyPerson);

            listOfPeopleObjects.push(person);

            emptyPersonInfo();
            emptyFamilyPersonInfo();
        }

        if (row[0] === "F" && foundPerson && foundFamilyMember) {
            foundFamilyMember = false;
            person.family.push(familyPerson);

            emptyFamilyPersonInfo();
        }

        if (row[0] === "F" && foundPerson && !foundFamilyMember) {
            foundFamilyMember = true;
            row.forEach((value, index) => {
                if (index !== 0) {
                    familyPerson.name = [...familyPerson.name, value];
                }
            });
        }

        if (row[0] == "P" && !foundPerson && !foundFamilyMember) {
            foundPerson = true;
            row.forEach((value, index) => {
                if (index !== 0) {
                    person.name = [...person.name, value];
                }
            });
        }

        if (row[0] !== "P" && foundPerson) {
            if (foundFamilyMember) {
                if (row[0] === "T") {
                    row.forEach((value, index) => {
                        if (index !== 0) {
                            familyPerson.phonenumber = [
                                ...familyPerson.phonenumber,
                                value,
                            ];
                        }
                    });
                }
                if (row[0] === "A") {
                    row.forEach((value, index) => {
                        if (index !== 0) {
                            familyPerson.address = [
                                ...familyPerson.address,
                                value,
                            ];
                        }
                    });
                }
            } else {
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
        }

        if (rowsOfInformation.length - 1 === index) {
            if (foundFamilyMember) {
                foundFamilyMember = false;
                person.family.push(familyPerson);
                emptyFamilyPersonInfo();
            }

            foundPerson = false;
            listOfPeopleObjects.push(person);
            emptyPersonInfo();
        }
    });

    listOfPeopleObjects.forEach((element) => {
        console.log(element, "person");
        // console.log(...element.family, "Familj");
    });
};

readfile("../file-to-convert/plaintext.txt");
