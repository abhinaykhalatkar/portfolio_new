import { describe, expect, it } from "vitest";
import { getLavalampOffset, navsData } from "./ProgressNav";

describe("getLavalampOffset", () => {
  it("centres the lamp at the wrapper origin for a 5-item nav (legacy layout)", () => {
    const w = 100;
    expect(getLavalampOffset(0, 5, w)).toBe(-2 * w);
    expect(getLavalampOffset(2, 5, w)).toBe(0);
    expect(getLavalampOffset(4, 5, w)).toBe(2 * w);
  });

  it("places the lamp symmetrically around the wrapper origin for a 6-item nav", () => {
    const w = 100;
    expect(getLavalampOffset(0, 6, w)).toBe(-2.5 * w);
    expect(getLavalampOffset(2, 6, w)).toBe(-0.5 * w);
    expect(getLavalampOffset(3, 6, w)).toBe(0.5 * w);
    expect(getLavalampOffset(5, 6, w)).toBe(2.5 * w);
    expect(getLavalampOffset(0, 6, w) + getLavalampOffset(5, 6, w)).toBe(0);
  });

  it("uses the actual count from navsData so adding pages does not require re-tuning", () => {
    const w = 100;
    expect(getLavalampOffset(navsData.length - 1, navsData.length, w)).toBe(
      ((navsData.length - 1) / 2) * w
    );
    expect(getLavalampOffset(0, navsData.length, w)).toBe(
      -((navsData.length - 1) / 2) * w
    );
  });

  it("returns 0 when the active item is unknown (findIndex => -1) instead of NaN", () => {
    expect(getLavalampOffset(-1, navsData.length, 100)).toBe(0);
  });

  it("returns 0 when no items are present, instead of dividing by zero", () => {
    expect(getLavalampOffset(0, 0, 100)).toBe(0);
  });
});

describe("navsData", () => {
  it("includes whats-on-my-mind as the last entry so ScrollBtn advances to it from /contact", () => {
    expect(navsData[navsData.length - 1].Address).toBe("/whats-on-my-mind");
    expect(navsData.findIndex((n) => n.Address === "/contact")).toBe(
      navsData.length - 2
    );
  });
});
