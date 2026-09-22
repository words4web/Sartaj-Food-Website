import { useState, useCallback } from "react";
import { toast } from "sonner";
import { PREFECTURES } from "@/constants/prefectures";
import { IAddress, IZipCloudResult, IAreaSelectionModalState } from "@/types/address/address.types";

export function usePostalCodeLookup({
  onAutoFill,
}: {
  onAutoFill?: (fields: Partial<IAddress>) => void;
} = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<IAreaSelectionModalState>({
    isOpen: false,
    zipcode: "",
    results: [],
  });

  const searchPostalCode = useCallback(
    async (code: string) => {
      const cleanZip = code?.replace(/[^\d]/g, "");
      if (!cleanZip || cleanZip?.length !== 7) {
        toast.error("Please enter a valid 7-digit postal code (e.g. 123-4567)");
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanZip}`,
        );
        const data = await response?.json();

        if (data?.status !== 200) {
          toast.error(data?.message || "Failed to search postal code.");
          return;
        }

        if (!data?.results || data?.results?.length === 0) {
          toast.error("Postal code not found in Japan postal database.");
          return;
        }

        const results: IZipCloudResult[] = data?.results;

        if (results?.length === 1) {
          const result = results[0];
          const prefCode = "JP-" + String(result?.prefcode)?.padStart(2, "0");
          const matchedPref = PREFECTURES?.find((p) => p?.code === prefCode);

          onAutoFill?.({
            prefecture: matchedPref ? matchedPref?.code : prefCode,
            city: result?.address2 || "",
            streetAddress: result?.address3 || "",
          });
          toast.success("Address auto-filled successfully!");
        } else if (results?.length > 1) {
          setModalState({
            isOpen: true,
            zipcode: cleanZip,
            results,
          });
        }
      } catch (err) {
        console.error("ZipCloud fetch error:", err);
        toast.error("Failed to search postal code. Please enter manually.");
      } finally {
        setIsLoading(false);
      }
    },
    [onAutoFill],
  );

  const handleSelectArea = useCallback(
    (result: IZipCloudResult) => {
      const prefCode = "JP-" + String(result?.prefcode)?.padStart(2, "0");
      const matchedPref = PREFECTURES?.find((p) => p?.code === prefCode);

      onAutoFill?.({
        prefecture: matchedPref ? matchedPref?.code : prefCode,
        city: result?.address2 || "",
        streetAddress: result?.address3 || "",
      });
      setModalState((prev) => ({ ...prev, isOpen: false }));
      toast.success("Address auto-filled successfully!");
    },
    [onAutoFill],
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    isLoading,
    modalState,
    searchPostalCode,
    handleSelectArea,
    closeModal,
  };
}
