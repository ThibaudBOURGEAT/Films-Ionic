import { Media } from "./media";

export class Serie extends Media{

    private totalSeasons: number;

    constructor(serie: object){
        super(serie);
        this.typeMedia = "serie";
        this.totalSeasons = Number(serie['totalSeasons']);
    }
}