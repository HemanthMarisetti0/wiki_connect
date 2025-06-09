export interface WikipediaResult {
  title: string;
  snippet: string;
  pageid: number;
}

export const fetchWikipediaResults = async (query: string): Promise<WikipediaResult[]> => {
  if (!query.trim()) return [];
  
  const res = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Wikipedia results");
  }

  const data = await res.json();
  return data.query.search;
};

