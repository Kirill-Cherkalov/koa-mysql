const getPagination = ({ page, pageCount }) => {
  const pagination = {};

  pagination.offset = page * pageCount;
  pagination.limit = pageCount;

  return pagination;
};

module.exports = {
  getPagination,
};
