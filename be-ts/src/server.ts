import { buildApp } from "./app";

const PORT: string = process.env.PORT || "3000";
const app = buildApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
