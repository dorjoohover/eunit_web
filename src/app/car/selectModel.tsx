export const motor = [
  {
    label: "1.5-с доош",
    value: "1.5-с доош",
  },
  {
    label: "1.6-2.0",
    value: "1.6-2.0",
  },

  {
    label: "2.1-2.5",
    value: "2.1-2.5",
  },
  {
    label: "2.6-3.0",
    value: "2.6-3.0",
  },
  {
    label: "3.1-3.5",
    value: "3.1-3.5",
  },
  {
    label: "3.6-4.0",
    value: "3.6-4.0",
  },
  {
    label: "4.1-4.5",
    value: "4.1-4.5",
  },
  {
    label: "4.6-5.0",
    value: "4.6-5.0",
  },
  {
    label: "5.1-с дээш",
    value: "5.1-с дээш",
  },
  {
    label: "Цахилгаан",
    value: "Цахилгаан",
  },
];
export const drive = ["Хойноо RWD", "Урдаа FWD", "Бүх дугуй 4WD"];
export const engine = ["Бензин", "Дизель", "Хайбрид", "Газ", "Цахилгаан"];
export type CarMark = keyof (typeof cars)[CarBrand]["marks"];
export type CarBrand = keyof typeof cars;
export const gearbox = ["Автомат", "Механик"];
export const cars = {
  Acura: {
    label: "Acura",
    marks: {
      Cl: {
        label: "Cl",
        motor: [2.2, 3.2],
        engine: engine.slice(0, 1),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(1, 2),
      },
      Integra: {
        label: "Integra",
        motor: [1.5, 2.0],
        engine: [engine[0], engine[2]],
        gearbox: gearbox,
        drive: drive.slice(1, 2),
      },
    },
  },
  Audi: {
    label: "Audi",
    marks: {
      A3: {
        label: "A3",
        engine: engine.slice(0, 3),
        gearbox: gearbox,
        drive: drive.slice(1, 3),
        motor: [1.0, 2.0],
      },
      A4: {
        label: "A4",
        engine: engine.slice(0, 3),
        gearbox: gearbox,
        drive: drive.slice(1, 2),
        motor: [1.4, 3.0],
      },
      A6: {
        label: "A6",
        engine: engine.slice(0, 3),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(2, 3),
        motor: [2.0, 3.0],
      },
      Q7: {
        label: "Q7",
        engine: engine.slice(0, 3),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(2, 3),
        motor: [2.0, 4.0],
      },
      busad: {
        label: "busad",
      },
    },
  },
  Baic: {
    label: "Baic",
    marks: {
      Bj40: {
        label: "Bj40",
        engine: engine.slice(0, 2),
        gearbox: gearbox,
        drive: drive.slice(2, 3),
        motor: [2.0, 2.3, "Turbo"],
      },
    },
  },
  Bestune: {
    label: "Bestune",
    marks: {
      B70: {
        label: "B70",
        engine: [...engine.slice(0, 2), engine[4]],
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(1, 2),
        motor: [1.5, 2.0],
      },
    },
  },
  Bmw: {
    label: "Bmw",
    marks: {
      "3-seri": {
        label: "3-seri",
        engine: engine.slice(0, 3),
        gearbox: gearbox,
        drive: [drive[0], drive[2]],
        motor: [1.5, 3.0],
      },
      "5-seri": {
        label: "5-seri",
        engine: engine.slice(0, 3),
        gearbox: gearbox.slice(0, 1),
        drive: [drive[0], drive[2]],
        motor: [2.0, 4.4],
      },
      "7-ser": {
        label: "7-ser",
        engine: engine.slice(0, 3),
        gearbox: gearbox.slice(0, 1),
        drive: [drive[2]],
        motor: [3.0, 6.6],
      },
      X1: {
        label: "X1",
        engine: engine.slice(0, 2),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(1),
        motor: [1.5, 2.0],
      },
      X3: {
        label: "X3",
        engine: engine.slice(0, 2),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(2),
        motor: [2, 3.0],
      },
      X5: {
        label: "X5",
        engine: engine.slice(0, 2),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(2),
        motor: [3, 4.4],
      },
      X6: {
        label: "X6",
        engine: engine.slice(0, 2),
        gearbox: gearbox.slice(0, 1),
        drive: drive.slice(2),
        motor: [3, 4.4],
      },
      busad: {
        label: "busad",
      },
    },
  },
  Cadillac: {
    label: "Cadillac",
    marks: {
      Cts: {
        label: "Cts",
        engine: engine.slice(0, 1),
        gearbox: gearbox,
        drive: [drive[0], drive[2]],
        motor: [2.0, 6.2],
      },
      Escalade: {
        label: "Escalade",
        engine: [engine[0], engine[2]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[0], drive[2]],
        motor: [6.2, 6.2],
      },
      busad: {
        label: "busad",
      },
    },
  },
  Changan: {
    label: "Changan",
    marks: {
      Cs: {
        label: "Cs",
        engine: engine.slice(0, 1),
        gearbox: gearbox,
        drive: [drive[1], drive[2]],
        motor: [1.5, 2.0],
      },
      "Uni K": {
        label: "Uni K",
        engine: [engine[0], engine[2]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[2]],
        motor: [2.0, 2.0, "turbo"],
      },
      Бусад: {
        label: "busad",
      },
    },
  },
  Chery: {
    label: "Chery",
    marks: {
      "Tiggo 7": {
        label: "Tiggo 7",
        engine: engine.slice(0, 1),
        gearbox: gearbox.slice(0, 1),
        drive: [drive[1]],
        motor: [1.5, 1.6, "turbo"],
      },
      "Tiggo 7 Pro": {
        label: "Tiggo 7 Pro",
        engine: [engine[0], engine[2]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[1], drive[2]],
        motor: [1.5, 1.6, "turbo"],
      },
      "Tiggo 7 Pro Max": {
        label: "Tiggo 7 Pro Max",
        engine: [engine[0], engine[2]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[1], drive[2]],
        motor: [1.5, 1.6, "turbo"],
      },
      busad: {
        label: "busad",
      },
    },
  },
  Chevrolet: {
    label: "Chevrolet",
    marks: {
      Camaro: {
        label: "Camaro",
        engine: engine.slice(0, 1),
        gearbox: gearbox,
        drive: [drive[0]],
        motor: [2.0, 6.2],
      },
      "Captiva Sport": {
        label: "Captiva Sport",
        engine: [engine[0]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[1], drive[2]],
        motor: [2.4, 3.6],
      },
      Colorado: {
        label: "Colorado",
        engine: [engine[0], engine[1]],
        gearbox: gearbox,
        drive: [drive[0], drive[2]],
        motor: [2.5, 3.6],
      },
      Cruze: {
        label: "Cruze",
        engine: [engine[0], engine[1]],
        gearbox: gearbox,
        drive: [drive[1]],
        motor: [1.4, 2.0],
      },
      Tahoe: {
        label: "Tahoe",
        engine: [engine[0]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[0], drive[2]],
        motor: [5.3, 6.2],
      },
      Trailblazer: {
        label: "Trailblazer",
        engine: [engine[0], engine[1]],
        gearbox: gearbox.slice(0, 1),
        drive: [drive[1]],
        motor: [1.2, 3.6],
      },
    },
  },
};

