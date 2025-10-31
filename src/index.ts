import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

interface Product {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
}

let products: Product[] = [];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.post("/products", (req, res) => {
  const { product_name, product_description, product_price }: Product =
    req.body;
  const newProduct: Product = {
    id: products.length + 1,
    product_name,
    product_description,
    product_price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    const { product_name, product_description, product_price }: Product =
      req.body;
    product.product_name = product_name;
    product.product_description = product_description;
    product.product_price = product_price;
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
