import { rest } from "msw";
import * as akunDB from "../data/akun";
import * as budgetDB from "../data/budget";
import * as budgetLineDB from "../data/budgetLine";

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

  rest.get("/budget", async (req, res, context) => {
    // get latest budget
    const data = await budgetDB.read();
    return res(context.json({ data }));
  }),

  rest.get("/budgetLine/:bulan", async (req, res, context) => {
    // get lines menurut parameter bulan
    const data = await budgetLineDB.searchByField("bulan", req.params.bulan);
    if (!data || data === []) {
      return res(context.status(401));
    }
    return res(context.json({ data }));
  }),
];

export { handlers };
