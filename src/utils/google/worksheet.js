import { log } from 'utils/log';

const worksheet = async (doc, name) => {
  log(`🔍 Finding ${name} sheet in workbook...`);
  const sheet = await doc.sheetsByTitle[name];

  if (sheet) {
    log(`👍 Found ${name} sheet.`);
  } else {
    log(`🤷‍♂️ Could not find ${name} sheet in workbook...`);
    throw new Error('Unable to locate worksheet');
  }

  return sheet;
};

export { worksheet };
