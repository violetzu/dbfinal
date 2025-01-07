import React, { useState, useEffect } from "react";

function EmployeeStatistics() {
  const [stats, setStats] = useState({});
  const [jobGradeList, setJobGradeList] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [gradeResult, setGradeResult] = useState(null);

  // 初始化時取得統計資料與職等列表
  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("php/getEmployeeStatistics.php");
      const data = await response.json();
      setStats(data);
    };

    const fetchJobGrades = async () => {
      const response = await fetch("php/getJobGrades.php");
      const data = await response.json();
      setJobGradeList(data);
    };

    fetchStats();
    fetchJobGrades();
  }, []);

  // 查詢職等分群統計
  const handleGradeQuery = async (e) => {
    e.preventDefault();
    const response = await fetch(`php/getGradeStatistics.php?grade=${selectedGrade}`);
    const data = await response.json();
    setGradeResult(data);
  };

  return (
    <div>
      <h2>員工基本資料統計</h2>

      {/* (2) 員工人數、平均年齡與薪資 */}
      <div>
        <h3>基本統計</h3>
        <p>員工總數：{stats.totalEmployees}</p>
        <p>平均年齡：{stats.averageAge}</p>
        <p>平均薪資：{stats.averageSalary}</p>
      </div>

      {/* (3) 職等分群統計 */}
      <div>
      <h3>職等分群統計</h3>
      <form onSubmit={handleGradeQuery}>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          
          {jobGradeList.map((grade, index) => (
            <option key={index} value={grade.job_grade}>
              {grade.job_grade}
            </option>
          ))}
        </select>
        <button type="submit">查詢</button>
      </form>
      {gradeResult && (
        <div>
          <p>該職等人數：{gradeResult.currentCount}</p>
          <p>該職等及以下人數：{gradeResult.belowCount}</p>
        </div>
      )}
    </div>

      {/* (4) 全年、每月與每周薪資統計 */}
      <div>
        <h3>薪資統計</h3>
        <p>全年總薪資：{stats.totalYearlySalary}</p>
        <p>每月總薪資：{stats.totalMonthlySalary}</p>
        <p>每周總薪資：{stats.totalWeeklySalary}</p>
      </div>
    </div>
  );
}

export default EmployeeStatistics;
