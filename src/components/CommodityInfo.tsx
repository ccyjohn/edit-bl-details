import React, { useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Country, CargoNature } from '../types';
import DockedButtonPane from './DockedButtonPane';

// Sample cargo data
const sampleCommodities: CommodityCargo[] = [
  {
    id: 1,
    sequence: 1,
    container: 'ABCD1234567',
    description: 'Electronics',
    cargoNature: 'GC',
    marksNumbers: `SHIPPING MARK:
70574467
THAILAND
C/NO.
AA0001--AA027
MADE IN CHINA

SHIPPING MARK:
70574468
Thailand
C/NO.
A001--A004
MADE IN CHINA

SHIPPING MARK:
70574469
Thailand
C/NO.
A001--A025
MADE IN CHINA

SHIPPING MARK:
70574470
Thailand
C/NO.
A001--A001
MADE IN CHINA

SHIPPING MARK:
70574471
Thailand
C/NO.
A001--A003
MADE IN CHINA

SHIPPING MARK:
70574473
Thailand
C/NO.
A001--A001
MADE IN CHINA

SHIPPING MARK:
70574474
Thailand
C/NO.
A001--A001
MADE IN CHINA

SHIPPING MARK:
70574475
Thailand
C/NO.
A001--A001
MADE IN CHINA`,
    fullDescription: `Panel TPM270WF1-
HVR03.U 300A FQ
905 ASSY FOR TPM270WF1-
CU01 620B
905 ASSY FOR TPM270WF1-
SG2701B01 G62B
905 PCBA  ASS'Y FOR TH
SEC LS27D366GA
905 PCBA  ASS'Y FOR TH
SEC LS27D390GA
905 PCBA  ASS'Y FOR TH
SEC LS32D390GA
905 Packing ASS'Y FOR TH
SEC LS27D362`,
    isReefer: false,
    isDangerous: false,
    packages: 100,
    grossWeight: 1500.5,
    volume: 12.345
  },
  {
    id: 2,
    sequence: 2,
    container: 'WXYZ7654321',
    description: 'Auto Parts',
    cargoNature: 'GC',
    marksNumbers: 'MARKS002',
    fullDescription: 'Automotive Spare Parts - Engine Components',
    isReefer: false,
    isDangerous: false,
    packages: 50,
    grossWeight: 2500.75,
    volume: 25.678
  },
  {
    id: 3,
    sequence: 3,
    container: 'EFGH2345678',
    description: 'Textiles',
    cargoNature: 'GC',
    marksNumbers: 'MARKS003',
    fullDescription: 'Cotton and Polyester Fabrics',
    isReefer: false,
    isDangerous: false,
    packages: 200,
    grossWeight: 1800.0,
    volume: 20.123
  },
  {
    id: 4,
    sequence: 4,
    container: 'IJKL3456789',
    description: 'Machinery',
    cargoNature: 'AW',
    marksNumbers: 'MARKS004',
    fullDescription: 'Industrial Machinery',
    isReefer: false,
    isDangerous: false,
    packages: 10,
    grossWeight: 5000.0,
    volume: 40.0
  },
  {
    id: 5,
    sequence: 5,
    container: 'MNOP4567890',
    description: 'Chemicals',
    cargoNature: 'DG',
    marksNumbers: 'MARKS005',
    fullDescription: 'Hazardous Chemicals - Flammable Liquid',
    isReefer: false,
    isDangerous: true,
    packages: 30,
    grossWeight: 1200.0,
    volume: 10.5
  },
  {
    id: 6,
    sequence: 6,
    container: 'QRST5678901',
    description: 'Furniture',
    cargoNature: 'GC',
    marksNumbers: 'MARKS006',
    fullDescription: 'Wooden Furniture',
    isReefer: false,
    isDangerous: false,
    packages: 15,
    grossWeight: 800.0,
    volume: 18.0
  },
  {
    id: 7,
    sequence: 7,
    container: 'UVWX6789012',
    description: 'Frozen Food',
    cargoNature: 'RF',
    marksNumbers: 'MARKS007',
    fullDescription: 'Frozen Seafood',
    isReefer: true,
    isDangerous: false,
    packages: 60,
    grossWeight: 900.0,
    volume: 22.0
  },
  {
    id: 8,
    sequence: 8,
    container: 'YZAB7890123',
    description: 'Pharmaceuticals',
    cargoNature: 'GC',
    marksNumbers: 'MARKS008',
    fullDescription: 'Medicines and Medical Supplies',
    isReefer: false,
    isDangerous: false,
    packages: 25,
    grossWeight: 600.0,
    volume: 8.5
  },
  {
    id: 9,
    sequence: 9,
    container: 'CDEF8901234',
    description: 'Plastic Goods',
    cargoNature: 'GC',
    marksNumbers: 'MARKS009',
    fullDescription: 'Plastic Household Items',
    isReefer: false,
    isDangerous: false,
    packages: 80,
    grossWeight: 1100.0,
    volume: 15.0
  },
  {
    id: 10,
    sequence: 10,
    container: 'GHIJ9012345',
    description: 'Beverages',
    cargoNature: 'GC',
    marksNumbers: 'MARKS010',
    fullDescription: 'Bottled Drinks',
    isReefer: false,
    isDangerous: false,
    packages: 90,
    grossWeight: 2000.0,
    volume: 30.0
  },
  {
    id: 11,
    sequence: 11,
    container: 'KLMN0123456',
    description: 'Paper Products',
    cargoNature: 'GC',
    marksNumbers: 'MARKS011',
    fullDescription: 'Office Paper and Stationery',
    isReefer: false,
    isDangerous: false,
    packages: 120,
    grossWeight: 1400.0,
    volume: 16.0
  },
  {
    id: 12,
    sequence: 12,
    container: 'OPQR1234567',
    description: 'Paints',
    cargoNature: 'GC',
    marksNumbers: 'MARKS012',
    fullDescription: 'Industrial Paints',
    isReefer: false,
    isDangerous: false,
    packages: 40,
    grossWeight: 950.0,
    volume: 12.0
  }
];

