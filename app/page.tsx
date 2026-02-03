'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      <main className="w-full bg-forest">
        {/* Container */}
        <div className="leaflet-container">
          {/* Leaflet 1 */}
          <div
            className="leaflet-card"
            onClick={() => setZoomedImage('/leaflet-1.png')}
          >
            <Image
              src="/leaflet-1.png"
              alt="Ray Park Café Location"
              width={1200}
              height={1600}
              className="leaflet-image"
              priority
            />
          </div>

          {/* Leaflet 2 */}
          <div
            className="leaflet-card"
            onClick={() => setZoomedImage('/leaflet-2.png')}
          >
            <Image
              src="/leaflet-2.png"
              alt="Ray Park Café"
              width={1200}
              height={1600}
              className="leaflet-image"
            />
          </div>
        </div>
      </main>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black z-50 overflow-auto"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="fixed top-4 right-4 text-white text-5xl w-14 h-14 flex items-center justify-center bg-black/70 rounded-full z-10"
            onClick={() => setZoomedImage(null)}
          >
            ×
          </button>
          <div className="min-h-full flex items-start justify-center p-4">
            <Image
              src={zoomedImage}
              alt="Zoomed leaflet"
              width={1200}
              height={1600}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
