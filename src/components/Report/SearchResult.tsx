import React, { useEffect, useState } from "react";

interface SearchResultProps {
  query: string;
}

interface CountryPerformance {
  country: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
  const [data, setData] = useState<CountryPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://mocki.io/v1/090bd3c7-9197-4fb1-97cd-3deef4de47ff");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();

        // Normalize to an array
        const arr: any[] = Array.isArray(result)
          ? result
          : Array.isArray(result.performances)
          ? result.performances
          : [];

        // Filter out any malformed items
        const clean = arr.filter(item =>
          typeof item.country === "string" &&
          typeof item.sport === "string" &&
          typeof item.gold === "number" &&
          typeof item.silver === "number" &&
          typeof item.bronze === "number"
        );

        setData(clean);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const q = query.toLowerCase();

  return (
    <div className="mt-4 text-center">
      <h2 className="text-lg font-semibold mb-4">Results for: "{query}"</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Country</th>
                <th className="px-4 py-2 border">Sport</th>
                <th className="px-4 py-2 border">Gold</th>
                <th className="px-4 py-2 border">Silver</th>
                <th className="px-4 py-2 border">Bronze</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(item =>
                  item.country.toLowerCase().includes(q) ||
                  item.sport.toLowerCase().includes(q)
                )
                .map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{item.country}</td>
                    <td className="px-4 py-2 border">{item.sport}</td>
                    <td className="px-4 py-2 border">{item.gold}</td>
                    <td className="px-4 py-2 border">{item.silver}</td>
                    <td className="px-4 py-2 border">{item.bronze}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
