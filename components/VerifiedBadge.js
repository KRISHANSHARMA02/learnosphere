import { BadgeCheck } from 'lucide-react';

export default function VerifiedBadge({ isApproved }) {
  if (!isApproved) return null; // Agar approved nahi hai toh kuch mat dikhao

  return (
    <div className="relative group inline-block align-middle ml-1">
      {/* Blue Verified Icon */}
      <BadgeCheck 
        size={18} 
        className="text-blue-700 fill-blue-50 cursor-pointer" 
      />
      
      {/* Tooltip: Hover par dikhega */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-lg z-50 text-center animate-in fade-in zoom-in duration-200">
        This tutor is verified by our experts
        {/* Chhota sa arrow niche */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}