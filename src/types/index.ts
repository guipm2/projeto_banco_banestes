export interface Cliente {
  id: string;
  cpfCnpj: string;
  rg?: string;
  dataNascimento: Date;
  nome: string;
  nomeSocial?: string;
  email: string;
  endereco: string;
  rendaAnual: number;
  patrimonio: number;
  estadoCivil : "Solteiro" | "Casado" | "Divorciado" | "Viúvo";
  codigoAgencia: number;
}

export interface Conta {
  id: string;
  cpfCnpjCliente: string;
  tipoConta: "Corrente" | "Poupança";
  saldo: number;
  limiteCredito: number;
  dataAbertura: Date;
  creditoDisponivel: number;
}

export interface Agencia {
    id: string;
    codigo: number;
    nome: string;
    endereco: string;
}
