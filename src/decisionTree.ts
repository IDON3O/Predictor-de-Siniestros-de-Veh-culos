import { DecisionTreeInput, DecisionResult } from './types';

/**
 * Función que implementa la lógica del árbol de decisión para predecir siniestros.
 * El flujo sigue estrictamente las reglas proporcionadas en el esquema del usuario.
 */
export function predictSiniestro(input: DecisionTreeInput): DecisionResult {
  const {
    naños,
    antigvehiculo,
    tipovehiculo,
    edad,
    grupedad,
    edadvehiculo,
    kilometros,
    sexo,
    antigcarnet,
  } = input;

  // --- RAMA PRINCIPAL 1: naños < 2.5 ---
  if (naños < 2.5) {
    // Sub-rama: Antigüedad del vehículo entre 1 y 4 años
    if (antigvehiculo === '1-4') {
      if (tipovehiculo === 'Motocicleta') return 'con siniestros';
      if (tipovehiculo === 'Turismo') return 'con siniestros';
      if (tipovehiculo === 'Monovolumen/ 4x4') {
        // Condición de edad para Monovolumen/4x4
        if (edad < 23.5) return 'sin siniestros';
        return 'con siniestros';
      }
      if (tipovehiculo === 'Camioneta/Furgoneta') return 'con siniestros';
    } 
    // Sub-rama: Antigüedad del vehículo menos de 1 año
    else if (antigvehiculo === 'menos de 1') {
      return 'con siniestros';
    } 
    // Sub-rama: Antigüedad del vehículo 10+ años
    else if (antigvehiculo === '10+') {
      if (grupedad === 'menor de 25') return 'sin siniestros';
      if (grupedad === '25-40') return 'con siniestros';
      if (grupedad === 'más de 55') return 'con siniestros';
      if (grupedad === '40-55') return 'con siniestros';
    } 
    // Sub-rama: Antigüedad del vehículo entre 5 y 10 años
    else if (antigvehiculo === '5-10') {
      return 'con siniestros';
    }
    return 'con siniestros'; // Valor por defecto para esta rama
  } 
  
  // --- RAMA PRINCIPAL 2: naños >= 2.5 ---
  else {
    // GRUPO DE EDAD: Menor de 25
    if (grupedad === 'menor de 25') {
      if (edadvehiculo < 0.44) return 'con siniestros';
      
      if (edadvehiculo >= 0.44) {
        // Condición: naños < 5.5
        if (naños < 5.5) {
          if (antigvehiculo === '1-4') {
            if (edadvehiculo < 1.7) {
              if (kilometros < 23008) return 'sin siniestros';
              // Si km >= 23008, depende del sexo
              if (sexo === 'mujer') return 'con siniestros';
              return 'sin siniestros'; // varón
            }
            return 'sin siniestros'; // edadvehiculo >= 1.7
          } else if (antigvehiculo === 'menos de 1') {
            if (kilometros < 17173.5) return 'sin siniestros';
            return 'con siniestros';
          } else if (antigvehiculo === '10+') {
            return 'con siniestros';
          } else if (antigvehiculo === '5-10') {
            return 'sin siniestros';
          }
        } 
        // Condición: naños >= 5.5
        else {
          if (antigcarnet < 4.5) {
            if (naños < 8) {
              if (edad < 24.5) {
                if (edadvehiculo < 1.19) return 'sin siniestros';
                return 'con siniestros';
              }
              return 'sin siniestros'; // edad >= 24.5
            }
            return 'con siniestros'; // naños >= 8
          }
          return 'con siniestros'; // antigcarnet >= 4.5
        }
      }
    } 
    
    // GRUPO DE EDAD: 25-40
    else if (grupedad === '25-40') {
      // Sub-rama: naños < 5.5
      if (naños < 5.5) {
        if (tipovehiculo === 'Motocicleta') return 'con siniestros';
        if (tipovehiculo === 'Turismo') {
          if (edadvehiculo < 0.74) return 'sin siniestros';
          if (antigvehiculo === '1-4') return 'sin siniestros';
          if (antigvehiculo === 'menos de 1') return 'con siniestros';
          if (antigvehiculo === '10+') return 'sin siniestros';
          if (antigvehiculo === '5-10') {
            if (antigcarnet < 13.5) {
              if (edadvehiculo < 7.57) return 'sin siniestros';
              if (kilometros < 141941) return 'con siniestros';
              if (edadvehiculo < 9.59) return 'sin siniestros';
              return 'con siniestros';
            }
            return 'sin siniestros'; // antigcarnet >= 13.5
          }
        }
        if (tipovehiculo === 'Monovolumen/ 4x4') return 'sin siniestros';
        if (tipovehiculo === 'Camioneta/Furgoneta') return 'con siniestros';
      } 
      // Sub-rama: naños >= 5.5
      else {
        if (edadvehiculo < 9.2) {
          if (tipovehiculo === 'Motocicleta') {
            if (edad < 33.5) return 'sin siniestros';
            return 'con siniestros';
          }
          if (tipovehiculo === 'Turismo') return 'sin siniestros';
          if (tipovehiculo === 'Monovolumen/ 4x4') return 'sin siniestros';
          if (tipovehiculo === 'Camioneta/Furgoneta') return 'sin siniestros';
        } else {
          // edadvehiculo >= 9.2
          if (naños < 8.5) return 'con siniestros';
          if (naños < 10.5) return 'sin siniestros';
          if (kilometros < 174577.5) {
            if (kilometros < 161833) return 'sin siniestros';
            return 'con siniestros';
          }
          return 'sin siniestros';
        }
      }
    } 
    
    // GRUPO DE EDAD: Más de 55
    else if (grupedad === 'más de 55') {
      if (antigcarnet < 39.5) {
        if (edadvehiculo < 0.06) return 'sin siniestros';
        if (kilometros < 7121.5) return 'con siniestros';
        if (sexo === 'mujer') return 'sin siniestros';
        if (kilometros < 11338.5) {
          if (kilometros < 8702) return 'sin siniestros';
          return 'con siniestros';
        }
        return 'sin siniestros';
      }
      return 'sin siniestros'; // antigcarnet >= 39.5
    } 
    
    // GRUPO DE EDAD: 40-55
    else if (grupedad === '40-55') {
      return 'sin siniestros';
    }
  }

  return 'sin siniestros'; // Fallback de seguridad
}
