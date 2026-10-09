import type { Request, Response } from "express";
import { pool } from "../conf/dbConnection.ts";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export class ProductController {
  
  public async getAllProducts(_req: Request, res: Response) 
  {
    try 
    {
      const [rows] = await pool.execute("SELECT * FROM products WHERE active = TRUE");
      res.status(200).json(rows);
    } catch (err) 
    {
      console.error(err);
      res.status(500).json({ message: "Ugh, internal server error" });
    }
  }

  public async getProductById(req: Request, res: Response) 
  {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) 
        {
        return res.status(400).json({ message: "Invalid ID format, it has to have a positive integer value" });
      }

      const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT * FROM products WHERE id = ? AND active = TRUE",
        [id]
      );

      if (rows.length === 0)
      {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ugh, internal server error" });
    }
  }

  public async createProduct(req: Request, res: Response) 
  {
    try {
      const { name, price, stock, description, brand, img } = req.body;

      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: "Price must be greater than 0 you sizzle sticks!" });
      }

      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO products (name, price, stock, description, brand, img) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, price, stock, description, brand || null, img || null]
      );

      res.status(201).json(
      { 
        message: "Product generated successfully", 
        productId: result.insertId 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ugh, internal server error" });
    }
  }

  public async updateProduct(req: Request, res: Response) 
  {
    try {
      const id = Number(req.params.id);
      const { name, price, stock, description, brand, img } = req.body;

      if (isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
      if (typeof price !== 'number' || price <= 0) return res.status(400).json({ message: "Invalid price" });

      const [result] = await pool.execute<ResultSetHeader>(
        `UPDATE products SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ? 
         WHERE id = ? AND active = TRUE`,
        [name, price, stock, description, brand, img, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ugh, internal server error" });
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });

      const [result] = await pool.execute<ResultSetHeader>(
        "UPDATE products SET active = FALSE WHERE id = ? AND active = TRUE",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted, buh bye" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ugh, internal server error" });
    }
  }

  public async changePrice(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { price } = req.body;

      if (isNaN(id) || id <= 0) return res.status(400).json({ message: "Invalid ID" });
      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ message: "Price must be a number greater than 0" });
      }

      const [result] = await pool.execute<ResultSetHeader>(
        "UPDATE products SET price = ? WHERE id = ? AND active = TRUE",
        [price, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product price updated, hell yeah!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ugh, internal server error" });
    }
  }
}