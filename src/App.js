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

  //  Fetch all countries on mount
  useEffect(() => {
    fetch(`${BASE_URL}/countries`)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!selectedCountry) return;

    setLoadingStates(true);
    setStates([]);
    setSelectedState("");
    setCities([]);
    setSelectedCity("");

    fetch(
      `${BASE_URL}/country=${selectedCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => setStates(data))
      .finally(() => setLoadingStates(false));
  }, [selectedCountry]);

  //  Fetch cities when state changes
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    setLoadingCities(true);
    setCities([]);
    setSelectedCity("");

    fetch(
      `${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((res) => res.json())
      .then((data) => setCities(data))
      .finally(() => setLoadingCities(false));
  }, [selectedCountry, selectedState]);

  return (
    <div style={{ margin: "0 auto", display: "block", width: "600px", }}>
      <h1 style={{ textAlign: "center" }}><strong>Select Location</strong></h1>
      <div style={{ padding: "40px", width: "600px", display: "flex", justifyContent: "center", flexDirection: "row" }}>
        {/*  COUNTRY DROPDOWN */}
        <CustomDropdown
          label="Select Country"
          placeholder="Choose..."
          options={countries}
          value={selectedCountry}
          onChange={(val) => setSelectedCountry(val)}
          disabled={false}
        />

        {/* STATE DROPDOWN (Disabled until a country is selected) */}
        <CustomDropdown
          label="Select State"
          placeholder={loadingStates ? "Loading..." : "Choose..."}
          options={states}
          value={selectedState}
          onChange={(val) => setSelectedState(val)}
          disabled={!selectedCountry || loadingStates}
        />

        {/* CITY DROPDOWN (Disabled until a state is selected) */}
        <CustomDropdown
          label="Select City"
          placeholder={loadingCities ? "Loading..." : "Choose..."}
          options={cities}
          value={selectedCity}
          onChange={(val) => setSelectedCity(val)}
          disabled={!selectedState || loadingCities}
        />


      </div>
      {selectedCity && <div style={{ width: "600px", display: "flex", justifyContent: "center", flexDirection: "row" }}>
        <span>
          <b>You selected </b>   <strong>{selectedCountry}</strong> {selectedState} {selectedCity}
        </span>

      </div>}

    </div>
  );
}

export default App;
