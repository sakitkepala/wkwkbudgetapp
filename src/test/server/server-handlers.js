import { rest } from "msw";
import * as budgetDB from "../data/budget";
import * as budgetLineDB from "../data/budgetLine";

const handlers = [
  rest.get("/budget", async (req, res, context) => {
    // get latest budget
    const data = await budgetDB.read();
    return res(context.json({ data }));
  }),
  rest.get("/budgetLine", async (req, res, context) => {
    // get lines untuk bulan ini
    const data = await budgetLineDB.readAll();
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

// Mock struktur data budget bulanan / budget bulan ini
const strukturData = {
  id: 1,
  bulan: "",
  danaTersedia: 0,
  danaDianggarkan: 0,
  budgetLines: [],
};

export { handlers };
