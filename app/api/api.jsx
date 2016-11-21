const qwest = require('qwest');
const urljoin = require('url-join');

const config = require('academy-config');

qwest.setDefaultOptions({
  withCredentials: true,
});

/**
 * Creates an API client that works for a certain resource
 * url is the resource url (e.g. '/users')
 */
export function createResourceClient(url, Model) {
  const baseUrl = urljoin(config.api.host, url);
  return {
    list() {
      return qwest.get(baseUrl);
    },
    get(id) {
      return qwest.get(urljoin(baseUrl, id))
        .then((_, response) => new Model(response));
    },
    create(model) {
      return qwest.post(baseUrl, model.toJSON());
    },
    update(id, model) {
      return qwest.put(urljoin(baseUrl, id), model.toJSON());
    },
    delete(id) {
      return qwest.delete(urljoin(baseUrl, id));
    },
  };
}
