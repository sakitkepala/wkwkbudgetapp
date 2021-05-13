import { rest } from "msw";
import * as akunDB from "../data/akun";
import * as budgetDB from "../data/budget";
import * as budgetLineDB from "../data/budgetLine";
import * as danaLineDB from "../data/danaLine";

const handlers = [
  rest.get("/akun", async (req, res, context) => {
    const akun = await akunDB.readAll();
    if (!akun) {
      return res(
        context.status(404),
        context.json({ status: 404, message: "Tidak ada akun" })
      );
    }
    return res(context.json({ data: akun }));
  }),

  rest.get("/dana-line", async (req, res, context) => {
    const field = "budgetId";
    const paramBudgetId = Number(req.url.searchParams.get(field));
    const data = await danaLineDB.readByField(field, paramBudgetId);
    return res(context.json({ data }));
  }),

  rest.get("/budget", async (req, res, context) => {
    // get latest budget
    const data = await budgetDB.readLatest();
    return res(context.json({ data }));
  }),

  rest.get("/budget/bulan-ini", async (req, res, context) => {
    // get latest budget
    const data = await budgetDB.readLatest();
    return res(context.json({ data }));

    // TODO: read semua resource collection
    // ...
  }),

  rest.get("/budgetLine", async (req, res, context) => {
    // get lines menurut parameter bulan
    const queryBudgetId = req.url.searchParams.get("budgetId");
    if (queryBudgetId) {
      const data = await budgetLineDB.searchByField(
        "budgetId",
        Number(queryBudgetId)
      );
      if (!data || data === []) {
        return res(context.status(401));
      }
      return res(context.json({ data }));
    }

    // TODO: default ke resource collections
    // ...
  }),

  rest.get("/budgetLine/:id", async (req, res, context) => {
    const dataLine = await budgetLineDB.read(Number(req.params.id));
    return res(context.json({ data: dataLine }));
  }),

  rest.put("/budgetLine/:id", async (req, res, context) => {
    const hasilUpdate = await budgetLineDB.update({
      id: req.params.id,
      ...JSON.parse(req.body),
    });
    return res(context.json({ data: hasilUpdate }));
  }),
];

export { handlers };
