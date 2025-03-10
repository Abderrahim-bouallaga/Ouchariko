import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface RecommendationFormProps {
  pdfId: string;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ pdfId }) => {
  const [page, setPage] = useState<number>(1); // Only keeping the page number input

  return (
    <form>
      {/* Page Number Input */}
      <TextField
        type="number"
        label="Page Number"
        value={page === 0 ? "" : page}
        onChange={(e) => {
          const value = e.target.value;
          setPage(value === "" ? 0 : Number(value));
        }}
        fullWidth
        margin="normal"
      />
    </form>
  );
};

export default RecommendationForm;
