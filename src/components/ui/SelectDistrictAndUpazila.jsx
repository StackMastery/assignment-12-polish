import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { Skeleton } from "./skeleton";
import toast from "react-hot-toast";

const SelectDistrictAndUpazila = ({
  labelDistrict,
  className,
  withoutLabel,
  labelUpazila,
  placeHolderDistrict,
  placeHolderUpazila,
  defaultDistrict,
  defaultUpazila,
  setData,
}) => {
  const [allDistricts, setAllDistricts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [allUpazilas, setAllUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(
    defaultDistrict ? { value: defaultDistrict, label: defaultDistrict } : null
  );
  const [selectedUpazila, setSelectedUpazila] = useState(
    defaultUpazila ? { value: defaultUpazila, label: defaultUpazila } : null
  );
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [districtRes, upazilaRes] = await Promise.all([
          axios.get("/district.json"),
          axios.get("/upazilas.json"),
        ]);
        setAllDistricts(districtRes.data);
        setAllUpazilas(upazilaRes.data);
      } catch (error) {
        toast.error("Faild to fetch district and upazila data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = allUpazilas.filter(
        (up) => up.district_name === selectedDistrict.value
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, allUpazilas]);

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedUpazila(null);
    setData({ district: selectedOption, upazila: defaultUpazila });
  };

  const handleUpazilaChange = (selectedOption) => {
    setSelectedUpazila(selectedOption);
    setData({ district: selectedDistrict, upazila: selectedOption });
  };

  const districtOptions = allDistricts.map((district) => ({
    value: district.name,
    label: district.name,
  }));

  const upazilaOptions = filteredUpazilas.map((upazila) => ({
    value: upazila.name,
    label: upazila.name,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      borderColor: state.isFocused
        ? isDarkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "#d1d5db"
        : isDarkMode
        ? "#374151"
        : "#d1d5db",
      borderRadius: "0.375rem",
      padding: "2px 5px",
      fontSize: "0.875rem",
      backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
      backdropFilter: "blur(10px)", // Apply blur effect for dark mode
      boxShadow: state.isFocused
        ? "0 0 0 1px rgba(255, 255, 255, 0.2)"
        : "none",
      transition: "all 0.2s ease-in-out",
      minHeight: "40px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(55, 65, 81, 0.8)",
      fontWeight: "500",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkMode ? "#ffffff" : "#374151",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "4px",
      borderRadius: "15px",
      backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
      overflowY: "auto",
      borderRadius: "0.375rem",
      padding: "0",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px 15px",
      fontSize: "14px",
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(59, 130, 246, 0.1)"
        : isDarkMode
        ? "#0f172a"
        : "#ffffff",
      color: state.isFocused
        ? isDarkMode
          ? "#ffffff"
          : "#1d4ed8"
        : isDarkMode
        ? "#d1d5db"
        : "#111827",
      cursor: "pointer",
      "&:active": {
        backgroundColor: state.isFocused
          ? isDarkMode
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(59, 130, 246, 0.2)"
          : "",
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: isDarkMode ? "#9ca3af" : "#9ca3af",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode
        ? "rgba(59, 130, 246, 0.1)"
        : "rgba(59, 130, 246, 0.1)",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: isDarkMode ? "#1d4ed8" : "#1d4ed8",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: isDarkMode ? "#1d4ed8" : "#1d4ed8",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        color: "#1e40af",
      },
    }),
  };

  // Check for dark mode preference or system settings
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(theme.matches);
    theme.addEventListener("change", (e) => setIsDarkMode(e.matches));
  }, []);

  return (
    <>
      <div className={`w-full mb-4 relative ${className}`}>
        {!withoutLabel && (
          <>
            <label className="block mb-1 font-medium dark:text-white/80 text-neutral-800">
              {labelDistrict || "Select a district"}
            </label>
            <span className="w-10 h-[1px] bg-red-600/40 flex mb-[10px] rounded-full"></span>
          </>
        )}
        {!allDistricts || !allUpazilas ? (
          <Skeleton className={`w-full h-[42px]`} />
        ) : (
          <Select
            className="!w-full !dark:bg-slate-900"
            options={districtOptions}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            isSearchable={true}
            placeholder={placeHolderDistrict || "Choose a district"}
            styles={customStyles}
          />
        )}
      </div>
      <div className="w-full">
        {!withoutLabel && (
          <>
            <label className="block mb-1 font-medium dark:text-white/80 text-neutral-800">
              {labelUpazila || "Select an upazila"}
            </label>
            <span className="w-10 h-[1px] bg-red-600/40 flex mb-[10px] rounded-full"></span>
          </>
        )}
        {!allDistricts || !allUpazilas ? (
          <Skeleton className={`w-full h-[42px]`} />
        ) : (
          <Select
            className="!w-full"
            options={upazilaOptions}
            value={selectedUpazila}
            onChange={handleUpazilaChange}
            isSearchable={true}
            placeholder={
              placeHolderUpazila ||
              `${
                !selectedDistrict ? "Chose district first" : "Choose an upazila"
              }`
            }
            styles={customStyles}
            isDisabled={!selectedDistrict}
          />
        )}
      </div>
    </>
  );
};

export default SelectDistrictAndUpazila;
