import React, { useState, useEffect } from 'react';
import { Bot, Shield, Sword, TrendingUp, Award } from 'lucide-react';

interface Agent {
  id: string;
  type: 'defender' | 'attacker';
  status: 'active' | 'learning' | 'idle';
  performance: number;
  actions: number;
  reward: number;
}

interface AgentMonitorProps {
  isRunning: boolean;
  episode: number;
}

const AgentMonitor: React.FC<AgentMonitorProps> = ({ isRunning, episode }) => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'def-001', type: 'defender', status: 'active', performance: 92.5, actions: 1247, reward: 8.7 },
    { id: 'def-002', type: 'defender', status: 'learning', performance: 88.2, actions: 953, reward: 7.3 },
    { id: 'def-003', type: 'defender', status: 'active', performance: 95.1, actions: 1456, reward: 9.2 },
    { id: 'att-001', type: 'attacker', status: 'active', performance: 76.3, actions: 834, reward: 6.1 },
    { id: 'att-002', type: 'attacker', status: 'idle', performance: 71.8, actions: 687, reward: 5.4 },
  ]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setAgents(prevAgents =>
          prevAgents.map(agent => ({
            ...agent,
            performance: Math.max(0, Math.min(100, agent.performance + (Math.random() - 0.5) * 5)),
            actions: agent.actions + Math.floor(Math.random() * 10),
            reward: Math.max(0, agent.reward + (Math.random() - 0.5) * 0.5),
            status: Math.random() > 0.8 ? 
              (['active', 'learning', 'idle'][Math.floor(Math.random() * 3)] as 'active' | 'learning' | 'idle') : 
              agent.status
          }))
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const getAgentIcon = (type: string) => {
    return type === 'defender' ? Shield : Sword;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'learning': return 'text-blue-400 bg-blue-400/20';
      case 'idle': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const defenderCount = agents.filter(a => a.type === 'defender').length;
  const attackerCount = agents.filter(a => a.type === 'attacker').length;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Agent Monitor</h3>
        <div className="text-sm text-slate-400">Episode: {episode}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Defenders</p>
              <p className="text-xl font-bold text-blue-400">{defenderCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Sword className="h-6 w-6 text-red-400" />
            <div>
              <p className="text-sm text-slate-400">Attackers</p>
              <p className="text-xl font-bold text-red-400">{attackerCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {agents.map(agent => {
          const AgentIcon = getAgentIcon(agent.type);
          return (
            <div
              key={agent.id}
              className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-900/70 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <AgentIcon className={`h-5 w-5 ${agent.type === 'defender' ? 'text-blue-400' : 'text-red-400'}`} />
                  <div>
                    <p className="font-semibold text-white text-sm">{agent.id}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">{agent.reward.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Performance</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${agent.type === 'defender' ? 'bg-blue-400' : 'bg-red-400'}`}
                        style={{ width: `${agent.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium">{agent.performance.toFixed(1)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400">Actions</p>
                  <p className="text-white font-medium">{agent.actions.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentMonitor;