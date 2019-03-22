import { Media } from "./media";

export class Movie extends Media{

    public runTime: string;

    constructor(film:object){
        super(film);
        this.typeMedia = "film";
        this.runTime = film['Runtime']
    }
}