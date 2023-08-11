
export type CostProgramType = {
  title: string;
  fields: ProgramCostFieldsType[];
};

export type ProgramCostFieldsType = {
  name: string;
  cost: string;
};
