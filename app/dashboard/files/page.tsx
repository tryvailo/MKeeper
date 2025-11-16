"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Upload,
  Image,
  Music,
  FileText,
  Folder,
  Download,
  Trash2,
  Plus
} from "lucide-react";
import { File } from "@/lib/supabase";
import { MemoryKeeperLogo } from "@/components/icons";

export default function FilesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadingCategory, setUploadingCategory] = useState<string | null>(null);

  useEffect(() => {
    // Mock files data
    setFiles([
      {
        id: "1",
        preferences_id: "mock-1",
        file_name: "family-photo.jpg",
        file_type: "image",
        file_size: 2048576,
        storage_path: "/mock/path",
        uploaded_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        preferences_id: "mock-1",
        file_name: "favorite-song.mp3",
        file_type: "audio",
        file_size: 5120000,
        storage_path: "/mock/path",
        uploaded_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        preferences_id: "mock-1",
        file_name: "will-document.pdf",
        file_type: "document",
        file_size: 1024000,
        storage_path: "/mock/path",
        uploaded_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }, []);

  const handleFileUpload = (category: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    const newFile: File = {
      id: Date.now().toString(),
      preferences_id: "mock-1",
      file_name: file.name,
      file_type: category as "image" | "audio" | "document" | "other",
      file_size: file.size,
      storage_path: "/mock/path",
      uploaded_at: new Date().toISOString(),
    };

    setFiles(prev => [...prev, newFile]);
    setUploadingCategory(null);
    alert("File uploaded successfully (mock).");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      setFiles(prev => prev.filter(f => f.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "image": return Image;
      case "audio": return Music;
      case "document": return FileText;
      default: return Folder;
    }
  };

  const categories = [
    { id: "image", label: "Photos", icon: Image, accept: "image/*" },
    { id: "audio", label: "Music", icon: Music, accept: "audio/*" },
    { id: "document", label: "Documents", icon: FileText, accept: ".pdf,.doc,.docx" },
    { id: "other", label: "Other", icon: Folder, accept: "*/*" },
  ];

  const filesByCategory = categories.map(cat => ({
    ...cat,
    files: files.filter(f => f.file_type === cat.id),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={2} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <Folder className="h-6 w-6 text-brand-blue" strokeWidth={2} />
            <h1 className="text-3xl font-bold">Files</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Zones */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-brand-blue" strokeWidth={2} />
                    {category.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-blue transition-colors">
                    <input
                      type="file"
                      id={`upload-${category.id}`}
                      accept={category.accept}
                      onChange={(e) => handleFileUpload(category.id, e)}
                      className="hidden"
                    />
                    <label htmlFor={`upload-${category.id}`} className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" strokeWidth={2} />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">Max 10MB per file</p>
                    </label>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Files List */}
        {files.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" strokeWidth={2} />
                <p className="text-gray-600 mb-2">No files uploaded yet</p>
                <p className="text-sm text-gray-500">
                  Upload photos, music, documents, or other files to store with your preferences.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filesByCategory.map((category) => {
              if (category.files.length === 0) return null;
              const Icon = getCategoryIcon(category.id);
              
              return (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-brand-blue" strokeWidth={2} />
                      {category.label} ({category.files.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <Icon className="h-6 w-6 text-gray-400" strokeWidth={2} />
                            <div className="flex-1">
                              <p className="font-medium">{file.file_name}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span>{formatFileSize(file.file_size)}</span>
                                <span>
                                  {file.uploaded_at && new Date(file.uploaded_at).toLocaleDateString("en-GB")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" strokeWidth={2} />
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id!)}>
                              <Trash2 className="h-4 w-4" strokeWidth={2} />
                            </Button>
                          </div>
                        </div>
                      ))}
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

