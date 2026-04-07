export type FormDataType = {
  origen: string;
  destinos: string[];        // ← MULTISELECT (antes era destino: string)
  tipo_viaje: string[];      // ← MULTISELECT
  tipo_viaje_otro: string;   // ← OTRO
  num_viajeros: number;
  edades: string[];
  fecha_inicio: string;
  fecha_fin: string;
  ritmo_viaje: string;
  gastronomia: string;
  intereses: string[];
  presupuesto: string;
  alojamiento: string;
  email: string;
  telefono: string;
};

export type StepPropsBase = {
  form: FormDataType;
  back?: () => void;
  isValid?: boolean;
};

export type StepPropsWithUpdate = StepPropsBase & {
  update: (field: keyof FormDataType, value: any) => void;
  next: () => void;
};

export type StepPropsResumen = StepPropsBase & {
  onSubmit: () => void;
  loading: boolean;
  mensaje: string | null;
};

export type StepPropsContacto = StepPropsBase & {
  update: (field: keyof FormDataType, value: any) => void;
  onSubmit: () => void;
};
