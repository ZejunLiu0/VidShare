const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subsSchema = Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    }
})

const Subs = mongoose.model("Subs", subsSchema);
module.exports = { Subs };