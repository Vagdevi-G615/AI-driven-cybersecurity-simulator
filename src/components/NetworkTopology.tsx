import React, { useState, useEffect } from 'react';
import { Server, Wifi, Shield, AlertCircle } from 'lucide-react';

interface Node {
  id: string;
  type: 'server' | 'router' | 'client' | 'firewall';
  status: 'secure' | 'warning' | 'compromised';
  x: number;
  y: number;
  connections: string[];
}

interface NetworkTopologyProps {
  isRunning: boolean;
}

const NetworkTopology: React.FC<NetworkTopologyProps> = ({ isRunning }) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'fw1', type: 'firewall', status: 'secure', x: 200, y: 100, connections: ['r1'] },
    { id: 'r1', type: 'router', status: 'secure', x: 200, y: 200, connections: ['s1', 's2', 'c1', 'c2'] },
    { id: 's1', type: 'server', status: 'secure', x: 100, y: 300, connections: [] },
    { id: 's2', type: 'server', status: 'warning', x: 300, y: 300, connections: [] },
    { id: 'c1', type: 'client', status: 'secure', x: 50, y: 200, connections: [] },
    { id: 'c2', type: 'client', status: 'compromised', x: 350, y: 200, connections: [] },
  ]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setNodes(prevNodes => 
          prevNodes.map(node => ({
            ...node,
            status: Math.random() > 0.8 
              ? (Math.random() > 0.5 ? 'warning' : 'compromised')
              : 'secure'
          }))
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'server': return Server;
      case 'router': return Wifi;
      case 'firewall': return Shield;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-400 bg-green-400/20 border-green-400/50';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/50';
      case 'compromised': return 'text-red-400 bg-red-400/20 border-red-400/50';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/50';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Network Topology</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-slate-300">Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-slate-300">Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-slate-300">Compromised</span>
          </div>
        </div>
      </div>

      <div className="relative h-96 bg-slate-900/50 rounded-lg overflow-hidden">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map(node => 
            node.connections.map(connectionId => {
              const targetNode = nodes.find(n => n.id === connectionId);
              if (!targetNode) return null;
              
              return (
                <line
                  key={`${node.id}-${connectionId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="rgba(100, 116, 139, 0.5)"
                  strokeWidth="2"
                  className={isRunning ? 'animate-pulse' : ''}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const IconComponent = getNodeIcon(node.type);
          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(node.status)} 
                         border-2 rounded-lg p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110`}
              style={{ left: node.x, top: node.y }}
            >
              <IconComponent className="h-6 w-6" />
              {isRunning && node.status !== 'secure' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-current animate-ping"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkTopology;