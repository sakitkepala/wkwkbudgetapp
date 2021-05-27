import { rest } from "msw";
import * as akunDB from "../data/akun";
import * as kategoriDB from "../data/kategori";
import * as budgetDB from "../data/budget";
import * as budgetLineDB from "../data/budgetLine";
import * as danaLineDB from "../data/danaLine";
import * as belanjaDB from "../data/belanja";

const handlers = [
  rest.get("/budget", async (req, res, context) => {
    try {
      // get latest budget
      const paramLatest = Boolean(req.url.searchParams.get("latest"));
      if (paramLatest) {
        const data = await budgetDB.readLatest();

        const jumlahDanaTersedia =
          (await danaLineDB.searchByField("budgetId", data.id)).reduce(
            (total, dana) => total + dana.jumlah,
            0
          ) -
          (await belanjaDB.searchByField("budgetId", data.id)).reduce(
            (total, dana) => total + dana.jumlah,
            0
          );

        return res(context.json({ data: { ...data, jumlahDanaTersedia } }));
      }

      // collection
      const data = await budgetDB.readAll();
      return res(context.json({ data }));
    } catch (error) {
      return res(context.status(400), context.json({ error }));
    }
  }),

  rest.get("/budget-line", async (req, res, context) => {
    // get lines menurut parameter bulan
    const queryBudgetId = req.url.searchParams.get("budgetId");
    if (queryBudgetId) {
      const dataRaw = await budgetLineDB.searchByField(
        "budgetId",
        Number(queryBudgetId)
      );

      if (!dataRaw || dataRaw === []) {
        return res(context.status(400));
      }

      // Percobaan untuk lakukan compute di backend
      const data = await Promise.all(
        dataRaw.map(async (line) => {
          const belanjaIds = await belanjaDB.search({
            kategoriId: line.kategoriId,
            budgetId: Number(queryBudgetId),
          });

          if (belanjaIds.length <= 0) {
            return line;
          }

          return {
            ...line,
            terpakai: belanjaIds.reduce((p, n) => p + n.jumlah, 0),
          };
        })
      );

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

  rest.get("/kategori", async (req, res, context) => {
    const kategori = await kategoriDB.readAll();
    if (!kategori) {
      return res(
        context.status(404),
        context.json({ status: 404, message: "Tidak ada akun" })
      );
    }
    return res(context.json({ data: kategori }));
  }),

  rest.post("/belanja", async (req, res, context) => {
    const body = JSON.parse(req.body);
    const val = {
      nama: body.nama,
      kategoriId: Number(body.kategoriId),
      jumlah: Number(body.jumlah),
      budgetId: Number(body.budgetId),
    };

    const data = await belanjaDB.create(val);

    return res(context.json({ data }));
  }),
];

// const totalByField = (arr, fieldJumlah) => {
//   return arr.length > 0
//     ? arr.reduce((total, line) => total + line[fieldJumlah], 0)
//     : 0;
// };

export { handlers };
