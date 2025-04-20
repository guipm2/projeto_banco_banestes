// src/utils/FormatarCPF.ts

/**
 * Formata qualquer string de CPF no padrão "XXX.XXX.XXX-XX".
 * Se não tiver exatamente 11 dígitos, retorna a string original.
 */
export function formatarCPF(input: string): string {
    // Remove tudo que não for dígito
    const dígitos = input.replace(/\D/g, '');
  
    // Se não tiver 11 dígitos, devolve como veio
    if (dígitos.length !== 11) return input;
  
    // Aplica filtro de formatação
    return dígitos.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      '$1.$2.$3-$4'
    );
  }
  