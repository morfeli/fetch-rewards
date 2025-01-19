"use client";

import { Button } from "../ShadcnUI/Button";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPreviousAction: () => void;
  onNextAction: () => void;
}

export function PaginationButtons({
  currentPage,
  totalPages,
  onPreviousAction,
  onNextAction,
}: PaginationButtonsProps) {
  return (
    <div
      className="flex justify-center mt-8 space-x-2 bg-slate-400 text-white rounded-full"
      aria-label="Pagination controls"
    >
      <Button
        onClick={onPreviousAction}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        aria-disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span
        className="self-center"
        aria-label={`Current page ${currentPage} of ${totalPages}`}
      >
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={onNextAction}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
