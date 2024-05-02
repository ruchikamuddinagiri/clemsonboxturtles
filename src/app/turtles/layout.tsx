// turtles layout.tsx which has the form
'use client'
import React, { useEffect, useState, useRef } from 'react';

import '../../../globals.css'

type FormDataType = {
  name: string,
  gpsEnabled: string;
  willingToTakePicture: string;
  picture: Blob | null;
  furtherInformation: string;
  currentWeather: string;
  activityState: string;
  habitat: string;
  encounter: string;
  otherEncounterDetails: string;
  latitude: string;
  longitude: string;
};

const MyForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    gpsEnabled: '',
    willingToTakePicture: '',
    furtherInformation: '',
    picture: null,
    currentWeather: '',
    activityState: '',
    habitat: '',
    encounter: '',
    otherEncounterDetails: '',
    latitude:'',
    longitude: ''
    // ... other form data
  });

  // ... handlers for onChange and onSubmit

  const [currentPage, setCurrentPage] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToNextPage = () => {
    if (formData.furtherInformation === 'yes') {
      setCurrentPage(2);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const name = pathParts[pathParts.length - 1]; // Last part of the path
    setFormData({...formData, name: name });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();

    const postData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        postData.append(key, value);
      }
    });

    let updatedFormData = {}
    
    if (formData.gpsEnabled === 'yes') {
      // If GPS is enabled, get location
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            
            setFormData({ ...formData, 
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString()
             })
            
          },
          (error) => {
            console.error('Error getting location:', error);
             // Continue without location if GPS fails
          }
        );
      } else {
        console.error('Geolocation is not available');
       // Continue without location if geolocation is not available
      }
    } else {
      // If GPS is not enabled, proceed without location
      // processFormData();
      console.log("GPS is not enabled")
    }
    
    console.log(formData)
    

    try {
      const response = await fetch('/turtles/api/form/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      })

      console.log('Response:', response);

    } catch (error) {
      console.error('Error posting form data:', error);
    }

    
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setImage(reader.result as string);
        const response = await fetch(reader.result as string);
        const blob = await response.blob();
        setFormData({ ...formData, picture: blob })
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = () => {
    setCameraVisible(true);
    setImage(null);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      });
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setImage(dataURL);
        fetch(dataURL)
          .then((res) => res.blob())
          .then((blob) => setFormData({ ...formData, picture: blob }));
    
      }
      // Stop the camera and hide the video element
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setCameraVisible(false);
    }
  };

  const handleOkClick = () => {
    // Simply hide the overlay
    setCameraVisible(false);
    setImage(null);
  };

  // <div className="text-center mb-8">
  //       <h1 className="text-3xl font-bold text-gray-800">Hi, I am {formData.name}</h1>
  //       <img src="/turtle-gif.gif" alt="Dancing Turtle" className="mx-auto" />
  //     </div>

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded">
      
      
      <h1 className="text-2xl font-bold text-gray-700 mb-4">You&apos;ve found a turtle from the Clemson-Area Backyard Turtle Project!</h1>
      <p className="mb-8 text-gray-600">Thanks for scanning this Eastern Box Turtle! This turtle is a part of an ongoing Clemson University project through the Forestry and Environmental Conservation department. Dr. Kyle Barrett is the faculty member heading the project. Reach out to him via email if you have questions!</p>

      
      <form className="space-y-6"  onSubmit={handleSubmit}>
      {currentPage === 1 && (
          <div>
        {/* GPS Record Question */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Are you willing to enable GPS to record the turtle&apos;s location?
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
            disabled={formData.willingToTakePicture !== 'yes'} 
            onChange={handleFileChange}
          />
        </div>

        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={startCamera}
          disabled={formData.willingToTakePicture !== 'yes'}
        >
          Take Picture
        </button>
        
        

        {/* Further Information Section */}
        {/* Further Information Section */}
        
        <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Are you willing to enter further information?</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="furtherInformation"
                  value="yes"
                  checked={formData.furtherInformation === 'yes'}
                  onChange={(e) => setFormData({ ...formData, furtherInformation: e.target.value })}
                />
                <label className="ml-2 block text-sm text-gray-700">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="furtherInformation"
                  value="no"
                  checked={formData.furtherInformation === 'no'}
                  onChange={(e) => setFormData({ ...formData, furtherInformation: e.target.value })}
                />
                <label className="ml-2 block text-sm text-gray-700">No</label>
              </div>
            </div>
        
        

            {formData.furtherInformation === 'yes' ? (
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                onClick={goToNextPage}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Submit
              </button>
            )}

            </div>
            )}  

        {/* Additional sections for current weather, activity state, habitat, and encounter */}
        {/* ... */}

        {currentPage === 2 && (
          <div>
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

      {/* Pagination Button */}
      <button
              type="button"
              className="mt-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
              onClick={goToPreviousPage}
            >
              Back
            </button>

        {/* Submit Button */}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Submit
        </button>

        </div>
        )}

      </form>
      {cameraVisible && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-20">
          <video ref={videoRef} className="w-full max-w-lg rounded-lg shadow-md" />
          <button
            className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={capturePhoto}
          >
            Capture Photo
          </button>
        </div>
      )}
      {image && !cameraVisible && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-20">
          <img src={image} alt="Captured Turtle" className="max-w-lg rounded-lg shadow-md" />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={startCamera}
          >
            Retake Picture
          </button>
          <button
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={handleOkClick}
            >
              OK
            </button>
        </div>
      )}
      {/* {image && (
        <div className="mt-6 relative z-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Uploaded or Captured Image:</h2>
          <img src={image} alt="Turtle" className="max-w-full rounded-lg shadow-md" />
        </div>
      )} */}
    </div>
  );
};


export default function TurtleLayout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('Turtle');

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const nameFromPath = pathParts[pathParts.length - 1] || 'Turtle';
    setName(nameFromPath);
  }, []);

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded">
      {children}
      <MyForm />
      
    </div>
  );
}