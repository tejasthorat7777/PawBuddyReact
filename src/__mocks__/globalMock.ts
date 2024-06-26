import axios from "axios";
import { vi } from "vitest";

export const mockAxiosGet = vi.fn().mockImplementation(() => {});

vi.spyOn(axios, "get").mockImplementation(mockAxiosGet);
