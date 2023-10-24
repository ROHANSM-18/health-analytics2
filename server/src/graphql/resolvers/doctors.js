const Doctor = require('../../models/doctors');
const User = require('../../models/users');

const getAllDoctors = async () => {
  console.log('Resolver called'); 
  try {
    const doctors = await Doctor.findAll({
      include: User,
    });

    // Map the data to the format you want, including the User data
    const doctorsWithUser = doctors.map(doctor => ({
      ...doctor.dataValues,
      User: doctor.User ? doctor.User.dataValues : null,
    }));

    console.log('Fetched doctors:', doctorsWithUser);
    return doctorsWithUser;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error(`Failed to fetch doctors: ${error.message}`);
  }
};

module.exports = getAllDoctors;
