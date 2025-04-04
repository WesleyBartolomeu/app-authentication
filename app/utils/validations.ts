export const validateCnpj = (cnpj: string): string | undefined => {
    if (!cnpj.trim()) {
      return 'O CNPJ é obrigatório.';
    }
    const cleanedCnpj = cnpj.replace(/\D/g, '');
    if (cleanedCnpj.length !== 14) {
      return 'O CNPJ deve ter 14 dígitos.';
    }
    // Algoritmo de validação (simplificado)
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanedCnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(cleanedCnpj.charAt(12)) !== digit) {
      return 'CNPJ inválido.';
    }
  
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanedCnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(cleanedCnpj.charAt(13)) !== digit) {
      return 'CNPJ inválido.';
    }
    return undefined;
  };