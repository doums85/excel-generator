const fonts = { bold: true, name: 'Twentieh Century', sz: 10 };
const wrap = { wrapText: true };
const border = { style: 'medium', color: { rgb: '00000' } };

exports.header = {
  title: {
    font: { ...fonts, sz: 18 },
    fill: { fgColor: { rgb: 'E59B8C' } },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
  },
  shippingDate: {
    font: { ...fonts, italic: true, color: { rgb: 'FF0001' } },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
  },
  currentDay: {
    font: { ...fonts, italic: true },
    fill: { fgColor: { rgb: 'FFFD03' } },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
  },
};

exports.contact = {
  title: {
    font: { ...fonts, color: { rgb: '808080' } },
  },
  email: {
    font: { ...fonts },
  },
};

exports.shipping = {
  font: {
    font: { ...fonts, sz: 12 },
    fill: { fgColor: { rgb: 'F2F2F2' } },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
    border: {
      top: { ...border },
      bottom: { ...border },
      right: { ...border },
      left: { ...border },
    },
  },
  lastBorder: {
    right: { ...border },
  },
  content: {
    font: { ...fonts, sz: 12 },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
    border: {
      top: { ...border },
      bottom: { ...border },
      right: { ...border },
      left: { ...border },
    },
  },
  ref: {
    font: { ...fonts, sz: 12, color: { rgb: 'FF0001' } },
  },
};

exports.orders = {
  ref: {
    font: { ...fonts, sz: 12 },
    fill: { fgColor: { rgb: 'FEEED8' } },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
    border: {
      top: { ...border, style: 'thin' },
      bottom: { ...border, style: 'thin' },
      right: { ...border, style: 'thin' },
      left: { ...border, style: 'thin' },
    },
  },
  heading: {
    font: { ...fonts, sz: 12 },
    fill: { fgColor: { rgb: 'D7EBB7' } },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
    border: {
      top: { ...border, style: 'thin' },
      bottom: { ...border, style: 'thin' },
      right: { ...border, style: 'thin' },
      left: { ...border, style: 'thin' },
    },
  },
  content: {
    font: { ...fonts, sz: 12 },
    alignment: { horizontal: 'center', vertical: 'center', ...wrap },
    border: {
      top: { ...border, style: 'thin' },
      bottom: { ...border, style: 'thin' },
      right: { ...border, style: 'thin' },
      left: { ...border, style: 'thin' },
    },
  },
};
