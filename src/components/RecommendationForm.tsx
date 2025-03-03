import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

interface RecommendationFormProps {
  pdfId: string; // Define the pdfId prop
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ pdfId }) => {
  const [comment, setComment] = useState<string>(''); // State for the comment
  const [tags, setTags] = useState<string>(''); // State for the tags
  const [page, setPage] = useState<number>(1); // State for the page number

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the data to be sent to the backend
    const recommendationData = {
      pdfId,
      comment,
      tags,
      page,
    };

    try {
      // Make the API call to submit the recommendation
      const response = await axios.post('http://localhost:5000/api/recommendations', recommendationData);
      console.log('Recommendation submitted successfully:', response.data);
      
      // Reset the form fields after submission
      setComment('');
      setTags('');
      setPage(1);
    } catch (error) {
      console.error('Error submitting recommendation:', error);
    }
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
        label="Tags (separated by commas)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Page Number"
        value={page}
        onChange={(e) => setPage(e.target.value)}
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
