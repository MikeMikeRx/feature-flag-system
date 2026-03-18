import type { FeatureFlag, FlagContext } from "./types.js";

export class FeatureFlagSystem {
    constructor(private readonly flags: FeatureFlag[]) {}

    isEnabled(key: string, context: FlagContext = {}): boolean {
        const flag = this.flags.find((item) => item.key === key);

        if(!flag) {
            return false;
        }

        if(!flag.enabled) {
            return false;
        }

        if (flag.allowedUserIds?.length && context.userId) {
            return flag.allowedUserIds.includes(context.userId);
        }

        if (flag.allowedRoles?.length && context.role) {
            return flag.allowedRoles.includes(context.role);
        }

        if (typeof flag.rolloutPercentage === "number" && context.userId) {
            return this.isInRollout(context.userId, flag.rolloutPercentage);
        }

        return true;
    }

    private isInRollout(userId: string, rolloutPercentage: number): boolean {
        const hash = [...userId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return hash % 100 < rolloutPercentage;
    }
}