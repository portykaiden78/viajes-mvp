// Elimina caracteres peligrosos, controla longitud y normaliza
export function cleanString(input: unknown, maxLength = 500): string {
    if (typeof input !== "string") return "";
  
    let str = input.normalize("NFKC").trim();
  
    // Eliminar caracteres de control (excepto saltos de línea básicos)
    str = str.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, "");
  
    // Eliminar < y > para evitar HTML directo
    str = str.replace(/[<>]/g, "");
  
    // Limitar longitud
    if (str.length > maxLength) {
      str = str.slice(0, maxLength);
    }
  
    return str;
  }
  