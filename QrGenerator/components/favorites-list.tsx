"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Download } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Favorite {
  id: string
  text: string
  options: any
  timestamp: number
}

interface FavoritesListProps {
  favorites: Favorite[]
  onLoad: (favorite: Favorite) => void
  onRemove: (id: string) => void
}

export function FavoritesList({ favorites, onLoad, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">No saved QR codes yet</p>
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="flex items-center justify-between p-2 border rounded-lg">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {favorite.text.length > 30 ? `${favorite.text.slice(0, 30)}...` : favorite.text}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {favorite.options.type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(favorite.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
          <div className="flex gap-1 ml-2">
            <Button size="sm" variant="ghost" onClick={() => onLoad(favorite)} className="h-8 w-8 p-0">
              <Download className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemove(favorite.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
