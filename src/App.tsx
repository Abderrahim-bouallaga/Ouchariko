import React, { useState } from 'react';
import PdfViewer from './components/PdfViewer';
import RecommendationForm from './components/RecommendationForm';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const App: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string>('sample1.pdf'); // Default PDF
  const pdfOptions = [
    { value: 'sample1.pdf', label: 'Sample PDF 1' },
    { value: 'sample2.pdf', label: 'Sample PDF 2' },
    { value: 'sample3.pdf', label: 'Sample PDF 3' },
  ];

  const handlePdfChange = (event: SelectChangeEvent<string>) => {
    setSelectedPdf(event.target.value);
  };

  return (
    <div className="App">
      <h1>Ouchariko - PDF Viewer</h1>
      <FormControl fullWidth margin="normal">
        <InputLabel id="pdf-select-label">Select PDF</InputLabel>
        <Select
          labelId="pdf-select-label"
          value={selectedPdf}
          onChange={handlePdfChange}
        >
          {pdfOptions.map((pdf) => (
            <MenuItem key={pdf.value} value={pdf.value}>
              {pdf.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PdfViewer pdfUrl={`/pdfs/${selectedPdf}`} />
      <RecommendationForm pdfId="1" /> {/* Use a unique ID for each PDF */}
    </div>
  );
};

export default App;
