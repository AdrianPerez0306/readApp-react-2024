import axios from "axios"
import { REST_SERVER_URL } from "../constants"
import {  DashboardJSON, DashboardJson, DeleteResp } from "../domain/DashboardJSON"

class DashboardService{

    async getDashboardData():Promise<DashboardJSON>{
        const data =  await axios.get(REST_SERVER_URL + "/dashboard")
        return DashboardJson.fromJson(data.data)
    }

    async deleteCenters(){
        const response = await axios.delete(REST_SERVER_URL + "/borrarCentrosInactivos")
        console.warn(response.data)
        return DeleteResp.fromJson(response.data)
    }

    async deleteUsers(){
        const response = await axios.delete(REST_SERVER_URL + "/borrarUsuariosInactivos");
        return DeleteResp.fromJson(response.data)
    }

}

export const dashboardService = new DashboardService()