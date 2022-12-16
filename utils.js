const { orders } = require('./products');

const currentDay = () => {
  const current = new Date(Date.now());
  const date = new Intl.DateTimeFormat('fr-FR').format(current);

  return date;
};

// ─── 1) Edit Date ───────────────────────────────────────────────────────────────
exports.editDate = (array) => {
  // 1) Get the date
  const query = array.find((el) => el.__EMPTY_2);

  // 2) Convert object to array
  const result = Object.entries(query);

  // 3) Generate a new date
  const date = currentDay();

  // 4) Replace old date by the new date
  result[1][0] = date;

  // 5) Convert array to object
  const obj = Object.fromEntries(result);

  // 6) Update value in original data
  return (array[0] = obj);
};

exports.editDestination = (array) => {
  // 1) Get the destination data
  const destination = array.find((el) => el.__EMPTY === 'MHD');
  // 2) Update the destination data
  destination['M O N D I A L   F O O D'] = 'Marseille';
  // TODO Use db sanity to store number of ordering
  destination.__EMPTY_1 = '21 rue de Savoie';
  destination['DATE DE CHARGEMENT :'] = '9300';
  destination.__EMPTY_2 = 'Bobigny';
  destination.__EMPTY_3 = Number(destination.__EMPTY_3) + 1;
  // 3) Find the index of the destination in the array data
  const index = array.findIndex((el) => el.__EMPTY === 'MHD');

  // 4) Update destination data in original data
  return (array[index] = destination);
};

exports.addProducts = (array) => {
  const arr = Array.from(orders);
  let totalQuantity = 0;
  let totalWeight = 0;
  arr.map((el) => {
    totalQuantity = totalQuantity + Number(el.quantity);
    totalWeight = totalWeight + el.weightTotal();

    const date = currentDay();

    const item = {
      'M O N D I A L   F O O D': el.ref,
      __EMPTY: el.quantity,
      __EMPTY_1: el.product,
      'DATE DE CHARGEMENT :': el.weight,
      __EMPTY_2: el.temp,
      [date]: el.weightTotal(),
    };

    array.push(item);
  });

  const total = {
    'M O N D I A L   F O O D': 'TOTAL COLIS',
    __EMPTY: totalQuantity,
    __EMPTY_1: 'INFORMATIONS SUPLEMENTAIRES :',
  };

  const weights = {
    'M O N D I A L   F O O D': 'POIDS TOTAL',
    __EMPTY: totalWeight.toFixed(2).toString().split('.').join(','),
  };

  array.push(total);
  array.push({ 'M O N D I A L   F O O D': 'NBR PALETTE ' });
  array.push(weights);
};
