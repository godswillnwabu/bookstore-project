const Joi = require("joi");

const BookAddSchema = Joi.object({
    title: Joi.string().min(5).max(100).trim().required(),
    shortDescription: Joi.string().min(5).max(300).trim(),
    longDescription: Joi.string().min(10).trim(),
    year: Joi.number().integer(10).max(2024).required(),
    price: Joi.number().min(0).required(),
    isbn: Joi.string().min(10).max(13).required(),
    createAt: Joi.date().default(Date.now),
    lastUpdateAt: Joi.date().default(Date.now)
});

const BookUpdateSchema = Joi.object({
    title: Joi.string().min(5).max(100).trim(),
    shortDescription: Joi.string().min(5).max(300).trim(),
    longDescription: Joi.string().min(10).trim(),
    year: Joi.number().integer(10).max(2024),
    price: Joi.number().min(0),
    isbn: Joi.string().min(10).max(13),
});


async function AddBookValidationMw(req, res, next) {
  const bodyPayLoad = req.body;

  try {
    await BookAddSchema.validateAsync(bodyPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function UpdateBookValidationMw(req, res, next) {
    const bodyPayLoad = req.body;
  
    try {
      await BookUpdateSchema.validateAsync(bodyPayLoad);
      next()
    } catch (error) {
      next({
        message: error.details[0].message,
        status: 400,
      });
    }
  }

module.exports = {
  AddBookValidationMw,
  UpdateBookValidationMw
};
