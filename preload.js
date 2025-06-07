const {stratagems, stratagemsByCategory} = require('./stratagemImages');

window.api = {
  getAllImages: () => stratagems,
  getStratagemsByCategory: () => stratagemsByCategory
};
