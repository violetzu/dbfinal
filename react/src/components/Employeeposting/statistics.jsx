import React, { useState, useEffect } from "react";

function EmployeePostingStats() {
  const [countryStats, setCountryStats] = useState([]);
  const [areaStats, setAreaStats] = useState([]);

  // 初始化時抓取國家員工統計與單位面積員工統計
  useEffect(() => {
    const fetchStats = async () => {
      // 獲取每國家派駐之總員工人數
      const countryResponse = await fetch("php/getCountryEmployeeStats.php");
      const countryData = await countryResponse.json();
      setCountryStats(countryData);

      // 獲取每國家每單位面積之派駐員工數
      const areaResponse = await fetch("php/getAreaEmployeeStats.php");
      const areaData = await areaResponse.json();
      setAreaStats(areaData);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>員工派駐資料統計</h2>

      {/* 每國家派駐之總員工人數 */}
      <div>
        <h3>每一國家派駐之總員工人數</h3>
        <table border="1">
          <thead>
            <tr>
              <th>國家</th>
              <th>總員工人數</th>
            </tr>
          </thead>
          <tbody>
            {countryStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.country_name}</td>
                <td>{stat.employee_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 每國家每單位面積之派駐員工數 */}
      <div>
        <h3>每一國家每單位面積之派駐員工數</h3>
        <table border="1">
          <thead>
            <tr>
              <th>國家</th>
              <th>員工數/單位面積</th>
            </tr>
          </thead>
          <tbody>
            {areaStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.country_name}</td>
                <td>{stat.employee_per_area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeePostingStats;
