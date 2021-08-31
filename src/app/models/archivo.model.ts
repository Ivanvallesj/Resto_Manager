export class ArchivoModel{
    public archivo!        :File;
    public nombre!         :string;
    public url!            :string;
    public estaSubiendo!   :boolean;
    public progreso!       :number;

    constructor(file : File){
        this.archivo = file;
        this.nombre = file.name;
        this.estaSubiendo = false;
        this.progreso = 0;

    }
}