'use client';

import { useState } from 'react';

export default function ChangeRequestForm() {
  const initialFormState = {
    title: '',
    description: '',
    requestType: '',
    targetDate: '',
    requestorName: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

  const handleSubmit = () => {
    // Validate form
    if (!formData.title || !formData.description || !formData.requestType || 
        !formData.targetDate || !formData.requestorName) {
      setErrorMessage('Please fill in all required fields');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);

      // Save to localStorage
      try {
        const existingData = JSON.parse(localStorage.getItem('changeRequests')) || [];
        const updatedData = [...existingData, formData];
        localStorage.setItem('changeRequests', JSON.stringify(updatedData));
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }

      setSuccessMessage('Change request successfully submitted!');
      setIsSubmitting(false);
      setFormData(initialFormState); // Reset form

      // Clear success message
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto p-4">
      <div className="mx-auto bg-white rounded shadow p-4 max-w-full">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Change Request Form</h1>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-3 text-sm">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-3">
          {/* Request Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Request Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title for your change request"
              className="block w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Detailed description of the requested change"
              className="block w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 text-sm"
            />
          </div>

          {/* Request Type */}
          <div>
            <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-1">
              Request Type <span className="text-red-500">*</span>
            </label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="block w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 text-sm"
            >
              <option value="">Select request type</option>
              <option value="bugfix">Bug Fix</option>
              <option value="feature">New Feature</option>
              <option value="enhancement">Enhancement</option>
              <option value="security">Security Update</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Target Date */}
          <div>
            <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
              Target Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="targetDate"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="block w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 text-sm"
            />
          </div>

          {/* Requestor Name */}
          <div>
            <label htmlFor="requestorName" className="block text-sm font-medium text-gray-700 mb-1">
              Requestor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="requestorName"
              name="requestorName"
              value={formData.requestorName}
              onChange={handleChange}
              placeholder="Your full name"
              className="block w-full rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 p-2 text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-3">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 border border-transparent rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>

            <button
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 text-sm"
            >
              Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}