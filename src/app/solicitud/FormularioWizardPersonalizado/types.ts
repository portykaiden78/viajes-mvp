export interface FormDataType {
  tipoViaje: string;

  destino: string;

  fechaInicio: string;
  fechaFin: string;
  fechasFlexibles: boolean;
  cualquierFecha: boolean;

  presupuesto: string;

  estilo: string[];
  estiloOtro: string;

  acompanado: string;
  edadesFamilia: string;
  numAmigos: string;
  acompanadoOtro: string;

  detalles: string;

  transporte: string[];
  transporteOtro: string;

  clima: string;
  climaOtro: string;

  deporteDiario: string;
  deporteDiarioOtro: string;

  entorno: string[];
  entornoOtro: string;

  festivales: {
    gusta: boolean | null;
    estilos: string[];
  };
  festivalesOtro: string;

  eventosDeportivos: {
    gusta: boolean | null;
    deportes: string[];
  };
  eventosDeportivosOtro: string;
  email: string;
  telefono: string;

}

/* Props para steps normales (con update/next/back) */
export interface StepPropsWithUpdate {
  form: FormDataType;
  update: (field: keyof FormDataType, value: any) => void;
  next: () => void;
  back?: () => void;
  isValid?: boolean;
}

/* Props para el step final */
export interface StepPropsResumen {
  form: FormDataType;
  back: () => void;
  onSubmit: () => void;
  loading: boolean;
}
