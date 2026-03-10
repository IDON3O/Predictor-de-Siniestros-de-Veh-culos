export type AntigVehiculo = 'menos de 1' | '1-4' | '5-10' | '10+';
export type TipoVehiculo = 'Motocicleta' | 'Turismo' | 'Monovolumen/ 4x4' | 'Camioneta/Furgoneta';
export type GrupEdad = 'menor de 25' | '25-40' | '40-55' | 'más de 55';
export type Sexo = 'mujer' | 'varón';

export interface DecisionTreeInput {
  naños: number;
  antigvehiculo: AntigVehiculo;
  tipovehiculo: TipoVehiculo;
  edad: number;
  grupedad: GrupEdad;
  edadvehiculo: number;
  kilometros: number;
  sexo: Sexo;
  antigcarnet: number;
}

export type DecisionResult = 'con siniestros' | 'sin siniestros';
