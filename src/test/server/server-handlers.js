import { rest } from "msw";
import * as akunDB from "../data/akun";
import * as budgetDB from "../data/budget";
import * as budgetLineDB from "../data/budgetLine";
import * as danaLineDB from "../data/danaLine";

const handlers = [
  rest.get("/budget", async (req, res, context) => {
    // get latest budget
    const paramLatest = Boolean(req.url.searchParams.get("latest"));
    if (paramLatest) {
      const data = await budgetDB.readLatest();
      return res(context.json({ data }));
    }

    // collection
    const data = await budgetDB.readAll();
    return res(context.json({ data }));
  }),

  rest.get("/budget-line", async (req, res, context) => {
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

    // koleksi default belum di-handle
  }),

  rest.get("/budget-line/:id", async (req, res, context) => {
    const dataLine = await budgetLineDB.read(Number(req.params.id));
    return res(context.json({ data: dataLine }));
  }),

  rest.put("/budget-line/:id", async (req, res, context) => {
    const hasilUpdate = await budgetLineDB.update({
      id: req.params.id,
      ...JSON.parse(req.body),
    });
    return res(context.json({ data: hasilUpdate }));
  }),

  rest.get("/dana-line", async (req, res, context) => {
    const paramBudgetId = Number(req.url.searchParams.get("budgetId"));
    const data = await danaLineDB.searchByField("budgetId", paramBudgetId);
    return res(context.json({ data }));
  }),

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
];

export { handlers };
