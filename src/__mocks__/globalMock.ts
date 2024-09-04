import axios from "axios";
import { vi } from "vitest";

export const mockAxiosGet = vi.fn().mockImplementation(() => {});
export const mockAxiosPost = vi.fn().mockImplementation(() => {});
export const mockShare = vi.fn().mockImplementation(() => {});

vi.spyOn(axios, "get").mockImplementation(mockAxiosGet);
vi.spyOn(axios, "post").mockImplementation(mockAxiosPost);

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
