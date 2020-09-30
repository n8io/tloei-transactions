import { getConfig } from 'config';

const { GOOGLE_DOC_ID } = getConfig();

const workbookUrl = (sheetId) =>
  `https://docs.google.com/spreadsheets/d/${GOOGLE_DOC_ID}${sheetId ? `#gid=${sheetId}` : ''}`;

export { workbookUrl };
