interface AzureSearchResponse {
  results: AzureSearchResult[];
  error?: string;
  session_id?: string;
  steps?: [];
  final_output?: string;
}

interface AzureSearchResult {
  id?: string;
  fileName?: string;
  startDate: string;
  endDate: string;
  country: string;
  content?: string;
  searchScore?: number;
  metrics?: Array<{ name: string; value: string }>;
}

export const azureSearchService = {
  apiEndpoint:
    "http://localhost:8000/ai_agent_query",

  async searchReports(
    query: string,
    session_id: string
  ): Promise<AzureSearchResponse> {
    try {
      
      const requestBody = {
        query: query,
        session_id: session_id,
      };

      console.log("Sending search request:", requestBody);

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API error response:", errorData);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Raw API response:", data);

      if (data.final_output !== undefined) {
        console.log("Detected response with final_output field");
        return {
          results: this.processSearchResults(data),
          session_id: data.session_id,
          steps: data.steps || [],
          final_output: data.final_output,
        };
      }

      const processedResults = this.processSearchResults(data);

      console.log("Processed results:", processedResults);

      return { results: processedResults };
    } catch (error) {
      console.error("Azure Search API error:", error);
      return {
        results: [],
        error:
          "I'm having trouble connecting to the search service. Please try again later.",
      };
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processSearchResults(data: any): AzureSearchResult[] {
    if (!data) {
      console.error("No data received from API");
      return [];
    }

    // Handle the specific response format with final_output
    if (data.final_output !== undefined) {
      console.log("Detected response with final_output field");

      return [
        {
          id: `result-${Math.random().toString(36).substr(2, 9)}`,
          fileName: "API Response",
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          country: "Global",
          content: data.final_output || "No content available",
          searchScore: 1.0,
          metrics: [],
        },
      ];
    }

    let items = [];

    if (data.value && Array.isArray(data.value)) {
      items = data.value;
    } else if (Array.isArray(data)) {
      items = data;
    } else if (typeof data === "object") {
      if (data.results && Array.isArray(data.results)) {
        items = data.results;
      } else {
        items = [data];
      }
    }

    if (items.length === 0) {
      console.warn("No items found in response data");
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((item: any) => ({
      id: item.id || `result-${Math.random().toString(36).substr(2, 9)}`,
      fileName: item.fileName || item.file_name || "Untitled Report",
      startDate:
        item.startDate ||
        item.start_date ||
        new Date().toISOString().split("T")[0],
      endDate:
        item.endDate || item.end_date || new Date().toISOString().split("T")[0],
      country: item.country || "Global",
      content: item.content || item.text || "No content available",
      searchScore: item.searchScore || item.search_score || 1.0,
      metrics: item.metrics || [],
    }));
  },
};
