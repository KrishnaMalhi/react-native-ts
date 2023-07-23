export interface ICategoryProperty {
  name: string | null;
  value: string | number | boolean | null;
  type: string | null;
}

// export interface ICategoryItem {
//   field: string | null;
//   name: string | null;
//   value: string | number | boolean | {};
//   placeholder: string | null;
// }

export interface ICategory {
  name: string;
  properties: ICategoryProperty[];
  // items: ICategoryItem[];
}

// export interface ICategoryValues {
//   [key: string]: string | number | boolean | null;
// }
