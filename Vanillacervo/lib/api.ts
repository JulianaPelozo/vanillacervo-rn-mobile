import { API_URL } from "./config";

const jsonHeaders = { "Content-Type": "application/json" };

export async function getBooks() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error("Erro ao buscar livros");
  return res.json();
}

export async function getBook(id: number) {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error("Livro não encontrado");
  return res.json();
}

export async function createBook(book: {
  title: string;
  author: string;
  year: number;
}) {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Erro ao criar livro");
  return res.json();
}

export async function updateBook(id: number, book: Partial<{
  title: string;
  author: string;
  year: number;
}>) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Erro ao atualizar livro");
  return res.json();
}

export async function deleteBook(id: number) {
  const res = await fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar livro");
  return res.json();
}

export async function getCDs() {
  const res = await fetch(`${API_URL}/cds`);
  if (!res.ok) throw new Error("Erro ao buscar CDs");
  return res.json();
}

export async function getCD(id: number) {
  const res = await fetch(`${API_URL}/cds/${id}`);
  if (!res.ok) throw new Error("CD não encontrado");
  return res.json();
}

export async function createCD(cd: {
  title: string;
  artist: string;
  year: number;
}) {
  const res = await fetch(`${API_URL}/cds`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(cd),
  });
  if (!res.ok) throw new Error("Erro ao criar CD");
  return res.json();
}

export async function updateCD(id: number, cd: Partial<{
  title: string;
  artist: string;
  year: number;
}>) {
  const res = await fetch(`${API_URL}/cds/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(cd),
  });
  if (!res.ok) throw new Error("Erro ao atualizar CD");
  return res.json();
}

export async function deleteCD(id: number) {
  const res = await fetch(`${API_URL}/cds/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar CD");
  return res.json();
}
