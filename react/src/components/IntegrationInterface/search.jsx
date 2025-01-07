import React, { useState, useEffect } from "react";

function QueryByCountry() {
  const [countryList, setCountryList] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState("");
  const [result, setResult] = useState(null);

  // 初始化時從後端取得國家列表
  useEffect(() => {
    const fetchCountryList = async () => {
      const response = await fetch("php/getCountryList.php");
      const data = await response.json();
      setCountryList(data);
    };
    fetchCountryList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`php/queryByCountry.php?country=${selectedCountry}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h2>查詢派駐某一國家 30 歲以上之員工人數</h2>
      <form onSubmit={handleSubmit}>
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
      {result && <p>結果：{result.count} 人</p>}
    </div>
  );
}

export default QueryByCountry;