export const steerType = [
  {
    label: "Зөв",
    value: "Зөв",
  },
  {
    label: "Буруу",
    value: "Буруу",
  },
];

export const carColor = [
  {
    label: "Бор",
    value: "Бор",
  },
  {
    label: "Боронзон",
    value: "Боронзон",
  },
  {
    label: "Ногоон",
    value: "Ногоон",
  },
  {
    label: "Саарал",
    value: "Саарал",
  },
  {
    label: "Сувдан цагаан",
    value: "Сувдан цагаан",
  },
  {
    label: "Улаан",
    value: "Улаан",
  },
  {
    label: "Улбар шар",
    value: "Улбар шар",
  },
  {
    label: "Хар",
    value: "Хар",
  },
  {
    label: "Хар саарал",
    value: "Хар саарал",
  },
  {
    label: "Хөх",
    value: "Хөх",
  },
  {
    label: "Хүрэн",
    value: "Хүрэн",
  },
  {
    label: "Цагаан",
    value: "Цагаан",
  },
  {
    label: "Цагаан шар",
    value: "Цагаан шар",
  },
  {
    label: "Цайвар цэнхэр",
    value: "Цайвар цэнхэр",
  },
  {
    label: "Цэнхэр",
    value: "Цэнхэр",
  },
  {
    label: "Шар",
    value: "Шар",
  },
  {
    label: "Шаргал",
    value: "Шаргал",
  },
  {
    label: "Ягаан",
    value: "Ягаан",
  },
  {
    label: "Бусад",
    value: "Бусад",
  },
];

export const meterRange = [
  {
    label: "0-30,000 км",
    value: "0-30,000 км",
  },
  {
    label: "30,001-50,000 км",
    value: "30,001-50,000 км",
  },
  {
    label: "50,001-100,000 км",
    value: "50,001-100,000 км",
  },
  {
    label: "100,001км - 150,000км",
    value: "100,001км - 150,000км",
  },
  {
    label: "150,001-200,000 км",
    value: "150,001-200,000 км",
  },
  {
    label: "200,001-250,000 км",
    value: "200,001-250,000 км",
  },
  {
    label: "250,001 км-аас дээш",
    value: "250,001 км-аас дээш",
  },
];

export const type = [
  {
    label: "Жийп",
    value: "Жийп",
  },
  {
    label: "Суудлын тэрэг",
    value: "Суудлын тэрэг",
  },
  {
    label: "Гэр бүлийн",
    value: "Гэр бүлийн",
  },
];
export const conditions = [
  {
    label: "Дугаар авсан",
    value: "Дугаар авсан",
  },
  {
    label: "00 гүйлттэй",
    value: "00 гүйлттэй",
  },
  {
    label: "Дугаар аваагүй",
    value: "Дугаар аваагүй",
  },
];

export const carMain = [
  { key: "color", data: carColor },
  { key: "interior", data: carColor },
  { key: "steerType", data: steerType },
  { key: "type", data: type },
  { key: "conditions", data: conditions },
];

export const carTechnik = ["engine", "motor", "gearbox", "drive"];

