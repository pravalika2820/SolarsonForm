# Solarson Enquiry Form

This project is a hosted customer enquiry form for Solarson.

## Form Fields

- Customer Name
- Phone Number
- Power Bill
- Property Type
- Street
- District
- Possible Time Slot for Phone Call

## Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build for Hosting

```bash
npm run build
```

Upload the `dist` folder to Netlify, Vercel, or any static hosting provider.

## Save Responses to Google Sheets

1. Create a Google Sheet named `Solarson Leads Database`.
2. Add this header row:

```text
Timestamp | Customer Name | Phone Number | Power Bill | Property Type | Street | District | Call Slot
```

3. In the Google Sheet, go to `Extensions` > `Apps Script`.
4. Paste this script:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.customerName,
    data.phoneNumber,
    data.powerBill,
    data.propertyType,
    data.street,
    data.district,
    data.callSlot,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click `Deploy` > `New deployment`.
6. Choose `Web app`.
7. Set `Execute as` to `Me`.
8. Set `Who has access` to `Anyone`.
9. Copy the Web app URL.
10. Paste that URL into `src/App.tsx`:

```ts
const googleSheetWebAppUrl = 'PASTE_YOUR_WEB_APP_URL_HERE'
```

11. Run `npm run build` again and re-upload the `dist` folder.

If the URL is left blank, submissions are saved only in the browser's local storage for testing.
