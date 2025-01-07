import React, { useState, useEffect } from "react";

function StatisticsPage() {
  const [allyStats, setAllyStats] = useState({ allyCount: 0, nonAllyCount: 0 });
  const [continentList, setContinentList] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [continentStats, setContinentStats] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [populationStats, setPopulationStats] = useState(null);

  // 初始化時取得邦交/非邦交國統計、洲列表、國家列表
  useEffect(() => {
    const fetchStats = async () => {
      const allyResponse = await fetch("php/getAllyStats.php");
      const allyData = await allyResponse.json();
      setAllyStats(allyData);

      const continentResponse = await fetch("php/getContinentList.php");
      const continentData = await continentResponse.json();
      setContinentList(continentData);

      const countryResponse = await fetch("php/getCountryList.php");
      const countryData = await countryResponse.json();
      setCountryList(countryData);
    };
    fetchStats();
  }, []);

  // 查詢某一洲的邦交國和非邦交國統計
  const handleContinentSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`php/getContinentAllyStats.php?continent=${selectedContinent}`);
    const data = await response.json();
    setContinentStats(data);
  };

  // 查詢國家或統計邦交/非邦交國國民人數
  const handlePopulationSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`php/getPopulationStats.php?country=${selectedCountry}`);
    const data = await response.json();
    setPopulationStats(data);
  };

  return (
    <div>
      <h2>統計頁面</h2>

      {/* 邦交國與非邦交國總數 */}
      <div>
        <h3>邦交國與非邦交國統計</h3>
        <p>邦交國數量：{allyStats.allyCount}</p>
        <p>非邦交國數量：{allyStats.nonAllyCount}</p>
      </div>

      {/* 某一洲邦交與非邦交國統計 */}
      <div>
        <h3>查詢某一洲邦交與非邦交國統計</h3>
        <form onSubmit={handleContinentSubmit}>
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            {continentList.map((continent, index) => (
              <option key={index} value={continent.continent_name}>
                {continent.continent_name}
              </option>
            ))}
          </select>
          <button type="submit">查詢</button>
        </form>
        {continentStats && (
          <div>
            <p>邦交國數量：{continentStats.allyCount}</p>
            <p>非邦交國數量：{continentStats.nonAllyCount}</p>
          </div>
        )}
      </div>

      {/* 查詢國家或統計所有邦交/非邦交國國民人數 */}
      <div>
        <h3>查詢或統計國民人數</h3>
        <form onSubmit={handlePopulationSubmit}>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
           
            {countryList.map((country) => (
              <option key={country.country_code} value={country.country_name}>
                {country.country_name}
              </option>
            ))}
          </select>
          <button type="submit">查詢</button>
        </form>
        {populationStats && (
          <div>
            <p>總國民人數：{populationStats.population}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatisticsPage;
