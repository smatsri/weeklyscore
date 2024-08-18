const { exec } = require("child_process");

const dockerComposeFilePath = require("path").join(__dirname, "local.yml");
exec(
  `docker-compose -f ${dockerComposeFilePath} up -d`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);
