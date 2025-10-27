import z from "zod"

export const productSchema = z.object({
    nome: z.string().min(3, "O nome do produto é obrigatório."),
    descricao: z.string().optional(),
    preco: z.number().positive("O preço deve ser número positivo."),
    categoria: z.string().optional()

}) 

