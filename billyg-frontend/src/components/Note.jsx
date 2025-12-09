import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Note() {
  return (
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-6
        bg-rose-700
        p-4 sm:p-6
        text-white
      "
    >
      {/* Location */}
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <LocationOnIcon sx={{ fontSize: { xs: "3rem", sm: "4rem", lg: "6rem" } }} />
        <p className="text-sm sm:text-base">Shop 56, Montecasino</p>
      </div>

      {/* Time Slots */}
      <div
        className="
          flex flex-col items-center justify-center text-center space-y-2
          lg:border-l-2
          sm:border-l-2 lg:border-r-0
          border-white
          px-2
        "
      >
        <AccessTimeIcon sx={{ fontSize: { xs: "3rem", sm: "4rem", lg: "6rem" } }} />

        <ul className="space-y-1 text-xs sm:text-sm">
          <li>Monday & Tuesday: Closed</li>
          <li>Wednesday to Friday</li>
          <li>12H00 to 16H00</li>
          <li>18H00 to 22H00</li>
          <li>Saturday</li>
          <li>11H00 - 14H00</li>
          <li>15H00 - 18H00</li>
          <li>19H00 - 22H00</li>
          <li>Sunday</li>
          <li>12H00 to 16H00</li>
          <li>18H00 to 22H00</li>
        </ul>
      </div>

      {/* Contact */}
      <div
        className="
          flex flex-col items-center justify-center text-center space-y-2
          lg:border-l-2
          border-white
        "
      >
        <CallIcon sx={{ fontSize: { xs: "3rem", sm: "4rem", lg: "6rem" } }} />
        <p className="text-sm sm:text-base">+27 11 510 7924</p>
        <a
          href="mailto:Montecasino.billyg@tsogosun.com"
          className="underline text-xs sm:text-sm break-all"
        >
          Montecasino.billyg@tsogosun.com
        </a>
      </div>
    </div>
  );
}
