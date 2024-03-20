/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^core/(.*)$': '<rootDir>/src/core/$1',
    '^defaults/(.*)$': '<rootDir>/src/defaults/$1',
    '^instance/(.*)$': '<rootDir>/src/instance/$1',
    '^rules/(.*)$': '<rootDir>/src/rules/$1',
    '^static/(.*)$': '<rootDir>/src/static/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/tests/**/*.ts'],
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export = config;
