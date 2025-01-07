import React, { useState } from 'react';

function CountrySearch() {
  // 以 countryCode 取代原本的 empId
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCountry, setEditedCountry] = useState({});

  const displayFields = [
    { label: '國家名稱', key: 'country_name', type: 'text' },
    { label: '洲名', key: 'continent_name', type: 'text' },
    { label: '國家元首', key: 'head_of_state', type: 'text' },
    { label: '外交部長', key: 'foreign_minister', type: 'text' },
    { label: '聯絡人', key: 'contact_person', type: 'text' },
    { label: '人口數', key: 'population', type: 'number' },
    { label: '國土面積', key: 'area', type: 'number' },
    { label: '聯絡電話', key: 'contact_phone', type: 'text' },
    { label: '是否為盟友', key: 'is_ally', type: 'checkbox' },
  ];

  // 查詢按鈕
  const handleSearch = async () => {
    try {
      const response = await fetch(`php/country_search.php?country_code=${countryCode}`);
      const data = await response.json();

      setIsEditing(false);

      // 假設後端若查不到資料，回傳 data.error === 'none'
      if (data.error === 'none') {
        setCountry(null);
        setError('查無此國家，是否新增？');
      } else if (data.error === 'delete') {
        setCountry(null);
        setError('此國家已刪除');
      } else {
        setCountry(data);
        setError(null);
      }
    } catch (err) {
      console.error('查詢失敗', err);
      setError('查詢失敗，請稍後再試');
    }
  };

  // 進入編輯模式
  const handleEdit = () => {
    setIsEditing(true);
    // 將目前的 country 資料複製到編輯用物件
    setEditedCountry({ ...country });
  };

  // 檢查欄位是否正確 (前端驗證)
  const validateFields = () => {
    for (let field of displayFields) {
      if (field.type !== 'checkbox') {
        const value = editedCountry[field.key];
        if (!value && value !== 0) {
          alert(`${field.label} 為必填`);
          return false;
        }
      }
    }

    // 針對國家代碼做額外格式檢查
    const countryCode = editedCountry['country_code'];
    if (!/^[A-Z]{2}\d{4}$/.test(countryCode)) {
        alert('「國家代碼」必須符合前兩碼為大寫英文、後四碼為數字的格式，如 AA1234');
        return false;
    }
    // 這裡再額外做電話格式檢查
    if (!/^[0-9]+$/.test(editedCountry['contact_phone'])) {
        alert('電話欄位僅可包含數字');
        return false;
    }

  // 其他格式檢查（例如電話格式、數字範圍等）也可在此進行
    return true;
  };

  // 儲存/新增資料
  const handleSave = async () => {
    if (!validateFields()) return;

    // 如果已經有 country 代表是「更新」，否則為「新增」
    const endpoint = country ? 'php/country_update.php' : 'php/country_add.php';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedCountry),
      });
      const result = await response.json();

      if (result.success) {
        // 若是更新模式，更新當前 country
        setCountry(editedCountry);
        setIsEditing(false);
        alert(country ? '資料更新成功' : '新增成功');
      } else {
        alert(country ? '資料更新失敗' : '新增失敗');
      }
    } catch (err) {
      console.error('操作失敗', err);
      alert(country ? '資料更新失敗，請稍後再試' : '新增失敗，請稍後再試');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`php/country_delete.php?country_code=${countryCode}`);
      const result = await response.json();

      if (result.success) {
        setCountry(null);
        setError('查無此國家');
        alert('國家資料已刪除');
      } else {
        alert('刪除失敗');
      }
    } catch (err) {
      console.error('刪除失敗', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  // 新增國家資料
  const handleAddNew = () => {
    setCountry(null);
    setError(null);
    setIsEditing(true);
    // 初始化一個新的國家物件（country_code 須與使用者輸入的查詢值一致）
    setEditedCountry({
      country_code: countryCode,
      country_name: '',
      continent_name: '',
      head_of_state: '',
      foreign_minister: '',
      contact_person: '',
      population: '',
      area: '',
      contact_phone: '',
      is_ally: 0, // 預設非盟友
    });
  };

  return (
    <div>
      <h1>查詢國家資料</h1>
      <input
        type="text"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        placeholder="輸入國家代碼"
      />
      <button onClick={handleSearch}>查詢</button>

      {error && (
        <div>
          <p style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
            {error}
          </p>
          {error.includes('是否新增') && (
            <button onClick={handleAddNew}>新增國家</button>
          )}
        </div>
      )}

      {(country || isEditing) && (
        <div>
          <h2>{isEditing ? '新增 / 編輯國家資料' : '國家資料'}</h2>

          {/* 編輯模式 */}
          {isEditing ? (
            <div>
              {displayFields.map((field) => (
                <p key={field.key}>
                  {field.label}:{' '}
                  {field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={editedCountry[field.key] === 1}
                      onChange={(e) =>
                        setEditedCountry({
                          ...editedCountry,
                          [field.key]: e.target.checked ? 1 : 0,
                        })
                      }
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={editedCountry[field.key] || ''}
                      onChange={(e) =>
                        setEditedCountry({
                          ...editedCountry,
                          [field.key]: e.target.value,
                        })
                      }
                    />
                  )}
                </p>
              ))}

              <button onClick={handleSave}>{country ? '保存' : '新增'}</button>
              <button onClick={() => setIsEditing(false)}>取消</button>
            </div>
          ) : (
            // 顯示模式
            <div>
              {/* 這裡顯示國家資料 */}
              {displayFields.map((field) => (
                <p key={field.key}>
                  {field.label}:{' '}
                  {field.type === 'checkbox'
                    ? country[field.key] === 1
                      ? '是'
                      : '否'
                    : country[field.key]}
                </p>
              ))}

              <button onClick={handleEdit}>編輯</button>
              <button onClick={handleDelete}>刪除</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CountrySearch;
