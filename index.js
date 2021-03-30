const fs = require("fs");

const convertTextToXML = async (path) => {
    let textFromFile = await readFile(path);

    const removeRAndSplitLines = await textFromFile
        .replace(/\r/g, "")
        .split(/\n/);

    const arrayOfLines = createArrayOfLines(removeRAndSplitLines);

    const arrayOfInformationRows = createArrayOfInformationRows(arrayOfLines);

    const personArray = personObjectsFromArray(arrayOfInformationRows);

    // Creating the string of persons to write in XML-file
    let returnString = `<?xml version="1.0" encoding="UTF-8"?>`;
    personArray.forEach((person) => {
        returnString += createXML(person);
    });

    writeToFile(returnString);
};

const readFile = async (path) => {
    return await fs.readFileSync(path, "utf8", async (err, data) => {
        if (err) {
            console.error(err);
        }
        result = data;
    });
};

const createArrayOfLines = (string) => {
    let linesSplitted = [];
    string.forEach((line) => {
        linesSplitted.push(line.split(/\|/));
    });
    return linesSplitted;
};

const createArrayOfInformationRows = (array) => {
    let rowsOfInformation = [];
    array.forEach((row, index) => {
        let array = [];
        row.forEach((line, index) => {
            array.push(line);
        });
        rowsOfInformation[index] = array;
    });
    return rowsOfInformation;
};

const personObjectsFromArray = (rowsOfInformation) => {
    let foundPerson = false;
    let foundFamilyMember = false;
    let listOfPeopleObjects = [];

    let person = {
        firstname: "",
        lastname: "",
        phonenumber: [],
        adress: [],
        family: [],
    };
    let familyPerson = {
        firstname: "",
        birth: "",
        phonenumber: [],
        address: [],
    };

    const emptyPersonInfo = () => {
        person = {
            firstname: "",
            lastname: "",
            phonenumber: [],
            adress: [],
            family: [],
        };
    };
    const emptyFamilyPersonInfo = () => {
        familyPerson = {
            firstname: "",
            birth: "",
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

            emptyPersonInfo();
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
                if (index === 1) {
                    familyPerson.firstname = value;
                }
                if (index === 2) {
                    familyPerson.birth = value;
                }
            });
        }

        if (row[0] == "P" && !foundPerson && !foundFamilyMember) {
            foundPerson = true;
            row.forEach((value, index) => {
                if (index === 1) {
                    person.firstname = value;
                }
                if (index === 2) {
                    person.lastname = value;
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
    return listOfPeopleObjects;
};

const createXML = (person) => {
    let family = "";

    person.family.forEach((person) => {
        let familyAdress = "";
        person.address.forEach((adress, index) => {
            if (index === 0) {
                familyAdress += `<street>${adress}</street>\n`;
            } else if (person.address.length - 1 === index) {
                familyAdress += `\t\t\t<street>${adress}</street>`;
            } else familyAdress += `\t\t\t<street>${adress}</street>\n`;
        });
        family += `<firstname>${person.firstname}</firstname>
        <birth>${person.birth}</birth>
        <adress>
            ${familyAdress}
        </adress>
        `;
    });

    return `
<people>
    <person>
    <firstname>${person.firstname}</firstname>
    <lastname>${person.lastname}</lastname>
    <address>
        ${person.adress
            .map((adress, index) => {
                if (index === 0) {
                    return `<street>${adress}</street>`;
                } else return `\t\t<street>${adress}</street>`;
            })
            .join("\n")}
    </address>
    <phone>
        ${person.phonenumber
            .map((number, index) => {
                if (index === 0) {
                    return `<number>${number}</number>`;
                } else return `\t\t<number>${number}</number>`;
            })
            .join("\n")}
    </phone>
    <family>
        ${family}
    </family>
    </person>
</people>
`;
};

const writeToFile = (xmlString) => {
    fs.writeFile(
        "./converted-file/Persons in XML.xml",
        xmlString,
        "UTF-8",
        () => {
            console.log("Saved");
        }
    );
};

convertTextToXML("./file-to-convert/plaintext.txt");
