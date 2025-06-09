import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
  Box,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";


import { fetchWikipediaResults } from "./api/api";
import SearchResults from "./SearchResults";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

function Wikipedia() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const {
    data: results,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wikipedia", debouncedSearchTerm],
    queryFn: () => fetchWikipediaResults(debouncedSearchTerm),
    enabled: debouncedSearchTerm.trim().length > 0,
  });

  const clearSearch = () => setSearchTerm("");

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" textAlign="center" gutterBottom fontWeight="bold">
        Wikipedia Search (React Query + MUI)
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          gap: 1,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        onSubmit={(e) => e.preventDefault()} // prevent form submit on Enter
      >
        <TextField
          label="Search Wikipedia"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: 600 }}
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            refetch();
          }}
          disabled={!searchTerm.trim()}
          startIcon={<SearchIcon />}
          sx={{ whiteSpace: "nowrap", height: 40 }}
        >
          Search
        </Button>
      </Box>

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
            No results found for "{debouncedSearchTerm}"
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
  );
}

export default Wikipedia;
