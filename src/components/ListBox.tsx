import React, { useState, useRef, KeyboardEvent } from "react";

interface ListboxProps {
  items: string[];
}

export const Listbox: React.FC<ListboxProps> = ({ items }) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>): void => {
    if (!["ArrowUp", "ArrowDown"].includes(event.key)) return;

    event.preventDefault();
    let newIndex = focusedIndex;

    if (event.key === "ArrowDown") {
      newIndex = Math.min(focusedIndex + 1, items.length - 1); // Prevent overflow
    } else if (event.key === "ArrowUp") {
      newIndex = Math.max(focusedIndex - 1, 0); // Prevent underflow
    }

    setFocusedIndex(newIndex);

    const listBox = listRef.current;
    const listItem = listBox?.children[newIndex] as HTMLLIElement | undefined;

    if (listBox && listItem) {
      const listBoxRect = listBox.getBoundingClientRect();
      const listItemRect = listItem.getBoundingClientRect();

      // Scroll down if the item's bottom is outside the visible area
      if (listItemRect.bottom > listBoxRect.bottom) {
        listBox.scrollTop += listItemRect.bottom - listBoxRect.bottom;
      }

      // Scroll up if the item's top is outside the visible area
      if (listItemRect.top < listBoxRect.top) {
        listBox.scrollTop -= listBoxRect.top - listItemRect.top;
      }
    }
  };

  return (
    <ul
      role="listbox"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={listRef}
      style={{
        maxHeight: "200px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: 0,
        listStyle: "none",
      }}
    >
      {items.map((item, index) => (
        <li
          key={item}
          role="option"
          aria-selected={focusedIndex === index}
          style={{
            padding: "8px",
            background: focusedIndex === index ? "#007BFF" : "white",
            color: focusedIndex === index ? "white" : "black",
            borderBottom: "1px solid #eee",
          }}
        >
          <div>
            {item}
            <br />
            {item}
            <br />
            {item}
            <br />
            {item}
            <br />
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
};
