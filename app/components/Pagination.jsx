import React from "react";

export default function Pagination({
  currentPage,
  totalRecords,
  recordsPerPage,
  handleLoadNext,
  handleLoadPrev,
  startIndex,
  endIndex,
}) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={handleLoadPrev}
        disabled={currentPage === 0}
        className={`${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <img
          src="icon/left-arrow-icon.png"
          alt="Retroceder"
          className="h-6 w-6"
        />
      </button>
      <span className="text-gray-600">
        {startIndex}–{endIndex} de {totalRecords}
      </span>
      <button
        onClick={handleLoadNext}
        disabled={(currentPage + 1) * recordsPerPage >= totalRecords}
        className={`${
          (currentPage + 1) * recordsPerPage >= totalRecords
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        <img
          src="icon/right-arrow-icon.png"
          alt="Avanzar"
          className="h-6 w-6"
        />
      </button>
    </div>
  );
}
