import React, { useEffect, useState } from "react";

interface Entry {
  value: string;
  confidence?: number;
}

interface DataObject {
  [key: string]: Entry[];
}

interface Props {
  jsonUrl: string;
}

const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const IDAnalysisResult: React.FC<Props> = ({ jsonUrl }) => {
  const [data, setData] = useState<DataObject | null>(null);

  useEffect(() => {
    fetch(jsonUrl)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error("Failed to load JSON", err));
  }, [jsonUrl]);

  if (!data) return <p className="text-center mt-4">Loading data...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">ID Analysis Output</h1>
      <div className="overflow-auto border rounded-lg shadow">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Attribute</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, entries]) => {
              const entry = entries[0];
              return (
                <tr key={key} className="border-t">
                  <td className="px-4 py-2 font-medium">{formatKey(key)}</td>
                  <td className="px-4 py-2">{entry?.value || "—"}</td>
                  <td className="px-4 py-2">
                    {entry?.confidence != null
                      ? (entry.confidence * 100).toFixed(1) + "%"
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IDAnalysisResult;

