const express = require("express");
const app = express();
const routes = require("./routes");

const swaggerFile = require("./swagger-output");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

app.use(express.json());
app.use(cors({
origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);

app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`${port}번 포트로 열렸습니다`);
});