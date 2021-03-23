const fs = require("fs");

const readfile = async (path) => {
  let test = await fs.readFileSync(path, "utf8", async (err, data) => {
    if (err) {
      console.error(err);
    }
    test = data;
  });
  const test2 = test.replace(/\r/g, "");
  const test3 = test2.split(/\n/);
  let test4;

  console.log(test3);
};

readfile("../file-to-convert/plaintext.txt");

// const wrapper = document.querySelector("#wrapper");

// console.log(wrapper);
