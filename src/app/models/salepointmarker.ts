export type SalepointMarkerResponse = {
    data: SalepointMarkerResponseValue[];
}

export type SalepointMarkerResponseValue = {
    location: {
        type: string,
        coordinates: [number, number]
    };
    address: string;
    picture: string;
    paymentMethod: string;
    userId: string;
    _id: string,
};