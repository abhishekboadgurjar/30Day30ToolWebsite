"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Moon,
  Sun,
  Download,
  Settings,
  Eye,
  Edit3,
  Maximize2,
  Minimize2,
  Undo,
  Redo,
  Save,
  ExternalLink,
} from "lucide-react";

interface HeaderProps {
  onToggleTheme: () => void;
  onTogglePreviewMode: () => void;
  onToggleFullscreen: () => void;
  onShowSettings: () => void;
  onShowExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onInsertMarkdown: (syntax: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  isPreviewMode: boolean;
  isFullscreen: boolean;
  lastSaved: Date | null;
  theme: string | undefined;
}

export default function Header({
  onToggleTheme,
  onTogglePreviewMode,
  onToggleFullscreen,
  onShowSettings,
  onShowExport,
  onUndo,
  onRedo,
  onSave,
  onInsertMarkdown,
  canUndo,
  canRedo,
  isPreviewMode,
  isFullscreen,
  lastSaved,
  theme,
}: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Markdown Editor</h1>
              <span className="text-xs text-muted-foreground">
                by Boad Technologies
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open("https://boadtechnologies.com", "_blank")
            }
            className="hidden sm:flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            <span>Visit Boad Tech</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Toolbar */}
          <div className="hidden lg:flex items-center space-x-1 mr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("bold")}
              title="Bold (Ctrl+B)"
            >
              <strong className="text-sm">B</strong>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("italic")}
              title="Italic (Ctrl+I)"
            >
              <em className="text-sm">I</em>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("code")}
              title="Code"
            >
              <span className="text-xs font-mono">{"</>"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("link")}
              title="Link"
            >
              <span className="text-xs">🔗</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("heading")}
              title="Heading"
            >
              <span className="text-xs font-bold">H1</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("list")}
              title="List"
            >
              <span className="text-xs">•</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInsertMarkdown("quote")}
              title="Quote"
            >
              <span className="text-xs">"</span>
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Action buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            title="Save (Ctrl+S)"
          >
            <Save className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShowExport}
            title="Export (Ctrl+E)"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePreviewMode}
            className="md:hidden"
            title="Toggle Preview"
          >
            {isPreviewMode ? (
              <Edit3 className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFullscreen}
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShowSettings}
            title="Settings (Ctrl+,)"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {lastSaved && (
        <div className="px-4 pb-2 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                window.open("https://boadtechnologies.com", "_blank")
              }
              className="sm:hidden text-xs"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Boad Tech
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
