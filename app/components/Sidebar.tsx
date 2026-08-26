import React from 'react'

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
        <>
      {/* overlay on mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 shrink-0 transform border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out dark:border-white/10 dark:bg-slate-950 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* sidebar content/nav links go here */}
        <ul className="space-y-2">
            <li className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">Home</li>
            <li className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">Profile</li>
            <li className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">Settings</li>
            <li className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">Logout</li>
        </ul>
      </aside>
      </>
  )
}
export default Sidebar