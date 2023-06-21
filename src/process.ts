process.on('unhandledRejection', (reason: any) => {
  console.log(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(reason.message || reason);
});

process.on('uncaughtException', (error: any) => {
  console.log(`Uncaught Exception: ${error.message || error}`);
});
