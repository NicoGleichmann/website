// Scroll.tsx
import { useEffect, useRef } from 'react';

const HorizontalScroll = () => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.querySelector('.main.container') as HTMLDivElement;
    containerRef.current = container;

    // Verhindere Textmarkierung und andere Störungen
    document.body.style.userSelect = 'none'; // Verhindert die Markierung

    if (!container) return;

    // Funktion für Mausrad-Scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Mehr Geschwindigkeit und größere Distanz pro Scroll
      const scrollSpeed = 4; // Anpassung der Scroll-Geschwindigkeit (mehr als 1 macht es schneller)
      container.scrollLeft += e.deltaY * scrollSpeed; // Multiplizieren, um es schneller zu machen
    };

    // Drag-to-Scroll Funktionen
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - container.getBoundingClientRect().left;
      scrollLeft.current = container.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.getBoundingClientRect().left;
      const walk = (x - startX.current) * 1.5; // Geschwindigkeit des Scrollens
      container.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUpOrLeave = () => {
      isDragging.current = false;
    };

    // Event Listeners hinzufügen
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUpOrLeave);
    container.addEventListener('mouseleave', handleMouseUpOrLeave);

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUpOrLeave);
      container.removeEventListener('mouseleave', handleMouseUpOrLeave);
    };
  }, []);

  return null; // Keine sichtbare Ausgabe notwendig
};

export default HorizontalScroll;
