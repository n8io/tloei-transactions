export const stringToBool = str =>
  Boolean(
    str && ['1', 'on', 't', 'true'].indexOf(str.toString().toLowerCase()) > -1
  );
