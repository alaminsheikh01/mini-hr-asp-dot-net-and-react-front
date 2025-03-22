export const initialValues = {
  firstname: "",
  lastname: "",
  employeeCode: "",
  gender: "",
  insuranceID: "",
  department: "",
  designation: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: null,
  employeeStatus: "",
  employeeType: "",
  address: "",
  dateOfJoining: null,
  emergencyContact: "",
  nid: "",
  presentAddress: "",
  permanentAddress: "",
  bloodGroup: "",
  confirmationDate: null,
  retirementOrResignation: null,
  servicePeriod: 0,
  salaryAccountNumber: "",
  etin: "",
  academicQualifications: "",
  certificateVerification: false,
  policeVerification: false,
  disciplinaryAction: false,
  jobLocation: "",
  grade: 0,
  tinNumber: 0,
};

export const calculateServicePeriod = (
  confirmationDate,
  retirementDate,
  setFieldValue
) => {
  if (confirmationDate && retirementDate) {
    // Calculate the difference in months
    const diffInMilliseconds = retirementDate - confirmationDate;
    const diffInMonths = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
    );
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;

    // Set the service period in the form
    setFieldValue("servicePeriod", `${years} year(s) ${months} month(s)`);
  } else {
    setFieldValue("servicePeriod", ""); // Clear if any of the dates are missing
  }
};
