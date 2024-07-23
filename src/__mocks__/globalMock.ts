import axios from "axios";
import { vi } from "vitest";

export const mockAxiosGet = vi.fn().mockImplementation(() => {});
export const mockAxiosPost = vi.fn().mockImplementation(() => {});
export const mockShare = vi.fn().mockImplementation(() => {});
export const mockConsoleLog = vi.fn().mockImplementation(() => {});
export const mockConsoleError = vi.fn().mockImplementation(() => {});


vi.spyOn(axios, "get").mockImplementation(mockAxiosGet);
vi.spyOn(axios, "post").mockImplementation(mockAxiosPost);
vi.spyOn(console,"log").mockImplementation(mockConsoleLog);
vi.spyOn(console,"error").mockImplementation(mockConsoleError);

Object.assign(navigator, {
  share: mockShare,
});
