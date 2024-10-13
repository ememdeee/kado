'use client'

import React, { useState, useEffect } from 'react'
import { FaGift } from "react-icons/fa6"

interface AnimatedHeadingProps {
  children: React.ReactNode;
}

export default function AnimatedHeading({ children }: AnimatedHeadingProps) {
  const [text, setText] = useState('')
  const fullText = React.Children.toArray(children).join('')

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [text, fullText])

  return (
    <div className="flex items-start justify-center">
      <h1 className="text-6xl font-bold animate-fade-in-up min-h-[1.2em]">
        {text}
      </h1>
      <div className="animate-blink flex-shrink-0 pt-2 pl-2">
        <FaGift className="w-6 h-6" />
      </div>
    </div>
  )
}