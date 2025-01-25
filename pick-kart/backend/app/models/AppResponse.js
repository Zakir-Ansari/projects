class AppResponse {
  constructor(data = null, message = null) {
    this.status = 'success';
    if (message) {
      this.message = message;
    }
    if (data) {
      this.data = data;
    }
  }
}

module.exports = AppResponse;
