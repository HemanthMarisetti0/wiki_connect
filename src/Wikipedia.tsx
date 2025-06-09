import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  TextField,
  IconButton,
  Box,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { fetchWikipediaResults } from "./api/api";
import SearchResults from "./SearchResults";

function Wikipedia() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wikipedia", debouncedTerm],
    queryFn: () => fetchWikipediaResults(debouncedTerm),
    enabled: !!debouncedTerm,
  });

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedTerm("");
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            label="Search Wikipedia"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={clearSearch}
                  aria-label="clear search"
                  edge="end"
                  size="small"
                  disabled={!searchTerm.trim()}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Typography variant="h4" textAlign="center" gutterBottom fontWeight="bold">
          Wikipedia Search Results
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress size={36} />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ mt: 4 }}>
            Failed to fetch results. Please try again.
          </Alert>
        )}

        {!isLoading && !isError && results && results.length === 0 && (
          <Fade in timeout={500}>
            <Typography variant="h6" color="text.secondary" textAlign="center" mt={6}>
              No results found for "{debouncedTerm}"
            </Typography>
          </Fade>
        )}

        {!isLoading && !isError && results && results.length > 0 && (
          <>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              mt={2}
              mb={1}
              textAlign="center"
            >
              {results.length} result{results.length > 1 ? "s" : ""} found
            </Typography>
            <Fade in timeout={500}>
              <Box>
                <SearchResults results={results} />
              </Box>
            </Fade>
          </>
        )}
      </Container>

      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          py: 1.5,
          textAlign: "center",
          color: "text.secondary",
          fontSize: "0.875rem",
          userSelect: "none",
          zIndex: 1300,
        }}
      >
        Developed by Hemanth
      </Box>
    </>
  );
}

export default Wikipedia;
