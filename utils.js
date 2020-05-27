const Utils = {};

Utils.checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) return response;

  return response.json().then((resp) => {
    let error = new Error(resp.message || 'An error has occurred.');
    if (typeof response === 'string') {
      error = Object.assign({}, error, { response: response.json() });
    } else {
      error.response = response;
    }
    error.validation = resp.validation;
    error.status = resp.statusCode;
    throw error;
  });
};

Utils.parseJSON = response => response.json();

Utils.fetchOptions = options => Object.assign({}, {
  // credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}, options);

module.exports = Utils;
