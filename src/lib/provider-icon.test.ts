import { describe, expect, it } from "vitest";

import { resolveProviderIcon } from "./provider-icon";

describe("resolveProviderIcon", () => {
  it("keeps the full app's GrokBuild legacy icon rule", () => {
    expect(resolveProviderIcon("grokbuild", "grok", "")).toBeUndefined();
    expect(resolveProviderIcon("grokbuild", "grok", "currentColor")).toBe(
      "grok",
    );
    expect(resolveProviderIcon("codex", "grok", "")).toBe("grok");
  });

  it("falls back to the RouTok icon for providers without a stored icon", () => {
    expect(resolveProviderIcon("claude", undefined, undefined, ["RouTok"])).toBe(
      "routok",
    );
    expect(
      resolveProviderIcon("claude", "", "", ["Work", "https://api.routok.com"]),
    ).toBe("routok");
    expect(
      resolveProviderIcon("claude", undefined, undefined, ["Work"]),
    ).toBeUndefined();
    expect(
      resolveProviderIcon("claude", "kimi", undefined, ["routok-test"]),
    ).toBe("kimi");
  });
});
