module.exports = {
  Todo: {
    Schema: {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String
      },
      complete: {
        type: Boolean,
        default: false
      }
    }
  }
};
