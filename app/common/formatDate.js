import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats a date string to "YYYY-MM-DD", ensuring it stays in local time.
 * @param {string|null} dateString - Input date (e.g., "2025-02-13T00:00:00").
 * @returns {string|null} Formatted date in "YYYY-MM-DD" or null if invalid.
 */
export const formatDate = (dateString) => {
  console.log("🔹 Raw dateString:", dateString); // Debugging log

  if (!dateString || dateString === "0001-01-01T00:00:00") {
    console.log("⚠️ Invalid date detected, returning null.");
    return null;
  }

  const date = dayjs(dateString); // Ensure this creates a valid dayjs object
  console.log("🔹 Processed dayjs object:", date); // Check if it returns an object

  if (!dayjs.isDayjs(date)) { // Extra check to ensure it's a valid dayjs instance
    console.log("❌ ERROR: dayjs object not created correctly, returning null.");
    return null;
  }

  return date.format("YYYY-MM-DD"); // Ensure correct format
};

/**
 * Converts a date string into a `dayjs` object for AntD `<DatePicker>`.
 * @param {string|null} dateString - The input date in "YYYY-MM-DD" format.
 * @returns {dayjs|null} A `dayjs` object or null if invalid.
 */
export const getDayjsDate = (dateString) => {
  console.log("🔹 Converting to Dayjs object:", dateString);

  if (!dateString) return null;

  const date = dayjs(dateString); // Convert date
  console.log("🔹 Converted Dayjs Object:", date);

  if (!dayjs.isDayjs(date)) { // Validate
    console.log("❌ ERROR: getDayjsDate() failed to create a dayjs object.");
    return null;
  }

  return date;
};
