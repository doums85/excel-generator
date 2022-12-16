const express = require('express');
const app = express();
const XLSX = require('xlsx-js-style');
const fs = require('fs');
const { merges } = require('./merge');
const { header, contact, shipping, orders } = require('./styles');
const { products } = require('./products');
// STEP 1: Create a new Workbook
const wb = XLSX.utils.book_new();

const current = new Date(Date.now());
const currentDay = new Intl.DateTimeFormat('fr-FR').format(current);
// STEP 2: Create data rows
let headerRow = [
  { v: 'M O N D I A L   F O O D', t: 's', s: header.title },
  null,
  null,
  { v: 'DATE DE CHARGEMENT :', t: 's', s: header.shippingDate },
  null,
  { v: currentDay, t: 's', s: header.currentDay },
];

let contactSection = {
  heading: [null, null, null, null, null, { v: 'CONTACT: REKIK SELIM', t: 's', s: contact.title }],
  email: [null, null, null, null, null, { v: 'MONDIALFOOD93@GMAIL.COM', t: 's', s: contact.email }],
};

let shippingSection = {
  heading: [
    { v: 'Lieu de chargement', t: 's', s: shipping.font },
    { v: 'Destinataire', t: 's', s: shipping.font },
    { v: 'Adresse', t: 's', s: shipping.font },
    { v: 'Code Postal', t: 's', s: shipping.font },
    { v: 'Localité', t: 's', s: shipping.font },
    { v: 'Transporteur', t: 's', s: shipping.font },
    { v: `REF commande MDLF`, t: 's', s: shipping.font },
    { v: '', t: 's', s: shipping.lastBorder },
  ],
  content: [
    { v: 'ENTREPOT TRAPPES', t: 's', s: shipping.content },
    { v: 'MHD', t: 's', s: shipping.content },
    { v: 'Adresse du client', t: 's', s: shipping.content },
    { v: '93000', t: 's', s: shipping.content },
    { v: 'BOBIGNY', t: 's', s: shipping.content },
    { v: 'MONDIAL', t: 's', s: shipping.content },
    { v: '5385', t: 's', s: { ...shipping.content, ...shipping.ref } },
    { v: '', t: 's', s: shipping.lastBorder },
  ],
};

let orderSection = [
  [
    { v: 'RÉFÉRENCE', t: 's', s: orders.ref },
    { v: 'Nombre de Colis', t: 's', s: orders.heading },
    { v: 'PRODUIT MONDIAL FOOD', t: 's', s: orders.heading },
    { v: 'Poids unit', t: 's', s: orders.heading },
    { v: 'T ° C', t: 's', s: orders.heading },
    { v: 'Poids total', t: 's', s: orders.heading },
    { v: '', t: 's', s: shipping.lastBorder },
  ],
];

let totalQuantity = 0;
let totalWeight = 0;

products.map((el, index) => {
  totalQuantity = totalQuantity + Number(el.quantity);
  totalWeight = totalWeight + el.weightTotal();
  const product = [
    { v: el.ref, t: 's', s: orders.ref },
    { v: el.quantity, t: 's', s: orders.content },
    { v: el.name, t: 's', s: orders.content },
    { v: el.weight, t: 's', s: orders.content },
    { v: el.temp, t: 's', s: orders.content },
    { v: el.weightTotal(), t: 's', s: orders.content },
    { v: '', t: 's', s: shipping.lastBorder },
  ];

  orderSection.push(product);
});

let footer = {
  totals: {
    packages: [
      { v: 'TOTAL COLIS', t: 's', s: orders.content },
      { v: totalQuantity, t: 's', s: orders.content },
    ],
    palettes: [
      { v: 'NBR PALETTE', t: 's', s: orders.content },
      { v: '', t: 's', s: orders.content },
    ],
    weights: [
      { v: 'POIDS TOTAL', t: 's', s: orders.content },
      { v: totalWeight, t: 's', s: orders.content },
    ],
  },
  info: [
    { v: 'INFORMATIONS SUPLEMENTAIRES :', t: 's', s: orders.content },
    { v: 'Ceci est une info', t: 's', s: orders.content },
  ],
};

// STEP 3: Create Worksheet, add data, set cols widths
const ws = XLSX.utils.aoa_to_sheet([
  headerRow,
  null,
  null,
  contactSection.heading,
  contactSection.email,
  null,
  shippingSection.heading,
  shippingSection.content,
  null,
  ...orderSection,
  null,
  footer.totals.packages,
  footer.totals.palettes,
  footer.totals.weights,
  null,
  footer.info,
]);

/* Custom cols and merges */
const widths = {
  normal: { width: 20 },
  medium: { width: 30 },
  large: { width: 40 },
};

const height = { normal: { hpx: 40 }, small: { hpx: 25 } };

ws['!cols'] = [
  widths.normal,
  widths.normal,
  widths.large,
  widths.normal,
  widths.normal,
  widths.normal,
  widths.normal,
];
ws['!rows'] = [
  null,
  null,
  null,
  null,
  null,
  height.normal,
  height.normal,
  height.normal,
  height.normal,
];

products.map((_) => ws['!rows'].push(height.small));
ws['!rows'].push(height.small);

const restRow = [height.normal, null, null, null, null, height.normal];
restRow.map((el) => ws['!rows'].push(el));

ws['!merges'] = [merges.header.title, merges.header.shippingDate, merges.header.currentDay];

XLSX.utils.book_append_sheet(wb, ws, 'browser-demo');

// STEP 4: Write Excel file to browser
XLSX.writeFile(wb, 'demo.xlsx');

/* fs.unlink('note.js', function (err) {
  if (err) {
    throw err;
  } else {
    console.log('Successfully deleted the file.');
  }
}); */
// ─── Server ──────────────────────────────────────────────────────────────────
app.listen(3001, () => console.log('Server listening on port 3000'));
