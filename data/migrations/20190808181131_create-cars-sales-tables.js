exports.up = function(knex) {
  return knex.schema
    .createTable("cars", tbl => {
      tbl.increments();
      tbl
        .text("VIN", 17)
        .unique()
        .notNullable();
      tbl.text("make", 128).notNullable();
      tbl.text("model", 128).notNullable();
      tbl.integer("mileage").notNullable();
      tbl.text("transmissionType", 128);
      tbl.text("titleStatus", 128);
    })

    .createTable("sales", tbl => {
      tbl.increments();
      tbl.decimal("saleAmount", 12, 2).notNullable();
      tbl.date("saleDate").notNullable();
      tbl
        .integer("car_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cars");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sales").dropTableIfExists("cars");
};
