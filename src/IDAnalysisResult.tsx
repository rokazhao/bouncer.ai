import React from 'react';

interface IDAnalysisResultProps {
  result: {
    data?: {
      [key: string]: {
        value: string;
        confidence?: number;
      }[];
    };
    warning?: Array<{
      code: string;
      description: string;
      severity: string;
      confidence: number;
      decision: string;
    }>;
    decision?: string;
    reviewScore?: number;
    rejectScore?: number;
    'email summary'?: string;
  };
  onBack: () => void;
}

const IDAnalysisResult: React.FC<IDAnalysisResultProps> = ({ result, onBack }) => {
  const formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 border-b-4 border-blue-600 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl md:text-4xl font-normal text-gray-800 government-serif">
            Verification Results
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200"
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          ← Back to Upload
        </button>

        {/* Final Decision */}
        <div className="mb-6 p-4 border rounded-lg shadow bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Verification Decision</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg">
                Status:{' '}
                <span className={`font-bold ${
                  result.decision === 'accept' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.decision?.toUpperCase() || 'UNDETERMINED'}
                </span>
              </p>
              {result.reviewScore !== undefined && (
                <p className="text-sm text-gray-600">
                  Review Score: {result.reviewScore}
                </p>
              )}
              {result.rejectScore !== undefined && (
                <p className="text-sm text-gray-600">
                  Reject Score: {result.rejectScore}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Warnings Section */}
        {result.warning && result.warning.length > 0 && (
          <div className="mb-6 border rounded-lg shadow bg-yellow-50 p-4">
            <h2 className="text-xl font-semibold mb-2 text-yellow-700">Warnings</h2>
            <ul className="space-y-2">
              {result.warning.map((warning, index) => (
                <li key={index} className="border-b pb-2 last:border-b-0">
                  <p className="font-medium text-gray-800">{warning.code}</p>
                  <p className="text-gray-600">{warning.description}</p>
                  <p className="text-sm text-gray-500">
                    Severity: {warning.severity} | Confidence: {(warning.confidence * 100).toFixed(1)}% | Decision: {warning.decision}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Data Fields */}
        {result.data && (
          <div className="mb-6 border rounded-lg shadow overflow-hidden">
            <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">Document Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Field</th>
                    <th className="px-4 py-2 text-left">Value</th>
                    <th className="px-4 py-2 text-left">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(result.data).map(([key, entries]) => {
                    const entry = entries[0];
                    return (
                      <tr key={key} className="border-t">
                        <td className="px-4 py-2 font-medium">{formatKey(key)}</td>
                        <td className="px-4 py-2">{entry?.value || '—'}</td>
                        <td className="px-4 py-2">
                          {entry?.confidence !== undefined
                            ? `${(entry.confidence * 100).toFixed(1)}%`
                            : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Email Summary */}
        {result['email summary'] && (
          <div className="mb-6 border rounded-lg shadow bg-blue-50 p-4">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">Analysis Summary</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{result['email summary']}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IDAnalysisResult;
