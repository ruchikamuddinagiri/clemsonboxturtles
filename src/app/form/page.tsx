'use client'
import React, { useState } from 'react';

import '../../../globals.css'
// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     gpsEnabled: false,
//     photo: null,
//     // ...other form fields
//   });

//   return (
//     <div className="container mx-auto p-8 bg-white shadow-md rounded">
//         <h1 className="text-2xl font-bold text-gray-700 mb-4">You've found a turtle from the Clemson-Area Backyard Turtle Project!</h1>
// <p className="mb-8 text-gray-600">Thanks for scanning this Eastern Box Turtle! This turtle is a part of an ongoing Clemson University project through the Forestry and Environmental Conservation department. Dr. Kyle Barrett is the faculty member heading the project. Reach out to him via email if you have questions!</p>
// <label className="block text-gray-700 text-sm font-semibold mb-2">
//   Are you willing to enable GPS to record the turtle's location?
// </label>
// <div className="flex items-center mb-4">
//   <input id="gps_yes" name="gps" type="radio" className="form-radio h-4 w-4 text-blue-600" checked />
//   <label htmlFor="gps_yes" className="ml-2 block text-sm text-gray-700">
//     Yes, enable
//   </label>
// </div>
// <div className="flex items-center mb-4">
//   <input id="gps_no" name="gps" type="radio" className="form-radio h-4 w-4 text-blue-600" />
//   <label htmlFor="gps_no" className="ml-2 block text-sm text-gray-700">
//     No, do not enable
//   </label>
// </div>
// <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
//   Submit
// </button>
// <div className="mb-4">
//   <label className="block text-gray-700 text-sm font-semibold mb-2">
//     Please upload your photo of the turtle here.
//   </label>
//   <input type="file" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
// </div>

//     </div>
//   )
// }

const MyForm = () => {
  const [formData, setFormData] = useState({
    gpsEnabled: '',
    willingToTakePicture: '',
    picture: null,
    furtherInformation: '',
    currentWeather: '',
    activityState: '',
    habitat: '',
    encounter: '',
    otherEncounterDetails: '',
    // ... other form data
  });

  // ... handlers for onChange and onSubmit

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const postData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        postData.append(key, value);
      }
    });

    console.log(formData)

    try {


      const response = await fetch('/form/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      })

      console.log('Response:', response);

    } catch (error) {
      console.error('Error posting form data:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">You've found a turtle from the Clemson-Area Backyard Turtle Project!</h1>
      <p className="mb-8 text-gray-600">Thanks for scanning this Eastern Box Turtle! This turtle is a part of an ongoing Clemson University project through the Forestry and Environmental Conservation department. Dr. Kyle Barrett is the faculty member heading the project. Reach out to him via email if you have questions!</p>

      <form className="space-y-6"  onSubmit={handleSubmit}>
        {/* GPS Record Question */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Are you willing to enable GPS to record the turtle's location?
          </label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="gpsEnabled"
              value="yes"
              // Checked attribute binds this input to the state
              checked={formData.gpsEnabled === 'yes'}
              onChange={(e) => setFormData({ ...formData, gpsEnabled: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">
              Yes, enable
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="gpsEnabled"
              value="no"
              checked={formData.gpsEnabled === 'no'}
              onChange={(e) => setFormData({ ...formData, gpsEnabled: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">
              No, do not enable
            </label>
          </div>
        </div>

        {/* Willing to Take Picture Question */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Are you willing to take a picture of the turtle?
          </label>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="willingToTakePicture"
              value="yes"
              checked={formData.willingToTakePicture === 'yes'}
              onChange={(e) => setFormData({ ...formData, willingToTakePicture: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="willingToTakePicture"
              value="no"
              checked={formData.willingToTakePicture === 'no'}
              onChange={(e) => setFormData({ ...formData, willingToTakePicture: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">
              No
            </label>
          </div>
        </div>

        {/* Upload Photo Section */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Please upload your photo of the turtle here.
          </label>
          <input type="file" className="form-control block w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
          />
        </div>

        {/* Further Information Section */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Are you willing to enter further information?
          </label>
          {/* ...additional inputs similar to the ones above */}
        </div>

        {/* Additional sections for current weather, activity state, habitat, and encounter */}
        {/* ... */}
        <div>
        <p className="text-lg font-semibold mb-2">What is the current weather outside?</p>
        {/* Map over an array of options if they are dynamic or repeated */}
        {['Sunny, no clouds', 'Overcast, partially cloudy', 'Completely overcast, fully cloudy', 'Lightly raining', 'Heavily raining'].map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="currentWeather"
              value={option}
              checked={formData.currentWeather === option}
              onChange={(e) => setFormData({ ...formData, currentWeather: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">{option}</label>
          </div>
        ))}
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">What is the activity state of the turtle?</p>
        {['Actively moving', 'Crossing a road', 'Partially buried'].map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="activityState"
              value={option}
              checked={formData.activityState === option}
              onChange={(e) => setFormData({ ...formData, activityState: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">{option}</label>
          </div>
        ))}
      </div>
      <div>
        <p className="text-lg font-semibold mb-2">What habitat is the turtle in?</p>
        {['Forest/woods', 'Open field', 'Maintained lawn near house', 'Roadside/in the road', 'By a creek/river/pond'].map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="habitat"
              value={option}
              checked={formData.habitat === option}
              onChange={(e) => setFormData({ ...formData, habitat: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">{option}</label>
          </div>
        ))}
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">How did you encounter this turtle?</p>
        {['I was driving', 'I was walking/hiking', 'I was doing yard work', 'Other'].map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-600"
              name="encounter"
              value={option}
              checked={formData.encounter === option}
              onChange={(e) => setFormData({ ...formData, encounter: e.target.value })}
            />
            <label className="ml-2 block text-sm text-gray-700">{option}</label>
          </div>
        ))}
        {/* Include an input for 'Other' option if needed */}
        {formData.encounter === 'Other' && (
          <input
            type="text"
            className="form-input mt-2 block w-full border border-gray-300 rounded py-2 px-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please specify"
            onChange={(e) => setFormData({ ...formData, otherEncounterDetails: e.target.value })}
          />
        )}
      </div>

        {/* Submit Button */}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;

