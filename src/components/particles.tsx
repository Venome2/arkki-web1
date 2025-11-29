'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Adapted from https://codepen.io/alphardex/pen/vYEYdQP
export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
}: {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number; isDown: boolean }>({
    x: 0,
    y: 0,
    isDown: false,
  });
  const requestAnimationFrameRef = useRef<number>(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(requestAnimationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    onMouseMove();
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasContainerRef.current) {
      canvasContainerRef.current.addEventListener(
        'mousemove',
        (event: MouseEvent) => {
          const rect = canvasContainerRef.current!.getBoundingClientRect();
          const { clientX, clientY } = event;
          mousePosition.current.x = clientX - rect.left;
          mousePosition.current.y = clientY - rect.top;
        }
      );
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasRef.current.width = canvasContainerRef.current.offsetWidth;
      canvasRef.current.height = canvasContainerRef.current.offsetHeight;
      context.current.fillStyle = `hsl(var(--primary))`;
    }
  };

  const drawParticle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, S, R } = circle;
      context.current.beginPath();
      context.current.arc(x, y, R, 0, 2 * Math.PI);
      context.current.closePath();
      context.current.globalAlpha = S;
      context.current.fill();
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = {
        x: Math.random() * canvasRef.current!.width,
        y: Math.random() * canvasRef.current!.height,
        translateX: 0,
        translateY: 0,
        R: Math.random() * 2,
        S: Math.random() * 0.4, // Opacity
        dX: (Math.random() - 0.5) * 0.1, // Delta X
        dY: (Math.random() - 0.5) * 0.1, // Delta Y
      };
      circles.current.push(circle);
      drawParticle(circle);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    }
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle, i) => {
      // Handle "static" particles
      if (i < circles.current.length / 2) {
        circle.x += circle.dX;
        circle.y += circle.dY;
      } else {
        // Handle mouse-following particles
        circle.translateX +=
          (mousePosition.current.x - circle.translateX) / (ease / 2);
        circle.translateY +=
          (mousePosition.current.y - circle.translateY) / (ease / 2);
        circle.x = circle.translateX;
        circle.y = circle.translateY;
      }
      
      // Boundary conditions
      if (
        circle.x < -50 ||
        circle.x > canvasRef.current!.width + 50 ||
        circle.y < -50 ||
        circle.y > canvasRef.current!.height + 50
      ) {
        circles.current.splice(i, 1);
        const newCircle = {
          x: Math.random() * canvasRef.current!.width,
          y: Math.random() * canvasRef.current!.height,
          translateX: 0,
          translateY: 0,
          R: Math.random() * 2,
          S: Math.random() * 0.4,
          dX: (Math.random() - 0.5) * 0.1,
          dY: (Math.random() - 0.5) * 0.1,
        };
        circles.current.push(newCircle);
      }
      drawParticle(circle);
    });
    requestAnimationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className={cn('h-full w-full', className)} ref={canvasContainerRef}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
