const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const showsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["TV", "Movie", "OVA", "ONA", "Special"]
    },
    genres: {
        type: String,
        required: true
    },
    studios: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Not Yet Aired", "Ongoing", "Completed"]
    },
    episodes: {
        type: Number
    },
    duration: {
        type: Number
    },
    synopsis: {
        type: String
    },
    image: {
        type: String,
        // default: "https://returntofreedom.org/store/wp-content/uploads/default-placeholder-768x768.png"
    },
    banner: {
        type: String,
        // default: "https://www.mub.eps.manchester.ac.uk/sees/wp-content/themes/uom-theme/assets/images/default-banner.jpg"
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    }
}, { timestamps: true });

showsSchema.pre("validate", function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    next();
})

module.exports = mongoose.model("shows", showsSchema);