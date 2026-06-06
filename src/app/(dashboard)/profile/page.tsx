"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  useGetAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/services/address/address.hooks";
import { IAddress } from "@/types/address/address.types";
import { addressSchema } from "@/schemas/address/address.schema";
import { MapPin, Plus } from "lucide-react";
import { formatPostalCode, formatJapanPhone } from "@/utils/format/format.utils";
import { ProfileCard } from "./components/ProfileCard";
import { AddressCard } from "./components/AddressCard";
import { AddressForm } from "./components/AddressForm";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { CommonLoader } from "@/components/ui/common-loader";
import { CommonError } from "@/components/ui/common-error";

export default function ProfilePage() {
  const t = useTranslations();
  const { user } = useAuth();

  const {
    data: addresses = [],
    isLoading: loadingAddresses,
    isError: errorAddresses,
    refetch: refetchAddresses,
  } = useGetAddresses();
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();

  const [editingAddress, setEditingAddress] = useState<IAddress | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<IAddress>({
    fullName: "",
    postalCode: "",
    prefecture: "JP-13",
    city: "",
    streetAddress: "",
    building: "",
    phone: "",
  });

  const handleEditClick = (address: IAddress) => {
    setEditingAddress(address);
    setFormData(address);
    setFormError("");
    setShowForm(true);
  };

  const handleAddNewClick = () => {
    setEditingAddress(null);
    setFormData({
      fullName: "",
      postalCode: "",
      prefecture: "JP-13",
      city: "",
      streetAddress: "",
      building: "",
      phone: "",
    });
    setFormError("");
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let val = value;

    if (name === "postalCode") {
      val = formatPostalCode(val);
    } else if (name === "phone") {
      val = formatJapanPhone(val);
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
    setFormError("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Validate using Zod schema
    const validation = addressSchema.safeParse(formData);
    if (!validation.success) {
      setFormError(validation.error.errors[0].message);
      return;
    }

    const payload = {
      ...formData,
      postalCode: (formData?.postalCode || "").trim(),
      phone: (formData?.phone || "").trim(),
    };

    if (editingAddress?._id) {
      updateAddressMutation.mutate(
        { id: editingAddress._id, payload },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditingAddress(null);
          },
        },
      );
    } else {
      createAddressMutation.mutate(payload, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("profile.profile")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile info */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard user={user} />
          </div>

          {/* RIGHT COLUMN: Address Manager */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address List Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{t("profile.addresses")}</h2>
              </div>
              {!showForm && (
                <Button
                  onClick={handleAddNewClick}
                  size="sm"
                  className="rounded-xl flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Address</span>
                </Button>
              )}
            </div>

            {/* Edit / Add Form Card */}
            {showForm && (
              <AddressForm
                formData={formData}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
                formError={formError}
                isPending={createAddressMutation.isPending || updateAddressMutation.isPending}
                isEditing={!!editingAddress}
              />
            )}

            {/* Address Cards Grid */}
            {loadingAddresses ? (
              <CommonLoader fullScreen={false} message={t("common.loading")} />
            ) : errorAddresses ? (
              <CommonError onRetry={refetchAddresses} message="Could not load address book." />
            ) : (addresses || []).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(addresses || []).map((address) => (
                  <AddressCard
                    key={address?._id}
                    address={address}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border/50 p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">No addresses added</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Please add your shipping address to receive deliveries.
                  </p>
                </div>
                <Button
                  onClick={handleAddNewClick}
                  size="sm"
                  className="rounded-xl flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add First Address</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        open={!!deleteId}
        title={t("profile.deleteAddressTitle") || "Delete Address"}
        description={
          t("profile.deleteAddressConfirm") ||
          "Are you sure you want to delete this address? This action cannot be undone."
        }
        confirmLabel={t("common.delete") || "Delete"}
        cancelLabel={t("common.cancel") || "Cancel"}
        destructive={true}
        isLoading={deleteAddressMutation.isPending}
        onConfirm={() => {
          if (deleteId) {
            deleteAddressMutation.mutate(deleteId, {
              onSuccess: () => {
                setDeleteId(null);
              },
              onError: () => {
                setDeleteId(null);
              },
            });
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </main>
  );
}
