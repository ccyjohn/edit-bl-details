import React, { useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ContainerStatus, CargoMovement } from '../types';
import DockedButtonPane from './DockedButtonPane';

// Define the correct container status and cargo movement mappings
const containerStatus: ContainerStatus = {
  '8': 'FCL',
  '7': 'LCL',
  '9': 'CFS'
};

const cargoMovement: CargoMovement = {
  '3': 'Transshipment',
  '7': 'Transit',
  'L': 'Transit To Laos',
  'O': 'Other'
};

// Sample system data (in a real application, this would come from an API)
const systemData = {
  placeOfDelivery: 'THLCH',
  shedNumber: '0122',
  containerStatus: 'FCL',
  cargoMovement: '3'
};

const ThailandInfo: React.FC = () => {
  const [selectedContainerStatus, setSelectedContainerStatus] = useState<string>('8'); // Default to FCL
  const [selectedCargoMovement, setSelectedCargoMovement] = useState<string>('3'); // Default to Transshipment
  const [shedNumber, setShedNumber] = useState<string>('0122');
  const [placeOfDelivery, setPlaceOfDelivery] = useState<string>('THKSP');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleSaveClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleCancelClick = () => {
    // Reset form to initial state with correct container status code
    setShedNumber(systemData.shedNumber);
    setSelectedContainerStatus('8'); // Reset to FCL code
    setSelectedCargoMovement(systemData.cargoMovement);
    setPlaceOfDelivery(systemData.placeOfDelivery);
  };

  const handleConfirmSave = () => {
    // Here you would typically make an API call to save the data
    console.log('Saving Thailand information:', {
      shedNumber,
      containerStatus: selectedContainerStatus,
      cargoMovement: selectedCargoMovement
    });
    setOpenConfirmDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thailand Information
            </Typography>
            <Grid container spacing={2}>
              {/* Place of Delivery */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography>Place of Delivery:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      value={placeOfDelivery}
                      onChange={(e) => setPlaceOfDelivery(e.target.value.toUpperCase())}
                      inputProps={{ 
                        maxLength: 5,
                        style: { textTransform: 'uppercase' }
                      }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 1, 
                        bgcolor: 'grey.100',
                        fontSize: '12px',
                        color: 'text.secondary'
                      }}
                    >
                      {systemData.placeOfDelivery}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* Shed Number */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography>Shed Number:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      value={shedNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^\d{0,4}$/.test(value)) {
                          setShedNumber(value);
                        }
                      }}
                      inputProps={{ 
                        maxLength: 4,
                        pattern: '^[0-9]{4}$'
                      }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 1, 
                        bgcolor: 'grey.100',
                        fontSize: '12px',
                        color: 'text.secondary'
                      }}
                    >
                      {systemData.shedNumber}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* Container Status */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography>Container Status:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      select
                      value={selectedContainerStatus}
                      onChange={(e) => setSelectedContainerStatus(e.target.value)}
                      size="small"
                    >
                      {Object.entries(containerStatus).map(([code, label]) => (
                        <MenuItem key={code} value={code}>
                          {code} - {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

              {/* Cargo Movement */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography>Cargo Movement:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      select
                      value={selectedCargoMovement}
                      onChange={(e) => setSelectedCargoMovement(e.target.value)}
                      size="small"
                    >
                      {Object.entries(cargoMovement).map(([code, label]) => (
                        <MenuItem key={code} value={code}>
                          {code} - {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <DockedButtonPane
        onSave={handleSaveClick}
        onCancel={handleCancelClick}
      />

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Save Changes
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to save all changes? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="primary" variant="contained" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ThailandInfo; 