const mongoose = require("mongoose");

function parseParentCategoryId(parentVal) {
  if (
    parentVal === undefined ||
    parentVal === null ||
    parentVal === "" ||
    parentVal === "0" ||
    parentVal === 0
  ) {
    return 0;
  }

  if (!mongoose.Types.ObjectId.isValid(parentVal)) {
    throw new Error("Invalid parent_category_id");
  }
  return new mongoose.Types.ObjectId(parentVal);
}

module.exports = parseParentCategoryId;
