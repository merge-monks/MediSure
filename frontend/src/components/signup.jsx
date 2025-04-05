import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { CheckCircle, User, Lock, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    specialty: "",
    licenseNumber: "",
    npiNumber: "",
    state: "",
    practiceName: "",
    practiceType: "",
    ehr: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    hipaaConsent: false,
    termsConsent: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.group('Medisure Signup Attempt');
      console.log('📝 Form Data:', formData);
      console.log('👤 User Details:', {
        name: `${formData.firstName} ${formData.lastName}`,
        professional: {
          title: formData.title,
          specialty: formData.specialty,
          licenseNumber: formData.licenseNumber,
          npiNumber: formData.npiNumber,
          state: formData.state
        },
        practice: {
          name: formData.practiceName,
          type: formData.practiceType,
          ehr: formData.ehr
        },
        account: {
          email: formData.email,
          passwordLength: formData.password ? formData.password.length : 0,
          passwordsMatch: formData.password === formData.confirmPassword
        },
        consents: {
          hipaa: formData.hipaaConsent,
          terms: formData.termsConsent
        }
      });
      console.groupEnd();

      if (!formData.firstName || !formData.lastName) {
        setError("First name and last name are required");
        return;
      }

      if (!formData.title) {
        setError("Professional title is required");
        return;
      }

      if (!formData.specialty) {
        setError("Specialty is required");
        return;
      }

      if (!formData.licenseNumber) {
        setError("Medical license number is required");
        return;
      }

      if (!formData.npiNumber) {
        setError("NPI number is required");
        return;
      }

      if (!formData.state) {
        setError("State/Jurisdiction is required");
        return;
      }

      if (!formData.practiceName) {
        setError("Practice/Hospital name is required");
        return;
      }

      if (!formData.practiceType) {
        setError("Practice type is required");
        return;
      }

      if (!formData.email) {
        setError("Email address is required");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      // Password strength validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      if (!passwordRegex.test(formData.password)) {
        setError("Password must include uppercase, lowercase, numbers, and special characters");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!formData.hipaaConsent) {
        setError("You must agree to HIPAA compliance terms");
        return;
      }

      if (!formData.termsConsent) {
        setError("You must agree to Terms of Service and Privacy Policy");
        return;
      }

      const result = await signupUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        title: formData.title,
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        npiNumber: formData.npiNumber,
        state: formData.state,
        practiceName: formData.practiceName,
        practiceType: formData.practiceType,
        ehr: formData.ehr,
        termsConsent: formData.termsConsent,
        hipaaConsent: formData.hipaaConsent
      });

      console.log("Signup successful:", result);

      // Store auth information in localStorage to persist between page refreshes
      if (result && (result.result || result.userId)) {
        localStorage.setItem('authToken', 'auth-token');
        localStorage.setItem('userId', result.result || result.userId);
      }

      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Signup error:", err);
      
      if (err.response) {
        if (err.response.status === 409) {
          setError('An account with this email already exists.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(`Error ${err.response.status}: ${err.response.statusText || 'Something went wrong'}`);
        }
      } else if (err.request) {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else if (err.message && (err.message.includes('JSON') || err.message.includes('Unexpected token'))) {
        // JSON parsing error - received HTML instead of JSON
        setError('Server returned an invalid response. The server might be temporarily unavailable.');
        console.warn('Received non-JSON response, likely HTML error page');
      } else {
        // Default error message
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left side - Branding (fixed) */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
        <div className="max-w-lg">
          <div className="flex items-center mb-8">
            <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md flex items-center justify-center">
              <div className="h-6 w-6 pb-2 text-3xl flex items-center justify-center font-extrabold leading-none m">
                +
              </div>
            </div>
            <h1 className="ml-3 font-bold text-2xl tracking-tight">Medisure</h1>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Welcome to your healthcare dashboard
          </h2>
          <p className="text-cyan-100 text-lg mb-10">
            Access your medical records, view test results, and manage patient
            care all in one secure platform.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-cyan-500 bg-opacity-30 p-2 rounded-lg mr-4">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Secure Access</h3>
                <p className="text-cyan-100 text-sm">
                  Advanced encryption and security protocols to protect patient
                  data
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-cyan-500 bg-opacity-30 p-2 rounded-lg mr-4">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Centralized Records</h3>
                <p className="text-cyan-100 text-sm">
                  All patient information and test results available in one
                  place
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-cyan-500 bg-opacity-30 p-2 rounded-lg mr-4">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">AI-Powered Analysis</h3>
                <p className="text-cyan-100 text-sm">
                  Deep learning-driven image analysis for accurate and efficient
                  medical diagnoses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Scrollable form */}
      <div className="lg:w-1/2 overflow-y-auto bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="flex justify-center items-start p-8 lg:p-16">
          <div className="w-full max-w-xl">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  Create your Medisure account
                </h2>
                <p className="text-slate-500 mt-2">
                  Enter your credentials to access your secure medical dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Personal Information Section */}
                  <h3 className="font-semibold text-slate-700">
                    Professional Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Professional Title
                    </label>
                    <select
                      id="title"
                      name="title"
                      required
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select your title</option>
                      <option value="MD">MD - Doctor of Medicine</option>
                      <option value="DO">
                        DO - Doctor of Osteopathic Medicine
                      </option>
                      <option value="MBBS">MBBS - Bachelor of Medicine</option>
                      <option value="PA">PA - Physician Assistant</option>
                      <option value="NP">NP - Nurse Practitioner</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="specialty"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Specialty
                      </label>
                      <select
                        id="specialty"
                        name="specialty"
                        required
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select your specialty</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="emergency">Emergency Medicine</option>
                        <option value="family">Family Medicine</option>
                        <option value="internal">Internal Medicine</option>
                        <option value="neurology">Neurology</option>
                        <option value="obgyn">Obstetrics & Gynecology</option>
                        <option value="oncology">Oncology</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="radiology">Radiology</option>
                        <option value="surgery">Surgery</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="licenseNumber"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Medical License Number
                      </label>
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        required
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="e.g. A123456"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="npiNumber"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        NPI Number
                      </label>
                      <input
                        id="npiNumber"
                        name="npiNumber"
                        type="text"
                        required
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="10-digit NPI number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        State/Jurisdiction
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select state</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OR">Odisha</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="UK">Uttarakhand</option>
                        <option value="WB">West Bengal</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="CH">Chandigarh</option>
                        <option value="DH">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="DL">Delhi</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="LA">Ladakh</option>
                        <option value="LD">Lakshadweep</option>
                        <option value="PY">Puducherry</option>
                      </select>
                    </div>
                  </div>

                  {/* Practice Information */}
                  <h3 className="font-semibold text-slate-700 mt-6">
                    Practice Information
                  </h3>

                  <div>
                    <label
                      htmlFor="practiceName"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Practice/Hospital Name
                    </label>
                    <input
                      id="practiceName"
                      name="practiceName"
                      type="text"
                      required
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="e.g. City Medical Center"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="practiceType"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Practice Type
                    </label>
                    <select
                      id="practiceType"
                      name="practiceType"
                      required
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select practice type</option>
                      <option value="solo">Solo Practice</option>
                      <option value="group">Group Practice</option>
                      <option value="hospital">Hospital</option>
                      <option value="academic">Academic Medical Center</option>
                      <option value="community">Community Health Center</option>
                      <option value="telehealth">Telehealth</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ehr"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Current EHR/EMR System
                    </label>
                    <select
                      id="ehr"
                      name="ehr"
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      <option value="">
                        Select your EHR system (if applicable)
                      </option>
                      <option value="epic">Epic</option>
                      <option value="cerner">Cerner</option>
                      <option value="allscripts">Allscripts</option>
                      <option value="eclinicalworks">eClinicalWorks</option>
                      <option value="nextgen">NextGen</option>
                      <option value="athena">athenahealth</option>
                      <option value="meditech">MEDITECH</option>
                      <option value="other">Other</option>
                      <option value="none">None</option>
                    </select>
                  </div>

                  {/* Account Information */}
                  <h3 className="font-semibold text-slate-700 mt-6">
                    Account Information
                  </h3>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Professional Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-slate-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="doctor@hospital.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-700 mb-1 flex justify-between"
                    >
                      <span>Password</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-slate-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        onChange={handleChange}
                        className="block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Create a secure password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Password must contain at least 8 characters, including
                      uppercase, lowercase, numbers, and special characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-slate-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        onChange={handleChange}
                        className="block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Confirm your password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    {error && (
                      <div className="text-red-500 text-sm font-medium py-2 px-3 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start mt-4">
                    <div className="flex items-center h-5">
                      <input
                        id="hipaaConsent"
                        name="hipaaConsent"
                        type="checkbox"
                        checked={formData.hipaaConsent}
                        onChange={handleChange}
                        required
                        className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-slate-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="hipaaConsent"
                        className="font-medium text-slate-700"
                      >
                        I understand that Medisure complies with HIPAA
                        regulations and I agree to maintain patient
                        confidentiality
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start mt-2">
                    <div className="flex items-center h-5">
                      <input
                        id="termsConsent"
                        name="termsConsent"
                        type="checkbox"
                        checked={formData.termsConsent}
                        onChange={handleChange}
                        required
                        className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-slate-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="termsConsent"
                        className="font-medium text-slate-700"
                      >
                        I agree to the Terms of Service and Privacy Policy
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-cyan-600 hover:text-cyan-700"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                By signing up, you agree to our{" "}
                <a href="#" className="text-cyan-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-cyan-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Medisure is fully HIPAA-compliant and committed to protecting
                your data and patient information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
