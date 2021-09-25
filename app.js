const express= require("express")
const cors= require("cors")

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan("dev"));


// test
app.get("/", (req, res) => {
    res.json({
      message: "API is working"
    });
});

// Routes
// app.use("/api/products", productRoutes);

module.exports = app;
