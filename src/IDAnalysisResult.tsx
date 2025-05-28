import React, { useEffect, useState } from "react";

interface Entry {
  value: string;
  confidence?: number;
}

interface DataObject {
  [key: string]: Entry[];
}

interface Warning {
  code: string;
  description: string;
  severity: string;
  confidence: number;
  decision: string;
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
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [decision, setDecision] = useState<string | null>(null);
  const [reviewScore, setReviewScore] = useState<number | null>(null);
  const [rejectScore, setRejectScore] = useState<number | null>(null);

  useEffect(() => {
    fetch(jsonUrl)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setWarnings(json.warning || []);
        setDecision(json.decision || null);
        setReviewScore(json.reviewScore);
        setRejectScore(json.rejectScore);
      })
      .catch((err) => console.error("Failed to load JSON", err));
  }, [jsonUrl]);

  if (!data) return <p className="text-center mt-4">Loading data...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">ID Analysis Summary</h1>

      {/* Final Decision */}
      <div className="mb-6 p-4 border rounded-lg shadow bg-gray-50 text-center">
        <p className="text-lg font-medium">
          Final Decision:{" "}
          <span
            className={`font-bold ${
              decision === "accept" ? "text-green-600" : "text-red-600"
            }`}
          >
            {decision?.toUpperCase()}
          </span>
        </p>
        <p className="text-sm mt-1 text-gray-700">
          Review Score: {reviewScore} | Reject Score: {rejectScore}
        </p>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mb-6 border rounded-lg shadow bg-yellow-50 p-4">
          <h2 className="text-xl font-semibold mb-2 text-yellow-700">Warnings</h2>
          <ul className="space-y-2">
            {warnings.map((w, index) => (
              <li key={index} className="border-b pb-2">
                <p>
                  <strong className="text-gray-800">{w.code}</strong>: {w.description}
                </p>
                <p className="text-sm text-gray-600">
                  Severity: <strong>{w.severity}</strong> | Confidence:{" "}
                  {(w.confidence * 100).toFixed(1)}% | Decision: {w.decision}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Confidence Table */}
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
