// components/form/deleteConfirmation.js
import React from 'react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1050">
      <div className="confirmation-dialog bg-white p-5 rounded flex flex-col space-y-2.5">
        <h2>Delete Record</h2>
        <p>You are going to delete a record from the database. Are you sure?</p>
        <div className="flex justify-end space-x-2.5">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
