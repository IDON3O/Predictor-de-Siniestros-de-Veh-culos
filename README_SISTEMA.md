# Sistema de Predicción de Siniestros Vehiculares

Este sistema utiliza un modelo de **Árbol de Decisión** para predecir la probabilidad de siniestros en vehículos basándose en el perfil del conductor y las características del vehículo.

## Estructura del Sistema

El proyecto está construido con:
- **React 19**: Framework para la interfaz de usuario.
- **TypeScript**: Para asegurar la integridad de los datos y tipos.
- **Tailwind CSS**: Para un diseño moderno y responsivo.
- **Motion**: Para animaciones fluidas.
- **Lucide React**: Para iconografía clara.

## Lógica del Árbol de Decisión

El flujo de decisión se divide en dos ramas principales basadas en la variable `naños` (años de póliza):

### 1. Rama `naños < 2.5`
En esta rama, el riesgo es generalmente alto, excepto en casos específicos:
- Si el vehículo tiene entre 1-4 años y es un Monovolumen/4x4 con un conductor de edad >= 23.5.
- Si el vehículo tiene más de 10 años y el conductor es menor de 25 años.

### 2. Rama `naños >= 2.5`
Aquí el flujo es más complejo y depende de:
- **Grupo de Edad**: Menor de 25, 25-40, 40-55, o más de 55.
- **Edad del Vehículo**: Valores críticos como 0.44, 1.7, 9.2 años.
- **Kilometraje**: Umbrales específicos como 23,008 km o 174,577.5 km.
- **Antigüedad del Carnet**: Especialmente relevante para conductores jóvenes o mayores.

## Despliegue en Vercel

Para desplegar este proyecto en Vercel, siga estos pasos:

1. **Subir a GitHub/GitLab/Bitbucket**: Asegúrese de que todos los archivos estén en su repositorio.
2. **Conectar con Vercel**: Importe el proyecto desde el panel de Vercel.
3. **Configuración de Build**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Variables de Entorno**: Si utiliza la API de Gemini para funciones adicionales, asegúrese de añadir `GEMINI_API_KEY` en la configuración de Vercel.

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```
