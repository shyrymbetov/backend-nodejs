
export type AdmissionRequirementsType = {
  title: string;
  fields: AdmissionRequirementFieldsType[];
};

export type AdmissionRequirementFieldsType = {
  name: string;
  grade: string;
};
