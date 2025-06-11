import React from 'react';
import { Box, Button } from '@mui/material';

interface DockedButtonPaneProps {
  onSave: () => void;
  onCancel: () => void;
}

const DockedButtonPane: React.FC<DockedButtonPaneProps> = ({ onSave, onCancel }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        p: 2,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        zIndex: 1000,
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Button
        variant="outlined"
        color="inherit"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onSave}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default DockedButtonPane; 