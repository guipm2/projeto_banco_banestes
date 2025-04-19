import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cliente, Conta, Agencia } from "../types";
import { getClientes, getContas, getAgencias } from "../services/api";

export const PaginaCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Carrega todos em paralelo
    Promise.all([getClientes(), getContas(), getAgencias()])
      .then(([clientesAll, contasAll, agenciasAll]) => {
        const cli = clientesAll.find((c) => c.id === id) ?? null;
        setCliente(cli);

        if (cli) {
          setContas(
            contasAll.filter((ct) => ct.cpfCnpjCliente === cli.cpfCnpj)
          );
          setAgencia(
            agenciasAll.find((ag) => ag.codigo === cli.codigoAgencia) ??
              null
          );
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-4">Carregando dados do cliente…</div>;
  }

  if (!cliente) {
    return (
      <div className="p-4">
        Cliente não encontrado.{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          Voltar à lista
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Detalhes de {cliente.nome}</h1>
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Voltar
        </Link>
      </header>

      {/* Dados do cliente */}
      <section className="mb-6">
        <h2 className="text-xl font-medium mb-2">Informações Pessoais</h2>
        <ul className="list-disc pl-5">
          <li><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</li>
          {cliente.rg && <li><strong>RG:</strong> {cliente.rg}</li>}
          <li>
            <strong>Data de Nascimento:</strong>{" "}
            {cliente.dataNascimento.toLocaleDateString("pt-BR")}
          </li>
          <li><strong>Email:</strong> {cliente.email}</li>
          <li><strong>Endereço:</strong> {cliente.endereco}</li>
          <li>
            <strong>Estado Civil:</strong> {cliente.estadoCivil}
          </li>
          <li>
            <strong>Renda Anual:</strong>{" "}
            {cliente.rendaAnual.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </li>
          <li>
            <strong>Patrimônio:</strong>{" "}
            {cliente.patrimonio.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </li>
        </ul>
      </section>

      {/* Contas bancárias */}
      <section className="mb-6">
        <h2 className="text-xl font-medium mb-2">Contas Bancárias</h2>
        {contas.length === 0 ? (
          <p>Nenhuma conta cadastrada.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-3 py-1 border-b">Tipo</th>
                <th className="px-3 py-1 border-b">Saldo</th>
                <th className="px-3 py-1 border-b">Limite Crédito</th>
                <th className="px-3 py-1 border-b">Crédito Disponível</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((ct) => (
                <tr key={ct.id} className="hover:bg-gray-50">
                  <td className="px-3 py-1">{ct.tipoConta}</td>
                  <td className="px-3 py-1">
                    {ct.saldo.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-3 py-1">
                    {ct.limiteCredito.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-3 py-1">
                    {ct.creditoDisponivel.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Agência */}
      <section>
        <h2 className="text-xl font-medium mb-2">Agência</h2>
        {agencia ? (
          <ul className="list-disc pl-5">
            <li><strong>Código:</strong> {agencia.codigo}</li>
            <li><strong>Nome:</strong> {agencia.nome}</li>
            <li><strong>Endereço:</strong> {agencia.endereco}</li>
          </ul>
        ) : (
          <p>Agência não encontrada.</p>
        )}
      </section>
    </div>
  );
};
