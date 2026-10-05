const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

module.exports.index = async (req, res) => {
  let { category, search } = req.query;

  let filter = {};

  // Category filter
  if (category && Listing.categories.includes(category)) {
    filter.category = category;
  }

  // Search filter
  if (search && search.trim() !== "") {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
      {
        country: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const alllistings = await Listing.find(filter);

  res.render("listings/index.ejs", {
    alllistings,
    categories: Listing.categories,
    selectedCategory: category || "",
    searchTerm: search || "",
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs", {
    categories: Listing.categories,
  });
};

module.exports.showListing = async (req, res) => {
  try {
    let { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "This Listing does not exist!");

      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {
      listing,
    });
  } catch (err) {
    res.send("Invalid listing ID");
  }
};

module.exports.createListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  if (!response.body.features.length) {
    req.flash("error", "Location not found!");

    return res.redirect("/listings/new");
  }

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;

  newListing.image = {
    url,
    filename,
  };

  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New Listing Created!");

  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  try {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "This Listing does not exist!");

      return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;

    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {
      listing,
      originalImageUrl,
      categories: Listing.categories,
    });
  } catch (err) {
    res.send("Invalid listing ID");
  }
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "This Listing does not exist!");

      return res.redirect("/listings");
    }

    // Store old location so we can check
    // whether the location was changed.
    let oldLocation = listing.location;

    // Update the normal listing fields.
    Object.assign(listing, req.body.listing);

    // Update image only if a new image
    // was uploaded.
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;

      listing.image = {
        url,
        filename,
      };
    }

    // If location changed, get new
    // coordinates from Mapbox.
    if (oldLocation !== listing.location) {
      let response = await geocodingClient
        .forwardGeocode({
          query: listing.location,
          limit: 1,
        })
        .send();

      if (!response.body.features.length) {
        req.flash("error", "Location not found!");

        return res.redirect(`/listings/${id}/edit`);
      }

      listing.geometry = response.body.features[0].geometry;
    }

    await listing.save();

    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
  } catch (err) {
    res.send("Unable to update listing");
  }
};

module.exports.destroyListing = async (req, res) => {
  try {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted!");

    res.redirect("/listings");
  } catch (err) {
    res.send("Unable to delete listing");
  }
};
