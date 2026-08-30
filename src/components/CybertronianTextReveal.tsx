"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type CharacterRecord = {
  original: string;
  span: HTMLSpanElement;
  revealAt: number | null;
};

type TextRecord = {
  original: string;
  span: HTMLSpanElement;
  characters: CharacterRecord[];
  delay: number;
};

const cybertronianCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const revealDuration = 1_600;
const nodeDelay = 80;
const scrambleInterval = 70;

function isCharacterToScramble(character: string) {
  return /[A-Za-z0-9]/.test(character);
}

function getCharacterCount(value: string) {
  return Array.from(value).filter(isCharacterToScramble).length;
}

function createRevealOrder(characterCount: number) {
  const positions = Array.from({ length: characterCount }, (_, index) => index);

  for (let index = positions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [positions[index], positions[randomIndex]] = [
      positions[randomIndex],
      positions[index],
    ];
  }

  const order = Array.from({ length: characterCount }, () => 0);
  positions.forEach((characterIndex, revealIndex) => {
    order[characterIndex] = (revealIndex + 1) / (characterCount + 1);
  });

  return order;
}

function getCybertronianCharacter() {
  return cybertronianCharacters[
    Math.floor(Math.random() * cybertronianCharacters.length)
  ];
}

export function CybertronianTextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.querySelector("[data-scramble-root]");
    if (!root) return;

    let animationFrame = 0;
    let cancelled = false;
    let lastScrambleUpdate = 0;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!node.nodeValue?.trim() || !parent) {
          return NodeFilter.FILTER_REJECT;
        }

        if (parent.closest("script, style, [data-scramble-ignore]")) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const textNodes: Text[] = [];
    let node = walker.nextNode();

    while (node) {
      textNodes.push(node as Text);
      node = walker.nextNode();
    }

    const records: TextRecord[] = textNodes.map((textNode, index) => {
      const original = textNode.nodeValue ?? "";
      const span = document.createElement("span");
      const revealOrder = createRevealOrder(getCharacterCount(original));
      let scrambleIndex = 0;

      const characters = Array.from(original).map((character) => {
        const characterSpan = document.createElement("span");
        const shouldScramble = isCharacterToScramble(character);

        if (shouldScramble) {
          characterSpan.style.fontFamily = "Cybertronian";
          characterSpan.textContent = getCybertronianCharacter();
        } else {
          characterSpan.textContent = character;
        }

        span.appendChild(characterSpan);

        return {
          original: character,
          span: characterSpan,
          revealAt: shouldScramble ? revealOrder[scrambleIndex++] : null,
        };
      });

      textNode.replaceWith(span);

      return {
        original,
        span,
        characters,
        delay: index * nodeDelay,
      };
    });

    function restoreText() {
      records.forEach(({ original, span }) => {
        if (span.isConnected) span.replaceWith(document.createTextNode(original));
      });
    }

    function animate(startTime: number, currentTime: number) {
      if (cancelled) return;

      let complete = true;
      const shouldUpdateGlyphs =
        currentTime - lastScrambleUpdate >= scrambleInterval;

      if (shouldUpdateGlyphs) {
        lastScrambleUpdate = currentTime;
      }

      records.forEach((record) => {
        const progress = Math.min(
          Math.max((currentTime - startTime - record.delay) / revealDuration, 0),
          1,
        );
        if (progress < 1) {
          complete = false;
        }

        record.characters.forEach((character) => {
          if (character.revealAt === null) return;

          if (progress >= character.revealAt) {
            character.span.textContent = character.original;
            character.span.style.fontFamily = "";
            return;
          }

          if (shouldUpdateGlyphs) {
            character.span.textContent = getCybertronianCharacter();
          }
        });
      });

      if (complete) {
        restoreText();
        return;
      }

      animationFrame = window.requestAnimationFrame((nextTime) =>
        animate(startTime, nextTime),
      );
    }

    function startAnimation() {
      if (cancelled) return;

      animationFrame = window.requestAnimationFrame((startTime) =>
        animate(startTime, startTime),
      );
    }

    void document.fonts.load("1em Cybertronian").then(startAnimation, startAnimation);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      restoreText();
    };
  }, [pathname]);

  return null;
}
