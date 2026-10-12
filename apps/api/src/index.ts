import express from "express";
import cors from "cors";
import type { Product, Profile, User } from "@my/shared";

const app = express();
app.use(cors());
app.use(express.json()); // json body ke liye jaruri

// --- DUMMY DATA ---
const users: User[] = [
  { id: 1, name: "Aman", city: "Faridabad" },
  { id: 2, name: "Rahul", city: "Delhi" },
  { id: 3, name: "Priya", city: "Mumbai" },
];

const products: Product[] = [
  { id: 101, name: "Laptop", price: 55000, inStock: true },
  { id: 102, name: "Mobile", price: 25000, inStock: true },
  { id: 103, name: "Headphone", price: 1999, inStock: false },
];

const profile: Profile = {
  name: "Narsh",
  role: "Full-stack developer",
  location: "Faridabad, India",
  bio: "Builds small, fast web tools. Likes terminals and clean APIs.",
  skills: ["TypeScript", "React", "Node.js", "Express", "PostgreSQL", "Docker", "Git", "Linux"],
  projects: [
    {
      name: "monorepo-starter",
      description: "pnpm workspace with a Vite web app and an Express API.",
      stack: ["pnpm", "Vite", "Express"],
      status: "live",
    },
    {
      name: "task-cli",
      description: "Tiny command line todo manager.",
      stack: ["Node.js", "TypeScript"],
      status: "wip",
    },
    {
      name: "weather-dash",
      description: "Weather dashboard that talks to a small API.",
      stack: ["React", "Express"],
      status: "archived",
    },
  ],
  links: [
    { label: "github", url: "https://github.com/example" },
    { label: "linkedin", url: "https://linkedin.com/in/example" },
    { label: "email", url: "mailto:hello@example.com" },
  ],
};

// --- ROUTES ---

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from API" });
});

// developer profile (web ka terminal UI isi ko dikhata hai)
app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

// saare users
app.get("/api/users", (_req, res) => {
  res.json(users);
});

// saare products
app.get("/api/products", (_req, res) => {
  res.json(products);
});

// single product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

app.listen(4000, () => console.log("API running on http://localhost:4000"));