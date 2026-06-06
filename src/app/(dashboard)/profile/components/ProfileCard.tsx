import { User, Mail, Phone } from "lucide-react";
import { ProfileCardProps } from "@/types/profile/profile.types";

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 to-primary" />
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-3xl font-bold">
          {user?.fullName ? (
            user?.fullName?.charAt(0)?.toUpperCase()
          ) : (
            <User className="h-10 w-10" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{user?.fullName}</h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase mt-1 px-2.5 py-0.5 bg-muted rounded-full inline-block">
            {user?.superCategory || "Retailer"}
          </p>
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground truncate">{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{user?.mobileNumber}</span>
        </div>
      </div>
    </div>
  );
}
