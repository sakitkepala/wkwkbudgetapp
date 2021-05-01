import React from "react";

const danaDefault = {
  total: 0,
  dipakai: 0,
  sisa: 0,
};

function reducerDanaBudget(state, action) {
  const { total, dipakai } = action;

  switch (action.type) {
    case "TOTAL":
      if (total === state.total) {
        return state;
      }
      return { ...state, total, sisa: total - state.dipakai };

    case "DIPAKAI":
      if (dipakai === state.dipakai) {
        return state;
      }
      return { ...state, dipakai, sisa: state.total - dipakai };

    default:
      console.error("Tipe dispatch gak disupport.");
      return state;
  }
}

function useDanaBudget() {
  const [danaBudget, dispatch] = React.useReducer(
    reducerDanaBudget,
    danaDefault
  );

  const setTotal = React.useCallback(
    (jumlah) => dispatch({ type: "TOTAL", total: jumlah }),
    []
  );

  const setTerpakai = React.useCallback(
    (jumlah) => dispatch({ type: "DIPAKAI", dipakai: jumlah }),
    []
  );

  return { ...danaBudget, setTotal, setTerpakai };
}

export { useDanaBudget };
