export interface EventInfoDto {
    eventName: string;
    device?: {
        id: string;
        name: string;
    };
    cooldown: string;
    filteringOn: boolean;
}
