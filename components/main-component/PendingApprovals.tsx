'use client';

import React, { useEffect, useState } from 'react';

interface ChangeRequest {
  title: string;
  description: string;
  requestType: string;
  targetDate: string;
  requestorName: string;
  status?: string;
  rejectionReason?: string;
}

interface ChangeRequestDisplay {
  id: string;
  requestorName: string;
  targetDate: string;
  requestType: string;
  title: string;
  description: string;
  status: string;
  rejectionReason?: string;
}

export default function PendingApprovals() {
  const [requests, setRequests] = useState<ChangeRequestDisplay[]>([]);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    const stored = localStorage.getItem('changeRequests');
    if (stored) {
      const parsed: ChangeRequest[] = JSON.parse(stored);

      const mapped: ChangeRequestDisplay[] = parsed.map((req, index) => ({
        id: `CRQ-2025-${index + 1}`,
        requestorName: req.requestorName,
        targetDate: new Date(req.targetDate).toLocaleDateString(),
        requestType: req.requestType.toUpperCase(),
        title: req.title,
        description: req.description,
        status: req.status || 'PENDING',
        rejectionReason: req.rejectionReason
      }));

      setRequests(mapped);
    } else {
      // fallback sample
      setRequests([
        {
          id: 'CRQ-2025-001',
          requestorName: 'Rajesh Kumar',
          targetDate: '5/8/2025',
          requestType: 'FEATURE',
          title: 'Enable dashboard export',
          description: 'Add PDF export option to the analytics dashboard.',
          status: 'PENDING'
        }
      ]);
    }
  };

  const updateRequestStatus = (id: string, newStatus: string, reason?: string) => {
    // Update the UI state first
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === id ? { ...req, status: newStatus, rejectionReason: reason } : req
      )
    );

    // Then update in localStorage
    const stored = localStorage.getItem('changeRequests');
    if (stored) {
      const parsed: ChangeRequest[] = JSON.parse(stored);
      const index = parseInt(id.split('-')[2]) - 1;
      
      if (index >= 0 && index < parsed.length) {
        parsed[index].status = newStatus;
        if (reason) {
          parsed[index].rejectionReason = reason;
        }
        localStorage.setItem('changeRequests', JSON.stringify(parsed));
      }
    }
  };

  const handleApprove = (id: string) => {
    updateRequestStatus(id, 'APPROVED');
  };

  const handleRejectClick = (id: string) => {
    setRejectingId(id);
    setRejectionReason('');
  };

  const handleRejectSubmit = () => {
    if (rejectingId && rejectionReason.trim()) {
      updateRequestStatus(rejectingId, 'REJECTED', rejectionReason);
      setRejectingId(null);
      setRejectionReason('');
    }
  };

  const handleCancelReject = () => {
    setRejectingId(null);
    setRejectionReason('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">APPROVED</span>;
      case 'REJECTED':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">REJECTED</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">PENDING</span>;
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-medium pb-4 border-b border-gray-300 mb-4">Change Requests</h2>

      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">ID</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Requestor</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Target Date</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Type</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Title</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Description</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Status</th>
            <th className="py-3 px-4 font-medium text-sm text-gray-500 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-blue-600">{item.id}</td>
                <td className="py-3 px-4">{item.requestorName}</td>
                <td className="py-3 px-4">{item.targetDate}</td>
                <td className="py-3 px-4">{item.requestType}</td>
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    {getStatusBadge(item.status)}
                    {item.rejectionReason && item.status === 'REJECTED' && (
                      <div className="mt-1 text-xs text-red-600">
                        Reason: {item.rejectionReason}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button 
                    className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200" 
                    title="Approve"
                    onClick={() => handleApprove(item.id)}
                    disabled={item.status !== 'PENDING'}
                    style={{ opacity: item.status !== 'PENDING' ? 0.5 : 1 }}
                  >
                    ✅
                  </button>
                  <button 
                    className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200" 
                    title="Reject"
                    onClick={() => handleRejectClick(item.id)}
                    disabled={item.status !== 'PENDING'}
                    style={{ opacity: item.status !== 'PENDING' ? 0.5 : 1 }}
                  >
                    ❌
                  </button>
                  <button className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200" title="View Details">
                    📄
                  </button>
                </td>
              </tr>
              {rejectingId === item.id && (
                <tr className="bg-gray-50">
                  <td colSpan={8} className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter rejection reason"
                        className="flex-1 rounded border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button
                        onClick={handleRejectSubmit}
                        disabled={!rejectionReason.trim()}
                        className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleCancelReject}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}