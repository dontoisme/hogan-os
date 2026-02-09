'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore, WindowState } from '@/stores/windowStore';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export function Window({ windowState, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    updatePosition,
    updateSize,
    activeWindowId,
  } = useWindowStore();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [initialMouse, setInitialMouse] = useState({ x: 0, y: 0 });

  const isActive = activeWindowId === windowState.id;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLButtonElement) return;
      bringToFront(windowState.id);
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y,
      });
    },
    [bringToFront, windowState.id, windowState.position]
  );

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();
      bringToFront(windowState.id);
      setIsResizing(true);
      setResizeDirection(direction);
      setInitialSize({ width: windowState.size.width, height: windowState.size.height });
      setInitialPos({ x: windowState.position.x, y: windowState.position.y });
      setInitialMouse({ x: e.clientX, y: e.clientY });
    },
    [bringToFront, windowState.id, windowState.size, windowState.position]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 100));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100));
        updatePosition(windowState.id, { x: newX, y: newY });
      }

      if (isResizing && resizeDirection) {
        const dx = e.clientX - initialMouse.x;
        const dy = e.clientY - initialMouse.y;
        const minWidth = windowState.minSize?.width || 400;
        const minHeight = windowState.minSize?.height || 300;

        let newWidth = initialSize.width;
        let newHeight = initialSize.height;
        let newX = initialPos.x;
        let newY = initialPos.y;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, initialSize.width + dx);
        }
        if (resizeDirection.includes('w')) {
          const widthChange = Math.min(dx, initialSize.width - minWidth);
          newWidth = initialSize.width - widthChange;
          newX = initialPos.x + widthChange;
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, initialSize.height + dy);
        }
        if (resizeDirection.includes('n')) {
          const heightChange = Math.min(dy, initialSize.height - minHeight);
          newHeight = initialSize.height - heightChange;
          newY = initialPos.y + heightChange;
        }

        updateSize(windowState.id, { width: newWidth, height: newHeight });
        if (newX !== initialPos.x || newY !== initialPos.y) {
          updatePosition(windowState.id, { x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragOffset,
    resizeDirection,
    initialSize,
    initialPos,
    initialMouse,
    windowState.id,
    windowState.minSize,
    updatePosition,
    updateSize,
  ]);

  const handleMaximize = () => {
    if (windowState.isMaximized) {
      restoreWindow(windowState.id);
    } else {
      maximizeWindow(windowState.id);
    }
  };

  const position = windowState.isMaximized
    ? { x: 0, y: 0 }
    : windowState.position;

  const size = windowState.isMaximized
    ? { width: '100%', height: 'calc(100% - 44px)' }
    : { width: windowState.size.width, height: windowState.size.height };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'absolute flex flex-col rounded-xl overflow-hidden',
        'border border-[var(--border-color)]',
        isActive ? 'ring-1 ring-[var(--border-color)]' : 'opacity-90'
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: windowState.zIndex,
        background: 'var(--bg-window)',
        boxShadow: 'var(--window-shadow)',
      }}
      onMouseDown={() => bringToFront(windowState.id)}
    >
      {/* Title Bar */}
      <div
        className={cn(
          'flex items-center justify-between h-10 px-3 cursor-move select-none',
          'border-b border-[var(--border-color)]',
          'bg-[var(--bg-secondary)]'
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button
              className="window-button window-button-close"
              onClick={() => closeWindow(windowState.id)}
              title="Close"
            />
            <button
              className="window-button window-button-minimize"
              onClick={() => minimizeWindow(windowState.id)}
              title="Minimize"
            />
            <button
              className="window-button window-button-maximize"
              onClick={handleMaximize}
              title={windowState.isMaximized ? 'Restore' : 'Maximize'}
            />
          </div>
        </div>
        <span className="text-xs font-medium text-[var(--text-secondary)] absolute left-1/2 -translate-x-1/2">
          {windowState.title}
        </span>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[var(--bg-window)]">
        {children}
      </div>

      {/* Resize Handles */}
      {!windowState.isMaximized && (
        <>
          <div className="resize-handle resize-handle-n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="resize-handle resize-handle-s" onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="resize-handle resize-handle-e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="resize-handle resize-handle-w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
          <div className="resize-handle resize-handle-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="resize-handle resize-handle-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="resize-handle resize-handle-se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
          <div className="resize-handle resize-handle-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
        </>
      )}
    </motion.div>
  );
}
