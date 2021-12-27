
export type ItemName = {
  text: string;
}


export type ItemResponse = {
  data: ItemResponseValue[];

}


export type ItemResponseValue = {
    name: string;
    type: string;
    description: string;
    label:string;
    price: number;
    userId: string;
    salepointId: string;
    creationDate: string;
  };
