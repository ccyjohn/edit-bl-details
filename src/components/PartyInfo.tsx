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
import { Country } from '../types';
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
  { code: 'KH', name: 'Cambodia' },
];

// System data with address as 4 lines and new fields
const systemPartyData = {
  shipper: {
    name: 'ABC Logistics Pte Ltd',
    addressLines: ['10 Changi South Lane', 'Changi', 'Singapore', '486162'],
    country: 'SG',
    street: '10 Changi South Lane',
    city: 'Singapore',
    state: 'Singapore',
    postalCode: '486162'
  },
  consignee: {
    name: 'Phnom Penh Import Export Co., Ltd.',
    addressLines: ['No. 168, Russian Federation Blvd', 'Tuol Kouk', 'Phnom Penh', '12156'],
    country: 'KH',
    street: 'No. 168, Russian Federation Blvd',
    city: 'Phnom Penh',
    state: 'Phnom Penh',
    postalCode: '12156'
  },
  notify: {
    name: 'Bangkok Trading Co., Ltd.',
    addressLines: ['55 Sukhumvit Rd.', 'Khlong Toei', 'Bangkok', '10110'],
    country: 'TH',
    street: '55 Sukhumvit Rd.',
    city: 'Bangkok',
    state: 'Bangkok',
    postalCode: '10110'
  }
};

// Editable state with address as 4 lines and new fields, initialized with sample data for demo
const initialPartyData = {
  shipper: { ...systemPartyData.shipper },
  consignee: { ...systemPartyData.consignee },
  notify: { ...systemPartyData.notify }
};

const PartyInfo: React.FC = () => {
  const [partyData, setPartyData] = useState(initialPartyData);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handlePartyChange = (party: 'shipper' | 'consignee' | 'notify', field: string, value: string) => {
    setPartyData((prev) => ({
      ...prev,
      [party]: {
        ...prev[party],
        [field]: value
      }
    }));
  };

  const handleAddressLineChange = (party: 'shipper' | 'consignee' | 'notify', lineIdx: number, value: string) => {
    setPartyData((prev) => ({
      ...prev,
      [party]: {
        ...prev[party],
        addressLines: prev[party].addressLines.map((line, idx) => idx === lineIdx ? value : line)
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
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{title}</Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Name */}
        <Grid item xs={3}><Typography>Name:</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            value={partyData[party].name}
            onChange={(e) => handlePartyChange(party, 'name', e.target.value)}
            size="small"
          />
        </Grid>
        {/* Address Lines */}
        {[0, 1, 2, 3].map((idx) => (
          <React.Fragment key={idx}>
            <Grid item xs={3}>
              {idx === 0 ? <Typography>Address:</Typography> : null}
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                value={partyData[party].addressLines[idx]}
                onChange={(e) => handleAddressLineChange(party, idx, e.target.value)}
                size="small"
              />
            </Grid>
          </React.Fragment>
        ))}
        {/* New fields */}
        <Grid item xs={3}><Typography>Street:</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            value={partyData[party].street}
            onChange={(e) => handlePartyChange(party, 'street', e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={3}><Typography>City:</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            value={partyData[party].city}
            onChange={(e) => handlePartyChange(party, 'city', e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={3}><Typography>State:</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            value={partyData[party].state}
            onChange={(e) => handlePartyChange(party, 'state', e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={3}><Typography>Postal Code:</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            value={partyData[party].postalCode}
            onChange={(e) => handlePartyChange(party, 'postalCode', e.target.value)}
            size="small"
          />
        </Grid>
        {/* Country moved after Postal Code */}
        <Grid item xs={3}><Typography>Country:</Typography></Grid>
        <Grid item xs={9}>
          <TextField
            select
            fullWidth
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
      {/* System Data Display */}
      <Paper variant="outlined" sx={{ mt: 2, p: 2, bgcolor: 'grey.100', fontSize: '13px', color: 'text.secondary' }}>
        <strong>System Data</strong><br />
        <Grid container spacing={2} alignItems="center">
          {/* Name */}
          <Grid item xs={3}><Typography>Name:</Typography></Grid>
          <Grid item xs={9}>{systemPartyData[party].name}</Grid>
          {/* Address Lines */}
          {[0, 1, 2, 3].map((idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={3}>
                {idx === 0 ? <Typography>Address:</Typography> : null}
              </Grid>
              <Grid item xs={9}>{systemPartyData[party].addressLines[idx]}</Grid>
            </React.Fragment>
          ))}
          {/* New fields */}
          <Grid item xs={3}><Typography>Street:</Typography></Grid>
          <Grid item xs={9}>{systemPartyData[party].street}</Grid>
          <Grid item xs={3}><Typography>City:</Typography></Grid>
          <Grid item xs={9}>{systemPartyData[party].city}</Grid>
          <Grid item xs={3}><Typography>State:</Typography></Grid>
          <Grid item xs={9}>{systemPartyData[party].state}</Grid>
          <Grid item xs={3}><Typography>Postal Code:</Typography></Grid>
          <Grid item xs={9}>{systemPartyData[party].postalCode}</Grid>
          {/* Country moved after Postal Code */}
          <Grid item xs={3}><Typography>Country:</Typography></Grid>
          <Grid item xs={9}>{systemPartyData[party].country}</Grid>
        </Grid>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ pb: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {renderPartySection('shipper', 'Shipper')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderPartySection('consignee', 'Consignee')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderPartySection('notify', 'Notify Party')}
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

export default PartyInfo; 