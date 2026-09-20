import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';

const MIN_ZOOM = 0.5;
const DEFAULT_ZOOM = 2;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.15;
type Position = { x: number; y: number };
type Size = { width: number; height: number };
interface ImageDraggerProps {
  src: string;
  alt?: string;
  className?: string;
}
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function ImageDragger({ src, alt = '', className = '' }: ImageDraggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const natural = useRef<Size>({ width: 0, height: 0 });
  const fitted = useRef<Size>({ width: 0, height: 0 });
  const zoomRef = useRef(DEFAULT_ZOOM);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const dragStart = useRef({ pointer: { x: 0, y: 0 }, position: { x: 0, y: 0 } });
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true);

  const constrain = useCallback((next: Position, scale = zoomRef.current) => {
    const container = containerRef.current;
    if (!container || !fitted.current.width || !fitted.current.height) return { x: 0, y: 0 };
    const maxX = Math.max(0, (fitted.current.width * scale - container.clientWidth) / 2);
    const maxY = Math.max(0, (fitted.current.height * scale - container.clientHeight) / 2);
    return { x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) };
  }, []);

  const updatePosition = useCallback(
    (next: Position, scale?: number) => {
      const value = constrain(next, scale);
      if (value.x === positionRef.current.x && value.y === positionRef.current.y) return;
      positionRef.current = value;
      setPosition(value);
    },
    [constrain],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || !natural.current.width || !natural.current.height) return;
    const factor = Math.min(container.clientWidth / natural.current.width, container.clientHeight / natural.current.height);
    const next = { width: natural.current.width * factor, height: natural.current.height * factor };
    if (next.width !== fitted.current.width || next.height !== fitted.current.height) {
      fitted.current = next;
      setSize(next);
    }
    updatePosition(positionRef.current);
  }, [updatePosition]);

  const setZoomAt = useCallback(
    (requested: number, clientX?: number, clientY?: number) => {
      const next = clamp(requested, MIN_ZOOM, MAX_ZOOM);
      if (next === zoomRef.current) return;
      let nextPosition = positionRef.current;
      const container = containerRef.current;
      if (container && clientX !== undefined && clientY !== undefined) {
        const rect = container.getBoundingClientRect();
        const ratio = next / zoomRef.current;
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        nextPosition = { x: x - (x - nextPosition.x) * ratio, y: y - (y - nextPosition.y) * ratio };
      }
      zoomRef.current = next;
      setZoom(next);
      updatePosition(nextPosition, next);
    },
    [updatePosition],
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setZoomAt(zoomRef.current + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), event.clientX, event.clientY);
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
  }, [setZoomAt]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    natural.current = { width: 0, height: 0 };
    fitted.current = { width: 0, height: 0 };
    zoomRef.current = DEFAULT_ZOOM;
    positionRef.current = { x: 0, y: 0 };
    setSize({ width: 0, height: 0 });
    setZoom(DEFAULT_ZOOM);
    setPosition({ x: 0, y: 0 });
    setLoading(true);
  }, [src]);

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className={`relative h-72 w-full touch-none select-none overflow-hidden rounded-2xl border bg-muted/20 shadow-sm ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={(event) => {
          dragStart.current = { pointer: { x: event.clientX, y: event.clientY }, position: positionRef.current };
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          updatePosition({
            x: dragStart.current.position.x + event.clientX - dragStart.current.pointer.x,
            y: dragStart.current.position.y + event.clientY - dragStart.current.pointer.y,
          });
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {loading && <div className="absolute inset-0 animate-pulse bg-muted/40" aria-hidden="true" />}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: size.width, height: size.height, transform: `translate3d(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px), 0)` }}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            draggable={false}
            onLoad={() => {
              const image = imageRef.current;
              if (!image) return;
              natural.current = { width: image.naturalWidth, height: image.naturalHeight };
              setLoading(false);
              measure();
            }}
            className={`block h-full w-full max-w-none object-contain ${dragging ? '' : 'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out'}`}
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
        <div
          className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
          aria-live="polite"
        >
          {Math.round(zoom * 100)}%
        </div>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-xl border bg-background/80 p-1 shadow-lg backdrop-blur-md">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoomAt(zoomRef.current + ZOOM_STEP)}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoomAt(zoomRef.current - ZOOM_STEP)}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Reset"
          onClick={() => {
            zoomRef.current = DEFAULT_ZOOM;
            setZoom(DEFAULT_ZOOM);
            updatePosition({ x: 0, y: 0 }, DEFAULT_ZOOM);
          }}
          className="flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-medium transition-colors hover:bg-muted"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" /> Reset
        </button>
      </div>
    </div>
  );
}
