// menuConfig.jsx
export const menuConfig = {
    Employee: {
      label: '員工基本資料',
      subMenu: [
        { key: 'search', label: '查詢員工資料' },
        { key: 'statistics', label: '統計' },
      ],
    },
    Country: {
      label: '國家資料',
      subMenu: [
        { key: 'search', label: '查詢國家資料' },
        { key: 'statistics', label: '統計' },
      ],
    },
    Employeeposting: {
        label: '員工派駐資料',
        subMenu: [
          { key: 'search', label: '查詢派駐資料' },
          { key: 'statistics', label: '統計' },
        ],
      },
      Familymembers: {
        label: '眷屬資料',
        subMenu: [
          { key: 'search', label: '查詢眷屬資料' },
          { key: 'statistics', label: '統計' },
        ],
      },
      IntegrationInterface: {
        label: '整合介面',
        subMenu: [
          { key: 'search', label: '派駐某一國家 30 歲以上之員工人數' },
          { key: 'search2', label: '駐某一洲共多少位員工' },
          { key: 'search3', label: '30 歲以上員工之平均眷屬年齡' },
          { key: 'search4', label: '30 歲以上員工之平均眷屬人數' },
  
        ],
      },
  };
