"use client";

import * as React from "react";
import { IconCalendarMonth as CalendarIcon } from "@tabler/icons-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  date?: Date;
  reserved: { date: Date }[];
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  locationId: string | undefined;
}

export function DateTimePicker24h({
  date,
  setDate,
  reserved,
  locationId,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateSelect = (selectedDay: Date | undefined) => {
    if (!selectedDay) return;

    const newDate = new Date(selectedDay);
    const hours = date ? date.getHours() : 10;
    const minutes = date ? date.getMinutes() : 0;
    newDate.setHours(hours, minutes, 0, 0);

    setDate(newDate);
  };

  const handleTimeSelect = (hours: number, minutes: number) => {
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(hours, minutes, 0, 0);
    setDate(newDate);
    // The line `setIsOpen(false);` has been removed from here.
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={!locationId}>
        <Button
          variant="outline"
          className={cn(
            "cursor-pointer w-full flex justify-between font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "MMM dd, yyyy")
            ) : (
              <span>Select date & time</span>
            )}
          </div>
          <span>{date ? format(date, "HH:mm") : ""}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(day) => day < yesterday}
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto pl-2 pr-4 py-2">
              <div className="flex sm:flex-col p-2 md:gap-2 gap-0">
                {Array.from({ length: (21 - 10) * 4 + 1 }, (_, i) => {
                  const totalMinutes = 10 * 60 + i * 15;
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;
                  const label = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`;

                  const isReserved =
                    date &&
                    reserved.some((r) => {
                      const sameDay =
                        r.date.getFullYear() === date.getFullYear() &&
                        r.date.getMonth() === date.getMonth() &&
                        r.date.getDate() === date.getDate();
                      const sameTime =
                        r.date.getHours() === hours &&
                        r.date.getMinutes() === minutes;
                      return sameDay && sameTime;
                    });

                  if (isReserved) return null;

                  return (
                    <Button
                      key={label}
                      variant={
                        date &&
                        date.getHours() === hours &&
                        date.getMinutes() === minutes
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full cursor-pointer px-4 py-2 text-lg font-normal"
                      onClick={() => handleTimeSelect(hours, minutes)}
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
