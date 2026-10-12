import React from 'react';
import type { ConversationItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { Play } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface ConversationCardProps {
  conversation: ConversationItem;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation
}) => {
  const playFullConversation = () => {
    // Sequentially speak dialogue lines
    const fullText = conversation.lines
      .map((line) => `${line.kannada}`)
      .join('. ');
    audioService.playSound(`full_${conversation.id}`, fullText);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100/90 mb-6">
      
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
            {conversation.icon}
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
              {conversation.title} <span className="kannada-text text-amber-600 font-bold">({conversation.titleKannada})</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {conversation.description}
            </p>
          </div>
        </div>

        <button
          onClick={playFullConversation}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold text-sm shadow-sm transition-all active:scale-95 cursor-pointer self-start sm:self-center"
        >
          <Play className="w-4 h-4 fill-current" />
          Play Full Dialogue
        </button>
      </div>

      {/* Chat Messages Stream */}
      <div className="space-y-4">
        {conversation.lines.map((line, idx) => {
          const isSpeakerA = idx % 2 === 0;
          return (
            <div
              key={line.id}
              className={`flex flex-col ${
                isSpeakerA ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className={`max-w-xl rounded-3xl p-4 border shadow-xs ${
                  isSpeakerA
                    ? 'bg-emerald-50/80 border-emerald-100 text-emerald-950 rounded-tl-xs'
                    : 'bg-amber-50/80 border-amber-100 text-amber-950 rounded-tr-xs'
                }`}
              >
                {/* Speaker Label */}
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSpeakerA
                        ? 'bg-emerald-200/60 text-emerald-900'
                        : 'bg-amber-200/60 text-amber-900'
                    }`}
                  >
                    {line.speaker}
                  </span>
                  <AudioButton
                    id={`line_${line.id}`}
                    textToSpeak={line.kannada}
                    audioUrl={line.audioUrl}
                    label=""
                    size="sm"
                    variant="ghost"
                  />
                </div>

                {/* Kannada Line */}
                <h4 className="kannada-text text-xl sm:text-2xl font-extrabold mb-1">
                  {line.kannada}
                </h4>

                {/* Transliteration */}
                <p className="text-xs sm:text-sm font-bold text-amber-800">
                  {line.transliteration}
                </p>

                {/* English Translation */}
                <p className="text-xs text-gray-600 font-medium mt-1 pt-1 border-t border-black/5">
                  "{line.english}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
