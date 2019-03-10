import { Media } from "./media";
import { Episode } from "./episode";

export class Serie extends Media{

    private totalSeasons: number;
    private saisons: Episode[][];

    constructor(serie: object, saisons: Episode[][]){
        super(serie);
        this.typeMedia = "serie";
        this.totalSeasons = Number(serie['totalSeasons']);
        this.saisons = saisons;
        console.log("episode",this.totalSeasons);
    }
}