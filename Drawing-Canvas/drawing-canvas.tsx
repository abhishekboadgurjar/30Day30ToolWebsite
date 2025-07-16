"use client";

import type React from "react";

import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eraser,
  Palette,
  Trash2,
  Undo2,
  Redo2,
  Circle,
  Square,
  Triangle,
  Brush,
  Upload,
  Settings,
  Sparkles,
} from "lucide-react";

const colors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#FFC0CB",
  "#A52A2A",
  "#808080",
  "#8B4513",
  "#006400",
  "#4B0082",
  "#FF1493",
  "#00CED1",
  "#FFD700",
  "#DC143C",
  "#32CD32",
  "#9400D3",
  "#FF6347",
  "#4682B4",
];

const brushTypes = [
  { value: "round", label: "Round", icon: Circle },
  { value: "square", label: "Square", icon: Square },
  { value: "triangle", label: "Triangle", icon: Triangle },
];

interface DrawingHistory {
  imageData: ImageData;
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState([8]);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushOpacity, setBrushOpacity] = useState([100]);
  const [brushType, setBrushType] = useState("round");
  const [isEraser, setIsEraser] = useState(false);
  const [tool, setTool] = useState<"brush" | "eraser" | "text" | "shape">(
    "brush"
  );
  const [history, setHistory] = useState<DrawingHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [customColor, setCustomColor] = useState("#000000");
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 700 });
  const [showGrid, setShowGrid] = useState(false);

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ imageData });

    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }

    setHistory(newHistory);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const prevState = history[historyIndex - 1];
      ctx.putImageData(prevState.imageData, 0, 0);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const nextState = history[historyIndex + 1];
      ctx.putImageData(nextState.imageData, 0, 0);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  const startDrawing = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    },
    []
  );

  const draw = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.lineWidth = brushSize[0];
      ctx.globalAlpha = brushOpacity[0] / 100;

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = brushColor;

        switch (brushType) {
          case "round":
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            break;
          case "square":
            ctx.lineCap = "square";
            ctx.lineJoin = "miter";
            break;
          case "triangle":
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            break;
        }
      }

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [isDrawing, brushSize, brushColor, brushOpacity, brushType, tool]
  );

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  }, [isDrawing, saveToHistory]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    saveToHistory();
  }, [showGrid, saveToHistory]);

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      const gridSize = 20;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    },
    []
  );

  const downloadCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `boad-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  }, []);

  const importImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          saveToHistory();
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [saveToHistory]
  );

  const toggleGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setShowGrid(!showGrid);

    // Redraw canvas with or without grid
    const currentImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    ctx.putImageData(currentImageData, 0, 0);
  }, [showGrid, drawGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    // Save initial state
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([{ imageData }]);
    setHistoryIndex(0);
  }, [canvasSize, showGrid, drawGrid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Drawing Canvas Pro
                  </h1>
                  <p className="text-sm text-gray-600">by Boad Technologies</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Professional Edition
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Tools Panel */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <Tabs defaultValue="brush" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="brush" onClick={() => setTool("brush")}>
                  <Brush className="h-4 w-4 mr-2" />
                  Brush
                </TabsTrigger>
                <TabsTrigger value="eraser" onClick={() => setTool("eraser")}>
                  <Eraser className="h-4 w-4 mr-2" />
                  Eraser
                </TabsTrigger>
                <TabsTrigger value="colors">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brush" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Brush Size: {brushSize[0]}px</Label>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={brushSize}
                      onValueChange={setBrushSize}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Opacity: {brushOpacity[0]}%</Label>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={brushOpacity}
                      onValueChange={setBrushOpacity}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Brush Type</Label>
                    <Select value={brushType} onValueChange={setBrushType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {brushTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="eraser" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Eraser Size: {brushSize[0]}px</Label>
                    <Slider
                      min={5}
                      max={150}
                      step={1}
                      value={brushSize}
                      onValueChange={setBrushSize}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={clearCanvas}
                      variant="destructive"
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Canvas
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Color Palette</Label>
                    <div className="grid grid-cols-12 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                            brushColor === color
                              ? "border-gray-800 ring-2 ring-blue-500"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setBrushColor(color);
                            setTool("brush");
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="space-y-2">
                      <Label>Custom Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-16 h-10 p-1 border rounded"
                        />
                        <Button
                          onClick={() => {
                            setBrushColor(customColor);
                            setTool("brush");
                          }}
                          variant="outline"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Canvas Width</Label>
                    <Input
                      type="number"
                      value={canvasSize.width}
                      onChange={(e) =>
                        setCanvasSize((prev) => ({
                          ...prev,
                          width: Number.parseInt(e.target.value) || 1000,
                        }))
                      }
                      min={400}
                      max={2000}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Canvas Height</Label>
                    <Input
                      type="number"
                      value={canvasSize.height}
                      onChange={(e) =>
                        setCanvasSize((prev) => ({
                          ...prev,
                          height: Number.parseInt(e.target.value) || 700,
                        }))
                      }
                      min={300}
                      max={1500}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={toggleGrid}
                    variant={showGrid ? "default" : "outline"}
                  >
                    Grid {showGrid ? "On" : "Off"}
                  </Button>
                  <Button
                    onClick={downloadCanvas}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PNG
                  </Button>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={importImage}
                      className="hidden"
                      id="import-image"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="import-image" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Image
                      </label>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-200 rounded-lg shadow-lg cursor-crosshair max-w-full h-auto"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startDrawing(e);
                  }}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    draw(e);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopDrawing();
                  }}
                  style={{ touchAction: "none" }}
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {canvasSize.width} × {canvasSize.height}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t bg-white/50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">
              Boad Technologies
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Professional Drawing Canvas • Advanced Tools • Creative Freedom
          </p>
          <p className="text-xs text-gray-500">
            © 2025 Boad Technologies. Empowering creativity through technology.
          </p>
        </div>
      </div>
    </div>
  );
}
