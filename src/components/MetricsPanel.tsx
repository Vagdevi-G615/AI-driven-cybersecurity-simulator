import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Clock } from 'lucide-react';

interface SimulationState {
  isRunning: boolean;
  currentEpisode: number;
  totalThreats: number;
  threatsBlocked: number;
  activeAgents: number;
  networkHealth: number;
}

interface MetricsPanelProps {
  simulationState: SimulationState;
  isRunning: boolean;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ simulationState, isRunning }) => {
  const [metrics, setMetrics] = useState({
    avgResponseTime: 0.45,
    throughput: 1250,
    falsePositives: 3.2,
    learningProgress: 78.5
  });

  const [chartData, setChartData] = useState<number[]>(
    Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
  );

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          avgResponseTime: Math.max(0.1, prev.avgResponseTime + (Math.random() - 0.5) * 0.1),
          throughput: Math.max(500, prev.throughput + (Math.random() - 0.5) * 100),
          falsePositives: Math.max(0, prev.falsePositives + (Math.random() - 0.5) * 0.5),
          learningProgress: Math.min(100, Math.max(0, prev.learningProgress + (Math.random() - 0.4) * 2))
        }));

        setChartData(prev => [...prev.slice(1), Math.floor(Math.random() * 100)]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const successRate = simulationState.totalThreats > 0 
    ? (simulationState.threatsBlocked / simulationState.totalThreats * 100)
    : 0;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Performance Metrics</h3>
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-400" />
          <span className="text-sm text-slate-400">Real-time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-slate-400">Avg Response</span>
          </div>
          <p className="text-xl font-bold text-blue-400">{metrics.avgResponseTime.toFixed(2)}s</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-sm text-slate-400">Throughput</span>
          </div>
          <p className="text-xl font-bold text-green-400">{metrics.throughput.toLocaleString()}/s</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-slate-400">False Positive</span>
          </div>
          <p className="text-xl font-bold text-yellow-400">{metrics.falsePositives.toFixed(1)}%</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-slate-400">Learning</span>
          </div>
          <p className="text-xl font-bold text-purple-400">{metrics.learningProgress.toFixed(1)}%</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-4">Detection Accuracy Over Time</h4>
        <div className="flex items-end justify-between h-32 space-x-1">
          {chartData.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t transition-all duration-300 hover:from-cyan-500 hover:to-cyan-300"
              style={{ 
                height: `${value}%`,
                width: '100%',
                maxWidth: '20px'
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>-20m</span>
          <span>-10m</span>
          <span>Now</span>
        </div>
      </div>

      {/* Agent Learning Progress */}
      <div className="mt-6 bg-slate-900/50 border border-slate-600 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-4">Multi-Agent Learning Progress</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">Defender Agents</span>
              <span className="text-blue-400">{metrics.learningProgress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.learningProgress}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">Attacker Agents</span>
              <span className="text-red-400">{(metrics.learningProgress * 0.85).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.learningProgress * 0.85}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;