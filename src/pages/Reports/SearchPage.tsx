import React, { useEffect, useState } from "react";

interface SearchResultProps {
  query: string;
}

interface Country {
  id: number;
  name: string;
}

interface Sport {
  id: number;
  name: string;
}

interface RawPerformance {
  id: number;
  countryId: number;
  sportId: number;
  gold: number;
  silver: number;
  bronze: number;
}

interface ApiResponse {
  countries: Country[];
  sports: Sport[];
  performances: RawPerformance[];
}

interface CountryPerformance {
  country: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
}

const SearchPage: React.FC<SearchResultProps> = ({ query }) => {
  const [data, setData] = useState<CountryPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mocki.io/v1/090bd3c7-9197-4fb1-97cd-3deef4de47ff"
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: ApiResponse = await res.json();

        // Build lookup maps
        const countryMap = new Map<number, string>(
          result.countries.map((c) => [c.id, c.name])
        );
        const sportMap = new Map<number, string>(
          result.sports.map((s) => [s.id, s.name])
        );

        // Enrich performances
        const enriched: CountryPerformance[] = result.performances.map((p) => ({
          country: countryMap.get(p.countryId) || "Unknown country",
          sport: sportMap.get(p.sportId) || "Unknown sport",
          gold: p.gold,
          silver: p.silver,
          bronze: p.bronze,
        }));

        setData(enriched);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const q = query.trim().toLowerCase();

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
                .filter((item) =>
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

export default SearchPage;
