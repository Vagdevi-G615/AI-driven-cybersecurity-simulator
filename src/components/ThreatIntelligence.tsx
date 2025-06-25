import React from 'react';
import { AlertTriangle, Shield, Eye, Clock } from 'lucide-react';

interface Threat {
  id: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'investigating' | 'blocked' | 'resolved';
  timestamp: string;
}

interface ThreatIntelligenceProps {
  threats: Threat[];
}

const ThreatIntelligence: React.FC<ThreatIntelligenceProps> = ({ threats }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-400 bg-blue-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected': return Eye;
      case 'investigating': return AlertTriangle;
      case 'blocked': return Shield;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detected': return 'text-blue-400';
      case 'investigating': return 'text-yellow-400';
      case 'blocked': return 'text-green-400';
      case 'resolved': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Threat Intelligence</h3>
        <div className="text-sm text-slate-400">Live Feed</div>
      </div>

      <div className="space-y-4">
        {threats.map(threat => {
          const StatusIcon = getStatusIcon(threat.status);
          return (
            <div
              key={threat.id}
              className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-900/70 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`h-5 w-5 ${getStatusColor(threat.status)}`} />
                  <div>
                    <p className="font-semibold text-white">{threat.type}</p>
                    <p className="text-sm text-slate-400">{threat.timestamp}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getStatusColor(threat.status)}`}>
                  {threat.status.toUpperCase()}
                </span>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-slate-300 transition-colors">
                    Details
                  </button>
                  <button className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors">
                    Block
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-2">AI Analysis</h4>
        <p className="text-sm text-slate-300">
          Pattern recognition indicates a coordinated attack attempt. 
          Recommend increasing defensive agent learning rate by 15%.
        </p>
      </div>
    </div>
  );
};

export default ThreatIntelligence;