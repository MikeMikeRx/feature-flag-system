import { describe, expect, it } from "vitest";
import { FeatureFlagSystem } from "../src/featureFlagSystem.js";
import type { FeatureFlag } from "../src/types.js";

const flags: FeatureFlag[] = [
    {
        key: "new-dashboard",
        enabled: true
    },
    {
        key: "admin-panel",
        enabled: true,
        allowedRoles: ["admin"]
    },
    {
        key: "beta-feature",
        enabled: true,
        allowedUserIds: ["user-1", "user-2"]
    },
    {
        key: "gradual-rollout",
        enabled: true,
        rolloutPercentage: 50
    },
    {
        key: "disabled-feature",
        enabled: false
    }
];

describe("FeatureFlagSystem", () => {
    const system = new FeatureFlagSystem(flags);

    it("returns false for unknown flags", () => {
        expect(system.isEnabled("unknown-feature")).toBe(false);
    });

    it("returns false for disabled flags", () => {
        expect(system.isEnabled("disabled-feature")).toBe(false);
    });

    it("returns true for enabled boolean flags", () => {
        expect(system.isEnabled("new-dashboard")).toBe(true);
    });

    it("allows users with matching roles", () => {
        expect(system.isEnabled("admin-panel", { role: "admin" })).toBe(true);
    });

    it("denies users with non-matching roles", () => {
        expect(system.isEnabled("admin-panel", { role: "viewer" })).toBe(false);
    });

    it("allows specifically targeted users", () => {
        expect(system.isEnabled("beta-feature", { userId: "user-1" })).toBe(true);
    });

    it("denies non-targeted users", () => {
        expect(system.isEnabled("beta-feature", { userId: "user-99" })).toBe(false);
    });

    it("evaluates percentage rollout deterministically", () => {
        const first = system.isEnabled("gradual-rollout", { userId: "user-123" });
        const second = system.isEnabled("gradual-rollout", { userId: "user-123" });

        expect(first).toBe(second);
    });
});