import React, { useState } from 'react';

function QueryAverageFamilyAge() {
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        const response = await fetch(`php/queryAverageFamilyAge.php`);
        const data = await response.json();
        setResult(data);
    };

    return (
        <div>
            <h2>查詢 30 歲以上員工之平均眷屬年齡</h2>
            <button onClick={handleSubmit}>查詢</button>
            {result && <p>結果：{result.averageAge} 歲</p>}
        </div>
    );
}

export default QueryAverageFamilyAge;
