import{r as e,j as n}from"./index-Cr8WPmXE.js";function d(){const[c,r]=e.useState([]),[i,u]=e.useState(""),[a,p]=e.useState(null);e.useEffect(()=>{(async()=>{const o=await(await fetch("php/getContinentList.php")).json();r(o)})()},[]);const l=async t=>{t.preventDefault();const o=await(await fetch(`php/queryByContinent.php?continent=${i}`)).json();p(o)};return n.jsxs("div",{children:[n.jsx("h2",{children:"查詢派駐某一洲之員工總數"}),n.jsxs("form",{onSubmit:l,children:[n.jsx("select",{value:i,onChange:t=>u(t.target.value),children:c.map((t,s)=>n.jsx("option",{value:t.continent_name,children:t.continent_name},s))}),n.jsx("button",{type:"submit",children:"查詢"})]}),a&&n.jsxs("p",{children:["結果：",a.count," 人"]})]})}export{d as default};
