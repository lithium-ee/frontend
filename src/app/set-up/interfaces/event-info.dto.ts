export interface EventInfoDto {
    name: string;
    device?: {
        id: string;
        name: string;
    };
    cooldown: string;
    filterSongs: boolean;
}

export interface ExtendedEventInfoDto extends EventInfoDto {
    id: string;
}
