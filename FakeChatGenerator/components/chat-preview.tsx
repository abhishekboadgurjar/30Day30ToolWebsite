import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, MoreVertical, ArrowLeft, Signal, Wifi, Battery } from "lucide-react"

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

interface ChatPreviewProps {
  messages: Message[]
  settings: ChatSettings
}

export function ChatPreview({ messages, settings }: ChatPreviewProps) {
  const isWhatsApp = settings.platform === "whatsapp"

  return (
    <div id="chat-preview" className="w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className={`relative ${isWhatsApp ? "bg-gray-900" : "bg-black"} rounded-[2.5rem] p-2`}>
        <div className={`${isWhatsApp ? "bg-gray-100" : "bg-gray-900"} rounded-[2rem] overflow-hidden`}>
          {/* Status Bar */}
          <div
            className={`flex justify-between items-center px-6 py-2 ${isWhatsApp ? "bg-green-600" : "bg-gray-800"} text-white text-xs`}
          >
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
            </div>
            <div className="font-medium">9:41 AM</div>
            <div className="flex items-center gap-1">
              <span>100%</span>
              <Battery className="h-3 w-3" />
            </div>
          </div>

          {/* Chat Header */}
          <div
            className={`flex items-center justify-between px-4 py-3 ${
              isWhatsApp ? "bg-green-600" : "bg-gray-800"
            } text-white`}
          >
            <div className="flex items-center gap-3">
              <ArrowLeft className="h-5 w-5" />
              <Avatar className="h-8 w-8">
                <AvatarImage src={settings.contactAvatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">{settings.contactName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{settings.contactName}</div>
                {isWhatsApp && <div className="text-xs opacity-75">online</div>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isWhatsApp && <Video className="h-5 w-5" />}
              <Phone className="h-5 w-5" />
              <MoreVertical className="h-5 w-5" />
            </div>
          </div>

          {/* Messages */}
          <div className={`min-h-[500px] p-4 space-y-3 ${isWhatsApp ? "bg-gray-100" : "bg-black"}`}>
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-2 max-w-[80%]">
                  {message.sender === "contact" && !isWhatsApp && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={settings.contactAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{settings.contactName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`px-3 py-2 rounded-2xl max-w-full ${
                      message.sender === "user"
                        ? isWhatsApp
                          ? "bg-green-500 text-white rounded-br-md"
                          : "bg-blue-500 text-white rounded-br-md"
                        : isWhatsApp
                          ? "bg-white text-gray-900 rounded-bl-md"
                          : "bg-gray-700 text-white rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? isWhatsApp
                            ? "text-green-100"
                            : "text-blue-100"
                          : isWhatsApp
                            ? "text-gray-500"
                            : "text-gray-400"
                      }`}
                    >
                      {message.timestamp}
                      {message.sender === "user" && isWhatsApp && <span className="ml-1">✓✓</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className={`flex items-center gap-2 p-3 ${isWhatsApp ? "bg-gray-200" : "bg-gray-800"}`}>
            <div className={`flex-1 px-4 py-2 rounded-full ${isWhatsApp ? "bg-white" : "bg-gray-700"}`}>
              <span className={`text-sm ${isWhatsApp ? "text-gray-500" : "text-gray-400"}`}>Type a message...</span>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isWhatsApp ? "bg-green-600" : "bg-blue-500"
              }`}
            >
              <span className="text-white text-sm">🎤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
