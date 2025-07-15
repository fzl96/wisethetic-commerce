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
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DateTimePicker24h({ date, setDate }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  // const hours = Array.from({ length: 12 }, (_, i) => i + 10); // 10 to 21
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // const handleTimeChange = (type: "hour" | "minute", value: string) => {
  //   if (date) {
  //     const newDate = new Date(date);
  //     if (type === "hour") {
  //       newDate.setHours(parseInt(value));
  //     } else if (type === "minute") {
  //       newDate.setMinutes(parseInt(value));
  //     }
  //     setDate(newDate);
  //   }
  // };

  console.log(date);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
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
              <span>Select a date and time</span>
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
            initialFocus
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
                      onClick={() => {
                        if (date) {
                          const newDate = new Date(date);
                          newDate.setHours(hours);
                          newDate.setMinutes(minutes);
                          newDate.setSeconds(0);
                          newDate.setMilliseconds(0);
                          setDate(newDate);
                        }
                      }}
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            {/* <ScrollArea className="w-64 sm:w-auto"> */}
            {/*   <div className="flex sm:flex-col p-2"> */}
            {/*     {hours.map((hour) => ( */}
            {/*       <Button */}
            {/*         key={hour} */}
            {/*         size="icon" */}
            {/*         variant={ */}
            {/*           date && date.getHours() === hour ? "default" : "ghost" */}
            {/*         } */}
            {/*         className="sm:w-full shrink-0 aspect-square" */}
            {/*         onClick={() => handleTimeChange("hour", hour.toString())} */}
            {/*       > */}
            {/*         {hour} */}
            {/*       </Button> */}
            {/*     ))} */}
            {/*   </div> */}
            {/*   <ScrollBar orientation="horizontal" className="sm:hidden" /> */}
            {/* </ScrollArea> */}
            {/* <ScrollArea className="w-64 sm:w-auto"> */}
            {/*   <div className="flex sm:flex-col p-2"> */}
            {/*     {Array.from({ length: 4 }, (_, i) => i * 15) */}
            {/*       .filter((minute) => !(date?.getHours() === 21 && minute > 0)) */}
            {/*       .map((minute) => ( */}
            {/*         <Button */}
            {/*           key={minute} */}
            {/*           size="icon" */}
            {/*           variant={ */}
            {/*             date && date.getMinutes() === minute */}
            {/*               ? "default" */}
            {/*               : "ghost" */}
            {/*           } */}
            {/*           className="sm:w-full shrink-0 aspect-square" */}
            {/*           onClick={() => */}
            {/*             handleTimeChange("minute", minute.toString()) */}
            {/*           } */}
            {/*         > */}
            {/*           {minute.toString().padStart(2, "0")} */}
            {/*         </Button> */}
            {/*       ))} */}
            {/*   </div> */}
            {/*   <ScrollBar orientation="horizontal" className="sm:hidden" /> */}
            {/* </ScrollArea> */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
