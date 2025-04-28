// src/pages/PodcastPage.jsx
import React from "react";
import { ExpandableCardDemo } from "@/components/ExpandableCardDemo"; // adjust path based on your structure

export default function Podcast() {
  return (
    <div className="pt-24 px-4">
      {" "}
      {/* padding top for navbar offset */}
      <h1 className="text-3xl font-bold mb-6 text-center">Podcasts</h1>
      <ExpandableCardDemo />
    </div>
  );
}
