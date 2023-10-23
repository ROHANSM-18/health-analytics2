import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_VITALS_BY_PATIENT_ID } from '../graphql/queries/getvitalsbypatientid';
import { USER_DATA_KEY } from './config';
import { GET_PATIENT_BY_USER_ID } from '../graphql/queries/getpatientsbyuserid';





const Vitals = () => {

  const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
  const { loading, error, data } = useQuery(GET_PATIENT_BY_USER_ID, {
    variables: { getPatientByUserIdId: userData.id },
  });
  
  
  const patient = data.getPatientByUserId;
  const patientID = patient.PatientID

  const { loading: vitalLoading, error:vitalError, data:vitalData } = useQuery(GET_VITALS_BY_PATIENT_ID, {
    variables: { patientId: patientID },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (vitalLoading) 
  {
    return <p>Vital Loading...</p>;
  }
  if (vitalError)
  {
     return<p> Vital Error: {error.message}</p>;
  }


  // Check if data.getVitalsByPatientID is an array and has at least one item
  const vitals = vitalData?.getVitalsByPatientID;

  if (!vitals) {
    return <p>No vitals data found.</p>;
  }

  return (
    <div>
      <h1>Vitals</h1>
      <p>VitalID: {vitals[0].VitalID}</p>
      <p>Blood Pressure: {vitals[0].BloodPressure}</p>
      <p>Heart Rate: {vitals[0].HeartRate}</p>
      <p>Respiratory Rate: {vitals[0].RespiratoryRate}</p>
      <p>Temperature: {vitals[0].Temperature}</p>
      <p>Oxygen Saturation: {vitals[0].OxygenSaturation}</p>
      <p>Visit Date and Time: {vitals[0].VisitAppointment.DateAndTime}</p>
      <p>Patient: {vitals[0].Patient.FirstName}</p>
      <p>Doctor: {vitals[0].Doctor.FirstName}</p>
    </div>
  );
};

export default Vitals;
