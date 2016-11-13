module.exports = {
  api: {
    hostname: 'api.local.haskellacademy.com',
    port: 3000,
    protocol: 'http',
    get host() {
      const port = this.port === 80 ? '' : `:${this.port}`;
      return `${this.protocol}://${this.hostname}${port}`;
    },
  },

  app: {
    hostname: 'local.haskellacademy.com',
    port: 3000,
    protocol: 'http',
    get host() {
      const port = this.port === 80 ? '' : `:${this.port}`;
      return `${this.protocol}://${this.hostname}${port}`;
    },
  },
};
