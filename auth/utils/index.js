module.exports.safeReturnUser = user => {
  const safeUser = user.toObject();
  const unsafeProps = ['password', 'activeTokens'];
  return Object.keys(safeUser).reduce(
    (r, k) => (unsafeProps.includes(k) ? r : { ...r, [k]: safeUser[k] }),
    {}
  );
};
