import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number; // -1 = unlimited
};

export type OrderLine = {
  itemId: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
};

export type OrderStatus = "open" | "sent" | "served" | "paid" | "void";

export type Order = {
  id: string;
  number: number;
  tableId: string | null;
  guests: number;
  server: string;
  lines: OrderLine[];
  status: OrderStatus;
  createdAt: number;
  paidAt?: number;
  paymentMethod?: "cash" | "card" | "split";
  tip?: number;
};

export type Table = {
  id: string;
  label: string;
  seats: number;
  zone: "Window" | "Center" | "Bar" | "Patio";
  status: "free" | "seated" | "billed";
  orderId?: string | null;
};

type State = {
  menu: MenuItem[];
  tables: Table[];
  orders: Order[];
  orderCounter: number;
  // actions
  addMenuItem: (i: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, patch: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  createOrder: (tableId: string | null, guests: number, server: string) => string;
  addLine: (orderId: string, item: MenuItem, qty?: number) => void;
  changeQty: (orderId: string, itemId: string, qty: number) => void;
  removeLine: (orderId: string, itemId: string) => void;
  setStatus: (orderId: string, status: OrderStatus) => void;
  payOrder: (orderId: string, method: "cash" | "card" | "split", tip: number) => void;
  voidOrder: (orderId: string) => void;
  setTableStatus: (tableId: string, status: Table["status"], orderId?: string | null) => void;
  reset: () => void;
};

const seedMenu: MenuItem[] = [
  { id: "m1", name: "Truffle Tagliatelle", category: "Pasta", price: 32, stock: -1 },
  { id: "m2", name: "Wagyu Ribeye 12oz", category: "Mains", price: 84, stock: 4 },
  { id: "m3", name: "Burrata & Heirloom", category: "Starters", price: 18, stock: -1 },
  { id: "m4", name: "Branzino al Sale", category: "Mains", price: 46, stock: 8 },
  { id: "m5", name: "Tiramisu Classico", category: "Desserts", price: 14, stock: -1 },
  { id: "m6", name: "Barolo 2018", category: "Wine", price: 120, stock: 6 },
  { id: "m7", name: "Negroni Sbagliato", category: "Cocktails", price: 18, stock: -1 },
  { id: "m8", name: "Pistachio Cannoli", category: "Desserts", price: 12, stock: 0 },
  { id: "m9", name: "Vitello Tonnato", category: "Starters", price: 22, stock: -1 },
  { id: "m10", name: "Espresso", category: "Coffee", price: 4, stock: -1 },
  { id: "m11", name: "Aperol Spritz", category: "Cocktails", price: 14, stock: -1 },
  { id: "m12", name: "Caesar Salad", category: "Starters", price: 16, stock: -1 },
];

const seedTables: Table[] = [
  { id: "t1", label: "T1", seats: 2, zone: "Window", status: "free" },
  { id: "t2", label: "T2", seats: 2, zone: "Window", status: "free" },
  { id: "t3", label: "T3", seats: 4, zone: "Center", status: "free" },
  { id: "t4", label: "T4", seats: 4, zone: "Center", status: "free" },
  { id: "t5", label: "T5", seats: 6, zone: "Center", status: "free" },
  { id: "t6", label: "T6", seats: 2, zone: "Bar", status: "free" },
  { id: "t7", label: "T7", seats: 2, zone: "Bar", status: "free" },
  { id: "t8", label: "P1", seats: 4, zone: "Patio", status: "free" },
  { id: "t9", label: "P2", seats: 4, zone: "Patio", status: "free" },
];

const uid = () => Math.random().toString(36).slice(2, 10);

export const usePOS = create<State>()(
  persist(
    (set, get) => ({
      menu: seedMenu,
      tables: seedTables,
      orders: [],
      orderCounter: 100,

      addMenuItem: (i) =>
        set((s) => ({ menu: [...s.menu, { ...i, id: uid() }] })),
      updateMenuItem: (id, patch) =>
        set((s) => ({ menu: s.menu.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
      deleteMenuItem: (id) =>
        set((s) => ({ menu: s.menu.filter((m) => m.id !== id) })),

      createOrder: (tableId, guests, server) => {
        const number = get().orderCounter + 1;
        const id = uid();
        const order: Order = {
          id,
          number,
          tableId,
          guests,
          server,
          lines: [],
          status: "open",
          createdAt: Date.now(),
        };
        set((s) => ({
          orders: [order, ...s.orders],
          orderCounter: number,
          tables: tableId
            ? s.tables.map((t) => (t.id === tableId ? { ...t, status: "seated", orderId: id } : t))
            : s.tables,
        }));
        return id;
      },

      addLine: (orderId, item, qty = 1) =>
        set((s) => ({
          orders: s.orders.map((o) => {
            if (o.id !== orderId) return o;
            const existing = o.lines.find((l) => l.itemId === item.id);
            const lines = existing
              ? o.lines.map((l) => (l.itemId === item.id ? { ...l, qty: l.qty + qty } : l))
              : [...o.lines, { itemId: item.id, name: item.name, price: item.price, qty }];
            return { ...o, lines };
          }),
        })),

      changeQty: (orderId, itemId, qty) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id !== orderId
              ? o
              : { ...o, lines: o.lines.map((l) => (l.itemId === itemId ? { ...l, qty } : l)).filter((l) => l.qty > 0) }
          ),
        })),

      removeLine: (orderId, itemId) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id !== orderId ? o : { ...o, lines: o.lines.filter((l) => l.itemId !== itemId) }
          ),
        })),

      setStatus: (orderId, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === orderId ? { ...o, status } : o)) })),

      payOrder: (orderId, method, tip) =>
        set((s) => {
          const order = s.orders.find((o) => o.id === orderId);
          return {
            orders: s.orders.map((o) =>
              o.id === orderId
                ? { ...o, status: "paid" as OrderStatus, paidAt: Date.now(), paymentMethod: method, tip }
                : o
            ),
            tables: order?.tableId
              ? s.tables.map((t) => (t.id === order.tableId ? { ...t, status: "free", orderId: null } : t))
              : s.tables,
          };
        }),

      voidOrder: (orderId) =>
        set((s) => {
          const order = s.orders.find((o) => o.id === orderId);
          return {
            orders: s.orders.map((o) => (o.id === orderId ? { ...o, status: "void" } : o)),
            tables: order?.tableId
              ? s.tables.map((t) => (t.id === order.tableId ? { ...t, status: "free", orderId: null } : t))
              : s.tables,
          };
        }),

      setTableStatus: (tableId, status, orderId) =>
        set((s) => ({
          tables: s.tables.map((t) =>
            t.id === tableId ? { ...t, status, orderId: orderId ?? t.orderId } : t
          ),
        })),

      reset: () =>
        set({ menu: seedMenu, tables: seedTables, orders: [], orderCounter: 100 }),
    }),
    { name: "miseenplace-pos-v1" }
  )
);

export const TAX_RATE = 0.085;

export const orderTotals = (lines: OrderLine[], tip = 0) => {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + tip;
  return { subtotal, tax, total };
};

export const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
