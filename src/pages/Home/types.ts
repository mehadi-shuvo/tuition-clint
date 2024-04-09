export type TTeacher = {
  _id: string;
  name: string;
  university: string;
  whatsApp: string;
  email: string;
  classRange: string;
  description: string;
  photo: string;
  studentIDPhoto: string;
  subjects: string[];
  userId: string;
};

export type TPost = {
  _id: string;
  userId: string;
  whatsApp: string;
  title: string;
  class: string;
  description: string;
  district: string;
  thana: string;
};

export type TParamsQuery = {
  name: string;
  value: any;
};

export type TLocation = {
  location: string;
};

export type TUser = {
  _id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};
