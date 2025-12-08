// Tipo principal de Plato
export interface Plato {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlatoFormData {
  titulo: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  activo?: boolean;
}

export interface PlatoUpdateData extends Partial<PlatoFormData> { }

// Tipos para las respuestas de la API
export type ApiResponse<T = unknown> = {
  data?: T;
  error?: string;
  status: number;
};

export type PlatoResponse = ApiResponse<Plato>;
export type PlatosResponse = ApiResponse<Plato[]>;
