import React from 'react'

export default function ContentVideoPreview() {
  return (
    <>
      <div className="flex shrink-0 h-[calc(100vh-110px-104px)] rounded-[20px] overflow-hidden">
        <iframe className="w-full aspect-video"
          src="https://www.youtube.com/embed/tYyPdH32faE?si=heerM3KnIDqdfrZJ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </div>
      <div className="flex items-center justify-between gap-5">
        <h1 className="font-bold text-[32px] leading-[48px]">Install Figma Plugins</h1>
        <button type="button" className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
          Mark as Completed
        </button>
      </div>
    </>
  )
}
