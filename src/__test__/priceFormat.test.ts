import { describe, expect, it } from "vitest";
import { formatPrice, getDiscountedPrice } from "../commonFiles/commonFunctions";

describe("formatPrice", () => {
  it("keeps prices with decimals without appending another decimal suffix", () => {
    expect(formatPrice("555.75")).toBe("555.75");
    expect(formatPrice("11.76")).toBe("11.76");
  });

  it("shows whole-number prices without a redundant .00", () => {
    expect(formatPrice("4500")).toBe("4500");
  });

  it("rounds discounted prices to at most two decimal places", () => {
    expect(formatPrice(getDiscountedPrice("555.75", "5"))).toBe("527.96");
  });
});