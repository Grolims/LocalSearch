

export type SalepointResponse = {
  data: SalepointResponseValue[];
}

export type SalepointResponseValue = {
  location: {
    type: string,
    coordinates: [number, number]
  };
  address: string;
  picture: string;
  paymentMethod: string;
  userId: string;
};
