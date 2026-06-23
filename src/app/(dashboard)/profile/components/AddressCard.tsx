import React from "react";
import { IAddress, AddressCardProps } from "@/types/address/address.types";
import { Button } from "@/components/ui/button";
import { Landmark, MapPin, Phone, Edit2, Trash2 } from "lucide-react";
import { getPrefectureName } from "@/constants/prefectures";

export function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  const id = address?._id;

  return (
    <div className="bg-card rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-foreground text-base truncate pr-16">
            {address?.fullName}
          </h4>
        </div>

        <div className="space-y-1.5 text-sm text-foreground/80">
          <div className="flex items-start gap-2">
            <Landmark className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <span>〒 {address?.postalCode}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <span>
              {address?.prefecture ? getPrefectureName(address.prefecture) : ""}, {address?.city},
              {address?.streetAddress}
              {address?.building && (
                <div className="text-xs text-muted-foreground mt-0.5">{address?.building}</div>
              )}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <span>{address?.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-border mt-4 pt-3">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => address && onEdit?.(address)}
          className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => id && onDelete?.(id)}
          className="h-8 w-8 p-0 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
