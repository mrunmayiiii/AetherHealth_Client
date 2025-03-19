import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Pencil, Calendar, Eye } from "lucide-react";
import { IconType } from "react-icons";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${isOpen ? "w-56" : "w-16"}`}>
      <button className="p-4" onClick={() => setIsOpen(!isOpen)}>
        <Menu size={24} />
      </button>
      <nav className="mt-4 flex flex-col space-y-4">
        <SidebarItem to="/edit-prescriptions" icon={Pencil} label="Edit Prescriptions" isOpen={isOpen} />
        <SidebarItem to="/schedule-appointments" icon={Calendar} label="Schedule Appointments" isOpen={isOpen} />
        <SidebarItem to="/view-appointments" icon={Eye} label="View Appointments" isOpen={isOpen} />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: IconType; // Ensures icon is a valid React component
  label: string;
  isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon: Icon, label, isOpen }) => (
  <Link to={to} className="flex items-center px-4 py-2 hover:bg-gray-700">
    <Icon size={20} /> {/* Ensure the icon is used correctly */}
    {isOpen && <span className="ml-3">{label}</span>}
  </Link>
);

export default Sidebar;