const cargoNatures: CargoNature[] = [
  { value: 'AD', label: 'Awkward Dangerous' },
  { value: 'AW', label: 'Awkward' },
  { value: 'DG', label: 'Dangerous' },
  { value: 'GC', label: 'General' },
  { value: 'RD', label: 'Reefer Dangerous' },
  { value: 'RF', label: 'Reefer' },
];

// Add package units data
const packageUnits = [
  { code: 'PK', name: 'Package' },
  { code: 'CT', name: 'Carton' },
  { code: 'DR', name: 'Drum' },
  { code: 'BG', name: 'Bag' },
  { code: 'BX', name: 'Box' },
  { code: 'CN', name: 'Container' },
  { code: 'CR', name: 'Crate' },
  { code: 'CY', name: 'Cylinder' },
  { code: 'JR', name: 'Jar' },
  { code: 'PC', name: 'Piece' },
  { code: 'PL', name: 'Pail' },
  { code: 'TK', name: 'Tank' },
  { code: 'UN', name: 'Unit' }
];

// Prefilled DG data for cargo id 5 with multiple DG items
const dgPrefill: DGItem[] = [
  {
    dgSequence: 'DG-001',
    dgPackages: 15,
    packageUnit: 'DR',
    properShippingName: 'Flammable Liquid, N.O.S.',
    imcoClass: '3',
    unNumber: '1993',
    flashPoint: '23°C',
    flashPointUnit: 'C',
    packingGroup: 'II',
    grossWeight: '500',
    grossWeightUnit: 'KG'
  },
  {
    dgSequence: 'DG-002',
    dgPackages: 10,
    packageUnit: 'CT',
    properShippingName: 'Corrosive Liquid, Basic, Organic, N.O.S.',
    imcoClass: '8',
    unNumber: '3267',
    flashPoint: 'N/A',
    flashPointUnit: 'C',
    packingGroup: 'II',
    grossWeight: '300',
    grossWeightUnit: 'KG'
  },
  {
    dgSequence: 'DG-003',
    dgPackages: 5,
    packageUnit: 'BG',
    properShippingName: 'Oxidizing Solid, N.O.S.',
    imcoClass: '5.1',
    unNumber: '1479',
    flashPoint: 'N/A',
    flashPointUnit: 'C',
    packingGroup: 'III',
    grossWeight: '200',
    grossWeightUnit: 'KG'
  }
];

const packingGroups = [
  { value: 'I', label: 'I' },
  { value: 'II', label: 'II' },
  { value: 'III', label: 'III' },
];

// Update temperature units to only C and F
const temperatureUnits = [
  { value: 'C', label: 'Celsius' },
  { value: 'F', label: 'Fahrenheit' },
];

// Add weight units
const weightUnits = [
  { value: 'KG', label: 'Kilograms' },
  { value: 'LB', label: 'Pounds' }
];

