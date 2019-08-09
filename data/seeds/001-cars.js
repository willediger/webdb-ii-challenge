exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "0A0A0A0A0A0A",
          make: "Chevrolet",
          model: "Suburban",
          mileage: 100,
          titleStatus: "Clean",
          transmissionType: "Automatic"
        },
        {
          VIN: "0A0A0A0A0ABB",
          make: "Cadillac",
          model: "Escalade",
          mileage: 50
        }
      ]);
    });
};
