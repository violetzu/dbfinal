import React, { useState, useEffect } from "react";

function FamilyStats() {
  const [averageAge, setAverageAge] = useState(null);
  const [genderAverageAge, setGenderAverageAge] = useState({ male: null, female: null });
  const [genderCount, setGenderCount] = useState({ male: 0, female: 0 });

  // 初始化時抓取統計數據
  useEffect(() => {
    const fetchStats = async () => {
      // 平均眷屬年齡
      const avgAgeResponse = await fetch("php/getAverageFamilyAge.php");
      const avgAgeData = await avgAgeResponse.json();
      setAverageAge(avgAgeData.average_age);

      // 男性與女性眷屬平均年齡
      const genderAvgAgeResponse = await fetch("php/getGenderAverageFamilyAge.php");
      const genderAvgAgeData = await genderAvgAgeResponse.json();
      setGenderAverageAge({
        male: genderAvgAgeData.male_average_age,
        female: genderAvgAgeData.female_average_age,
      });

      // 男性與女性眷屬人數
      const genderCountResponse = await fetch("php/getFamilyGenderCount.php");
      const genderCountData = await genderCountResponse.json();
      setGenderCount({
        male: genderCountData.male_count,
        female: genderCountData.female_count,
      });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>眷屬資料統計</h2>

      {/* 平均眷屬年齡 */}
      <div>
        <h3>平均眷屬年齡</h3>
        <p>所有眷屬平均年齡：{averageAge !== null ? `${averageAge} 歲` : "載入中..."}</p>
      </div>

      {/* 男性與女性眷屬平均年齡 */}
      <div>
        <h3>男眷與女眷平均年齡</h3>
        <p>男眷平均年齡：{genderAverageAge.male !== null ? `${genderAverageAge.male} 歲` : "載入中..."}</p>
        <p>女眷平均年齡：{genderAverageAge.female !== null ? `${genderAverageAge.female} 歲` : "載入中..."}</p>
      </div>

      {/* 男性與女性眷屬人數 */}
      <div>
        <h3>男眷與女眷人數</h3>
        <p>男眷人數：{genderCount.male}</p>
        <p>女眷人數：{genderCount.female}</p>
      </div>
    </div>
  );
}

export default FamilyStats;
