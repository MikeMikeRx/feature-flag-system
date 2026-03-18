export type FlagContext = {
    userId?: string;
    role?: string;
};

export type FeatureFlag = {
    key: string;
    enabled: boolean;
    allowedUserIds?: string[];
    allowedRoles?: string[];
    rolloutPercentage?: number;
};