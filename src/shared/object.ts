type ValueOf<T> = T[keyof T];

type MapTo<T, U> = {
  [P in keyof T]: U;
};

export const createObjectMapper =
  <T extends object, U>(mappingFn: (v: ValueOf<T>) => U) =>
  (obj: T): MapTo<T, U> => {
    let newObj = {} as MapTo<T, U>;

    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        const oldValue = obj[i];
        newObj[i] = mappingFn(oldValue);
      }
    }

    return newObj;
  };

export const mapObject = <T extends object, U>(
  mappingFn: (v: ValueOf<T>) => U,
  obj: T
): MapTo<T, U> => {
  let newObj = {} as MapTo<T, U>;

  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      const oldValue = obj[i];
      newObj[i] = mappingFn(oldValue);
    }
  }

  return newObj;
};
