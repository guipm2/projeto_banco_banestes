import { parse } from "papaparse";
import { Cliente, Conta, Agencia } from "../types";

const BASE = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=";

async function fetchCSV<T>(sheet: string, transformRow: (row: any) => T): Promise<T[]> {
  const res = await fetch(`${BASE}${sheet}`);
  if (!res.ok) {
    throw new Error(`Erro ao carregar ${sheet}: ${res.status} ${res.statusText}`);
  }
  const csv = await res.text();
  if (!csv) {
    throw new Error(`Erro ao carregar ${sheet}: CSV vazio`);
  }  


  return new Promise((resolve, reject) => {
    parse(csv, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h: string): string => h.trim(),
      transform: (value: string, field: string): any => {
        // ajusta tipos básicos
        if (field === "dataNascimento") return new Date(value);
        if (["rendaAnual", "patrimonio", "saldo", "limiteCredito", "creditoDisponivel", "codigo", "codigoAgencia"].includes(field))
          return Number(value);
        return value.trim();
      },
      complete: (p: { data: any[] }): void => resolve(p.data.map(transformRow)),
      error: (e: Error): void => reject(e),
    });
  });
}

export const getClientes = () =>
  fetchCSV<Cliente>("clientes", r => ({
    ...r,
    // já vem com tipos convertidos pelo transform
  }));

export const getContas = () =>
  fetchCSV<Conta>("contas", r => ({ ...r }));

export const getAgencias = () =>
  fetchCSV<Agencia>("agencias", r => ({ ...r }));
