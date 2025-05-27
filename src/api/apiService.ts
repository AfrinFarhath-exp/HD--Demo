import axios from "axios";

// Configure axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

interface AgentQueryRequest {
  query: string;
  session_id: string;
}

interface AgentQueryResponse {
  session_id: string;
  steps: any[];
  final_output: string;
}

export const queryAgent = async (query: string, sessionId: string): Promise<string> => {
  try {
    const response = await apiClient.post<AgentQueryResponse>("/ai_agent_query", {
      query,
      session_id: sessionId,
    } as AgentQueryRequest);

    return response.data.final_output;
  } catch (error) {
    console.error("API request failed:", query);
    throw error;
  }
};
