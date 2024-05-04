const express = require("express");
const { google } = require("googleapis");
let router = express.Router();
require("dotenv").config();

router.post("/signup", async (req, res) => {
    const { email } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const spreadsheetId = "1gu_6fgpXEXvaFCiBn2__5w0RcdXmudD0oBJMPAxW-lE";
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
  
    //Get Metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    })
  
    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth, spreadsheetId,
      range: "Sheet1!A:B",
    })
  
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[email,]],
      },
    });
  
    return res.status(200).json({
      successMessage: "Thanks for reaching out. We would revert shortly!",
    });
  });

  module.exports = router;