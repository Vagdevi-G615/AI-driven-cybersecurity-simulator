import React, { useState, useEffect } from 'react';
import { Target, Zap, Shield, ArrowRight } from 'lucide-react';

interface Attack {
  id: string;
  type: string;
  source: string;
  target: string;
  status: 'in-progress' | 'blocked' | 'successful';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

interface AttackVisualizationProps {
  isRunning: boolean;
  threats: any[];
}

const AttackVisualization: React.FC<AttackVisualizationProps> = ({ isRunning, threats }) => {
  const [attacks, setAttacks] = useState<Attack[]>([
    {
      id: '1',
      type: 'SQL Injection',
      source: '192.168.1.100',
      target: 'DB Server',
      status: 'blocked',
      severity: 'high',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '2',
      type: 'Brute Force',
      source: '10.0.0.50',
      target: 'Login Server',
      status: 'in-progress',
      severity: 'medium',
      timestamp: new Date(Date.now() - 30000)
    }
  ]);

  const [attackPaths, setAttackPaths] = useState([
    { from: 'External', to: 'Firewall', active: false },
    { from: 'Firewall', to: 'Router', active: false },
    { from: 'Router', to: 'Server', active: false }
  ]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        // Simulate new attacks
        if (Math.random() > 0.7) {
          const newAttack: Attack = {
            id: Date.now().toString(),
            type: ['DDoS', 'Phishing', 'Malware', 'SQL Injection', 'XSS'][Math.floor(Math.random() * 5)],
            source: `192.168.1.${Math.floor(Math.random() * 255)}`,
            target: ['Web Server', 'DB Server', 'Login Server'][Math.floor(Math.random() * 3)],
            status: ['in-progress', 'blocked', 'successful'][Math.floor(Math.random() * 3)] as 'in-progress' | 'blocked' | 'successful',
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
            timestamp: new Date()
          };

          setAttacks(prev => [newAttack, ...prev.slice(0, 9)]);
        }

        // Animate attack paths
        setAttackPaths(prev => 
          prev.map(path => ({
            ...path,
            active: Math.random() > 0.6
          }))
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20';
      case 'blocked': return 'text-green-400 bg-green-400/20';
      case 'successful': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-l-blue-400';
      case 'medium': return 'border-l-yellow-400';
      case 'high': return 'border-l-orange-400';
      case 'critical': return 'border-l-red-400';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Attack Visualization</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
          <span className="text-sm text-slate-400">Live</span>
        </div>
      </div>

      {/* Attack Path Visualization */}
      <div className="mb-6 p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-3">Attack Paths</h4>
        <div className="flex items-center justify-between">
          {attackPaths.map((path, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  path.active ? 'border-red-400 bg-red-400/20' : 'border-slate-600 bg-slate-800'
                }`}>
                  <Target className={`h-6 w-6 ${path.active ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                <span className="text-xs text-slate-400 mt-1">{path.from}</span>
              </div>
              {index < attackPaths.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight className={`h-4 w-4 transition-colors duration-300 ${
                    path.active ? 'text-red-400' : 'text-slate-600'
                  }`} />
                  {path.active && (
                    <div className="ml-1 w-2 h-2 rounded-full bg-red-400 animate-ping"></div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Recent Attacks */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        <h4 className="text-sm font-semibold text-white">Recent Attacks</h4>
        {attacks.map(attack => (
          <div
            key={attack.id}
            className={`bg-slate-900/50 border-l-4 ${getSeverityColor(attack.severity)} border-t border-r border-b border-slate-600 rounded-r-lg p-3 hover:bg-slate-900/70 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="font-semibold text-white text-sm">{attack.type}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(attack.status)}`}>
                {attack.status}
              </span>
            </div>
            
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Source: {attack.source}</span>
                <span>Target: {attack.target}</span>
              </div>
              <div className="flex justify-between">
                <span>{attack.timestamp.toLocaleTimeString()}</span>
                <span className="capitalize">{attack.severity} severity</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackVisualization;