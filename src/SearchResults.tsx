import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Box,
} from "@mui/material";

interface Result {
  title: string;
  snippet: string;
  pageid: number;
}

interface Props {
  results: Result[];
}

const SearchResults: React.FC<Props> = ({ results }) => {
  return (
    <Box mt={4}>
      {results.map((result) => (
        <Card key={result.pageid} sx={{ mb: 2 }}>
          <CardContent>
            <Link
              href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              target="_blank"
              rel="noopener"
              underline="hover"
            >
              <Typography variant="h6" color="primary">
                {result.title}
              </Typography>
            </Link>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: result.snippet }}
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SearchResults;
