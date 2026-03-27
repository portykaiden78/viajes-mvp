export type FormDataType = {
  origen: string;
  destino: string;
  tipo_viaje: string;
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
  next: () => void;   // steps normales
};

export type StepPropsResumen = StepPropsBase & {
  onSubmit: () => void;   // resumen
  loading: boolean;
  mensaje: string | null;
};

export type StepPropsContacto = StepPropsBase & {
  update: (field: keyof FormDataType, value: any) => void;
  onSubmit: () => void;   // contacto
};


