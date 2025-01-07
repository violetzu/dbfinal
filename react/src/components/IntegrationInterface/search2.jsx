import React, { useState, useEffect } from "react";

function QueryByContinent() {
  const [continentList, setContinentList] = useState([]); 
  const [selectedContinent, setSelectedContinent] = useState("");
  const [result, setResult] = useState(null);

  // 初始化時從後端取得洲列表
  useEffect(() => {
    const fetchContinentList = async () => {
      const response = await fetch("php/getContinentList.php");
      const data = await response.json();
      setContinentList(data);
    };
    fetchContinentList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`php/queryByContinent.php?continent=${selectedContinent}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h2>查詢派駐某一洲之員工總數</h2>
      <form onSubmit={handleSubmit}>
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
      {result && <p>結果：{result.count} 人</p>}
    </div>
  );
}

export default QueryByContinent;
