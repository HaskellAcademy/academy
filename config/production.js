module.exports = {
  isDev: false,

  api: {
    hostname: 'api.haskellacademy.com',
    port: 80,
    protocol: 'http',
    get host() {
      const port = this.port === 80 ? '' : `:${this.port}`;
      return `${this.protocol}://${this.hostname}${port}`;
    },
  },

  app: {
    hostname: 'haskellacademy.com',
    port: 80,
    protocol: 'http',
    get host() {
      const port = this.port === 80 ? '' : `:${this.port}`;
      return `${this.protocol}://${this.hostname}${port}`;
    },
  },
};
