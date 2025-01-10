import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "	https://file.302.ai/gpt/showcase/20250109/f495d4daa93d433f99aff32a5404db9f.webp",
  },
  {
    artist: "Tom Byrom",
    art: "https://file.302.ai/gpt/showcase/20250109/f495d4daa93d433f99aff32a5404db9f.webp",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://file.302.ai/gpt/showcase/20250109/f495d4daa93d433f99aff32a5404db9f.webp",
  },
]

export function ScrollPage() {
  return (
    <ScrollArea className="h-[18px] w-full whitespace-nowrap overflow-hidden hover:h-[80px] transition-all duration-300 opacity-80 hover:opacity-100">
      <div className="flex w-max space-x-2">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="relative w-[140px] h-[80px] shrink-0 cursor-pointer">
            <div className="overflow-hidden h-full">
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="w-full h-auto object-cover"
                width={140}
                height={80}
                style={{ objectFit: "cover", width: "auto", height: "auto" }}
              />
              <figcaption className="p-2 absolute overflow-hidden inset-0 flex items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity text-white text-xs truncate">
                Photo by{" "}
                <span className="font-semibold">
                  {artwork.artist}
                </span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

  )
}
