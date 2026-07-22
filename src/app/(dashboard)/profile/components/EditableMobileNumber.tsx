"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Pencil, Check, X, Loader2 } from "lucide-react";
import { PHONE_REGEX } from "@/constants/validation";
import { useUpdateMobileNumber } from "@/services/auth/auth.hooks";
import { formatJapanPhone } from "@/utils/format/format.utils";

interface EditableMobileNumberProps {
  mobileNumber?: string;
}

export function EditableMobileNumber({ mobileNumber = "" }: EditableMobileNumberProps) {
  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const updateMobileMutation = useUpdateMobileNumber();

  const handleEditStart = () => {
    setPhoneInput(mobileNumber);
    setPhoneError("");
    setEditingPhone(true);
  };

  const handleCancel = () => {
    setEditingPhone(false);
    setPhoneError("");
    setPhoneInput("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatJapanPhone(e.target?.value);
    setPhoneInput(formatted);
    setPhoneError("");
  };

  const handleSave = () => {
    const cleaned = phoneInput.replace(/\s+/g, "");
    if (!PHONE_REGEX.test(cleaned)) {
      setPhoneError("Enter a valid 10-digit Japan number (e.g. +81XXXXXXXXXX)");
      return;
    }
    updateMobileMutation.mutate(cleaned, {
      onSuccess: () => {
        setEditingPhone(false);
        setPhoneInput("");
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  useEffect(() => {
    if (editingPhone) {
      inputRef.current?.focus();
    }
  }, [editingPhone]);

  return (
    <div className="flex items-start gap-3 text-sm flex-1">
      <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
      {editingPhone ? (
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={phoneInput}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              placeholder="+81XXXXXXXXXX"
              className="flex-1 text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={handleSave}
              disabled={updateMobileMutation.isPending}
              className="shrink-0 p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              title="Save"
            >
              {updateMobileMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={updateMobileMutation.isPending}
              className="shrink-0 p-1.5 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Cancel"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-between gap-2">
          <span className="text-foreground">{mobileNumber}</span>
          <button
            onClick={handleEditStart}
            className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium transition-all duration-200 shadow-sm"
            title="Edit mobile number"
          >
            <Pencil className="h-3 w-3" />
            <span>Edit</span>
          </button>
        </div>
      )}
    </div>
  );
}
