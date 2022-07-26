const validator = require('validator');
const isEmpty = require('./validations');

const userCreation = (firstName , lastName , email , password)=>{
    const errors = {};

    if(isEmpty(firstName)) errors.firstName = "first name require";
    else if(validator.isLength(firstName,{min : 3,max : 40}));

    if(isEmpty(lastName)) errors.lastName = "last name require";

    if(isEmpty(email)) errors.email = "email require";

    if(isEmpty(password)) errors.password = "password require";

    return {
        isSuccess : Object.keys(errors).length === 0,
        errors
    }

}

module.exports = {
    userCreation
}


