const usersModel = require('../models/users.model');
const userValidation = require('../validations/users.validation');
const jwt = require('jsonwebtoken');


const createUser = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const userCreationValidation = userValidation.userCreation(firstName, lastName, email, password);

    if (!userCreationValidation.isSuccess)//check if validation pass
        return res.status(404).json(userCreationValidation.errors);

    const user = new usersModel({//create new user
        firstName,
        lastName,
        email,
        password
    });

    user.save((err) => { //store in db
        if (err) return res.status(404).json({ err: err })
        return res.status(200).json(user)
    })
}

const deleteUser = (req, res) => {
    const { userId } = req.params;
    usersModel.deleteOne({ _id: userId }, (err, result) => {//
        if (err) return res.status(404).json({ err: err });
        if (result && result.deletedCount == 0)
            return res.status(404).json({ err: 'user not found' });
        if (result && result.deletedCount > 0)
            return res.status(200).json({ success: 'User Deleted Successfully' });
    });
}

const login = (req, res) => {
    const { email, password } = req.body;
    usersModel.findOne({ email, password }, (err, result) => {
        if (err || !result) return res.status(404).send("user or password are incorrect");
        const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET_KEY)
        return res.status(200).json({token : token});
    })
}



module.exports = {
    createUser,
    deleteUser,
    login
}