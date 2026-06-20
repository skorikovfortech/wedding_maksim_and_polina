/**
 * Вставьте ID таблицы между кавычками ниже. ID находится в адресе:
 * docs.google.com/spreadsheets/d/ЭТОТ_ID/edit
 */
const SPREADSHEET_ID = 'ВСТАВЬТЕ_ID_ТАБЛИЦЫ';

function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName('Ответы');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Ответы');
    sheet.appendRow(['Дата', 'Имя', 'Присутствие', 'Напитки']);
  }

  sheet.appendRow([
    new Date(),
    e.parameter.name || '',
    e.parameter.attendance || '',
    e.parameter.drink || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
