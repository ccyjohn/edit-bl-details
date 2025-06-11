import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Tabs, 
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ThailandInfo from './components/ThailandInfo';
import PartyInfo from './components/PartyInfo';
import CommodityInfo from './components/CommodityInfo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bl-tabpanel-${index}`}
      aria-labelledby={`bl-tab-${index}`}
      style={{ height: 'calc(100vh - 180px)' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        height: '100vh',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        aspectRatio: '16/9',
        maxWidth: '100vw !important'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ flexShrink: 0 }}>
        Edit B/L Details - #4054616120
      </Typography>
      
      <Paper 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            aria-label="B/L details tabs"
          >
            <Tab label="Thailand Information" />
            <Tab label="Party Information" />
            <Tab label="Commodity Information" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <ThailandInfo />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <PartyInfo />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <CommodityInfo />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default App; 