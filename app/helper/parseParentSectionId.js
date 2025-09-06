const mongoose = require("mongoose");

function parseParentSectionId(val) {
  // Root condition → return null
  if (
    val === undefined ||
    val === null ||
    val === "" ||
    val === "0" ||
    val === 0
  ) {
    return 0;
  }

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(val)) {
    throw new Error("Invalid m_id");
  }

  // Return as ObjectId (not number)
  return new mongoose.Types.ObjectId(val);
}

module.exports = parseParentSectionId;
