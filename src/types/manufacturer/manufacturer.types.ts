export interface IManufacturer {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IManufacturerResponse {
  success: boolean;
  message: string;
  data: {
    manufacturers: IManufacturer[];
  };
}
