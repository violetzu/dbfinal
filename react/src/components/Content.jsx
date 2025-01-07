// Content.jsx
import React from 'react';

function Content({ mainMenu, subMenu }) {
  try {
    const Page = React.lazy(() => import(`./${mainMenu}/${subMenu}.jsx`));

    return (
      <div className="content">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Page />
        </React.Suspense>
      </div>
    );
  } catch (error) {
    console.error('Dynamic import error:', error);
    return <div>Content not found.</div>;
  }
}

export default Content;
