import React, { useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Country, Party } from '../types';
import DockedButtonPane from './DockedButtonPane';

// Sample country list
const countries: Country[] = [
  { code: 'TH', name: 'Thailand' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'IN', name: 'India' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'KR', name: 'South Korea' },
  { code: 'MM', name: 'Myanmar' },
];

// Sample system data (in a real application, this would come from an API)
const systemPartyData = {
  shipper: {
    name: 'Singapore Global Trading Pte Ltd',
    address: ['50 Raffles Place', 'Singapore', 'Central Region', '048623'],
    street: '50 Raffles Place',
    city: 'Singapore',
    state: 'Central Region',
    postalCode: '048623',
    country: 'SG',
  },
  consignee: {
    name: 'Myanmar Import Export Co Ltd',
    address: ['123 Merchant Street', 'Yangon', 'Yangon Region', '11181'],
    street: '123 Merchant Street',
    city: 'Yangon',
    state: 'Yangon Region',
    postalCode: '11181',
    country: 'MM',
  },
  notify: {
    name: 'Thailand Logistics Solutions Co Ltd',
    address: ['456 Silom Road', 'Bangkok', 'Bangkok', '10500'],
    street: '456 Silom Road',
    city: 'Bangkok',
    state: 'Bangkok',
    postalCode: '10500',
    country: 'TH',
  },
};

const PartyInfo: React.FC = () => {
  const [partyData, setPartyData] = useState({
    shipper: {
      name: 'Singapore Global Trading Pte Ltd',
      address: ['50 Raffles Place', 'Singapore', 'Central Region', '048623'],
      street: '50 Raffles Place',
      city: 'Singapore',
      state: 'Central Region',
      postalCode: '048623',
      country: 'SG',
    },
    consignee: {
      name: 'Myanmar Import Export Co Ltd',
      address: ['123 Merchant Street', 'Yangon', 'Yangon Region', '11181'],
      street: '123 Merchant Street',
      city: 'Yangon',
      state: 'Yangon Region',
      postalCode: '11181',
      country: 'MM',
    },
    notify: {
      name: 'Thailand Logistics Solutions Co Ltd',
      address: ['456 Silom Road', 'Bangkok', 'Bangkok', '10500'],
      street: '456 Silom Road',
      city: 'Bangkok',
      state: 'Bangkok',
      postalCode: '10500',
      country: 'TH',
    },
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handlePartyChange = (party: 'shipper' | 'consignee' | 'notify', field: string, value: string) => {
    setPartyData(prev => ({
      ...prev,
      [party]: {
        ...prev[party],
        [field]: field === 'address' ? 
          prev[party].address.map((addr, i) => i === parseInt(value.split('-')[1]) ? value.split('-')[0] : addr) :
          value
      }
    }));
  };

  const handleSaveClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleCancelClick = () => {
    setPartyData({
      shipper: { ...systemPartyData.shipper },
      consignee: { ...systemPartyData.consignee },
      notify: { ...systemPartyData.notify }
    });
  };

  const handleConfirmSave = () => {
    console.log('Saving party information:', partyData);
    setOpenConfirmDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  const renderPartySection = (party: 'shipper' | 'consignee' | 'notify', title: string) => (
    <Grid item xs={12} md={4}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 1, 
              mb: 2,
              bgcolor: 'grey.100',
              fontSize: '12px',
              color: 'text.secondary'
            }}
          >
            {systemPartyData[party].name}<br />
            {systemPartyData[party].address[0]}<br />
            {systemPartyData[party].address[1]}<br />
            {systemPartyData[party].address[2]}<br />
            {systemPartyData[party].address[3]}<br />
            Street: {systemPartyData[party].street}<br />
            City: {systemPartyData[party].city}<br />
            State: {systemPartyData[party].state}<br />
            Postal Code: {systemPartyData[party].postalCode}<br />
            {countries.find(c => c.code === systemPartyData[party].country)?.name}
          </Paper>
          
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Name:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    value={partyData[party].name}
                    onChange={(e) => handlePartyChange(party, 'name', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Address Lines */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {[1, 2, 3, 4].map((line) => (
                  <Grid item xs={12} key={line}>
                    <Grid container spacing={1} alignItems="center">
                      {line === 1 ? (
                        <>
                          <Grid item xs={3}>
                            <Typography>Address:</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              fullWidth
                              required={line === 1}
                              value={partyData[party].address[line - 1] || ''}
                              onChange={(e) => handlePartyChange(party, 'address', `${e.target.value}-${line - 1}`)}
                              size="small"
                            />
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={3} />
                            <Grid item xs={9}>
                              <TextField
                                fullWidth
                                value={partyData[party].address[line - 1] || ''}
                                onChange={(e) => handlePartyChange(party, 'address', `${e.target.value}-${line - 1}`)}
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Street */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Street:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    value={partyData[party].street}
                    onChange={(e) => handlePartyChange(party, 'street', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* City */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography>City:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    value={partyData[party].city}
                    onChange={(e) => handlePartyChange(party, 'city', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* State */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography>State:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    value={partyData[party].state}
                    onChange={(e) => handlePartyChange(party, 'state', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Postal Code */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Postal Code:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    value={partyData[party].postalCode}
                    onChange={(e) => handlePartyChange(party, 'postalCode', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Country */}
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                  <Typography>Country:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    select
                    value={partyData[party].country}
                    onChange={(e) => handlePartyChange(party, 'country', e.target.value)}
                    size="small"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.code} - {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );

  return (
    <Box sx={{ pb: 8 }}>
      <Grid container spacing={2}>
        {renderPartySection('shipper', 'Shipper')}
        {renderPartySection('consignee', 'Consignee')}
        {renderPartySection('notify', 'Notify Party')}
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

export default PartyInfo; 