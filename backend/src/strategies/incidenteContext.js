
import { ausenciapersonal_Strategy } from "./tipos_incidentes_Distribucion/ausenciapersonal_Strategy.js";
import { otro_Strategy } from "./tipos_incidentes_Distribucion/otro_Strategy.js";

export class incidenteContext{
    constructor(tipo_incidente){

        switch (tipo_incidente) {
            case 1:
                this.strategy = new ausenciapersonal_Strategy();
                break;
            case 2:
                break;

            case 3:
                this.strategy = new otro_Strategy();
                break;
            default:
                throw new Error("Selecciona un tipo de incidente");
        }
    }


    async crearIncidente(datosEspecificos) {
        if (!this.strategy || typeof this.strategy.crearIncidenteEspecifico !== "function") {
            throw new Error("Estrategia no definida o método 'crearIncidente' no implementado");
        }
        return this.strategy.crearIncidenteEspecifico(datosEspecificos);
    }
    
}