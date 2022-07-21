import { useState, useEffect } from "react";

import moment from "moment";
import { momentObj } from "./utils";

import { LeftPointer, RightPointer } from "./AppIcons";

export default function DatePicker() {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [dayCount, setDayCount] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerHeaderDate, setDatePickerHeaderDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [type, setType] = useState("date");

  const decrement = (mode) => {
    switch (mode ? mode : type) {
      case "date": {
        setDatePickerHeaderDate(
          moment(datePickerHeaderDate).subtract(1, "days")
        );
        break;
      }

      case "month": {
        setDatePickerHeaderDate(
          moment(datePickerHeaderDate).subtract(1, "months")
        );
        break;
      }
      case "year": {
        setDatePickerHeaderDate(
          moment(datePickerHeaderDate).subtract(1, "years")
        );
        break;
      }
      default:
        alert("invalid type ");
        break;
    }
  };

  const increment = (mode) => {
    switch (mode ? mode : type) {
      case "date": {
        setDatePickerHeaderDate(moment(datePickerHeaderDate).add(1, "days"));
        break;
      }
      case "month": {
        setDatePickerHeaderDate(moment(datePickerHeaderDate).add(1, "months"));
        break;
      }
      case "year": {
        setDatePickerHeaderDate(moment(datePickerHeaderDate).add(1, "years"));
        break;
      }
      default:
        alert("invalid type ");
        break;
    }
  };

  const isToday = (date) => {
    return moment(
      new Date(selectedDate.year(), selectedDate.month(), date)
    ).isSame(selectedDate, "day");
  };

  const isSelectedMonth = (month) => {
    return moment(
      new Date(selectedDate.year(), month, selectedDate.date())
    ).isSame(selectedDate, "month");
  };

  const setDateValue = (date) => () => {
    //number
    setSelectedDate(
      momentObj(date, datePickerHeaderDate.month(), datePickerHeaderDate.year())
    );
    setShowDatePicker(false);
  };

  const getDayCount = (date) => {
    // date
    let daysInMonth = moment(date).daysInMonth();

    // find where to start calendar day of week

    let dayOfWeek = momentObj(date.year(), date.month(), 1).weekday();
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const setMonthValue = (month) => () => {
    // number
    setDatePickerHeaderDate(
      momentObj(
        datePickerHeaderDate.date(),
        month + 1,
        datePickerHeaderDate.year()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => setShowDatePicker((prev) => !prev);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("date");

  useEffect(() => {
    getDayCount(datePickerHeaderDate);
  }, [datePickerHeaderDate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200 ">
      <div className="antialiased sans-serif">
        <div>
          <div className="container mx-auto px-4 py-2 md:py-10">
            <div className="mb-5 w-64">
              <label
                htmlFor="datepicker"
                className="font-bold mb-1 text-gray-700 block"
              >
                Select Date
              </label>
              <div className="relative">
                <input type="hidden" name="date" />
                <input
                  type="text"
                  readOnly
                  className="cursor-pointer w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Select date"
                  value={selectedDate.format("yyyy-MM-DD")}
                  onClick={toggleDatepicker}
                />
                <div
                  className="cursor-pointer absolute top-0 right-0 px-3 py-2"
                  onClick={toggleDatepicker}
                >
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {showDatePicker && (
                  <div
                    className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
                    style={{ width: "17rem" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          onClick={() => {
                            type === "date"
                              ? decrement("month")
                              : decrement("year");
                          }}
                        >
                          <LeftPointer />
                        </button>
                      </div>
                      {type === "date" && (
                        <div
                          onClick={showMonthPicker}
                          className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
                        >
                          <p className="text-center">
                            {datePickerHeaderDate.format("MMMM")}
                          </p>
                        </div>
                      )}
                      <div
                        onClick={showYearPicker}
                        className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
                      >
                        <p className="text-center">
                          {datePickerHeaderDate.format("yyyy")}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          onClick={() => {
                            type === "date"
                              ? increment("month")
                              : increment("year");
                          }}
                        >
                          <RightPointer />
                        </button>
                      </div>
                    </div>
                    {type === "date" && (
                      <>
                        <div className="flex flex-wrap mb-3 -mx-1">
                          {DAYS.map((day, i) => (
                            <div
                              key={i}
                              style={{ width: "14.26%" }}
                              className="px-1"
                            >
                              <div className="text-gray-800 font-medium text-center text-xs">
                                {day}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap -mx-1">
                          {blankDays.map((_, i) => (
                            <div
                              key={i}
                              style={{ width: "14.26%" }}
                              className="text-center border p-1 border-transparent text-sm"
                            ></div>
                          ))}
                          {dayCount.map((d, i) => (
                            <div
                              key={i}
                              style={{ width: "14.26%" }}
                              className="px-1 mb-1"
                            >
                              <div
                                onClick={setDateValue(d)}
                                className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                                  isToday(d)
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-200"
                                }`}
                              >
                                {d}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {type === "month" && (
                      <div className="flex flex-wrap -mx-1">
                        {Array(12)
                          .fill(null)
                          .map((_, i) => (
                            <div
                              key={i}
                              onClick={setMonthValue(i)}
                              style={{ width: "25%" }}
                            >
                              <div
                                className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                                  isSelectedMonth(i)
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-200"
                                }`}
                              >
                                {momentObj(
                                  datePickerHeaderDate.date(),
                                  i + 1,
                                  datePickerHeaderDate.year()
                                ).format("MMM")}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
