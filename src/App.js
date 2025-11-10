import React, { useState, useEffect } from "react";
import CustomDropdown from "./component/ui-lib/Dropdown";
import { BASE_URL } from "./config/config";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // ==========================
  // Fetch All Countries
  // ==========================
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/countries`);
        // if (!res.ok) throw new Error("Country API failed");
        const data = await res.json();
        console.log(data)
        setCountries(data || []);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  // ==========================
  // Fetch States by Country
  // ==========================
  useEffect(() => {
    if (!selectedCountry) return;

    const fetchStates = async () => {
      setLoadingStates(true);
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");

      try {
        const res = await fetch(`${BASE_URL}/country=${selectedCountry}/states`);
        if (!res.ok) throw new Error("State API failed");
        const data = await res.json();
        setStates(data || []);
      } catch (error) {
        console.error("Failed to fetch states:", error);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  // ==========================
  // Fetch Cities by State
  // ==========================
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    const fetchCities = async () => {
      setLoadingCities(true);
      setCities([]);
      setSelectedCity("");

      try {
        const res = await fetch(
          `${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`
        );
        if (!res.ok) throw new Error("City API failed");
        const data = await res.json();
        setCities(data || []);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [selectedCountry, selectedState]);

  return (
    <div style={{ margin: "0 auto", display: "block", width: "600px" }}>
      <h1 style={{ textAlign: "center" }}>
        <strong>Select Location</strong>
      </h1>

      <div
        style={{
          padding: "40px",
          width: "600px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "12px",
        }}
      >
        {/* COUNTRY DROPDOWN */}
        <CustomDropdown
          label="Select Country"
          placeholder="Choose..."
          options={countries}
          value={selectedCountry}
          onChange={(val) => setSelectedCountry(val)}
          disabled={false}
        />

        {/* STATE DROPDOWN */}
        <CustomDropdown
          label="Select State"
          placeholder={loadingStates ? "Loading..." : "Choose..."}
          options={states}
          value={selectedState}
          onChange={(val) => setSelectedState(val)}
          disabled={!selectedCountry || loadingStates}
        />

        {/* CITY DROPDOWN */}
        <CustomDropdown
          label="Select City"
          placeholder={loadingCities ? "Loading..." : "Choose..."}
          options={cities}
          value={selectedCity}
          onChange={(val) => setSelectedCity(val)}
          disabled={!selectedState || loadingCities}
        />
      </div>

      {/*  Correct message format */}
      {selectedCity && selectedState && selectedCountry && (
        <div
          style={{
            width: "600px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <span>
            <b>You selected </b>
            {selectedCity}, {selectedState}, {selectedCountry}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
