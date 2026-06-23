"use client";

import { useState } from "react";
import { CheckCheck, Inbox, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  useGetNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/services/notification/notification.hooks";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { NotificationSkeleton } from "@/components/skeletons/NotificationSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/common/common.utils";

export default function NotificationsPage() {
  const t = useTranslations("notifications");
  const locale = useLocale();
  const unreadCount = useSelector((state: RootState) => state.notification.unreadCount);
  const [page, setPage] = useState(1);

  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetNotifications({ page, limit: 10 });
  const { mutate: markRead, isPending: isMarkingOne } = useMarkNotificationAsRead();
  const { mutate: markAll, isPending: isMarkingAll } = useMarkAllNotificationsAsRead();

  const notifications = responseData?.data ?? [];
  const meta = responseData?.meta;
  const totalPages = meta?.totalPages ?? 1;

  return (
    <main className="relative z-10 min-h-screen bg-muted/30 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <Card className="border border-border/50 shadow-md bg-card/60 backdrop-blur-md">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2.5">
                <Bell className="h-6 w-6 text-primary" />
                {t("notifications")}
              </CardTitle>
              {unreadCount > 0 && (
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </CardDescription>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={unreadCount === 0 || isMarkingAll}
              onClick={() => markAll()}
              className="h-9 px-4 text-xs font-semibold gap-1.5 rounded-xl cursor-pointer w-full sm:w-auto flex items-center justify-center"
            >
              <CheckCheck className="h-4 w-4" />
              {t("markAllRead")}
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <NotificationSkeleton />
              </div>
            ) : isError ? (
              <CommonError message={t("loadError")} onRetry={() => refetch()} className="py-12" />
            ) : notifications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Inbox className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{t("noNotifications")}</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll let you know when something new arrives.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="divide-y divide-border/40 p-2">
                  {notifications?.map((noti) => (
                    <NotificationItem
                      key={noti?._id}
                      notification={noti}
                      locale={locale}
                      onMarkRead={(id) => markRead(id)}
                      isLoading={isMarkingOne}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border/30 bg-muted/10">
                    <p className="text-xs text-muted-foreground">
                      Showing page {page} of {totalPages} ({meta?.total ?? 0} total)
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="h-8 w-8 p-0 rounded-lg cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, idx) => {
                          const pageNum = idx + 1;
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= page - 1 && pageNum <= page + 1)
                          ) {
                            return (
                              <Button
                                key={pageNum}
                                variant={page === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setPage(pageNum)}
                                className={cn(
                                  "h-8 w-8 p-0 rounded-lg cursor-pointer text-xs font-semibold",
                                  page === pageNum && "pointer-events-none",
                                )}
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                          if (pageNum === 2 || pageNum === totalPages - 1) {
                            return (
                              <span
                                key={pageNum}
                                className="text-xs text-muted-foreground/60 px-1 select-none"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        className="h-8 w-8 p-0 rounded-lg cursor-pointer"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
