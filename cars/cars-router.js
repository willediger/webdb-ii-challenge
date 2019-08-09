const express = require("express");
const db = require("./cars-model.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  let cars;
  if (req.query && Object.keys(req.query).length > 0) {
    cars = await db.getByQuery(req.query);
    if (cars) {
      res.status(200).json(cars);
    } else {
      next({
        status: 500,
        message: "The cars could not be retrieved."
      });
    }
  } else {
    cars = await db.get();
    if (cars) {
      res.status(200).json(cars);
    } else {
      next({
        status: 500,
        message: "The cars could not be retrieved."
      });
    }
  }
});

router.post("/", validateCar, async (req, res) => {
  const car = await db.insert(req.body);
  if (car) {
    res.status(200).json(car);
  } else {
    next({
      status: 500,
      message: "The car could not be added."
    });
  }
});

router.get("/:id", validateCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.delete("/:id", validateCarId, async (req, res) => {
  const deletedCar = await db.delete(req.params.id);
  if (deletedCar) {
    res.status(200).json(req.car);
  } else {
    next({
      status: 500,
      message: "The car could not be removed."
    });
  }
});

router.put("/:id", validateCarId, validateCar, async (req, res) => {
  const updatedCar = await db.update(req.params.id, req.body);
  if (updatedCar) {
    res.status(200).json(updatedCar);
  } else {
    next({
      status: 500,
      message: "The car information could not be updated."
    });
  }
});

async function validateCarId(req, res, next) {
  try {
    const { id } = req.params;
    const car = await db.get(id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({
        status: 404,
        message: "The car with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The car information could not be retrieved."
    });
  }
}

function validateCar(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    if (req.body.VIN && req.body.make && req.body.model && req.body.mileage) {
      next();
    } else {
      next({
        status: 400,
        message: "missing VIN, make, model, and/or mileage field(s)"
      });
    }
  } else {
    next({
      status: 400,
      message: "missing car data"
    });
  }
}

module.exports = router;
