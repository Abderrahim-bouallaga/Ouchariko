import React, { useState } from 'react';
import PdfViewer from './components/PdfViewer';
import RecommendationForm from './components/RecommendationForm';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string>('sample1.pdf');

  const pdfOptions = [
    { value: 'sample1.pdf', label: 'Sample PDF 1' },
    { value: 'sample2.pdf', label: 'Sample PDF 2' },
    { value: 'sample3.pdf', label: 'Sample PDF 3' },
  ];

  const handlePdfChange = (event: SelectChangeEvent<string>) => {
    setSelectedPdf(event.target.value);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" /> {/* Add the logo here */}
        <h1 className="title">Platforme de Recommendations du CESE</h1>
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
    </div>
  );
};

export default App;
