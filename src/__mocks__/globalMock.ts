import axios from "axios";
import LZString from "lz-string";
import { vi } from "vitest";

export const mockAxiosGet = vi.fn().mockImplementation(() => {});
export const mockAxiosPost = vi.fn().mockImplementation(() => {});
export const mockShare = vi.fn().mockImplementation(() => {});
export const mockStorageGetItem = vi.fn().mockImplementation(() => []);
export const mockCompress = vi.fn().mockImplementation(() => {});
export const mockDecompress = vi.fn().mockImplementation(() => {});

vi.spyOn(axios, "get").mockImplementation((...arg) => mockAxiosGet(...arg));
vi.spyOn(axios, "post").mockImplementation(mockAxiosPost);
vi.spyOn(LZString, "compress").mockImplementation(mockCompress);
vi.spyOn(LZString, "decompress").mockImplementation(mockDecompress);

vi.spyOn(Storage.prototype, "getItem").mockImplementation(mockStorageGetItem);

function rgbToHex(r: any, g: any, b: any) {
  const redHex = r.toString(16).padStart(2, "0");
  const greenHex = g.toString(16).padStart(2, "0");
  const blueHex = b.toString(16).padStart(2, "0");
  return `#${redHex}${greenHex}${blueHex}`;
}
export const rgbStringToHex = (rgbString: any) => {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgbString);
  if (!result) {
    throw new Error("Invalid RGB string");
  }
  const [, r, g, b] = result;
  return rgbToHex(parseInt(r, 10), parseInt(g, 10), parseInt(b, 10));
};

Object.assign(navigator, {
  share: mockShare,
});

export const mockUser = {
  name: "",
  age: "",
  breed: "",
  birthdate: "",
  identification: "",
  owner: "",
  username: "",
  userId: "",
  gender: "",
  acc_type: "",
  password: "",
};
