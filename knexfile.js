// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/cars.sqlite3"
    },
    useNullAsDefault: true
  }
};
