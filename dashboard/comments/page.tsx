"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  MessageSquare,
  Reply,
  Edit,
  Trash2,
  Filter,
  Send,
  User
} from "lucide-react";
import { Comment } from "@/lib/supabase";
import { MemoryKeeperLogo } from "@/components/icons";

interface CommentWithReplies extends Comment {
  replies?: CommentWithReplies[];
  authorName?: string;
  authorEmail?: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [filter, setFilter] = useState<"all" | "mine" | "recent">("all");
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    // Load from localStorage or use mock data
    const saved = localStorage.getItem("comments");
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      const mockComments: CommentWithReplies[] = [
        {
          id: "1",
          preferences_id: "mock-1",
          content: "This looks perfect! I'll arrange the service at St Paul's.",
          authorName: "Sarah Smith",
          authorEmail: "sarah@example.com",
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          replies: [
            {
              id: "1-1",
              preferences_id: "mock-1",
              content: "Thank you, Sarah! That would be wonderful.",
              authorName: "You",
              authorEmail: "you@example.com",
              created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
        {
          id: "2",
          preferences_id: "mock-1",
          content: "I can help with the music selection. 'My Way' is a great choice!",
          authorName: "John Smith",
          authorEmail: "john@example.com",
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setComments(mockComments);
      localStorage.setItem("comments", JSON.stringify(mockComments));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: CommentWithReplies = {
      id: Date.now().toString(),
      preferences_id: "mock-1",
      content: newComment,
      authorName: "You",
      authorEmail: "you@example.com",
      created_at: new Date().toISOString(),
      replies: [],
    };

    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
    setNewComment("");
  };

  const handleReply = (parentId: string) => {
    if (!replyText.trim()) return;

    const reply: CommentWithReplies = {
      id: `${parentId}-${Date.now()}`,
      preferences_id: "mock-1",
      content: replyText,
      authorName: "You",
      authorEmail: "you@example.com",
      created_at: new Date().toISOString(),
    };

    const updated = comments.map(c => {
      if (c.id === parentId) {
        return { ...c, replies: [...(c.replies || []), reply] };
      }
      return c;
    });

    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
    setReplyText("");
    setReplyingTo(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      const updated = comments.filter(c => c.id !== id);
      setComments(updated);
      localStorage.setItem("comments", JSON.stringify(updated));
    }
  };

  const filteredComments = comments.filter(c => {
    if (filter === "mine") return c.authorEmail === "you@example.com";
    if (filter === "recent") {
      const daysAgo = c.created_at ? (Date.now() - new Date(c.created_at).getTime()) / (1000 * 60 * 60 * 24) : 999;
      return daysAgo <= 7;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={2} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-6 w-6 text-brand-blue" strokeWidth={2} />
            <h1 className="text-3xl font-bold">Comments & Discussion</h1>
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
                variant={filter === "mine" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("mine")}
              >
                My Comments
              </Button>
              <Button
                variant={filter === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("recent")}
              >
                Recent (7 days)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* New Comment */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add a Comment</CardTitle>
            <CardDescription>
              Share thoughts, ask questions, or provide feedback on preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="mb-4"
            />
            <Button onClick={handleAddComment}>
              <Send className="h-4 w-4 mr-2" strokeWidth={2} />
              Post Comment
            </Button>
          </CardContent>
        </Card>

        {/* Comments List */}
        {filteredComments.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" strokeWidth={2} />
                <p className="text-gray-600 mb-2">No comments yet</p>
                <p className="text-sm text-gray-500">
                  Start a discussion by adding a comment above.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredComments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-semibold">
                        {comment.authorName?.[0] || "U"}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold">{comment.authorName}</p>
                        <Badge variant="secondary" className="text-xs">
                          {comment.authorEmail === "you@example.com" ? "You" : "Family"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {comment.created_at && new Date(comment.created_at).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{comment.content}</p>
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-6 space-y-4 border-l-2 border-gray-200 pl-4 mb-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-sm">
                                {reply.authorName?.[0] || "U"}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-sm">{reply.authorName}</p>
                                  <span className="text-xs text-gray-500">
                                    {reply.created_at && new Date(reply.created_at).toLocaleDateString("en-GB")}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        {replyingTo !== comment.id ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(comment.id!)}
                          >
                            <Reply className="h-4 w-4 mr-2" strokeWidth={2} />
                            Reply
                          </Button>
                        ) : (
                          <div className="flex-1 space-y-2">
                            <Textarea
                              rows={2}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write your reply..."
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleReply(comment.id!)}>
                                <Send className="h-3 w-3 mr-2" strokeWidth={2} />
                                Post Reply
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                        {comment.authorEmail === "you@example.com" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(comment.id!)}
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={2} />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

