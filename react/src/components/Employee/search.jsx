import React, { useState } from 'react';

function EmployeeSearch() {
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  const displayFields = [
    { label: '姓名', key: 'emp_name', type: 'text' },
    { label: '性別', key: 'gender', type: 'text' },
    { label: '職等', key: 'job_grade', type: 'text' },
    { label: '電話', key: 'phone', type: 'text' },
    { label: '薪資', key: 'salary', type: 'number' },
    { label: '生日', key: 'birth_date', type: 'date' },
    { label: '入職日期', key: 'hire_date', type: 'date' },
    { label: '住址', key: 'address', type: 'text' },
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch(`php/employee_search.php?emp_id=${empId}`);
      const data = await response.json();
      setIsEditing(false);

      if (data.error === 'none') {
        setEmployee(null);
        setError('查無此人，是否新增？');
      } else if (data.error === 'delete') {
        setEmployee(null);
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
      if (!value) {
        alert('所有欄位均為必填');
        return false;
      }
    }
    if (!/^[0-9]+$/.test(editedEmployee.phone)) {
      alert('電話欄位僅可包含數字');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
  
    try {
      const formData = new FormData();
  
      // 添加欄位資料到 FormData
      Object.keys(editedEmployee).forEach((key) => {
        if (key === 'photo' && editedEmployee.photo instanceof File) {
          // 如果是檔案，添加檔案
          formData.append('photo', editedEmployee.photo);
        } else {
          // 添加其他欄位資料
          formData.append(key, editedEmployee[key]);
        }
      });
  
      const response = await fetch('php/employee_update.php', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (result.success) {
        setEmployee({
          ...editedEmployee,
          photo: result.photo || editedEmployee.photo, // 更新 photo 為後端返回的檔案名稱
        });
        setIsEditing(false);
        alert('資料更新成功');
      } else {
        alert(`資料更新失敗: ${result.error || '未知錯誤'}`);
      }
    } catch (err) {
      console.error('操作失敗', err);
      alert('操作失敗，請稍後再試');
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`php/employee_delete.php?emp_id=${empId}`);
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
      emp_name: '',
      gender: '',
      job_grade: '',
      phone: '',
      salary: '',
      birth_date: '',
      hire_date: '',
      address: '',
      photo: null,
    });
  };

  return (
    <div>
      <h1>查詢員工資料</h1>
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
              <p>
                照片:{' '}
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setEditedEmployee({ ...editedEmployee, photo: file });
                    }
                  }}
                />
              </p>
              {editedEmployee.photo && (
                <div>
                  <p>照片預覽:</p>
                  <img
                    src={
                      editedEmployee.photo instanceof File
                        ? URL.createObjectURL(editedEmployee.photo)
                        : `photo/${editedEmployee.photo}`
                    }
                    alt="照片預覽"
                    style={{
                      width: '150px',         
                      objectFit: 'cover',     
                      borderRadius: '8px',  
                    }}
                    
                  />
                </div>
              )}
              <button onClick={handleSave}>
                {employee ? '保存' : '新增'}
              </button>
              <button onClick={() => setIsEditing(false)}>取消</button>
            </div>
          ) : (
            <div>
              {displayFields.map((field) => (
                <p key={field.key}>
                  {field.label}: {employee[field.key]}
                </p>
              ))}
              {employee.photo && (
                <div>
                  <p>照片:</p>
                  <img
                    src={`photo/${employee.photo}`}
                    alt="員工照片"
                    style={{
                      width: '150px',         
                      objectFit: 'cover',     
                      borderRadius: '8px',  
                    }}
                    
                    
                  />
                </div>
              )}
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
