export type Item = {
    adress: string;
    picture: string;
    paymentMethod: string;
    location: {
        type: string,
        coordinates: [number, number]
    };
    userId: string;
    salepointId: string;
    creationDate: string;
  };