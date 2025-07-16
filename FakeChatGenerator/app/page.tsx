"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Download, Plus, MessageCircle, Smartphone } from "lucide-react"
import { ChatPreview } from "@/components/chat-preview"

interface Message {
  id: string
  text: string
  sender: "user" | "contact"
  timestamp: string
}

interface ChatSettings {
  platform: "whatsapp" | "imessage"
  userName: string
  contactName: string
  userAvatar: string
  contactAvatar: string
}

export default function FakeChatGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! How are you doing?",
      sender: "contact",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "I'm doing great! Thanks for asking 😊",
      sender: "user",
      timestamp: "10:32 AM",
    },
  ])

  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    platform: "whatsapp",
    userName: "You",
    contactName: "John Doe",
    userAvatar: "/placeholder.svg?height=40&width=40",
    contactAvatar: "/placeholder.svg?height=40&width=40",
  })

  const [newMessage, setNewMessage] = useState("")
  const [newSender, setNewSender] = useState<"user" | "contact">("user")
  const [newTimestamp, setNewTimestamp] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  )

  const addMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: newSender,
      timestamp: newTimestamp,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  const exportChat = () => {
    const chatElement = document.getElementById("chat-preview")
    if (!chatElement) return

    // Create a canvas to capture the chat
    import("html2canvas").then((html2canvas) => {
      html2canvas
        .default(chatElement, {
          backgroundColor: chatSettings.platform === "whatsapp" ? "#0b141a" : "#000000",
          scale: 2,
          useCORS: true,
        })
        .then((canvas) => {
          const link = document.createElement("a")
          link.download = `fake-chat-${chatSettings.platform}-${Date.now()}.png`
          link.href = canvas.toDataURL()
          link.click()
        })
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Fake Chat Generator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Create realistic WhatsApp and iMessage screenshots for UI testing, mockups, or just for fun. Customize
            messages, names, and timestamps to create the perfect fake conversation.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              ⚡ Powered by Boad Technologies
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Chat Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={chatSettings.platform}
                    onValueChange={(value: "whatsapp" | "imessage") =>
                      setChatSettings({ ...chatSettings, platform: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="imessage">iMessage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userName">Your Name</Label>
                    <Input
                      id="userName"
                      value={chatSettings.userName}
                      onChange={(e) => setChatSettings({ ...chatSettings, userName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={chatSettings.contactName}
                      onChange={(e) => setChatSettings({ ...chatSettings, contactName: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Message
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="sender">Sender</Label>
                  <Select value={newSender} onValueChange={(value: "user" | "contact") => setNewSender(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">{chatSettings.userName}</SelectItem>
                      <SelectItem value="contact">{chatSettings.contactName}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="timestamp">Timestamp</Label>
                  <Input
                    id="timestamp"
                    value={newTimestamp}
                    onChange={(e) => setNewTimestamp(e.target.value)}
                    placeholder="10:30 AM"
                  />
                </div>

                <Button onClick={addMessage} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Message
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Message List</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={message.sender === "user" ? "default" : "secondary"}>
                          {message.sender === "user" ? chatSettings.userName : chatSettings.contactName}
                        </Badge>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 truncate">{message.text}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Preview</h2>
              <Button onClick={exportChat} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Screenshot
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ChatPreview messages={messages} settings={chatSettings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
