"use client";

import React, { useState } from "react";
import { Cake, Calendar, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useSetDateOfBirth } from "@/services/auth/auth.hooks";
import { formatDate } from "@/utils/format/format.utils";

export function EditableDateOfBirth({ dateOfBirth }: { dateOfBirth?: string | Date | null }) {
  const setDobMutation = useSetDateOfBirth();

  const [showInput, setShowInput] = useState(false);
  const [selectedDob, setSelectedDob] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formattedDob = dateOfBirth ? formatDate(dateOfBirth) : null;

  const handleOpenClick = () => {
    setShowInput(true);
    setErrorMsg("");
  };

  const handleProceedClick = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedDob) {
      setErrorMsg("Please select your date of birth.");
      return;
    }

    const birthDate = new Date(selectedDob);
    const today = new Date();
    const minDate = new Date("1900-01-01");

    if (birthDate > today) {
      setErrorMsg("Date of birth cannot be in the future.");
      return;
    }

    if (birthDate < minDate) {
      setErrorMsg("Date of birth cannot be earlier than 1900-01-01.");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setDobMutation.mutate(selectedDob, {
      onSuccess: () => {
        setShowConfirmModal(false);
        setShowInput(false);
      },
      onError: () => {
        setShowConfirmModal(false);
      },
    });
  };

  if (formattedDob) {
    return (
      <div className="flex items-center gap-3 w-full text-sm">
        <Cake className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-foreground truncate">{formattedDob}</span>
      </div>
    );
  }

  if (showInput) {
    return (
      <div className="w-full space-y-4 pt-2">
        <form onSubmit={handleProceedClick} className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="dob-input" className="text-xs font-bold text-foreground">
              Enter Date of Birth
            </Label>
            <button
              type="button"
              onClick={() => {
                setShowInput(false);
                setSelectedDob("");
                setErrorMsg("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Cancel
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Input
              id="dob-input"
              type="date"
              value={selectedDob}
              max={new Date().toISOString().split("T")[0]}
              min="1900-01-01"
              onChange={(e) => setSelectedDob(e.target.value)}
              className="h-10 text-sm rounded-xl"
            />
            <Button
              type="submit"
              size="sm"
              className="rounded-xl px-4 shrink-0"
              disabled={setDobMutation.isPending}
            >
              Save
            </Button>
          </div>

          {errorMsg && (
            <p className="text-xs text-destructive font-medium flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errorMsg}
            </p>
          )}

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-amber-800 dark:text-amber-300 text-xs space-y-1">
            <p className="font-semibold flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" /> Important Notice
            </p>
            <p className="leading-relaxed opacity-90">
              This Date of Birth will be linked to your{" "}
              <strong>Sartaj Family Loyalty Program</strong> account and can <u>only be set ONCE</u>
              . You will not be able to edit or change it later.
            </p>
          </div>
        </form>

        <ConfirmModal
          open={showConfirmModal}
          title="Confirm Date of Birth"
          description={`Are you sure your Date of Birth is ${
            selectedDob ? formatDate(selectedDob) : selectedDob
          }? This cannot be edited or changed after saving.`}
          confirmLabel="Confirm & Save"
          cancelLabel="Check Again"
          isLoading={setDobMutation.isPending}
          onConfirm={handleConfirmSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex items-center justify-between w-full gap-3 text-sm">
        <div className="flex items-center gap-3 min-w-0">
          <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground italic text-xs">Date of birth not set</span>
        </div>
        <button
          onClick={handleOpenClick}
          className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-lg border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium transition-all duration-200 shadow-sm"
          title="Add date of birth"
        >
          <Plus className="h-3 w-3" />
          <span>Add</span>
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground/80 leading-tight">
        Required for Sartaj Family Loyalty birthday perks. Can only be set once.
      </p>
    </div>
  );
}
