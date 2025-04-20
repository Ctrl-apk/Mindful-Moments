import { useState, useEffect, useRef } from 'react';
import { useMindful } from '@/context/MindfulContext';
import { Button } from '@/components/ui/button';
import ProgressCircle from '@/components/shared/ProgressCircle';
import { Play, Pause, RotateCcw } from 'lucide-react';

const MeditationTimer = () => {
  const { user, createMeditationSession } = useMindful();
  
  // Timer states
  const [duration, setDuration] = useState(10); // In minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // In seconds
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const intervalRef = useRef<number | null>(null);
  
  // Calculate progress percentage
  useEffect(() => {
    const totalSeconds = duration * 60;
    const progressPercentage = ((totalSeconds - timeLeft) / totalSeconds) * 100;
    setProgress(progressPercentage);
  }, [timeLeft, duration]);
  
  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      if (isActive) {
        handleTimerComplete();
      }
      setIsActive(false);
      clearInterval(intervalRef.current!);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);
  
  // Format time display (MM:SS)
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle timer complete
  const handleTimerComplete = () => {
    if (user) {
      createMeditationSession({
        userId: user.id,
        duration: duration,
        type: 'timer',
        completed: true
      });
    }
  };
  
  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    setProgress(0);
  };
  
  // Set timer duration
  const changeDuration = (mins: number) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
    setProgress(0);
    setIsActive(false);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div className="w-64 h-64 rounded-full bg-primary-light/10 flex items-center justify-center timer-animation">
          <div className="w-56 h-56 rounded-full bg-primary-light/20 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-white shadow-sm flex flex-col items-center justify-center z-10">
              <p className="text-4xl font-bold text-neutral-700">{formatTime(timeLeft)}</p>
              <p className="text-neutral-500 mt-2">minutes</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64">
          <ProgressCircle progress={progress} />
        </div>
      </div>
      
      <div className="flex space-x-3 mb-6">
        {[5, 10, 15, 20].map((mins) => (
          <Button
            key={mins}
            onClick={() => changeDuration(mins)}
            variant={duration === mins ? "default" : "outline"}
            className={`rounded-full w-12 h-12 p-0 ${
              duration === mins ? 'bg-primary text-white' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
            }`}
          >
            {mins}
          </Button>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <Button
          onClick={toggleTimer}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-8 rounded-lg transition-colors flex items-center"
        >
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button
          onClick={resetTimer}
          variant="outline"
          className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-medium py-2.5 px-8 rounded-lg transition-colors flex items-center"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default MeditationTimer;
