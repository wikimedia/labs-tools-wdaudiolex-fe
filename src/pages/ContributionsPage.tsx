import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button,
  Link
} from "@mui/material";
import { userApi } from "../services/api";

interface Contribution {
  id: string;
  timestamp: string;
  lexemeId: string;
  lexemeName: string;
  audioId: string;
  audioName: string;
  variety?: string;
}

const ContributionsPage: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the backend API
      // const response = await userApi.getContributions();
      // setContributions(response.data);
      
      // Mock data for demonstration purposes
      setTimeout(() => {
        const mockContributions: Contribution[] = [
          {
            id: "c12345",
            timestamp: "2023-05-15T14:22:31Z",
            lexemeId: "L123456",
            lexemeName: "example",
            audioId: "File:en-us-example.ogg",
            audioName: "en-us-example.ogg",
            variety: "General American"
          },
          {
            id: "c12346",
            timestamp: "2023-05-14T09:12:45Z",
            lexemeId: "L789012",
            lexemeName: "test",
            audioId: "File:en-us-test.ogg",
            audioName: "en-us-test.ogg"
          },
          {
            id: "c12347",
            timestamp: "2023-05-10T16:55:22Z",
            lexemeId: "L987654",
            lexemeName: "démonstration",
            audioId: "File:fr-demonstration.ogg",
            audioName: "fr-demonstration.ogg",
            variety: "Standard"
          }
        ];
        
        setContributions(mockContributions);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load contributions. Please try again later.");
      setLoading(false);
    }
  };

  // Format date string
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Contributions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View a history of your pronunciation audio additions to lexemes.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : contributions.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No Contributions Yet
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You haven't added any pronunciation audio statements yet.
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Start Contributing
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Lexeme</TableCell>
                <TableCell>Audio File</TableCell>
                <TableCell>Variety</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell>{formatDate(contribution.timestamp)}</TableCell>
                  <TableCell>
                    <Link 
                      href={`https://www.wikidata.org/wiki/Lexeme:${contribution.lexemeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contribution.lexemeName} ({contribution.lexemeId})
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link 
                      href={`https://commons.wikimedia.org/wiki/${contribution.audioId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contribution.audioName}
                    </Link>
                  </TableCell>
                  <TableCell>{contribution.variety || "Not specified"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ContributionsPage; 