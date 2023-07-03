import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create_UpdateById } from '../../redux/reducers/patientsSlice';


const PatientSignupForm = () => {
  const dispatch = useDispatch();
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');//setConfirmPassword
  const [confirmPassword, setConfirmPassword] = useState('');//setConfirmPassword
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!patientName.trim()) {
      errors.patientName = 'Patient name is required';
    }

    if (!patientAge.trim()) {
      errors.patientAge = 'Patient age is required';
    } else if (isNaN(patientAge)) {
      errors.patientAge = 'Invalid age';
    }

    if (!gender) {
      errors.gender = 'Gender is required';
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
    }

    if (!address.trim()) {
      errors.address = 'Address is required';
    }

    if (showCredentials) {
      if (!username.trim()) {
        errors.username = 'Username is required';
      } else if (username.includes(' ')) {
        errors.username = 'Username should not contain spaces';
      }

      if (!password.trim()) {
        errors.password = 'Password is required';
      } else if (password.length < 4) {
        errors.password = 'Password must be at least 4 characters long';
      }
      if (!confirmPassword.trim()) {
        errors.confirmPassword = 'confirm Password is required';
      } else if (confirmPassword.trim() !== password.trim()) {
        errors.confirmPassword = 'passwords not matching';
      }
    }

    return errors;
  };

  const handlePatientDetailsSubmit = () => {
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setShowCredentials(true);
  };

  const handleSignup = () => {
    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let fieldObj = {
      role: 'patient',
      patient_name: patientName, patient_age: patientAge, patient_gender: gender, contact_number: contactNumber, address: address, username, password
    }
    dispatch(create_UpdateById({ data: fieldObj }));
  };

  const handleGoBack = () => {
    setShowCredentials(false);
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {!showCredentials ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Patient Signup</h2>
          <div className="mb-4">
            <label htmlFor="patientName" className="block mb-2 text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.patientName ? 'border-red-500' : ''
                }`}
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            {errors.patientName && <p className="text-red-500 mt-1">{errors.patientName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="patientAge" className="block mb-2 text-gray-700">
              Patient Age
            </label>
            <input
              type="text"
              id="patientAge"
              name="patientAge"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.patientAge ? 'border-red-500' : ''
                }`}
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
            {errors.patientAge && <p className="text-red-500 mt-1">{errors.patientAge}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2 text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.gender ? 'border-red-500' : ''
                }`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 mt-1">{errors.gender}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block mb-2 text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contactNumber ? 'border-red-500' : ''
                }`}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            {errors.contactNumber && <p className="text-red-500 mt-1">{errors.contactNumber}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2 text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? 'border-red-500' : ''
                }`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handlePatientDetailsSubmit}
          >
            Next
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Patient Signup</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''
                }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <input
              type='password'
              id="password"
              name="password"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''
                }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''
                }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!!errors && errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleSignup}
          >
            Signup
          </button>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 font-semibold mt-2"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default PatientSignupForm;