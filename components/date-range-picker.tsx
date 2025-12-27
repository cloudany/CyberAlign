"use client"

import * as React from "react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2025, 0, 1), // Jan 01, 2025
        to: new Date(2025, 0, 31),  // Jan 31, 2025
    })
    const [isOpen, setIsOpen] = React.useState(false)

    // Presets
    const presets = [
        {
            label: "Today",
            getValue: () => {
                const today = new Date()
                return { from: today, to: today }
            },
        },
        {
            label: "This Week",
            getValue: () => {
                const today = new Date()
                return { from: startOfWeek(today), to: endOfWeek(today) }
            },
        },
        {
            label: "This Month",
            getValue: () => {
                const today = new Date()
                return { from: startOfMonth(today), to: endOfMonth(today) }
            },
        },
        {
            label: "This Year",
            getValue: () => {
                const today = new Date()
                return { from: startOfYear(today), to: endOfYear(today) }
            },
        },
    ]

    const handlePresetClick = (preset: { getValue: () => DateRange }) => {
        const newRange = preset.getValue()
        setDate(newRange)
    }

    const isPresetActive = (preset: { getValue: () => DateRange }) => {
        if (!date?.from || !date?.to) return false
        const range = preset.getValue()
        return isSameDay(date.from, range.from) && isSameDay(date.to, range.to)
    }

    const handleSelect: React.ComponentProps<typeof Calendar>["onSelect"] = (
        range,
        selectedDay
    ) => {
        // Smart Reset: If a complete range is already selected, start a new selection
        if (date?.from && date?.to) {
            setDate({ from: selectedDay, to: undefined })
            return
        }

        // Standard behavior for other cases (selecting the second date)
        setDate(range)
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[260px] justify-start text-left font-normal transition-all duration-200",
                            !date && "text-muted-foreground",
                            isOpen && "ring-2 ring-blue-100 border-blue-500"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                        {date?.from ? (
                            date.to ? (
                                <span className="text-slate-900 font-medium">
                                    {format(date.from, "MMM dd")} - {format(date.to, "MMM dd, yyyy")}
                                </span>
                            ) : (
                                <span className="text-slate-900 font-medium">
                                    {format(date.from, "MMM dd, yyyy")}
                                </span>
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 overflow-hidden rounded-xl shadow-xl border-slate-200" align="start">
                    <div className="flex">
                        {/* Left Panel: Presets */}
                        <div className="w-[160px] border-r border-slate-100 p-3 flex flex-col gap-1 bg-white">
                            {presets.map((preset) => {
                                const isActive = isPresetActive(preset)
                                return (
                                    <button
                                        key={preset.label}
                                        onClick={() => handlePresetClick(preset)}
                                        className={cn(
                                            "px-3 py-2 text-sm text-left rounded-md transition-colors duration-200",
                                            isActive
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        {preset.label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Right Panel: Calendar */}
                        <div className="p-0 bg-white">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={handleSelect}
                                numberOfMonths={1}
                                classNames={{
                                    day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-md",
                                    day_range_middle: "bg-blue-50 text-slate-900 hover:bg-blue-50 hover:text-slate-900 rounded-none",
                                    day_today: "bg-slate-100 text-slate-900 font-semibold",
                                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-slate-100 transition-colors",
                                }}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-100 p-3 flex justify-end gap-2 bg-slate-50/50">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                            className="text-slate-500 hover:text-slate-900"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700 shadow-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            Apply
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
