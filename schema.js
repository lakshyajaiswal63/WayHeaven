const Joi = require("joi");

const listingCategories = [
  "Rooms",
  "Mountains",
  "Beaches",
  "Tiny Homes",
  "Amazing Pools",
  "Castles",
  "Iconic Cities",
  "Camping",
  "Farms",
  "Domes",
  "Boats",
];

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    price: Joi.number().required().min(0),

    country: Joi.string().required(),

    location: Joi.string().required(),

    category: Joi.string()
      .valid(...listingCategories)
      .required(),

    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().allow("", null),
    }).allow(null),
  }).required(),
}).required();

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),

    comment: Joi.string().required(),
  }).required(),
}).required();

module.exports.listingCategories = listingCategories;
