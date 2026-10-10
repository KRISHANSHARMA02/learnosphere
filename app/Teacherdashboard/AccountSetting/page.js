"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const Account = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="px-8 mt-5 flex flex-col z-50 gap-4 font-Poppins min-h-screen">
      <h1 className="font-bold text-[1.5em]">Delete Account</h1>
      <p className="text-gray-800">
        Deleting your account is a permanent action and cannot be undone. Once
        you proceed with deletion, you will lose access to your profile, saved
        preferences, and all associated services. If you are facing any issues,
        we recommend reaching out to our support team before making this
        decision.
      </p>
      <p className="text-gray-800">
        To delete your account, go to the settings section, select "Delete
        Account," and confirm your choice. After deletion, you will no longer be
        able to log in or retrieve any data linked to your account. If you need
        assistance, feel free to contact our support team for help.
      </p>
      <p className="text-gray-800">
        Please note that while your account will be deleted, some of your data
        may be retained for record-keeping or legal purposes. This ensures
        compliance with our policies and helps maintain system integrity. If you
        decide to return in the future, you will need to create a new account,
        as the previous one cannot be restored.
      </p>
      <div>
        <button
          className="p-3 flex gap-1 rounded-xl bg-red-500 text-white"
          onClick={() => setShowPopup(true)}
        >
          <MdDeleteOutline size={20} />
          Delete Account
        </button>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-700 mb-4">
              Deleting your account will permanently remove all your data. This
              action cannot be undone. If you proceed, you will no longer have
              access to your profile or any saved information.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <Link href = "/Teacherdashboard/DeleteAccount">
              <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              
              >
              Delete Account
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
