require('@testing-library/jest-dom/extend-expect');
require('@testing-library/jest-dom');
require('isomorphic-fetch');
const failOnConsole = require('jest-fail-on-console');

failOnConsole({
  shouldFailOnInfo: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnWarn: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnError: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnLog: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnDebug: !process.env.CONSOLE_LOGS_ALLOWED,
  shouldFailOnAssert: !process.env.CONSOLE_LOGS_ALLOWED,
});

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    bffApiConfig: { baseURL: process.env.BFF_API_HOST },
    proxyApiConfig: { baseURL: process.env.NEXT_API_PROXY },
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

