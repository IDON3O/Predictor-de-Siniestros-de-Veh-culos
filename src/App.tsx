import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  User, 
  Calendar, 
  Navigation, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { DecisionTreeInput, DecisionResult, AntigVehiculo, TipoVehiculo, GrupEdad, Sexo } from './types';
import { predictSiniestro } from './decisionTree';

/**
 * Componente principal de la aplicación.
 * Gestiona el estado del formulario, la lógica de envío y la visualización del resultado.
 */
const App: React.FC = () => {
  // Estado inicial del formulario con valores por defecto
  const [formData, setFormData] = useState<DecisionTreeInput>({
    naños: 0,
    antigvehiculo: '1-4',
    tipovehiculo: 'Turismo',
    edad: 30,
    grupedad: '25-40',
    edadvehiculo: 0,
    kilometros: 0,
    sexo: 'varón',
    antigcarnet: 0,
  });

  // Estado para almacenar el resultado de la predicción
  const [result, setResult] = useState<DecisionResult | null>(null);

  /**
   * Manejador genérico para cambios en los campos del formulario.
   * Convierte automáticamente los valores numéricos.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  /**
   * Procesa el formulario y llama a la lógica del árbol de decisión.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prediction = predictSiniestro(formData);
    setResult(prediction);
  };

  /**
   * Reinicia el resultado para permitir una nueva consulta.
   */
  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-emerald-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Encabezado con animación de entrada */}
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-600 text-white rounded-2xl mb-6 shadow-lg shadow-emerald-200"
          >
            <Car size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight mb-3"
          >
            Predictor de Siniestros
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 max-w-lg mx-auto"
          >
            Utilice nuestro modelo de árbol de decisión para evaluar el riesgo de siniestralidad basado en el perfil del conductor y del vehículo.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sección del Formulario */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Datos del Conductor */}
                    <div className="space-y-4">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                        <User size={14} /> Datos del Conductor
                      </h2>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Edad</label>
                        <input
                          type="number"
                          name="edad"
                          value={formData.edad}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Grupo de Edad</label>
                        <select
                          name="grupedad"
                          value={formData.grupedad}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
                        >
                          <option value="menor de 25">Menor de 25</option>
                          <option value="25-40">25 - 40</option>
                          <option value="40-55">40 - 55</option>
                          <option value="más de 55">Más de 55</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Sexo</label>
                        <div className="flex gap-2">
                          {(['varón', 'mujer'] as Sexo[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, sexo: s }))}
                              className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                                formData.sexo === s 
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                              }`}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Antigüedad Carnet (años)</label>
                        <input
                          type="number"
                          step="0.1"
                          name="antigcarnet"
                          value={formData.antigcarnet}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Datos del Vehículo */}
                    <div className="space-y-4">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                        <Car size={14} /> Datos del Vehículo
                      </h2>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Tipo de Vehículo</label>
                        <select
                          name="tipovehiculo"
                          value={formData.tipovehiculo}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
                        >
                          <option value="Turismo">Turismo</option>
                          <option value="Motocicleta">Motocicleta</option>
                          <option value="Monovolumen/ 4x4">Monovolumen / 4x4</option>
                          <option value="Camioneta/Furgoneta">Camioneta / Furgoneta</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Antigüedad Vehículo (Categoría)</label>
                        <select
                          name="antigvehiculo"
                          value={formData.antigvehiculo}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
                        >
                          <option value="menos de 1">Menos de 1 año</option>
                          <option value="1-4">1 - 4 años</option>
                          <option value="5-10">5 - 10 años</option>
                          <option value="10+">Más de 10 años</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Edad Vehículo (años exactos)</label>
                        <input
                          type="number"
                          step="0.01"
                          name="edadvehiculo"
                          value={formData.edadvehiculo}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-neutral-700">Kilómetros</label>
                        <input
                          type="number"
                          name="kilometros"
                          value={formData.kilometros}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1.5 text-neutral-700 flex items-center gap-2">
                        <Calendar size={14} /> Años de Póliza (naños)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="naños"
                        value={formData.naños}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group"
                    >
                      Calcular Riesgo
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sección de Resultados con animaciones de presencia */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-5"
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-white rounded-3xl border border-dashed border-neutral-300 p-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300 mb-4">
                    <Navigation size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-400">Esperando datos</h3>
                  <p className="text-sm text-neutral-400 mt-2">Complete el formulario para obtener una predicción basada en el árbol de decisión.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`h-full rounded-3xl p-8 flex flex-col shadow-xl ${
                    result === 'con siniestros' 
                      ? 'bg-red-50 border border-red-100' 
                      : 'bg-emerald-50 border border-emerald-100'
                  }`}
                >
                  <div className="flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                      result === 'con siniestros' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                    }`}>
                      {result === 'con siniestros' ? <AlertCircle size={28} /> : <CheckCircle2 size={28} />}
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${
                      result === 'con siniestros' ? 'text-red-900' : 'text-emerald-900'
                    }`}>
                      {result === 'con siniestros' ? 'Riesgo Detectado' : 'Riesgo Bajo'}
                    </h3>
                    
                    <p className={`text-sm mb-8 ${
                      result === 'con siniestros' ? 'text-red-700/70' : 'text-emerald-700/70'
                    }`}>
                      Resultado de la predicción: <span className="font-bold uppercase">{result}</span>
                    </p>

                    <div className="space-y-4">
                      <div className={`p-4 rounded-2xl ${
                        result === 'con siniestros' ? 'bg-red-100/50' : 'bg-emerald-100/50'
                      }`}>
                        <div className="flex items-start gap-3">
                          <Info size={16} className={`mt-0.5 ${result === 'con siniestros' ? 'text-red-600' : 'text-emerald-600'}`} />
                          <p className={`text-sm leading-relaxed ${result === 'con siniestros' ? 'text-red-800' : 'text-emerald-800'}`}>
                            {result === 'con siniestros' 
                              ? 'El perfil analizado coincide con patrones históricos de alta siniestralidad. Se recomienda una revisión detallada de la póliza.' 
                              : 'El perfil analizado muestra una baja probabilidad de siniestros según los datos históricos del modelo.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-8 w-full py-3 rounded-xl border border-neutral-200 bg-white text-neutral-600 font-medium hover:bg-neutral-50 transition-all"
                  >
                    Nueva Consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Pie de página informativo */}
        <footer className="mt-16 pt-8 border-t border-neutral-200 text-center">
          <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">
            Modelo de Árbol de Decisión v1.0
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
