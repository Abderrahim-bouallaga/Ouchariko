import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface RecommendationFormProps {
  pdfId: string;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ pdfId }) => {
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { pdfId, comment, tags, page });
    // Add your API call here
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Recommendation"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Tags (séparés par des virgules)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Page Number"
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default RecommendationForm;