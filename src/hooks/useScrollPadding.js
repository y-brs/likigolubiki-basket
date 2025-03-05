import { useEffect, useRef } from 'react';

export function useScrollPadding(options = {}) {
  const { threshold = 100, initialPadding = false } = options;
  const scrollBlockRef = useRef(null);

  useEffect(() => {
    const scrollBlock = scrollBlockRef.current;
    if (!scrollBlock) return;

    let prevScrollPosition = window.scrollY;
    const scrollThreshold = threshold;
    let firstScroll = true;
    let isHidden = initialPadding;

    // Устанавливаем начальное состояние
    if (isHidden) {
      scrollBlock.classList.add('--scroll-padding');
    } else {
      scrollBlock.classList.remove('--scroll-padding');
    }

    function handleScroll() {
      const currentScrollPosition = window.scrollY;
      const scrollDifference = Math.abs(currentScrollPosition - prevScrollPosition);
      const isScrollingUp = prevScrollPosition > currentScrollPosition;

      if (firstScroll) {
        firstScroll = false;
        prevScrollPosition = currentScrollPosition;
        return;
      }

      if (scrollDifference >= scrollThreshold) {
        if (isScrollingUp && isHidden) {
          scrollBlock.classList.remove('--scroll-padding');
          isHidden = false;
        } else if (!isScrollingUp && currentScrollPosition > 0 && !isHidden) {
          scrollBlock.classList.add('--scroll-padding');
          isHidden = true;
        }
        prevScrollPosition = currentScrollPosition;
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollBlockRef;
}
