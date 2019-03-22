import { Media } from "./media";

export class Serie extends Media{

    public totalSeasons: number;

    constructor(serie: object){
        super(serie);
        this.typeMedia = "serie";
        this.totalSeasons = Number(serie['totalSeasons']);
    }
}