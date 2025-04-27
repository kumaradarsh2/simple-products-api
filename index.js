import express from "express";

const app = express();
const port = 3000;

// Built-in middlewares to parse json and urlencoded data
app.use(express.json()); // parse json data
app.use(express.urlencoded({ extended: true })); // parse x-www-form-urlencoded data

const productList = [{"banana": 12}, {"t-shirt": 4}, {"laptop": 3}, {"milk-bottles": 4}];

app.get("/api/products", (req, res) => {
    res.send(productList);
});

app.get("/api/products/search", (req, res, next) => {
    // do something here
    // console.log(req.query);
    const searchProduct = req.query.name;

    let searchFound = false;
    for (const product of productList)  {
        const productName = Object.keys(product)[0];
        if (productName == searchProduct) {
            searchFound = true;
            res.send(product);
        }
    }

    if (!searchFound) {
        // Product not found
        const error = new Error("Product not found");
        next(error);
    }
});

app.get("/api/products/:productId", (req, res, next) => {
    // do something here
    const index = req.params.productId;
    // console.log(typeof productList[index]);
    if (typeof productList[index] === undefined) {
        const error = new Error("Product not found!");
        // call error handling middleware
        next(error);
    }
    res.send(productList[index]);  
});

app.post("/api/products", (req, res) => {
    // do something here
    productList.push(req.body);
    console.log(productList);
    res.send(200);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(404).send("error", err.message);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));