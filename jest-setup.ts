require('@testing-library/jest-dom');
const failOnConsole = require('jest-fail-on-console');

failOnConsole({
  shouldFailOnInfo: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnWarn: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnError: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnLog: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnDebug: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnAssert: !process.env.CONSOLE_LOGS_ALLOWED,
});
