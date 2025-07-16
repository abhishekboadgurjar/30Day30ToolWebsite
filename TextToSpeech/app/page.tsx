'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Download, 
  Volume2, 
  Mic,
  Globe,
  FileText,
  Users,
  ExternalLink
} from 'lucide-react';

interface Voice extends SpeechSynthesisVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

export default function Home() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Character and word counts
  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Load voices
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    const loadVoices = () => {
      const availableVoices = synthRef.current?.getVoices() || [];
      setVoices(availableVoices as Voice[]);
      
      if (availableVoices.length > 0 && !selectedVoice) {
        const defaultVoice = availableVoices.find(voice => voice.default) || availableVoices[0];
        setSelectedVoice(defaultVoice.voiceURI);
        setSelectedLang(defaultVoice.lang);
      }
    };

    loadVoices();
    
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [selectedVoice]);

  // Get unique languages
  const uniqueLanguages = Array.from(
    new Set(voices.map(voice => voice.lang))
  ).sort();

  // Filter voices by selected language
  const filteredVoices = selectedLang 
    ? voices.filter(voice => voice.lang === selectedLang)
    : voices;

  const handlePlay = async () => {
    if (!text.trim() || !synthRef.current) return;

    setIsLoading(true);
    
    // Setup media recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.start();
    } catch (error) {
      console.warn('Audio recording not available:', error);
    }

    if (isPaused && utteranceRef.current) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      setIsLoading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoading(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
      setProgress(0);
    };

    utterance.onboundary = (event) => {
      const progress = (event.charIndex / text.length) * 100;
      setProgress(progress);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDownload = () => {
    if (audioChunksRef.current.length === 0) {
      alert('No audio recorded. Please play the text first to record audio.');
      return;
    }

    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speech-${Date.now()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleVoiceChange = (voiceURI: string) => {
    setSelectedVoice(voiceURI);
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      setSelectedLang(voice.lang);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    const voicesForLang = voices.filter(v => v.lang === lang);
    if (voicesForLang.length > 0) {
      setSelectedVoice(voicesForLang[0].voiceURI);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Text to Speech Converter
                </h1>
                <p className="text-sm text-gray-600">Convert your text into natural speech with AI voices</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <a
                href="https://www.boadtechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span className="font-medium">BOAD Technologies</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          {/* Mobile BOAD link */}
          <div className="sm:hidden mt-3">
            <a
              href="https://www.boadtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="font-medium">BOAD Technologies</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Text Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-xl">Enter Your Text</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type or paste your text here to convert it to speech..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] text-base leading-relaxed resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
                
                {/* Progress Bar */}
                {progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Speaking Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Text Statistics */}
                <div className="flex gap-4 pt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {characterCount} characters
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {wordCount} words
                  </Badge>
                  {text && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      ~{Math.ceil(wordCount / 150)} min read
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Audio Controls */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handlePlay}
                    disabled={!text.trim() || isLoading}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    ) : isPaused ? (
                      <RotateCcw className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Loading...' : isPaused ? 'Resume' : 'Play'}
                  </Button>

                  <Button
                    onClick={handlePause}
                    disabled={!isPlaying}
                    variant="outline"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>

                  <Button
                    onClick={handleStop}
                    disabled={!isPlaying && !isPaused}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>

                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                {(isPlaying || isPaused) && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-gray-700">
                        {isPlaying ? 'Speaking...' : 'Paused'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Voice & Language Settings */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Language</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={selectedLang} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {new Intl.DisplayNames(['en'], { type: 'language' }).of(lang.split('-')[0]) || lang}
                        <span className="text-gray-500 ml-2">({lang})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">Voice</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredVoices.map((voice) => (
                      <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                        <div className="flex flex-col">
                          <span>{voice.name}</span>
                          <span className="text-xs text-gray-500">
                            {voice.lang} {voice.localService && '(Local)'}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Features Info */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Features
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Natural AI voices
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    Multi-language support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Audio download
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    Playback controls
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Separator className="mb-6" />
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              Designed and Developed by{' '}
              <a
                href="https://www.boadtechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline"
              >
                BOAD Technologies
              </a>
            </p>
            <p className="text-xs text-gray-500">
              Powered by Web Speech API • No server required • Privacy-first design
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}