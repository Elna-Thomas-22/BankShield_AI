import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Undo2, CheckCircle2, Sparkles } from 'lucide-react';
import { AudioButton } from '../common/AudioButton';
import confetti from 'canvas-confetti';

interface WritingCanvasProps {
  targetCharacter: string;
  transliteration: string;
  audioText?: string;
  onComplete?: () => void;
  width?: number;
  height?: number;
}

export const WritingCanvas: React.FC<WritingCanvasProps> = ({
  targetCharacter,
  transliteration,
  audioText,
  onComplete,
  width = 280,
  height = 280
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const drawBackgroundGuideline = useCallback((ctx: CanvasRenderingContext2D) => {
    // Fill background
    ctx.fillStyle = '#fefdfa';
    ctx.fillRect(0, 0, width, height);

    // Draw faint grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Horizontal middle
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Vertical middle
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    ctx.setLineDash([]);

    // Draw faint dotted Kannada character guide
    ctx.fillStyle = '#d1d5db';
    ctx.font = `600 ${height * 0.55}px "Noto Sans Kannada", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(targetCharacter, width / 2, height / 2 + 10);
  }, [targetCharacter, width, height]);

  // Setup canvas background outline on mount or letter change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset state
    ctx.clearRect(0, 0, width, height);
    drawBackgroundGuideline(ctx);
    setHasDrawn(false);
    setIsCompleted(false);
    setHistory([]);
  }, [drawBackgroundGuideline, width, height]);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const currentData = ctx.getImageData(0, 0, width, height);
    setHistory((prev) => [...prev.slice(-10), currentData]);
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveHistory();
    setIsDrawing(true);
    setHasDrawn(true);

    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#15803d'; // Soft green stroke
    ctx.lineWidth = 14;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    drawBackgroundGuideline(ctx);
    setHasDrawn(false);
    setIsCompleted(false);
    setHistory([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousData = history[history.length - 1];
    ctx.putImageData(previousData, 0, 0);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleCheck = () => {
    setIsCompleted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    if (onComplete) onComplete();
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 max-w-sm mx-auto">
      {/* Target Character Display Header */}
      <div className="flex items-center justify-between w-full px-2">
        <div>
          <span className="text-xs font-semibold uppercase text-emerald-700 tracking-wider">
            Writing Practice
          </span>
          <h3 className="text-lg font-bold text-emerald-950">
            Trace the letter: <span className="kannada-text text-amber-600 font-extrabold text-xl ml-1">{targetCharacter}</span> ({transliteration})
          </h3>
        </div>
        <AudioButton
          id={`wc_${targetCharacter}`}
          textToSpeak={audioText || targetCharacter}
          size="sm"
          variant="secondary"
        />
      </div>

      {/* Interactive Drawing Canvas */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-dashed border-emerald-300 shadow-inner bg-amber-50/20">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none"
        />

        {isCompleted && (
          <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white animate-celebrate">
            <Sparkles className="w-12 h-12 text-amber-300 mb-2 animate-bounce" />
            <span className="text-2xl font-extrabold">Good job! 🎉</span>
            <span className="text-sm font-medium text-emerald-100 mt-1">+5 XP Earned</span>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-2 w-full justify-between pt-1">
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-xl transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
            Undo
          </button>
        </div>

        <button
          onClick={handleCheck}
          disabled={!hasDrawn}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          Done!
        </button>
      </div>
    </div>
  );
};
