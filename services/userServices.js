

const userModel = require('../Model/userModel');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await userModel.create({
        fullname: { firstname, lastname },
        email,
        password,
    });

    return user;
};

module.exports.hashPassword = async (password) => {
    return await userModel.hashPassword(password);
};
