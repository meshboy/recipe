export const parseGraphqlError = error => {
  const _error = null;
  if (error.graphQLErrors.length >= 1) {
    _error = error.graphQLErrors[0].message;
  }
  return _error;
};
