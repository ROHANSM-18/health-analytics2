const getAllPatients = require('./patients');
const getAllDoctors = require('./doctors');
const getVisitAppointmentsByPatientID = require('./appointments');
const getMedicalHistoryByPatientID = require('./medicalhistories');
const getLabResultsByPatientID = require('./labresults');
const getVitalsByPatientID = require('./vitals');
const authResolvers = require('./authresolvers');
const getPatientByUserId = require('./getpatientdata');
const getDoctorByUserId = require('./getdoctordata');
const addDoctorToPatient = require('./addDoctorToPatient')

const resolvers = {
  
  Query: {
    getAllPatients,
    getAllDoctors,
    getVisitAppointmentsByPatientID,
    getMedicalHistoryByPatientID,
    getLabResultsByPatientID,
    getVitalsByPatientID,
    getPatientByUserId,
    getDoctorByUserId
  },
  Mutation: {
    ...authResolvers,
    addDoctorToPatient,
  },
};

module.exports = resolvers;