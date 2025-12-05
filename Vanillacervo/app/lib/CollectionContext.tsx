import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Book = {
  id: string;
  type: "book";
  title: string;
  author: string;
  year?: string;
};

export type CD = {
  id: string;
  type: "cd";
  title: string;
  artist: string;
  year?: string;
};

type NewBook = Omit<Book, "id" | "type">;
type NewCD   = Omit<CD, "id" | "type">;

type CollectionContextValue = {
  books: Book[];
  cds: CD[];
  addBook: (b: NewBook) => void;
  addCD: (c: NewCD) => void;
  getItemById: (id: string) => Book | CD | undefined;
};

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [cds, setCDs] = useState<CD[]>([]);

  function addBook(b: NewBook) {
    const newBook: Book = {
      id: uuidv4(),
      type: "book",
      ...b,
    };
    setBooks((prev) => [newBook, ...prev]);
  }

  function addCD(c: NewCD) {
    const newCD: CD = {
      id: uuidv4(),
      type: "cd",
      ...c,
    };
    setCDs((prev) => [newCD, ...prev]);
  }

  function getItemById(id: string): Book | CD | undefined {
    return books.find((b) => b.id === id) || cds.find((c) => c.id === id);
  }

  return (
    <CollectionContext.Provider value={{ books, cds, addBook, addCD, getItemById }}>
      {children}
    </CollectionContext.Provider>
  );
};

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error("useCollection must be used within CollectionProvider");
  return ctx;
}
