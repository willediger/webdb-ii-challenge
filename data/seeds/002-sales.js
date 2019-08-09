exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sales")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("sales").insert([
        {
          saleAmount: 50000,
          saleDate: "1/12/2019",
          car_id: 1
        },
        {
          saleAmount: 70000,
          saleDate: "1/15/2019",
          car_id: 2
        }
      ]);
    });
};
