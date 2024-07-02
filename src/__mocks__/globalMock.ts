import axios from "axios";
import { vi } from "vitest";

export const mockAxiosGet = vi.fn().mockImplementation(() => {});
export const mockAxiosPost = vi.fn().mockImplementation(() => {});

vi.spyOn(axios, "get").mockImplementation(mockAxiosGet);
vi.spyOn(axios, "post").mockImplementation(mockAxiosPost);
