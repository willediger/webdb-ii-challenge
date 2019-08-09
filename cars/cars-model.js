const db = require("../data/dbConfig.js");

module.exports = {
  getByQuery: function(query) {
    if (query.sortby) {
      if (query.limit) {
        return db("cars")
          .orderBy(query.sortby, query.sortdir)
          .limit(query.limit);
      } else {
        return db("cars").orderBy(query.sortby, query.sortdir);
      }
    } else if (query.limit) {
      return db("cars").limit(query.limit);
    } else {
      return null;
    }
  },
  get: function(id) {
    let query = db("cars");

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  },
  insert: function(car) {
    return db("cars")
      .insert(car)
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db("cars")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  delete: function(id) {
    return db("cars")
      .where("id", id)
      .del();
  }
};
