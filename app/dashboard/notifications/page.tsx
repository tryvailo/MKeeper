"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Bell,
  CheckCircle2,
  Users,
  Share2,
  FileText,
  MessageSquare,
  Filter,
  Trash2
} from "lucide-react";
import { Notification } from "@/lib/supabase";
import { MemoryKeeperLogo } from "@/components/icons";

export default function NotificationsPage() {
  // const { user } = useUser();
  const user = { id: "temp-user", firstName: "Guest", fullName: "Guest User" };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    try {
      // Mock notifications data
      const mockNotifications: Notification[] = [
        {
          id: "1",
          user_id: user?.id || "",
          type: "annual_reminder",
          message: "It's been a while since you added memories. Want to capture more of their story?",
          sent_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          read_at: undefined,
        },
        {
          id: "2",
          user_id: user?.id || "",
          type: "share_accepted",
          message: "Sarah Smith has accepted your invitation to view their story.",
          sent_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          read_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          user_id: user?.id || "",
          type: "new_comment",
          message: "John Smith left a comment on their story.",
          sent_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          read_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "4",
          user_id: user?.id || "",
          type: "preferences_updated",
          message: "Their story was updated successfully.",
          sent_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          read_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "5",
          user_id: user?.id || "",
          type: "family_update",
          message: "A new family member was added to your sharing list.",
          sent_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          read_at: undefined,
        },
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "annual_reminder": return Bell;
      case "family_update": return Users;
      case "share_accepted": return Share2;
      case "new_comment": return MessageSquare;
      case "preferences_updated": return FileText;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "annual_reminder": return "text-yellow-600";
      case "family_update": return "text-blue-600";
      case "share_accepted": return "text-green-600";
      case "new_comment": return "text-purple-600";
      case "preferences_updated": return "text-brand-blue";
      default: return "text-gray-600";
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read_at;
    if (filter === "read") return n.read_at;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read_at).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={2} />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-6 w-6 text-brand-blue" strokeWidth={2} />
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
              >
                Unread ({notifications.filter(n => !n.read_at).length})
              </Button>
              <Button
                variant={filter === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("read")}
              >
                Read
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center">Getting everything ready...</p>
            </CardContent>
          </Card>
        ) : filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" strokeWidth={2} />
                <p className="text-gray-600 mb-2">
                  {filter === "unread" 
                    ? "No unread notifications. You're all caught up!" 
                    : filter === "read"
                    ? "No read notifications"
                    : "No notifications yet"}
                </p>
                <p className="text-sm text-gray-500">
                  Updates and reminders will show up here.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const isRead = !!notification.read_at;
              
              return (
                <Card key={notification.id} className={!isRead ? "border-brand-blue border-2" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`font-medium ${!isRead ? "text-gray-900" : "text-gray-700"}`}>
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.sent_at && new Date(notification.sent_at).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          </div>
                          {!isRead && (
                            <Badge variant="secondary" className="ml-2">
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2 mt-4">
                          {!isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id!)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" strokeWidth={2} />
                              Mark as read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id!)}
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={2} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

