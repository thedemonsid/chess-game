import Chessboard from "@/components/chessboard";
import { Chess } from "chess.js";
import React from "react";

const Play = () => {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 flex">
        <section>
          <Chessboard />
        </section>
        <section>Settings</section>
      </div>
    </main>
  );
};

export default Play;
