/* 
Google Drive API:
Demonstration to:
1. upload 
2. delete 
3. create public URL of a file.
required npm package: googleapis
*/
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '429899425169-9m1c07be9d076u11dbhob9o89jihb4rm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//045VDTwveRUHgCgYIARAAGAQSNwF-L9IrXuLdAcrr5kRJEvaK1A3-dH-FWwKW5fmmIyp_4oacM5s6REKmzmperLVighwDWUiDWu8';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Initializing drive api
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/
const filePath = path.join(__dirname, 'upload1.png');

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'upload1.png', //This can be name of your choice
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath),
            },
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

// uploadFile();

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: '1GatSDJOsWDSEoL_7jnAqLw3m3uc5UOGk',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

// deleteFile();

async function generatePublicUrl() {
    try {
        const fileId = '1gUVzJa6lAnPs-F2sj8bppR6jIAhBoSKI';
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

generatePublicUrl();