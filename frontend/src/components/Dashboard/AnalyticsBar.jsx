import React from "react";

const AnalyticsBar = ({ analyticsData }) => {
  return (
    <div className="px-6 lg:px-8 pt-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analyticsData.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm text-slate-500">{item.title}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-lg ${item.color}`}
                >
                  {item.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800 mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBar;
