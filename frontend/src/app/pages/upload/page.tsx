"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/authContext"
import { useDarkMode } from "@/context/darkModeContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Upload, Video, FileVideo, Clock, Settings, CheckCircle, X, Bell, MoonStar, Sun } from "lucide-react"
import { useDropzone } from "react-dropzone"
import AppSidebar from "@/components/sidebar"

export default function UploadPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const router = useRouter()
  const session = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [clipSettings, setClipSettings] = useState({
    platform: "youtube-shorts",
    title: "",
    description: "",
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    maxFiles: 1,
  })

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          // Redirect to dashboard after successful upload
          setTimeout(() => {
            router.push("/dashboard")
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  useEffect(() => {
    if (session === null) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [session, router])

  if (isLoading) return null

  return (
    <SidebarProvider>
      <div
        className={`flex min-h-screen w-full transition-colors duration-200 ease-in-out ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-purple-50 via-white to-pink-50"
        }`}
      >
        <AppSidebar isDarkMode={isDarkMode} />
        <SidebarInset className="flex-1 transition-all duration-200 ease-in-out">
          <header
            className={`flex h-16 shrink-0 items-center gap-2 border-b backdrop-blur-sm px-6 shadow-sm transition-colors duration-200 ease-in-out ${
              isDarkMode ? "border-gray-700 bg-gray-900/90" : "border-purple-200 bg-white/90"
            }`}
          >
            <SidebarTrigger
              className={`-ml-1 w-8 h-8 hover:cursor-pointer transition-colors duration-200 ease-in-out ${
                isDarkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
              }`}
            />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1
                  className={`text-xl font-semibold transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Upload Your Own Clip
                </h1>
                <p
                  className={`text-sm transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Quickly upload your completed clips to Reels, TikTok, Shorts, or all three
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className={`transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-2">
                <Card
                  className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={`flex items-center space-x-2 transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <Upload className="h-5 w-5 text-purple-600" />
                      <span>Upload Video</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!uploadedFile ? (
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                          isDragActive
                            ? isDarkMode
                              ? "border-purple-400 bg-purple-900/20"
                              : "border-purple-400 bg-purple-50"
                            : isDarkMode
                              ? "border-gray-600 hover:border-gray-500 bg-gray-900/50"
                              : "border-gray-300 hover:border-purple-400 bg-gray-50"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <p
                              className={`text-lg font-medium transition-colors duration-200 ${
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              {isDragActive ? "Drop your video here" : "Drag & drop your video here"}
                            </p>
                            <p
                              className={`text-sm mt-1 transition-colors duration-200 ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              or click to browse files
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {["MP4", "MOV", "AVI", "MKV", "WEBM"].map((format) => (
                              <Badge
                                key={format}
                                variant="secondary"
                                className={`text-xs transition-all duration-200 ${
                                  isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {format}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`border rounded-lg p-4 transition-all duration-200 ${
                          isDarkMode ? "border-gray-600 bg-gray-900/50" : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                              <FileVideo className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p
                                className={`font-medium transition-colors duration-200 ${
                                  isDarkMode ? "text-gray-100" : "text-gray-900"
                                }`}
                              >
                                {uploadedFile.name}
                              </p>
                              <p
                                className={`text-sm transition-colors duration-200 ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {formatFileSize(uploadedFile.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={removeFile}
                            className={`transition-all duration-200 ${
                              isDarkMode
                                ? "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {isUploading && (
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span
                                className={`transition-colors duration-200 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                {uploadProgress < 100 ? "Uploading..." : "Upload Complete!"}
                              </span>
                              <span
                                className={`transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {uploadProgress}%
                              </span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card
                  className={`shadow-sm border transition-colors duration-200 ease-in-out ${
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <CardHeader>
                    <CardTitle
                      className={`flex items-center space-x-2 transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <Settings className="h-5 w-5 text-purple-600" />
                      <span>Clip Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        className={`transition-colors duration-200 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                      >
                        Target Platform
                      </Label>
                      <Select
                        value={clipSettings.platform}
                        onValueChange={(value) => setClipSettings({ ...clipSettings, platform: value })}
                      >
                        <SelectTrigger
                          className={`transition-all duration-200 ${
                            isDarkMode
                              ? "bg-gray-900 border-gray-600 text-gray-100"
                              : "bg-white border-gray-300 text-gray-900"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent
                          className={`${isDarkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"}`}
                        >
                          <SelectItem value="youtube-shorts" className={isDarkMode ? "text-gray-100" : "text-gray-900"}>
                            YouTube Shorts
                          </SelectItem>
                          <SelectItem value="tiktok" className={isDarkMode ? "text-gray-100" : "text-gray-900"}>
                            TikTok
                          </SelectItem>
                          <SelectItem
                            value="instagram-reels"
                            className={isDarkMode ? "text-gray-100" : "text-gray-900"}
                          >
                            Instagram Reels
                          </SelectItem>
                          <SelectItem value="twitter" className={isDarkMode ? "text-gray-100" : "text-gray-900"}>
                            Twitter/X
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        className={`transition-colors duration-200 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                      >
                        Clip Title (Optional)
                      </Label>
                      <Input
                        placeholder="Enter a custom title for your clip"
                        value={clipSettings.title}
                        onChange={(e) => setClipSettings({ ...clipSettings, title: e.target.value })}
                        className={`transition-all duration-200 ${
                          isDarkMode
                            ? "bg-gray-900 border-gray-600 text-gray-100 placeholder:text-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                        }`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        className={`transition-colors duration-200 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                      >
                        Description (Optional)
                      </Label>
                      <Textarea
                        placeholder="Add a description for your clip"
                        value={clipSettings.description}
                        onChange={(e) => setClipSettings({ ...clipSettings, description: e.target.value })}
                        className={`transition-all duration-200 resize-none ${
                          isDarkMode
                            ? "bg-gray-900 border-gray-600 text-gray-100 placeholder:text-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                        }`}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleUpload}
                  disabled={!uploadedFile || isUploading}
                  className="px-8 py-3 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Clock className="mr-2 h-5 w-5 animate-spin" />
                      Uploading...
                    </>
                  ) : uploadProgress === 100 ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Upload Complete!
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Upload to Platform
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <Card
                  className={`text-center transition-all duration-200 ${
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3
                      className={`font-semibold mb-2 transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Quick Upload
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Upload your finished clips directly to multiple platforms in seconds
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`text-center transition-all duration-200 ${
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <h3
                      className={`font-semibold mb-2 transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Multi-Platform Ready
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-200 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Your clips are ready to go on TikTok, Instagram Reels, and YouTube Shorts
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
