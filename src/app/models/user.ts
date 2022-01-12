export type User = {
  username: string;
  admin:boolean;
  _id: string;
  registrationdate: Date;
};

export type UserResponse = {
  data: UserResponseValue[];
}

export type UserResponseValue = {
  username: string;
  admin:boolean;
  password:string;
};



