import{r as a,j as e}from"./index-Cr8WPmXE.js";function i(){const[t,s]=a.useState(null),n=async()=>{const r=await(await fetch("php/queryAverageFamilyCount.php")).json();s(r)};return e.jsxs("div",{children:[e.jsx("h2",{children:"查詢 30 歲以上員工之平均眷屬人數"}),e.jsx("button",{onClick:n,children:"查詢"}),t&&e.jsxs("p",{children:["結果：",t.averageCount," 人"]})]})}export{i as default};
