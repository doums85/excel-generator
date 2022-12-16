exports.products = [
  {
    ref: 'Ref#1',
    quantity: '1',
    name: 'product #1',
    weight: '1,5',
    temp: 'SURGELE',
    weightTotal: function () {
      const convertWeight = this.weight.split(',').join('.');
      return convertWeight * this.quantity;
    },
  },
  {
    ref: 'Ref#2',
    quantity: '2',
    name: 'product #2',
    weight: '2,5',
    temp: 'SURGELE',
    weightTotal: function () {
      const convertWeight = this.weight.split(',').join('.');
      return convertWeight * this.quantity;
    },
  },
  {
    ref: 'Ref#3',
    quantity: '3',
    name: 'product #3',
    weight: '3,5',
    temp: 'SURGELE',
    weightTotal: function () {
      const convertWeight = this.weight.split(',').join('.');
      return convertWeight * this.quantity;
    },
  },
];
