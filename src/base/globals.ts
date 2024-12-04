import { Dict, EstimateEnums, SellTypes, SharingSellTypes } from "@/utils/type";

// Define the global object type
interface Globals {
  EstimateEnums: EstimateEnums;
  SellTypes: SellTypes;
  SharingSellTypes: SharingSellTypes;
  SharingSellTypesDict: Dict;
  EstimateEnumsDict: Dict;
}

// Create the globals object with the specified type
export const globals: Globals = {
  EstimateEnums: {
    ESTIMATED: 10,
    FINISHED: 20,
    PENDING: 30,
    RETURNED: 40,
  },

  SellTypes: {
    SELL: 10,
    RENT: 20,
    SELL_RENT: 30,
    SOLD: 40,
    RENTED: 50,
  },

  SharingSellTypes: {
    SOLD: 10,
    RENTED: 20,
  },

  SharingSellTypesDict: {},

  EstimateEnumsDict: {},
};

// Populate the EstimateEnumsDict
globals.EstimateEnumsDict[globals.EstimateEnums.ESTIMATED] = "Үнэлсэн";
globals.EstimateEnumsDict[globals.EstimateEnums.FINISHED] = "Төгсгөл";
globals.EstimateEnumsDict[globals.EstimateEnums.PENDING] = "Хүлээгдэж байна";
globals.EstimateEnumsDict[globals.EstimateEnums.RETURNED] = "Буцаагдсан";

globals.SharingSellTypesDict[globals.SharingSellTypes.SOLD] = "Зарагдсан";
globals.SharingSellTypesDict[globals.SharingSellTypes.RENTED] = "Түрээслэгдсэн";
