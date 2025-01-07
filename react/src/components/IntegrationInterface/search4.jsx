import React, { useState } from 'react';

function QueryAverageFamilyCount() {
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        const response = await fetch(`php/queryAverageFamilyCount.php`);
        const data = await response.json();
        setResult(data);
    };

    return (
        <div>
            <h2>查詢 30 歲以上員工之平均眷屬人數</h2>
            <button onClick={handleSubmit}>查詢</button>
            {result && <p>結果：{result.averageCount} 人</p>}
        </div>
    );
}

export default QueryAverageFamilyCount;
