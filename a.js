const pipe = (...fns) => {
  return (x) => fns.reduce((result, nextFun) => nextFun(result), x);
};

const List = {
  map: (fn) => (list) => list.map(fn),
  groupBy: (keyProvider) => (list) => {
    return list.reduce((grouped, item) => {
      const key = keyProvider(item);

      return {
        ...grouped,
        [key]: [...(grouped[key] ?? []), item],
      };
    }, {});
  },
  fold: (monoid) => {
    return (list) => list.reduce(monoid.concat, monoid.identity);
  },
};

const Dict = {
  prop: (key) => (dict) => dict[key],
  map: (fn) => (dict) => {
    const mapped = {};

    for (const key in dict) {
      mapped[key] = fn(dict[key], key, dict);
    }

    return mapped;
  },
};

const Monoids = {
  Sum: { concat: (x, y) => x + y, identity: 0 },
  Mul: { concat: (x, y) => x * y, identity: 1 },
};

const showTotalPrices = pipe(
  List.groupBy(Dict.prop("category")),
  Dict.map(pipe(List.map(Dict.prop("price")), List.fold(Monoids.Sum))),
  console.log
);

const products = [
  { id: 1, name: "A", price: 10, category: "a" },
  { id: 2, name: "AA", price: 10, category: "a" },
  { id: 3, name: "B", price: 20, category: "b" },
  { id: 4, name: "BB", price: 20, category: "b" },
  { id: 5, name: "C", price: 30, category: "c" },
  { id: 6, name: "CC", price: 30, category: "c" },
  { id: 7, name: "D", price: 40, category: "d" },
  { id: 8, name: "DD", price: 40, category: "d" },
  { id: 9, name: "E", price: 50, category: "e" },
  { id: 10, name: "EE", price: 50, category: "e" },
];

showTotalPrices(products);
