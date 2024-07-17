import { atom } from 'recoil';

const studentFormState = atom({
  key: 'studentFormState', 
  default: {
    program: "",
    academicYear: "",
    yearSemester: "",
    medium: "",
    section: "",
    team: "",
    shift: "",
    majorSubject: "",
    firstName: "",
    middleName: "",
    lastName: "",
    nameNepali: "",
    dateOfBirthBS: "",
    phoneNumber: "",
    email: "",
    maritalStatus: "",
    gender: "",
    ethnicity: "",
    caste: "",
    bloodGroup: "",
    citizenshipNo: "",
    religion: "",
    nationality: "Nepalese",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    addressNepali: "",
    temporaryAddress: "",
    smsNo: "",
    dormFacility: "",
    busFacility: "",
    fatherName: "",
    fatherPhoneNo: "",
    fatherQualification: "",
    motherName: "",
    motherPhoneNo: "",
    motherQualification: ""
  }
});

export default studentFormState;
