import React from "react";

export interface IAddress {
  _id?: string;
  fullName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
  building?: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressCardProps {
  address?: IAddress;
  onEdit?: (address: IAddress) => void;
  onDelete?: (id: string) => void;
}

export interface AddressFormProps {
  formData?: IAddress;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  formError?: string;
  isPending?: boolean;
  isEditing?: boolean;
}
