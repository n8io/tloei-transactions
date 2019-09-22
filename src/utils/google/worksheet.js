import { find, pipe, prop, propEq } from 'ramda';
import { workbook } from './workbook';

const worksheets = {};

const sheet = async (doc, sheetName) => {
  if (worksheets[sheetName]) return worksheets[sheetName];

  const info = await workbook(doc);

  // eslint-disable-next-line require-atomic-updates
  worksheets[sheetName] = pipe(
    prop('worksheets'),
    find(propEq('title', sheetName))
  )(info);

  return worksheets[sheetName];
};

export { sheet as worksheet };

/*
{
  "id": "https://spreadsheets.google.com/feeds/worksheets/1X_tMyHp0YO1cQNy1IewLc8yJZ8tEAKlbeod2QImVRbk/private/full",
  "title": "Test - TLOEI Stats",
  "updated": "2019-09-21T19:34:54.644Z",
  "author": {
    "name": "nathandavidclark",
    "email": "nathandavidclark@gmail.com"
  },
  "worksheets": [
    {
      "url": "https://spreadsheets.google.com/feeds/worksheets/1X_tMyHp0YO1cQNy1IewLc8yJZ8tEAKlbeod2QImVRbk/od6",
      "id": "od6",
      "title": "Trophies",
      "rowCount": 1000,
      "colCount": 26,
      "_links": []
    }
  ]
}
 */
