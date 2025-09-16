import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0F1C2E]/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-slate-100">
          🤖 AI네이티브 조직 진단
        </h1>
      </div>
    </header>
  );
};

export default Header;