interface DGItem {
  dgSequence: string;
  dgPackages: number;
  packageUnit: string;
  properShippingName: string;
  imcoClass: string;
  unNumber: string;
  flashPoint: string;
  flashPointUnit: string;
  packingGroup: string;
  grossWeight: string;
  grossWeightUnit: string;
}

interface CommodityCargo {
  id: number;
  sequence: number;
  container: string;
  description: string;
  cargoNature: string;
  marksNumbers: string;
  fullDescription: string;
  isReefer: boolean;
  isDangerous: boolean;
  reeferTemperature?: string;
  reeferTemperatureUnit?: string;
  packages: number;
  grossWeight: number;
  volume: number;
}

// Add a common style object for both input and system data
const commonTextAreaStyle = {
  p: '8px',
  fontSize: '13px',
  color: 'text.primary',
  height: '200px',
  display: 'flex',
  alignItems: 'flex-start',
  whiteSpace: 'pre',
  fontFamily: 'monospace',
  lineHeight: 1.5,
  overflowY: 'auto',
  width: '40ch',
  overflowX: 'auto',
  tabSize: 2,
  bgcolor: 'grey.100',
  '&::-webkit-scrollbar': {
    width: '8px',
    marginLeft: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px'
  }
};

// Update the TextField styling for Marks & Numbers and Cargo Description
const inputFieldStyle = {
  '& .MuiInputBase-root': {
    ...commonTextAreaStyle,
    padding: 0,
    backgroundColor: 'white',
    '& textarea': {
      ...commonTextAreaStyle,
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },
      '&:focus': {
        backgroundColor: 'white'
      }
    }
  }
};

