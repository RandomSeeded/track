process.on('uncaughtException', e => {
  console.log('e', e);
});
process.on('unhandledRejection', e => {
  console.log('e', e);
});
