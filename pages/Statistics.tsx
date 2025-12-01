import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MOCK_BODY_DATA } from '../constants';
import { getHealthAnalysis } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

export const Statistics: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await getHealthAnalysis(MOCK_BODY_DATA);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-xl font-bold text-gray-800 mb-6">体测数据中心</h2>

      {/* Weight Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700">体重趋势 (kg)</h3>
          <span className="text-xs text-[#32CD32] font-medium">本月减重 2.5kg</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_BODY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#32CD32" 
                strokeWidth={3} 
                dot={{r: 4, fill: '#32CD32', strokeWidth: 2, stroke: '#fff'}} 
                activeDot={{r: 6}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Body Fat Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">体脂率 (%)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_BODY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="bodyFat" 
                stroke="#FF6347" 
                strokeWidth={3} 
                dot={{r: 4, fill: '#FF6347', strokeWidth: 2, stroke: '#fff'}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-indigo-900 flex items-center">
            <Sparkles size={18} className="mr-2 text-indigo-500" />
            AI 智能教练分析
          </h3>
          {!analysis && (
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-full shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? '分析中...' : '生成分析报告'}
            </button>
          )}
        </div>

        {analysis ? (
          <div className="text-sm text-indigo-800 leading-relaxed animate-fade-in whitespace-pre-wrap">
            {analysis}
          </div>
        ) : (
          <p className="text-xs text-indigo-400">
            点击生成按钮，获取基于近期数据的个性化训练与饮食建议。
          </p>
        )}
      </div>
    </div>
  );
};