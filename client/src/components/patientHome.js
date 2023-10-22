import React, { useState } from 'react';
import { USER_DATA_KEY } from './config';
import { useQuery } from '@apollo/client';
import { GET_PATIENT_BY_USER_ID } from '../graphql/queries/getpatientsbyuserid';
import {
  AppBar,
  Toolbar,
  Snackbar,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ThemeProvider,
  createTheme,
  Button
} from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import './styles.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5733',
    },
  },
});

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  // Adjust age if the birth date has not occurred this year yet
  if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

const PatientHome = () => {
  const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
  const [open, setOpen] = React.useState(false);
  const [logoutSnackbarOpen, setLogoutSnackbarOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_PATIENT_BY_USER_ID, {
    variables: { getPatientByUserIdId: userData.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return<p> Error: {error.message}</p>;

  
  const patient = data.getPatientByUserId;
  const name = (patient.FirstName)[0]
  const age = calculateAge(patient.DateOfBirth); 
  const dateOfBirth = new Date(patient.DateOfBirth);
  const formattedDateOfBirth = dateOfBirth.toDateString();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_DATA_KEY);
    //setLogoutSnackbarOpen(true);
    setTimeout(() => {
      window.location.href = '/'; 
    }, 2000);
   
  };
  

  const handleSnackbarClose = () => {
    setLogoutSnackbarOpen(false);
  };

  
  


  return (
    <ThemeProvider theme={theme}>
    <div>

    <AppBar position="static">
        <Toolbar>

        <div className='nav-links'>
        <Link to="/"  className='logo-style'>
              Health Analytics Platform
            </Link>
          <Link to="/vitals" className='nav-link-style' >
            Vitals 
          </Link>
          <Link to="/medical-history" className='nav-link-style'>
            Medical History
          </Link>
          <Link to="/appointments" className='nav-link-style'>
            Appointments
          </Link>
          <Link to="/lab-results" className='nav-link-style'>
            Lab Results
          </Link>
          <Outlet />
          </div>
    
                <div   className='logout-style'>
                    <Button
                  
            color="inherit"
            onClick={handleLogout}
            variant="outlined"
            
          >
            Log out
          </Button>
          </div>
          <div className='user-circle'>
          <IconButton onClick={handleDrawerOpen}>
            <Avatar
              sx={{
                backgroundColor: ' rgba(250, 235, 215, 0.901)',
                width: 35,
                height: 35,
              }}
            >

             <p className='user-style'> {name} </p>
            </Avatar>
          </IconButton>
          </div>
        </Toolbar>
        </AppBar>
        <div className='main-content'>
      <h2>Welcome,<span style={{color:'#ff5733'}}> {patient.FirstName}</span></h2>
      <table className='info-table'>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>{patient.FirstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{patient.LastName}</td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td>{formattedDateOfBirth}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{patient.Gender}</td>
          </tr>
          <tr>
            <td>Age:</td>
            <td>{age} years</td>
          </tr>
          <tr>
            <td>Contact Information:</td>
            <td>{patient.ContactInformation}</td>
          </tr>
          <tr>
            <td>Doctor:</td>
            <td>{patient.Doctor && patient.Doctor.FirstName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{patient.UserID && patient.UserID.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
      <Snackbar
  open={logoutSnackbarOpen}
  autoHideDuration={2000}
  onClose={handleSnackbarClose}
>
  <MuiAlert severity="success" onClose={handleSnackbarClose}>
    Logged out successfully
  </MuiAlert>
</Snackbar>

    </div>
    </ThemeProvider>
  );
};

export default PatientHome;
