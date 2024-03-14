// pages/dashboard.tsx
import React, { useState } from 'react';
import axios from 'axios';

const teaminformation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Set isOpen to false at the start
  const [selectedDrivetrain, setSelectedDrivetrain] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown state
  };

  const handleSaveDrivetrain = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send the selected drivetrain to the backend to save it to the database
      await axios.post('https://techtally.silvsam.com/api/drivetrains', { drivetrain: selectedDrivetrain });
      console.log('Drivetrain saved successfully!');
    } catch (error) {
      console.error('Error saving drivetrain:', error);
    }
  };

  const handleDrivetrainChange = (drivetrain: string) => {
    setSelectedDrivetrain(drivetrain); // Set the selected drivetrain
    setIsOpen(false); // Close the dropdown after selecting a drivetrain
  };

  return (
    <div>
      <h1>Team Information</h1>
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
      <button onClick={handleSaveDrivetrain}>Save Drivetrain</button>
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

export default teaminformation;
