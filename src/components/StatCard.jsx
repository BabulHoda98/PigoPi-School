
import React from 'react';

const StatCard = ({ title, value, icon, change, changeType, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${
            changeType === "increase" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}>
            {icon}
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium ${
            changeType === "increase" ? "text-green-600" : "text-red-600"
          }`}>
            {changeType === "increase" ? (
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                {change}
              </span>
            ) : (
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {change}
              </span>
            )}
          </span>
          <span className="text-sm text-gray-500 ml-2">from last month</span>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3">
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
