import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface AudioButtonProps {
  id: string;
  textToSpeak: string;
  audioUrl?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill';
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  id,
  textToSpeak,
  audioUrl,
  label = 'Listen',
  size = 'md',
  variant = 'primary',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioService.subscribe((playingId) => {
      setIsPlaying(playingId === id);
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      audioService.stop();
    } else {
      audioService.playSound(id, textToSpeak, audioUrl);
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  const variantClasses = {
    primary:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow active:scale-95 transition-all duration-150 rounded-xl',
    secondary:
      'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl active:scale-95 transition-all duration-150',
    ghost:
      'bg-transparent hover:bg-emerald-50 text-emerald-700 rounded-lg active:scale-95 transition-colors',
    pill:
      'bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow hover:shadow-md active:scale-95 transition-all'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Listen to ${textToSpeak}`}
      className={`inline-flex items-center justify-center font-medium cursor-pointer select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {isPlaying ? (
        <>
          <span className="flex items-center gap-0.5">
            <span className="w-1 h-3 bg-current animate-bounce rounded-full" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-4 bg-current animate-bounce rounded-full" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-2 bg-current animate-bounce rounded-full" style={{ animationDelay: '300ms' }} />
          </span>
          {label && <span>Playing...</span>}
        </>
      ) : (
        <>
          <Volume2 className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
};
