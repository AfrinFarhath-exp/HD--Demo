export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isLoading?: boolean;
};

export type Conversation = {
  id: string;
  messages: Message[];
  title?: string;
};

export type IdocIssue = {
  id: string;
  title: string;
  description: string;
  solution: string;
};

export type SuggestedQuestion = {
  id: string;
  text: string;
  type: "idoc" | "general";
};

export type ReportType = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type CountryPerformance = {
  country: string;
  metrics: {
    orders: number;
    revenue: number;
    returns: number;
    conversion: number;
    avgOrderValue: number;
  };
};

export type ReportData = {
  dateRange: DateRange;
  countries: CountryPerformance[];
};

export type MarkdownTypewriterProps = {
  text: string;
  speed: number;
};