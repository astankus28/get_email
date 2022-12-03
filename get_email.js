{\rtf1\ansi\ansicpg1252\cocoartf2706
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab560
\pard\pardeftab560\slleading20\pardirnatural\partightenfactor0

\f0\fs26 \cf0 // First, we need to import the necessary libraries\
const imap = require('imap');\
const email = require('emailjs');\
const fs = require('fs');\
\
// Replace with your own Gmail login credentials\
const gmailUsername = 'your_username@gmail.com';\
const gmailPassword = 'your_password';\
\
// Connect to the Gmail IMAP server\
const imapConnection = new imap.ImapConnection(\{\
  host: 'imap.gmail.com',\
  port: 993,\
  secure: true,\
  auth: \{\
    user: gmailUsername,\
    pass: gmailPassword\
  \}\
\});\
\
// Open the IMAP connection\
imapConnection.connect();\
\
// Select the "INBOX" folder\
imapConnection.selectMailbox('INBOX', (error, mailbox) => \{\
  if (error) \{\
    // Handle the error\
  \} else \{\
    // Search for all emails from Uber\
    imapConnection.search([['FROM', 'Uber']], (error, results) => \{\
      if (error) \{\
        // Handle the error\
      \} else \{\
        // Get the list of email IDs\
        const emailIds = results;\
\
        // For each email ID, fetch the email message and parse it\
        emailIds.forEach((emailId) => \{\
          imapConnection.fetch(emailId, \{\
            request: \{\
              headers: ['RFC822'],\
              body: 'full'\
            \}\
          \}, (error, fetch) => \{\
            if (error) \{\
              // Handle the error\
            \} else \{\
              // Parse the email message\
              const emailMessage = email.message.from_eml(fetch.body);\
\
              // Get the plain text body of the email message\
              const body = emailMessage.get_body('text/plain');\
\
              // Extract the invitee name, invitee email, phone number, restaurant name, and address of the restaurant from the email message body\
              const invitee = body.match(/Invitee: (.*)/)[1];\
              const inviteeEmail = body.match(/Invitee Email: (.*)/)[1];\
              const phoneNumber = body.match(/Phone Number: (.*)/)[1];\
              const restaurantName = body.match(/Restaurant Name: (.*)/)[1];\
              const restaurantAddress = body.match(/Restaurant Address: (.*)/)[1];\
\
              // Print the extracted information to the screen\
              console.log(invitee, inviteeEmail, phoneNumber, restaurantName, restaurantAddress);\
            \}\
          \});\
        \});\
\
        // Close the IMAP connection\
        imapConnection.logout();\
      \}\
    \});\
  \}\
\});\
}