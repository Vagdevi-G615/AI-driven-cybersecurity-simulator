import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, Users, Target, Zap, Play, Pause, RotateCcw } from 'lucide-react';
import NetworkTopology from './NetworkTopology';
import ThreatIntelligence from './ThreatIntelligence';
import AgentMonitor from './AgentMonitor';
import AttackVisualization from './AttackVisualization';
import MetricsPanel from './MetricsPanel';
import SimulationControls from './SimulationControls';

interface SimulationState {
  isRunning: boolean;
  currentEpisode: number;
  totalThreats: number;
  threatsBlocked: number;
  activeAgents: number;
  networkHealth: number;
}

const Dashboard: React.FC = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    currentEpisode: 0,
    totalThreats: 0,
    threatsBlocked: 0,
    activeAgents: 8,
    networkHealth: 98.5
  });

  const [threats, setThreats] = useState([
    { id: 1, type: 'DDoS', severity: 'high', status: 'blocked', timestamp: '10:23:45' },
    { id: 2, type: 'Phishing', severity: 'medium', status: 'detected', timestamp: '10:21:32' },
    { id: 3, type: 'Malware', severity: 'critical', status: 'investigating', timestamp: '10:19:18' },
  ]);

  useEffect(() => {
    if (simulationState.isRunning) {
      const interval = setInterval(() => {
        setSimulationState(prev => ({
          ...prev,
          currentEpisode: prev.currentEpisode + 1,
          totalThreats: prev.totalThreats + Math.floor(Math.random() * 3),
          threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 2),
          networkHealth: Math.max(85, prev.networkHealth + (Math.random() - 0.5) * 2)
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [simulationState.isRunning]);

  const toggleSimulation = () => {
    setSimulationState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetSimulation = () => {
    setSimulationState({
      isRunning: false,
      currentEpisode: 0,
      totalThreats: 0,
      threatsBlocked: 0,
      activeAgents: 8,
      networkHealth: 98.5
    });
  };

  const successRate = simulationState.totalThreats > 0 
    ? (simulationState.threatsBlocked / simulationState.totalThreats * 100).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AutoSec Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSimulation}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                simulationState.isRunning
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {simulationState.isRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Stop Simulation</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start Simulation</span>
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Network Health</p>
                <p className="text-2xl font-bold text-green-400">{simulationState.networkHealth.toFixed(1)}%</p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Agents</p>
                <p className="text-2xl font-bold text-blue-400">{simulationState.activeAgents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Threats Detected</p>
                <p className="text-2xl font-bold text-orange-400">{simulationState.totalThreats}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-cyan-400">{successRate}%</p>
              </div>
              <Target className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Network Topology */}
          <div className="lg:col-span-2">
            <NetworkTopology isRunning={simulationState.isRunning} />
          </div>

          {/* Threat Intelligence */}
          <div>
            <ThreatIntelligence threats={threats} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Agent Monitor */}
          <AgentMonitor 
            isRunning={simulationState.isRunning}
            episode={simulationState.currentEpisode}
          />

          {/* Attack Visualization */}
          <AttackVisualization 
            isRunning={simulationState.isRunning}
            threats={threats}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metrics Panel */}
          <div className="lg:col-span-2">
            <MetricsPanel 
              simulationState={simulationState}
              isRunning={simulationState.isRunning}
            />
          </div>

          {/* Simulation Controls */}
          <div>
            <SimulationControls 
              isRunning={simulationState.isRunning}
              onToggle={toggleSimulation}
              onReset={resetSimulation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;