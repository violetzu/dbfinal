import React, { useState } from 'react';

function EmployeeSearch() {
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  const displayFields = [
    { label: '員工 ID', key: 'emp_id', type: 'text' },
    { label: '國家代碼', key: 'country_code', type: 'text' },
    { label: '員工姓名', key: 'emp_name', type: 'text' },
    { label: '開始日期', key: 'start_date', type: 'date' },
    { label: '大使姓名', key: 'ambassador_name', type: 'text' },
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch(`php/employeeposting_search.php?emp_id=${empId}`);
      const data = await response.json();
      setIsEditing(false);

      if (data.error === 'none') {
        setEmployee(null);
        setError('查無此人，是否新增？');
      } else if (data.error === 'delete') {
        setCountry(null);
        setError('此員工已刪除');
      } else {
        setEmployee(data);
        setError(null);
      }
    } catch (err) {
      console.error('查詢失敗', err);
      setError('查詢失敗，請稍後再試');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEmployee({ ...employee });
  };

  const validateFields = () => {
    for (let field of displayFields) {
      const value = editedEmployee[field.key];
      if (value === undefined || value === '') {
        alert('所有欄位均為必填');
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const endpoint = employee ? 'php/employeeposting_update.php' : 'php/employeeposting_add.php';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedEmployee),
      });
      const result = await response.json();

      if (result.success) {
        setEmployee(editedEmployee);
        setIsEditing(false);
        alert(employee ? '資料更新成功' : '新增成功');
      } else {
        alert(employee ? '資料更新失敗' : '新增失敗');
      }
    } catch (err) {
      console.error('操作失敗', err);
      alert(employee ? '資料更新失敗，請稍後再試' : '新增失敗，請稍後再試');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`php/employeeposting_delete.php?emp_id=${empId}`);
      const result = await response.json();

      if (result.success) {
        setEmployee(null);
        setError('查無此人');
        alert('員工資料已刪除');
      } else {
        alert('刪除失敗');
      }
    } catch (err) {
      console.error('刪除失敗', err);
      alert('刪除失敗，請稍後再試');
    }
  };

  const handleAddNew = () => {
    setEmployee(null);
    setError(null);
    setIsEditing(true);
    setEditedEmployee({
      emp_id: empId,
      country_code: '',
      emp_name: '',
      start_date: '',
      ambassador_name: '',
      is_delete: 0,
    });
  };

  return (
    <div>
      <h1>查詢派駐資料</h1>
      <input
        type="text"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        placeholder="輸入員工身分證字號"
      />
      <button onClick={handleSearch}>查詢</button>

      {error && (
        <div>
          <p style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
            {error}
          </p>
          {error.includes('是否新增') && (
            <button onClick={handleAddNew}>新增員工</button>
          )}
        </div>
      )}

      {(employee || isEditing) && (
        <div>
          <h2>{isEditing ? '新增 / 編輯員工資料' : '員工資料'}</h2>

          {isEditing ? (
            <div>
              {displayFields.map((field) => (
                <p key={field.key}>
                  {field.label}:{' '}
                  <input
                    type={field.type}
                    value={editedEmployee[field.key] || ''}
                    onChange={(e) =>
                      setEditedEmployee({
                        ...editedEmployee,
                        [field.key]: e.target.value,
                      })
                    }
                  />
                </p>
              ))}

              <button onClick={handleSave}>{employee ? '保存' : '新增'}</button>
              <button onClick={() => setIsEditing(false)}>取消</button>
            </div>
          ) : (
            <div>
              {displayFields.map((field) => (
                <p key={field.key}>
                  {field.label}: {employee[field.key]}
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

export default EmployeeSearch;
