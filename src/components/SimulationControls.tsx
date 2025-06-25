import React, { useState } from 'react';
import { Settings, Save, Upload, Download, RefreshCw } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({ isRunning, onToggle, onReset }) => {
  const [scenario, setScenario] = useState('default');
  const [learningRate, setLearningRate] = useState(0.001);
  const [explorationRate, setExplorationRate] = useState(0.1);

  const scenarios = [
    { id: 'default', name: 'Default Network' },
    { id: 'enterprise', name: 'Enterprise Environment' },
    { id: 'iot', name: 'IoT Network' },
    { id: 'cloud', name: 'Cloud Infrastructure' },
    { id: 'custom', name: 'Custom Scenario' }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">Simulation Controls</h3>
      </div>

      <div className="space-y-6">
        {/* Scenario Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Training Scenario
          </label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          >
            {scenarios.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Learning Parameters */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white">Learning Parameters</h4>
          
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Learning Rate: {learningRate}
            </label>
            <input
              type="range"
              min="0.0001"
              max="0.01"
              step="0.0001"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Exploration Rate: {explorationRate}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={explorationRate}
              onChange={(e) => setExplorationRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Training Status */}
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Training Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className={isRunning ? 'text-green-400' : 'text-red-400'}>
                {isRunning ? 'Running' : 'Stopped'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Model:</span>
              <span className="text-slate-300">Multi-Agent PPO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Environment:</span>
              <span className="text-slate-300">Cyber Range v2.1</span>
            </div>
          </div>
        </div>

        {/* Model Management */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Model Management</h4>
          
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors">
            <Save className="h-4 w-4" />
            <span>Save Model</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors">
            <Upload className="h-4 w-4" />
            <span>Load Model</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Training Data</span>
          </button>

          <button 
            onClick={onReset}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset Training</span>
          </button>
        </div>

        {/* AutoML Configuration */}
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-white mb-3">AutoML Settings</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-cyan-400 focus:ring-cyan-400" />
              <span className="text-sm text-slate-300">Auto-tune hyperparameters</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-cyan-400 focus:ring-cyan-400" />
              <span className="text-sm text-slate-300">Dynamic reward shaping</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded bg-slate-700 border-slate-600 text-cyan-400 focus:ring-cyan-400" />
              <span className="text-sm text-slate-300">Adaptive exploration</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;