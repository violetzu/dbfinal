import React, { useState } from 'react';

function FamilyMemberSearch() {
  const [empId, setEmpId] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFamilyMember, setEditedFamilyMember] = useState({});

  const displayFields = [
    { label: '員工 ID', key: 'emp_id', type: 'text' },
    { label: '家庭成員 ID', key: 'family_id', type: 'text' },
    { label: '成員姓名', key: 'family_name', type: 'text' },
    { label: '性別', key: 'family_gender', type: 'text' },
    { label: '關係', key: 'relationship', type: 'text' },
    { label: '生日', key: 'birth_date', type: 'date' },
  ];

  const handleSearch = async () => {
    try {
      const response = await fetch(`php/familymembers_search.php?id=${empId}`);
      const data = await response.json();
      setIsEditing(false);

      if (data.error === 'none') {
        setFamilyMembers([]);
        setError('查無此人，是否新增？');
      } else if (data.error === 'delete') {
        setFamilyMembers([]);
        setError('已刪除');
      } else {
        setFamilyMembers(data); // 更新家庭成員資料
        setError(null);
      }
    } catch (err) {
      console.error('查詢失敗', err);
      setError('查詢失敗，請稍後再試');
    }
  };

  const handleEdit = (member) => {
    setIsEditing(true);
    setEditedFamilyMember({ ...member });
  };

  const validateFields = () => {
    for (let field of displayFields) {
      const value = editedFamilyMember[field.key];
      if (value === undefined || value === '') {
        alert('所有欄位均為必填');
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const endpoint = editedFamilyMember.family_id
      ? 'php/familymembers_update.php'
      : 'php/familymembers_add.php';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedFamilyMember),
      });
      const result = await response.json();

      if (result.success) {
        alert(editedFamilyMember.family_id ? '資料更新成功' : '新增成功');
        setIsEditing(false);
        handleSearch(); // 重新查詢最新資料
      } else {
        alert(editedFamilyMember.family_id ? '資料更新失敗' : '新增失敗');
      }
    } catch (err) {
      console.error('操作失敗', err);
      alert(editedFamilyMember.family_id ? '資料更新失敗，請稍後再試' : '新增失敗，請稍後再試');
    }
  };

  const handleAddNew = () => {
    setError(null);
    setIsEditing(true);
    setEditedFamilyMember({
      emp_id: empId,
      family_id: '',
      family_name: '',
      family_gender: '',
      relationship: '',
      birth_date: '',
    });
  };

  return (
    <div>
      <h1>查詢眷屬資料</h1>
      <input
        type="text"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
        placeholder="輸入員工 ID"
      />
      <button onClick={handleSearch}>查詢</button>

      {error && (
        <div>
          <p style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>{error}</p>
          {error.includes('是否新增') && <button onClick={handleAddNew}>新增成員</button>}
        </div>
      )}

      {(familyMembers.length > 0 || isEditing) && (
        <div>
          <h2>{isEditing ? '新增 / 編輯家庭成員' : '家庭成員資料'}</h2>

          {isEditing ? (
            <div>
                {displayFields.map((field) => (
                <p key={field.key}>
                    {field.label}:{' '}
                    <input
                    type={field.type}
                    value={editedFamilyMember[field.key] || ''}
                    readOnly={
                        (field.key === 'emp_id' || field.key === 'family_id') && editedFamilyMember.family_id
                    } // 編輯狀態時不可編輯
                    onChange={(e) =>
                        setEditedFamilyMember({
                        ...editedFamilyMember,
                        [field.key]: e.target.value,
                        })
                    }
                    />
                </p>
                ))}
                <button onClick={handleSave}>{editedFamilyMember.family_id ? '保存' : '新增'}</button>
                <button onClick={() => setIsEditing(false)}>取消</button>
            </div>
            ) : (
            <div>
                {familyMembers.map((member) => (
                <div key={member.family_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                    {displayFields.map((field) => (
                    <p key={field.key}>
                        {field.label}: {member[field.key]}
                    </p>
                    ))}
                    <button onClick={() => handleEdit(member)}>編輯</button>
                </div>
                ))}
            </div>
            )}

        </div>
      )}
    </div>
  );
}

export default FamilyMemberSearch;
