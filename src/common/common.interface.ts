export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ILoginData {
  message?: string;
  token?: string;
  admin: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface ILoginValue {
  email: string;
  password: string;
}


export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface IAdminResponse {
  newAdmin: IAdmin;
  message: string;
}

export interface IAdminRegisterValue {
  email: string;
  name: string;
  password: string;
}

export interface AllAdminsGetResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}