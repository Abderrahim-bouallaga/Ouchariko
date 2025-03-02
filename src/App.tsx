import React from 'react';
import PdfViewer from './components/PdfViewer';
import RecommendationForm from './components/RecommendationForm';

const App: React.FC = () => {
  const pdfUrl = '/pdfs/sample.pdf'; // Change this to your PDF file path

  return (
    <div className="App">
      <h1>Ouchariko - PDF Viewer</h1>
      <PdfViewer pdfUrl={pdfUrl} />
      <RecommendationForm pdfId="1" /> {/* Use a unique ID for each PDF */}
    </div>
  );
};

export default App;