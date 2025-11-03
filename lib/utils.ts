import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string, wordLimit: number): string {
  const words = text.split(" ")
  if (words.length <= wordLimit) {
    return text
  }
  return words.slice(0, wordLimit).join(" ") + "..."
}
