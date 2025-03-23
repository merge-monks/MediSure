import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// Custom Card Components
const Card = ({ className, children }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="px-6 py-4 border-b border-gray-200">{children}</div>;
};

const CardTitle = ({ className, children }) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

const CardContent = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

// GeoJSON URL for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    // In a real application, you would fetch this from a file or API
    // Here we're using the parsed data from the CSV
    const parsedData = [
      { location: "Afghanistan", period: "2023", value: 3.17 },
      { location: "Albania", period: "2020", value: 18.79 },
      { location: "Algeria", period: "2022", value: 16.6 },
      { location: "Andorra", period: "2023", value: 50.68 },
      { location: "Angola", period: "2022", value: 2.44 },
      { location: "Anguilla", period: "2018", value: 15.132 },
      { location: "Antigua and Barbuda", period: "2017", value: 29.17 },
      { location: "Argentina", period: "2023", value: 51.06 },
      { location: "Armenia", period: "2022", value: 33.6 },
      { location: "Australia", period: "2022", value: 40.86 },
      { location: "Austria", period: "2023", value: 55.15 },
      { location: "Azerbaijan", period: "2022", value: 31.85 },
      { location: "Bahamas", period: "2017", value: 18.95 },
      { location: "Bahrain", period: "2020", value: 7.41 },
      { location: "Bangladesh", period: "2023", value: 7.22 },
      { location: "Barbados", period: "2022", value: 29.58 },
      { location: "Belarus", period: "2023", value: 47.17 },
      { location: "Belgium", period: "2023", value: 65.25 },
      { location: "Belize", period: "2018", value: 10.86 },
      { location: "Benin", period: "2023", value: 2.16 },
      { location: "Bhutan", period: "2022", value: 5.53 },
      { location: "Bolivia (Plurinational State of)", period: "2021", value: 12.84 },
      { location: "Bosnia and Herzegovina", period: "2019", value: 25.84 },
      { location: "Botswana", period: "2023", value: 3.79 },
      { location: "Brazil", period: "2023", value: 23.57 },
      { location: "Brunei Darussalam", period: "2021", value: 18.86 },
      { location: "Bulgaria", period: "2022", value: 43.28 },
      { location: "Burkina Faso", period: "2022", value: 1.48 },
      { location: "Burundi", period: "2022", value: 0.78 },
      { location: "Cote d'Ivoire", period: "2023", value: 1.66 },
      { location: "Cabo Verde", period: "2023", value: 7.3 },
      { location: "Cambodia", period: "2019", value: 2.11 },
      { location: "Cameroon", period: "2022", value: 1.36 },
      { location: "Canada", period: "2023", value: 28.19 },
      { location: "Central African Republic", period: "2023", value: 0.74 },
      { location: "Chad", period: "2023", value: 0.85 },
      { location: "Chile", period: "2023", value: 33.34 },
      { location: "China", period: "2022", value: 31.12 },
      { location: "Colombia", period: "2023", value: 25.35 },
      { location: "Comoros", period: "2022", value: 4.24 },
      { location: "Congo", period: "2022", value: 1.73 },
      { location: "Cook Islands", period: "2020", value: 16.67 },
      { location: "Costa Rica", period: "2022", value: 26.87 },
      { location: "Croatia", period: "2022", value: 39.09 },
      { location: "Cuba", period: "2021", value: 95.42 },
      { location: "Cyprus", period: "2022", value: 35.56 },
      { location: "Czechia", period: "2022", value: 43.52 },
      { location: "Democratic People's Republic of Korea", period: "2017", value: 36.28 },
      { location: "Democratic Republic of the Congo", period: "2022", value: 2.08 },
      { location: "Denmark", period: "2021", value: 72.35 },
      { location: "Djibouti", period: "2022", value: 2.11 },
      { location: "Dominica", period: "2018", value: 11.58 },
      { location: "Dominican Republic", period: "2023", value: 24.26 },
      { location: "Ecuador", period: "2020", value: 23.13 },
      { location: "Egypt", period: "2020", value: 6.71 },
      { location: "El Salvador", period: "2023", value: 16.16 },
      { location: "Equatorial Guinea", period: "2022", value: 1.53 },
      { location: "Eritrea", period: "2022", value: 0.88 },
      { location: "Estonia", period: "2022", value: 34.69 },
      { location: "Eswatini", period: "2023", value: 5.57 },
      { location: "Ethiopia", period: "2023", value: 1.43 },
      { location: "Fiji", period: "2015", value: 8.13 },
      { location: "Finland", period: "2021", value: 36.09 },
      { location: "France", period: "2022", value: 32.81 },
      { location: "Gabon", period: "2022", value: 5.21 },
      { location: "Gambia", period: "2023", value: 0.9 },
      { location: "Georgia", period: "2023", value: 56.42 },
      { location: "Germany", period: "2022", value: 45.34 },
      { location: "Ghana", period: "2023", value: 2.66 },
      { location: "Greece", period: "2022", value: 65.76 },
      { location: "Grenada", period: "2018", value: 13.83 },
      { location: "Guatemala", period: "2020", value: 12.81 },
      { location: "Guinea", period: "2022", value: 2.1 },
      { location: "Guinea-Bissau", period: "2022", value: 2.52 },
      { location: "Guyana", period: "2020", value: 13.87 },
      { location: "Haiti", period: "2022", value: 2.92 },
      { location: "Honduras", period: "2020", value: 4.89 },
      { location: "Hungary", period: "2022", value: 34.56 },
      { location: "Iceland", period: "2023", value: 43.73 },
      { location: "India", period: "2020", value: 7.23 },
      { location: "Indonesia", period: "2023", value: 5.24 },
      { location: "Iran (Islamic Republic of)", period: "2023", value: 18.11 },
      { location: "Iraq", period: "2022", value: 10.22 },
      { location: "Ireland", period: "2023", value: 38.75 },
      { location: "Israel", period: "2023", value: 37.97 },
      { location: "Italy", period: "2022", value: 41.91 },
      { location: "Jamaica", period: "2023", value: 4.6 },
      { location: "Japan", period: "2022", value: 26.49 },
      { location: "Jordan", period: "2022", value: 28.51 },
      { location: "Kazakhstan", period: "2023", value: 37.54 },
      { location: "Kenya", period: "2023", value: 2.89 },
      { location: "Kiribati", period: "2013", value: 1.93 },
      { location: "Kuwait", period: "2020", value: 22.73 },
      { location: "Kyrgyzstan", period: "2023", value: 18.5 },
      { location: "Lao People's Democratic Republic", period: "2022", value: 3.31 },
      { location: "Latvia", period: "2022", value: 33.98 },
      { location: "Lebanon", period: "2020", value: 26.8 },
      { location: "Lesotho", period: "2022", value: 2.35 },
      { location: "Liberia", period: "2022", value: 1.78 },
      { location: "Libya", period: "2017", value: 20.42 },
      { location: "Lithuania", period: "2023", value: 61.04 },
      { location: "Luxembourg", period: "2017", value: 29.84 },
      { location: "Madagascar", period: "2022", value: 1.72 },
      { location: "Malawi", period: "2022", value: 0.54 },
      { location: "Malaysia", period: "2023", value: 23.41 },
      { location: "Maldives", period: "2019", value: 22.35 },
      { location: "Mali", period: "2023", value: 1.88 },
      { location: "Malta", period: "2022", value: 78.55 },
      { location: "Marshall Islands", period: "2012", value: 4.67 },
      { location: "Mauritania", period: "2022", value: 2.61 },
      { location: "Mauritius", period: "2022", value: 14.36 },
      { location: "Mexico", period: "2022", value: 25.88 },
      { location: "Micronesia (Federated States of)", period: "2020", value: 9.74 },
      { location: "Monaco", period: "2020", value: 86.09 },
      { location: "Mongolia", period: "2022", value: 41.3 },
      { location: "Montenegro", period: "2023", value: 27.83 },
      { location: "Morocco", period: "2021", value: 7.4 },
      { location: "Mozambique", period: "2022", value: 1.75 },
      { location: "Myanmar", period: "2019", value: 7.57 },
      { location: "Namibia", period: "2022", value: 5.53 },
      { location: "Nauru", period: "2015", value: 12.73 },
      { location: "Nepal", period: "2023", value: 10.11 },
      { location: "Netherlands (Kingdom of the)", period: "2022", value: 38.76 },
      { location: "New Zealand", period: "2022", value: 36.11 },
      { location: "Nicaragua", period: "2018", value: 6.82 },
      { location: "Niger", period: "2023", value: 0.38 },
      { location: "Nigeria", period: "2023", value: 3.8 },
      { location: "Niue", period: "2008", value: 16.67 },
      { location: "North Macedonia", period: "2022", value: 29.44 },
      { location: "Norway", period: "2023", value: 49.75 },
      { location: "Oman", period: "2022", value: 19.92 },
      { location: "Pakistan", period: "2021", value: 11.6 },
      { location: "Palau", period: "2023", value: 18.08 },
      { location: "Panama", period: "2022", value: 16.25 },
      { location: "Papua New Guinea", period: "2023", value: 0.61 },
      { location: "Paraguay", period: "2022", value: 38.93 },
      { location: "Peru", period: "2023", value: 16.88 },
      { location: "Philippines", period: "2021", value: 7.92 },
      { location: "Poland", period: "2023", value: 40.31 },
      { location: "Portugal", period: "2022", value: 58.51 },
      { location: "Qatar", period: "2023", value: 30.22 },
      { location: "Republic of Korea", period: "2022", value: 26.1 },
      { location: "Republic of Moldova", period: "2023", value: 40.16 },
      { location: "Romania", period: "2022", value: 36.25 },
      { location: "Russian Federation", period: "2022", value: 51.11 },
      { location: "Rwanda", period: "2022", value: 0.9 },
      { location: "Saint Kitts and Nevis", period: "2018", value: 30.85 },
      { location: "Saint Lucia", period: "2020", value: 42.34 },
      { location: "Saint Vincent and the Grenadines", period: "2012", value: 9.38 },
      { location: "Samoa", period: "2021", value: 5.61 },
      { location: "San Marino", period: "2023", value: 46.29 },
      { location: "Sao Tome and Principe", period: "2022", value: 4.64 },
      { location: "Saudi Arabia", period: "2023", value: 34.06 },
      { location: "Senegal", period: "2023", value: 1.09 },
      { location: "Serbia", period: "2022", value: 30.99 },
      { location: "Seychelles", period: "2022", value: 65.98 },
      { location: "Sierra Leone", period: "2022", value: 1.34 },
      { location: "Singapore", period: "2022", value: 28.34 },
      { location: "Slovakia", period: "2022", value: 36.97 },
      { location: "Slovenia", period: "2022", value: 33.67 },
      { location: "Solomon Islands", period: "2023", value: 2.38 },
      { location: "Somalia", period: "2014", value: 0.48 },
      { location: "South Africa", period: "2022", value: 7.94 },
      { location: "South Sudan", period: "2022", value: 0.41 },
      { location: "Spain", period: "2022", value: 42.94 },
      { location: "Sri Lanka", period: "2023", value: 11.36 },
      { location: "Sudan", period: "2017", value: 2.5 },
      { location: "Suriname", period: "2023", value: 13.55 },
      { location: "Sweden", period: "2021", value: 44.08 },
      { location: "Switzerland", period: "2022", value: 44.77 },
      { location: "Syrian Arab Republic", period: "2021", value: 15.21 },
      { location: "Türkiye", period: "2022", value: 22.36 },
      { location: "Tajikistan", period: "2023", value: 18.7 },
      { location: "Thailand", period: "2021", value: 5.41 },
      { location: "Timor-Leste", period: "2020", value: 7.52 },
      { location: "Togo", period: "2022", value: 0.8 },
      { location: "Tokelau", period: "2021", value: 16.667 },
      { location: "Tonga", period: "2021", value: 10.14 },
      { location: "Trinidad and Tobago", period: "2021", value: 41.57 },
      { location: "Tunisia", period: "2021", value: 13.15 },
      { location: "Turkmenistan", period: "2023", value: 19.3 },
      { location: "Tuvalu", period: "2020", value: 13.46 },
      { location: "Uganda", period: "2022", value: 1.91 },
      { location: "Ukraine", period: "2023", value: 35.31 },
      { location: "United Arab Emirates", period: "2023", value: 29.92 },
      { location: "United Kingdom of Great Britain and Northern Ireland", period: "2023", value: 33.01 },
      { location: "United Republic of Tanzania", period: "2022", value: 1.34 },
      { location: "United States of America", period: "2022", value: 36.81 },
      { location: "Uruguay", period: "2022", value: 46.74 },
      { location: "Uzbekistan", period: "2021", value: 28.047 },
      { location: "Vanuatu", period: "2019", value: 1.64 },
      { location: "Venezuela (Bolivarian Republic of)", period: "2017", value: 16.64 },
      { location: "Viet Nam", period: "2021", value: 11.07 },
      { location: "Yemen", period: "2023", value: 0.98 },
      { location: "Zambia", period: "2022", value: 3.24 },
      { location: "Zimbabwe", period: "2023", value: 1.36 }
    ];
    
    setData(parsedData);
  }, []);

  // Create a more comprehensive mapping of country names
  const countryNameMapping = {
    // Existing mappings
    "United States of America": "United States",
    "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
    "Russian Federation": "Russia",
    "Republic of Korea": "South Korea",
    "Türkiye": "Turkey",
    "United Republic of Tanzania": "Tanzania",
    "Democratic Republic of the Congo": "Congo, Dem. Rep.",
    "Congo": "Congo",
    "Republic of Moldova": "Moldova",
    "Viet Nam": "Vietnam",
    "Iran (Islamic Republic of)": "Iran",
    "Syrian Arab Republic": "Syria",
    "Venezuela (Bolivarian Republic of)": "Venezuela",
    "Bolivia (Plurinational State of)": "Bolivia",
    "Lao People's Democratic Republic": "Laos",
    "Democratic People's Republic of Korea": "North Korea",
    "Netherlands (Kingdom of the)": "Netherlands",
    "Czechia": "Czech Rep.",
    
    // Additional mappings to handle edge cases
    "Brunei Darussalam": "Brunei",
    "Cabo Verde": "Cape Verde",
    "Côte d'Ivoire": "Ivory Coast",
    "Cote d'Ivoire": "Ivory Coast",
    "Eswatini": "Swaziland",
    "Micronesia (Federated States of)": "Micronesia",
    "Myanmar": "Burma",
    "Palestine": "West Bank",
    "Timor-Leste": "East Timor",
    "Türkiye": "Turkey"
  };

  // Improved function to match country names correctly in both directions
  const getCountryData = (geoName) => {
    if (!geoName) return null;
    
    // 1. Direct match with our data
    let country = data.find(item => item.location === geoName);
    if (country) return country;
    
    // 2. Check if this GeoJSON name maps to one of our data names
    for (const [dataName, mappedGeoName] of Object.entries(countryNameMapping)) {
      if (mappedGeoName === geoName) {
        country = data.find(item => item.location === dataName);
        if (country) return country;
      }
    }
    
    // 3. Check for partial matches (for countries with slight naming differences)
    const matchingCountry = data.find(item => {
      return (
        geoName.includes(item.location) || 
        item.location.includes(geoName) ||
        item.location.toLowerCase().includes(geoName.toLowerCase())
      );
    });
    
    if (matchingCountry) return matchingCountry;
    
    // No match found
    return null;
  };

  // Get color based on value
  const getColor = (value) => {
    if (!value) return "#FFFFFF";
    
    // Minimum and maximum values from the data
    const min = 0.38;
    const max = 95.42;
    
    // Calculate color intensity (dark blue to light blue)
    const ratio = (value - min) / (max - min);
    const blue = Math.floor(255 - (ratio * 155));
    const other = Math.floor(255 - (ratio * 95));
    
    return `rgb(${other}, ${other + 20}, ${blue})`;
  };

  // Function to get category for legend
  const getCategory = (value) => {
    if (!value) return "No data";
    if (value < 5) return "Very Low (<5)";
    if (value < 15) return "Low (5-15)";
    if (value < 30) return "Medium (15-30)";
    if (value < 50) return "High (30-50)";
    return "Very High (>50)";
  };

  // Color scale for map
  const colorScale = scaleLinear()
    .domain([0.38, 5, 15, 30, 50, 95.42])
    .range(["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#2171b5"]);

  const handleMouseMove = (event) => {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Medical Doctors per 10,000 People Worldwide</CardTitle>
      </CardHeader>
      <CardContent>
        {/* World Map Visualization */}
        <div 
          className="relative bg-slate-100 rounded-lg p-4 mb-4 h-96 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <ComposableMap 
            projectionConfig={{ scale: 150 }}
            width={800}
            height={400}
          >
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const { NAME } = geo.properties;
                    const countryData = getCountryData(NAME);
                    const val = countryData?.value;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={val ? colorScale(val) : "#F2F2F2"}
                        stroke="#D6D6DA"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (countryData) {
                            setTooltipContent(`
                              <strong>${countryData.location}</strong><br/>
                              <span>${countryData.value.toFixed(2)} doctors per 10,000 people</span><br/>
                              <span>Data from: ${countryData.period}</span>
                            `);
                          } else {
                            setTooltipContent(`<strong>${NAME || "Unknown region"}</strong><br/>No data available`);
                          }
                          setShowTooltip(true);
                        }}
                        onMouseLeave={() => {
                          setShowTooltip(false);
                          setTooltipContent("");
                        }}
                        onClick={() => {
                          if (countryData) {
                            setSelectedCountry(countryData);
                          } else {
                            setSelectedCountry(null);
                          }
                        }}
                        style={{
                          default: { 
                            outline: "none",
                            transition: "all 0.3s" 
                          },
                          hover: {
                            fill: val ? "#F53" : "#D3D3D3",
                            outline: "none",
                            cursor: val ? "pointer" : "default",
                            stroke: "#000",
                            strokeWidth: 0.75
                          },
                          pressed: { 
                            outline: "none",
                            stroke: "#000",
                            strokeWidth: 1
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          
          {/* Debug information to help identify mismatched countries */}
          <div className="absolute bottom-2 left-2 text-xs bg-white bg-opacity-75 p-1 rounded">
            {selectedCountry ? `Selected: ${selectedCountry.location}` : 'Hover over a country'}
          </div>
          
          {/* Tooltip with improved positioning and appearance */}
          {showTooltip && tooltipContent && (
            <div 
              className="absolute pointer-events-none bg-white px-3 py-2 rounded-md shadow-md text-sm z-10 border border-gray-200"
              style={{
                left: tooltipPosition.x + 15,
                top: tooltipPosition.y - 70,
                maxWidth: "250px",
                transform: "none" // Remove transform to fix positioning
              }}
              dangerouslySetInnerHTML={{ __html: tooltipContent }}
            />
          )}
          
          {/* Country Detail Popup */}
          {selectedCountry && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{selectedCountry.location}</h3>
                <button 
                  onClick={() => setSelectedCountry(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Doctors per 10,000:</span>
                  <span className="font-bold text-lg">{selectedCountry.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{getCategory(selectedCountry.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span>{selectedCountry.period}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div 
                    className="w-full h-3 rounded-full bg-gray-200"
                  >
                    <div 
                      className="h-3 rounded-full" 
                      style={{ 
                        width: `${(selectedCountry.value / 100) * 100}%`,
                        maxWidth: "100%",
                        backgroundColor: colorScale(selectedCountry.value)
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2" style={{ backgroundColor: colorScale(2) }}></div>
            <span>Very Low (&lt;5)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2" style={{ backgroundColor: colorScale(10) }}></div>
            <span>Low (5-15)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2" style={{ backgroundColor: colorScale(22) }}></div>
            <span>Medium (15-30)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2" style={{ backgroundColor: colorScale(40) }}></div>
            <span>High (30-50)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2" style={{ backgroundColor: colorScale(70) }}></div>
            <span>Very High (&gt;50)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 mr-2 bg-white border border-gray-300"></div>
            <span>No data</span>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="overflow-x-auto">
          <div className="text-sm mb-2">Top 10 countries with highest number of doctors per 10,000 people:</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Country</th>
                <th className="p-2 text-left">Year</th>
                <th className="p-2 text-right">Doctors per 10,000</th>
                <th className="p-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {data
                .sort((a, b) => b.value - a.value)
                .slice(0, 10)
                .map((country, index) => (
                  <tr 
                    key={index} 
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCountry(country)}
                  >
                    <td className="p-2">{country.location}</td>
                    <td className="p-2">{country.period}</td>
                    <td className="p-2 text-right font-medium">{country.value.toFixed(2)}</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: colorScale(country.value) }}
                        ></div>
                        {getCategory(country.value)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Global Average</h3>
            <p className="text-3xl font-bold">
              {(data.reduce((sum, country) => sum + country.value, 0) / data.length).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">doctors per 10,000 people</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Highest</h3>
            <p className="text-3xl font-bold">
              {data.length > 0 ? Math.max(...data.map(country => country.value)).toFixed(2) : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {data.length > 0 
                ? data.reduce((prev, current) => (prev.value > current.value) ? prev : current).location 
                : ""}
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Lowest</h3>
            <p className="text-3xl font-bold">
              {data.length > 0 ? Math.min(...data.map(country => country.value)).toFixed(2) : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {data.length > 0 
                ? data.reduce((prev, current) => (prev.value < current.value) ? prev : current).location 
                : ""}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldMap;