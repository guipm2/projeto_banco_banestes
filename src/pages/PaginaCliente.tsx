// src/pages/PaginaCliente.tsx
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
      .catch((err) => {
        console.error("Erro ao carregar dados do cliente:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-4 text-gray-600"
      >
        Carregando dados do cliente…
      </div>
    );
  }

  if (!cliente) {
    return (
      <div role="alert" className="p-4 text-red-600">
        Cliente não encontrado.{" "}
        <Link
          to="/"
          className="text-blue-600 hover:underline"
          aria-label="Voltar para lista de clientes"
        >
          Voltar à lista
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Detalhes de {cliente.nome}
        </h1>
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline"
          aria-label="Voltar para lista de clientes"
        >
          ← Voltar
        </Link>
      </header>

      {/* Informações Pessoais */}
      <section
        aria-labelledby="personal-info-heading"
        className="bg-white p-6 shadow rounded-lg"
      >
        <h2
          id="personal-info-heading"
          className="text-xl font-semibold mb-4"
        >
          Informações Pessoais
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          <li>
            <strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}
          </li>
          {cliente.rg && (
            <li>
              <strong>RG:</strong> {cliente.rg}
            </li>
          )}
          <li>
            <strong>Data de Nascimento:</strong>{" "}
            {cliente.dataNascimento.toLocaleDateString("pt-BR")}
          </li>
          <li>
            <strong>Email:</strong> {cliente.email}
          </li>
          <li>
            <strong>Endereço:</strong> {cliente.endereco}
          </li>
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

      {/* Contas Bancárias */}
      <section
        aria-labelledby="contas-heading"
        className="bg-white p-6 shadow rounded-lg"
      >
        <h2
          id="contas-heading"
          className="text-xl font-semibold mb-4"
        >
          Contas Bancárias
        </h2>
        {contas.length === 0 ? (
          <p className="text-gray-600">Nenhuma conta cadastrada.</p>
        ) : (
          <div className="overflow-x-auto">
            <table
              role="table"
              aria-label="Contas bancárias do cliente"
              className="min-w-full divide-y divide-gray-200"
            >
              <caption className="sr-only">
                Contas bancárias do cliente
              </caption>
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Tipo",
                    "Saldo",
                    "Limite Crédito",
                    "Crédito Disponível",
                  ].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-2 text-left text-sm font-medium text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contas.map((ct) => (
                  <tr
                    key={ct.id}
                    className="hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{ct.tipoConta}</td>
                    <td className="px-4 py-2">
                      {ct.saldo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {ct.limiteCredito.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {ct.creditoDisponivel.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Agência */}
      <section
        aria-labelledby="agencia-heading"
        className="bg-white p-6 shadow rounded-lg"
      >
        <h2
          id="agencia-heading"
          className="text-xl font-semibold mb-4"
        >
          Agência
        </h2>
        {agencia ? (
          <ul className="space-y-1">
            <li>
              <strong>Código:</strong> {agencia.codigo}
            </li>
            <li>
              <strong>Nome:</strong> {agencia.nome}
            </li>
            <li>
              <strong>Endereço:</strong> {agencia.endereco}
            </li>
          </ul>
        ) : (
          <p className="text-gray-600">Agência não encontrada.</p>
        )}
      </section>
    </div>
  );
};
