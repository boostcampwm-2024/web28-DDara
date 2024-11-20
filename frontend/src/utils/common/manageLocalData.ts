/* eslint-disable */
import lzString from 'lz-string';

export function saveLocalData(key: string, val: string): void {
  if (typeof window !== 'undefined') {
    const storage = window.localStorage;

    if (storage) {
      try {
        storage.setItem(key, lzString.compressToUTF16(val));
      } catch (e) {
        console.error('Storage Full ... clean old data...');
        for (const k in storage) {
          if (k.indexOf('DATA_MESSAGE_DETAIL_') > -1) {
            storage.removeItem(k);
          }
        }
        storage.setItem(key, lzString.compressToUTF16(val));
      }
    }
  }
}

export function loadLocalData(key: string): string | null {
  if (typeof window !== undefined) {
    const storage = window.localStorage;

    if (storage) {
      const keyValue = storage.getItem(key);
      if (keyValue) return lzString.decompressFromUTF16(keyValue);
    }
  }
  return null;
}

export function clearLocalData() {
  if (typeof window !== undefined) {
    const storage = window.localStorage;

    if (storage) {
      storage.clear();
    }
  }
}

export function removeLocalData(key: string): void {
  if (typeof window !== undefined) {
    const storage = window.localStorage;
    if (storage) {
      storage.removeItem(key);
    }
  }
}
