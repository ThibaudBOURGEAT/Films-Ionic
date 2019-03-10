import { Media } from "./media";

export class Film extends Media{

    private runTime: string;

    constructor(film:object){
        super(film);
        this.typeMedia = "film";
        this.runTime = film['Runtime']
    }
}