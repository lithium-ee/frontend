export interface EventInfoDto {
    name: string;
    device?: {
        id: string;
        name: string;
    };
    cooldown: string;
    filterSongs: boolean;
}
