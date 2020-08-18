interface FieldData {
  [key: string]: string | number | boolean | Date,
}


export interface FormData {
  section: string;
  fields: FieldData;
}