const CommodityInfo: React.FC = () => {
  // Initialize with the first commodity item
  const [selectedCargo, setSelectedCargo] = useState<CommodityCargo>(sampleCommodities[0]);
  const [cargoNature, setCargoNature] = useState<string>(sampleCommodities[0].cargoNature);
  const [dgItems, setDGItems] = useState<DGItem[]>(sampleCommodities[0].cargoNature === 'DG' ? dgPrefill : []);
  const [selectedDGIndex, setSelectedDGIndex] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Add new state for editable fields
  const [editableMarksNumbers, setEditableMarksNumbers] = useState<string>(sampleCommodities[0].marksNumbers);
  const [editableFullDescription, setEditableFullDescription] = useState<string>(sampleCommodities[0].fullDescription);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const isDangerousOrReefer = ['AD', 'DG', 'RD'].includes(cargoNature);
  const isReefer = ['RD', 'RF'].includes(cargoNature);

  // When user selects a cargo, update cargoNature and DG data if DG
  const handleCargoSelect = (cargo: CommodityCargo) => {
    setSelectedCargo(cargo);
    setCargoNature(cargo.cargoNature);
    setEditableMarksNumbers(cargo.marksNumbers);
    setEditableFullDescription(cargo.fullDescription);
    if (cargo.cargoNature === 'DG') {
      setDGItems(dgPrefill);
      setSelectedDGIndex(0);
    } else {
      setDGItems([]);
      setSelectedDGIndex(0);
    }
  };

  const handleDGItemChange = (index: number, field: keyof DGItem, value: string) => {
    setDGItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleAddDGItem = () => {
    setDGItems([...dgItems, {
      dgSequence: `DG-${String(dgItems.length + 1).padStart(3, '0')}`,
      dgPackages: 0,
      packageUnit: 'PK',
      properShippingName: '',
      imcoClass: '',
      unNumber: '',
      flashPoint: '',
      flashPointUnit: 'C',
      packingGroup: '',
      grossWeight: '',
      grossWeightUnit: 'KG'
    }]);
    setSelectedDGIndex(dgItems.length);
  };

  const handleRemoveDGItem = (index: number) => {
    const newItems = dgItems.filter((_, i) => i !== index);
    setDGItems(newItems);
    setSelectedDGIndex(Math.min(selectedDGIndex, newItems.length - 1));
  };

  // Calculate totals for summary
  const totals = sampleCommodities.reduce((acc, cargo) => ({
    packages: acc.packages + cargo.packages,
    grossWeight: acc.grossWeight + cargo.grossWeight,
    volume: acc.volume + cargo.volume,
  }), { packages: 0, grossWeight: 0, volume: 0 });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCargoChange = (field: keyof CommodityCargo, value: string) => {
    setSelectedCargo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add handlers for Save and Cancel
  const handleSaveClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleCancelClick = () => {
    // Reset form to initial state
    if (selectedCargo) {
      setEditableMarksNumbers(selectedCargo.marksNumbers);
      setEditableFullDescription(selectedCargo.fullDescription);
      setDGItems(dgPrefill);
    }
  };

  const handleConfirmSave = () => {
    // Here you would typically make an API call to save the data
    console.log('Saving changes:', {
      marksNumbers: editableMarksNumbers,
      fullDescription: editableFullDescription,
      dgItems: dgItems
    });
    setOpenConfirmDialog(false);
    // You might want to show a success message here
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box sx={{ pb: 8 }}>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width="5%">Seq.</TableCell>
                  <TableCell width="15%">Container</TableCell>
                  <TableCell width="20%">Description</TableCell>
                  <TableCell width="10%">Cargo Nature</TableCell>
                  <TableCell width="15%" align="right">No. of Package</TableCell>
                  <TableCell width="15%" align="right">Gross Weight (KG)</TableCell>
                  <TableCell width="20%" align="right">Volume (CBM)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleCommodities
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((cargo) => (
                    <TableRow
                      key={cargo.id}
                      hover
                      onClick={() => handleCargoSelect(cargo)}
                      selected={selectedCargo.id === cargo.id}
                      sx={{ 
                        cursor: 'pointer',
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                          },
                        },
                      }}
                    >
                      <TableCell>{cargo.sequence}</TableCell>
                      <TableCell>{cargo.container}</TableCell>
                      <TableCell>{cargo.description}</TableCell>
                      <TableCell>{cargo.cargoNature}</TableCell>
                      <TableCell align="right">{cargo.packages.toLocaleString()}</TableCell>
                      <TableCell align="right">{cargo.grossWeight.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell align="right">{cargo.volume.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</TableCell>
                    </TableRow>
                  ))}
                <TableRow sx={{ '& td': { fontWeight: 'bold', borderTop: '2px solid' } }}>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell align="right">{totals.packages.toLocaleString()}</TableCell>
                  <TableCell align="right">{totals.grossWeight.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell align="right">{totals.volume.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={sampleCommodities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>

        <Grid container item xs={12}>
          <Paper sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cargo Details
            </Typography>
            <Grid container spacing={2}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {/* Cargo Nature */}
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Cargo Nature:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          select
                          value={cargoNature}
                          onChange={(e) => setCargoNature(e.target.value)}
                          size="small"
                        >
                          {cargoNatures.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.value} - {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={3}>
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 1, 
                            bgcolor: 'grey.100',
                            fontSize: '12px',
                            color: 'text.secondary',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {selectedCargo.cargoNature} - {cargoNatures.find(n => n.value === selectedCargo.cargoNature)?.label}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Marks & Numbers */}
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Marks & Numbers:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          multiline
                          rows={8}
                          value={editableMarksNumbers}
                          onChange={(e) => setEditableMarksNumbers(e.target.value)}
                          size="small"
                          sx={inputFieldStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Paper 
                          variant="outlined" 
                          sx={commonTextAreaStyle}
                        >
                          {selectedCargo.marksNumbers}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Cargo Description */}
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Cargo Description:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          multiline
                          rows={8}
                          value={editableFullDescription}
                          onChange={(e) => setEditableFullDescription(e.target.value)}
                          size="small"
                          sx={inputFieldStyle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Paper 
                          variant="outlined" 
                          sx={commonTextAreaStyle}
                        >
                          {selectedCargo.fullDescription}
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {/* Reefer Temperature */}
                  {isReefer && (
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Reefer Temperature:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={8}>
                              <TextField
                                fullWidth
                                type="number"
                                value={selectedCargo.reeferTemperature}
                                onChange={(e) => setSelectedCargo(prev => ({
                                  ...prev,
                                  reeferTemperature: e.target.value
                                }))}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                fullWidth
                                select
                                value={selectedCargo.reeferTemperatureUnit}
                                onChange={(e) => setSelectedCargo(prev => ({
                                  ...prev,
                                  reeferTemperatureUnit: e.target.value
                                }))}
                                size="small"
                              >
                                {temperatureUnits.map((unit) => (
                                  <MenuItem key={unit.value} value={unit.value}>
                                    {unit.value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              {/* DG Section */}
              {isDangerousOrReefer && cargoNature === 'DG' && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                        DG Information
                      </Typography>
                      <Box>
                        <TextField
                          select
                          size="small"
                          value={selectedDGIndex}
                          onChange={e => setSelectedDGIndex(Number(e.target.value))}
                          sx={{ minWidth: 120, mr: 1 }}
                        >
                          {dgItems.map((_, index) => (
                            <MenuItem key={index} value={index}>
                              {index + 1}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Button size="small" onClick={handleAddDGItem} sx={{ mr: 1 }}>
                          Add DG
                        </Button>
                        {dgItems.length > 1 && (
                          <Button size="small" color="error" onClick={() => handleRemoveDGItem(selectedDGIndex)}>
                            Remove
                          </Button>
                        )}
                      </Box>
                    </Box>
                    <Grid container spacing={2}>
                      {/* Left Column */}
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                          {/* DG Sequence */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>DG Sequence:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  fullWidth
                                  value={selectedDGIndex + 1}
                                  InputProps={{ readOnly: true }}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* No. of Package */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>No. of Package:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid container spacing={1}>
                                  <Grid item xs={4}>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      value={dgItems[selectedDGIndex]?.dgPackages || ''}
                                      onChange={(e) => handleDGItemChange(selectedDGIndex, 'dgPackages', e.target.value)}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <TextField
                                      fullWidth
                                      select
                                      value={dgItems[selectedDGIndex]?.packageUnit || 'PK'}
                                      onChange={(e) => handleDGItemChange(selectedDGIndex, 'packageUnit', e.target.value)}
                                      size="small"
                                    >
                                      {packageUnits.map((unit) => (
                                        <MenuItem key={unit.code} value={unit.code}>
                                          {unit.code}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                  <Grid item xs={5}>
                                    <Paper 
                                      variant="outlined" 
                                      sx={{ 
                                        p: 1,
                                        fontSize: '12px',
                                        color: 'text.primary',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      {packageUnits.find(u => u.code === dgItems[selectedDGIndex]?.packageUnit)?.name || 'Package'}
                                    </Paper>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* IMCO Class */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>IMCO Class:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  fullWidth
                                  value={dgItems[selectedDGIndex]?.imcoClass || ''}
                                  onChange={(e) => handleDGItemChange(selectedDGIndex, 'imcoClass', e.target.value)}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* UN Number */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>UN Number:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  fullWidth
                                  value={dgItems[selectedDGIndex]?.unNumber || ''}
                                  onChange={(e) => handleDGItemChange(selectedDGIndex, 'unNumber', e.target.value)}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Right Column */}
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                          {/* Proper Shipping Name */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Proper Shipping Name:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  fullWidth
                                  value={dgItems[selectedDGIndex]?.properShippingName || ''}
                                  onChange={(e) => handleDGItemChange(selectedDGIndex, 'properShippingName', e.target.value)}
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* Gross Weight */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Gross Weight:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid container spacing={1}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      value={dgItems[selectedDGIndex]?.grossWeight || ''}
                                      onChange={(e) => handleDGItemChange(selectedDGIndex, 'grossWeight', e.target.value)}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <TextField
                                      fullWidth
                                      select
                                      value={dgItems[selectedDGIndex]?.grossWeightUnit || 'KG'}
                                      onChange={(e) => handleDGItemChange(selectedDGIndex, 'grossWeightUnit', e.target.value)}
                                      size="small"
                                    >
                                      {weightUnits.map((unit) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                          {unit.value}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* Flash Point */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Flash Point:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid container spacing={1}>
                                  <Grid item xs={8}>
                                    <TextField
                                      fullWidth
                                      type="number"
                                      value={dgItems[selectedDGIndex]?.flashPoint.split('°')[0] || ''}
                                      onChange={(e) => handleDGItemChange(selectedDGIndex, 'flashPoint', e.target.value)}
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <TextField
                                      fullWidth
                                      select
                                      value={dgItems[selectedDGIndex]?.flashPointUnit || 'C'}
                                      onChange={(e) => handleDGItemChange(selectedDGIndex, 'flashPointUnit', e.target.value)}
                                      size="small"
                                    >
                                      {temperatureUnits.map((unit) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                          {unit.value}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          {/* Packing Group */}
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <Typography sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>Packing Group:</Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <TextField
                                  fullWidth
                                  select
                                  value={dgItems[selectedDGIndex]?.packingGroup || ''}
                                  onChange={(e) => handleDGItemChange(selectedDGIndex, 'packingGroup', e.target.value)}
                                  size="small"
                                >
                                  {packingGroups.map(pg => (
                                    <MenuItem key={pg.value} value={pg.value}>
                                      {pg.value} - {pg.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
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

export default CommodityInfo; 