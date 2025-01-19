import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Static posts data (Example feed)
  const feedData = [
    {
      id: 1,
      title: "Classic Haircut",
      description: "Get a stylish classic haircut with our expert barbers.",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/be5c/4e8a/c123c2562bbf98004fbf16d2e21e5802?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hBl3D1fqIE4uQnlxPFdZAXigvRG16eRhSoEHsmCWdUri7Qc26neFD1mh9p1SpHVCA2tOHTDNbBsCDOd1hmTGo-lCE-b~ZPEDGgva0YTWACLivLSQth23zSOZehfUlnrRjzNaaHcj7f8VYumTVoHIGI3BWkF3ptufCzODDlt4D2aY1-ZPpFmo4Hxt9Fz8vIBPKEtkfa3-wYhmLB-i~UVXaSKm0TSvHI9QE1dkNySnR7VgRypeuvaT5Ba1EE7dGbpHvz~Tk38e~psXHScxUEZuSGEEzx5qPnJm7A455vpkHV-USbUwGONCuHtYIZdokDf4tpfnHvat3TyHzEBYAQVohA__",
    },
    {
      id: 2,
      title: "Shaving & Beard Grooming",
      description: "Perfect your beard with our grooming services.",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/be5c/4e8a/c123c2562bbf98004fbf16d2e21e5802?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hBl3D1fqIE4uQnlxPFdZAXigvRG16eRhSoEHsmCWdUri7Qc26neFD1mh9p1SpHVCA2tOHTDNbBsCDOd1hmTGo-lCE-b~ZPEDGgva0YTWACLivLSQth23zSOZehfUlnrRjzNaaHcj7f8VYumTVoHIGI3BWkF3ptufCzODDlt4D2aY1-ZPpFmo4Hxt9Fz8vIBPKEtkfa3-wYhmLB-i~UVXaSKm0TSvHI9QE1dkNySnR7VgRypeuvaT5Ba1EE7dGbpHvz~Tk38e~psXHScxUEZuSGEEzx5qPnJm7A455vpkHV-USbUwGONCuHtYIZdokDf4tpfnHvat3TyHzEBYAQVohA__",
    },
    {
      id: 3,
      title: "Luxury Facial",
      description: "Relax and rejuvenate with our luxury facial treatments.",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/be5c/4e8a/c123c2562bbf98004fbf16d2e21e5802?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hBl3D1fqIE4uQnlxPFdZAXigvRG16eRhSoEHsmCWdUri7Qc26neFD1mh9p1SpHVCA2tOHTDNbBsCDOd1hmTGo-lCE-b~ZPEDGgva0YTWACLivLSQth23zSOZehfUlnrRjzNaaHcj7f8VYumTVoHIGI3BWkF3ptufCzODDlt4D2aY1-ZPpFmo4Hxt9Fz8vIBPKEtkfa3-wYhmLB-i~UVXaSKm0TSvHI9QE1dkNySnR7VgRypeuvaT5Ba1EE7dGbpHvz~Tk38e~psXHScxUEZuSGEEzx5qPnJm7A455vpkHV-USbUwGONCuHtYIZdokDf4tpfnHvat3TyHzEBYAQVohA__",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out successfully!");
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Navbar token={token} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16">
                <h1 className="text-4xl font-bold text-[#D9B061] mb-6 text-center">
                  Salonku Booking
                  <br />
                  Online
                </h1>
                <div className=" bg-[#D9B061] p-12 rounded-3xl w-full max-w-4xl mt-12 shadow-lg">
                  {!token && (
                    <div className="mt-12">
                      <p className="text-lg mb-6 text-white">
                        Please log in or register to get started with your
                        appointments.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Link
                          to="/login"
                          className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                  {token && (
                    <div className="mt-12">
                      <p className="text-lg mb-6 text-gray-600">
                        You are logged in.
                      </p>
                      <Link
                        to="/profile"
                        className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition"
                      >
                        Go to your Profile
                      </Link>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-6">Feeds</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {feedData.length > 0 ? (
                      feedData.map((post) => (
                        <div
                          key={post.id}
                          className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition duration-300"
                        >
                          <img
                            src={
                              post.imageUrl || "https://via.placeholder.com/300"
                            }
                            alt="Salon"
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">
                              {post.description}
                            </p>
                            <Link
                              to={`/appointments/${post.id}`}
                              className="text-teal-500 hover:underline mt-4 block"
                            >
                              View Appointment Details
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No appointments available at the moment.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
