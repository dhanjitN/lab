import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./constants.js";

const app = express();

const allowedOrigins = [
  "https://lab.dhanjit.space",
  "https://admin-lab.dhanjit.space",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) == -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

/* app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
); */
// express middlewares

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes

// admin
import adminRouter from "./routes/admin.route.js";
import healthCheckRouter from "./routes/healthcheck.route.js";
import phytolabRouter from "./routes/phytolab.route.js";
import testCollectionRouter from "./routes/testCollection.route.js";
import testCategoryRouter from "./routes/testCategory.route.js";
import testRouter from "./routes/tests.route.js";

// phytolab
import authPhyto from "./routes/phytologin.route.js";
import reportCollectionRouter from "./routes/reports.route.js";
import reportRouter from "./routes/report.router.js";
import testDataRouter from "./routes/testData.route.js";
import doctorRouter from "./routes/doctor.route.js";

// routes declaration
const base_endpoint = "/api/v1";

// admin
app.use(`${base_endpoint}/admin`, adminRouter);

// admins
app.use(`${base_endpoint}/healthcheck`, healthCheckRouter);
app.use(`${base_endpoint}/phytolab`, phytolabRouter);

// TESTS
app.use(`${base_endpoint}/:labId/collection`, testCollectionRouter);
app.use(`${base_endpoint}/:labId/category`, testCategoryRouter);
app.use(`${base_endpoint}/:labId/test`, testRouter);

// DOCTOR
app.use(`${base_endpoint}/:labId/doctor`, doctorRouter);

// phytolab
app.use(`${base_endpoint}/auth`, authPhyto);
app.use(`${base_endpoint}/data`, testDataRouter);

// REPORTS
app.use(`${base_endpoint}/reports`, reportCollectionRouter);
app.use(`${base_endpoint}/report`, reportRouter);

export default app;
