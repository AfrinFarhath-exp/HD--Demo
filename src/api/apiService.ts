import axios from "axios";
import type { SearchResult } from "../types";

// Configure axios instance
const apiClient = axios.create({
  baseURL: "https://hd-dddrdnc2amfvdrcw.eastasia-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

interface SearchRequest {
  query: string;
  top_k: number;
}

export const searchSupport = async (query: string, top_k: number = 2): Promise<SearchResult[]> => {
  try {
    const response = await apiClient.post<SearchResult[]>("/Support_search", {
      query,
      top_k,
    } as SearchRequest);
    return response.data;
  } catch (error) {
    console.error("User prompt sent to API but failed:", query);
    console.error("Error fetching response:", error);
    throw error; // Let the caller handle the error
  }
};