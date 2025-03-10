import React, { useState, useEffect } from 'react';
import PdfViewer from './components/PdfViewer';
import RecommendationForm from './components/RecommendationForm';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string>('sample1.pdf');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  const pdfOptions = [
    { value: 'sample1.pdf', label: 'Sample PDF 1' },
    { value: 'sample2.pdf', label: 'Sample PDF 2' },
    { value: 'sample3.pdf', label: 'Sample PDF 3' },
  ];

  const handlePdfChange = (event: SelectChangeEvent<string>) => {
    setSelectedPdf(event.target.value);
  };

  // Fetch recommendations from backend
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('https://192.168.1.1:5000/api/recommendations');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="app-container">
      {/* Header Section */}
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Plateforme de Recommendations du CESE</h1>
      </div>

      {/* Dropdown Selection */}
      <div className="dropdown-container">
        <FormControl fullWidth>
          <InputLabel id="pdf-select-label">Select PDF</InputLabel>
          <Select labelId="pdf-select-label" value={selectedPdf} onChange={handlePdfChange}>
            {pdfOptions.map((pdf) => (
              <MenuItem key={pdf.value} value={pdf.value}>
                {pdf.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* PDF Viewer */}
      <div className="pdf-viewer-container">
        <PdfViewer pdfUrl={`/pdfs/${selectedPdf}`} />
      </div>

      {/* Recommendation Form */}
      <RecommendationForm pdfId={selectedPdf} />

      {/* Button to Toggle Recommendations */}
      <Button
        variant="contained"
        color="success"
        onClick={() => setShowTable(!showTable)}
        style={{ marginTop: '20px' }}
      >
        {showTable ? 'Hide Recommendations' : 'Show Recommendations'}
      </Button>

      {/*  Recommendation Table */}
      {showTable && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>PDF ID</strong></TableCell>
                <TableCell><strong>Page</strong></TableCell>
                <TableCell><strong>Recommendation</strong></TableCell>
                <TableCell><strong>Tags</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.map((rec, index) => (
                <TableRow key={index}>
                  <TableCell>{rec.PdfId}</TableCell>
                  <TableCell>{rec.Page}</TableCell>
                  <TableCell>{rec.Comment}</TableCell>
                  <TableCell>{rec.Tags}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default App;
