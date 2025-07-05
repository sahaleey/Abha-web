// src/pages/PodcastPage.jsx
import React from "react";
import { ExpandableCardDemo } from "@/components/ExpandableCardDemo"; // adjust path based on your structure

export default function Podcast() {
  return (
    <div className="pt-24 px-4">
      {" "}
      {/* padding top for navbar offset */}
      <ExpandableCardDemo />
    </div>
  );
}
