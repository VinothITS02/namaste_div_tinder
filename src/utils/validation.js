const validator = require("validator");

const validateEditProfileData = (req) => {
    const allowedToEditFields = ["firstName", "lastName", "emailId", "gender", "age", "skills", "jobTitle","about"];
    const isAllowed = Object.keys(allowedToEditFields).every((fields) => allowedToEditFields.includes(allowedToEditFields[fields]));
   console.log("isAllowed",isAllowed)
    return isAllowed
};

module.exports = {
    validateEditProfileData
}