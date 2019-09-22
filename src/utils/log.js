export const log = message =>
  // eslint-disable-next-line no-console
  console.log(
    `${new Date().toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
      seconds: 'numeric',
      timeStyle: 'medium',
    })}: ${message}`
  );
