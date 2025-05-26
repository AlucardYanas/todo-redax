// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />
import { expect, afterEach, vi, type Mock } from 'vitest';
import '@testing-library/jest-dom';

interface StorageMock {
  getItem: Mock;
  setItem: Mock;
  clear: Mock;
  length: number;
  key: Mock;
  removeItem: Mock;
}

interface GlobalMock {
  localStorage: StorageMock;
  fetch: Mock;
}

const localStorageMock: StorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

global.fetch = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});
