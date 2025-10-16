

export class DashboardJSON {
    constructor(
        public totalRecomendaciones:number = 0,
        public totalLibros:number = 0,
        public totalUsuarios:number = 0,
        public totalCentros:number = 0
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromJson(data:any ) : DashboardJSON{
        this.totalRecomendaciones = data.totalRecomendaciones
        this.totalLibros = data.totalLibros
        this.totalUsuarios = data.totalUsuarios
        this.totalCentros = data.totalCentros
        
        return Object.assign(new DashboardJSON(data.totalRecomendaciones,data.totalLibros,data.totalUsuarios,data.totalCentros))
    }

    getTotalObjects(){
        return this.totalCentros + this.totalLibros + this.totalRecomendaciones + this.totalUsuarios
    }
}

export const DashboardJson = new DashboardJSON()


export class DeleteResponse{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromJson(data:any) : number{
        return data.updatedElements
    }
}

export const DeleteResp = new DeleteResponse()