import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// create a function to get 5 characters from the start and end of a string and put ... in the middle
export const truncateString = (str: string) => {
  return str.slice(0, 7) + "..." + str.slice(-7);
};
