// pages/dashboard.tsx
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Set isOpen to false at the start
  const [selectedDrivetrain, setSelectedDrivetrain] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown state
  };

  const handleDrivetrainChange = (drivetrain: string) => {
    setSelectedDrivetrain(drivetrain); // Set the selected drivetrain
    setIsOpen(false); // Close the dropdown after selecting a drivetrain
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div
        id="image-dropdown"
        style={{
          display: 'inline-block',
          border: '1px solid',
          height: isOpen ? 'auto' : '30px', // Set height based on isOpen
          overflow: isOpen ? 'y-scroll' : 'hidden' // Set overflow based on isOpen
        }}
        onClick={toggleDropdown} // Toggle the dropdown when clicked
      >
        <div className="img_holder">
          <img
            className="flagimgs"
            src="/images/x-drive.jpg"
            alt="X-Drive"
            style={{ width: '50px', height: 'auto' }}
            onClick={() => handleDrivetrainChange('x-drive')} // Set selected drivetrain when clicked
          />
          <span className="iTEXT">X-Drive</span>
        </div>
        <div className="img_holder">
          <img
            className="flagimgs"
            src="/images/h-drive.jpg"
            alt="H-Drive"
            style={{ width: '50px', height: 'auto' }}
            onClick={() => handleDrivetrainChange('h-drive')} // Set selected drivetrain when clicked
          />
          <span className="iTEXT">H-Drive</span>
        </div>
      </div>
      {selectedDrivetrain && (
        <div>
          <h3>Selected Drivetrain: {selectedDrivetrain}</h3>
          {/* Render selected drivetrain image */}
          {selectedDrivetrain === 'x-drive' && (
            <img
              src="/images/x-drive.jpg"
              alt="X-Drive"
              style={{ width: '100px', height: 'auto' }}
            />
          )}
          {selectedDrivetrain === 'h-drive' && (
            <img
              src="/images/h-drive.jpg"
              alt="H-Drive"
              style={{ width: '100px', height: 'auto' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
