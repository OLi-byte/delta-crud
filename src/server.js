import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/membros", async (req, res) => {
  try {
    const membros = await prisma.delta_members.findMany();
    res.status(200).json(membros);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar membros" });
  }
});

app.get("/membros/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const membro = await prisma.delta_members.findUnique({
      where: { id: parseInt(id) },
    });

    if (membro) {
      res.status(200).json(membro);
    } else {
      res.status(401).json({ error: "Membro não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar membro" });
  }
});

app.post("/membros", async (req, res) => {
  const { nome, idade, habilidade, descricao, carisma } = req.body;

  try {
    const membro = await prisma.delta_members.create({
      data: { nome, idade, habilidade, descricao, carisma },
    });
    res.status(201).json(membro);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar membro" });
  }
});

app.put("/membros/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade, habilidade, descricao, carisma } = req.body;

  try {
    const membroAtualiado = await prisma.delta_members.update({
      where: { id: parseInt(id) },
      data: { nome, idade, habilidade, descricao, carisma },
    });
    res.json(membroAtualiado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar membro" });
  }
});

app.delete("/membros/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const membroDeletado = await prisma.delta_members.delete({
      where: { id: parseInt(id) },
    });
    res.json(membroDeletado);
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar membro" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});
