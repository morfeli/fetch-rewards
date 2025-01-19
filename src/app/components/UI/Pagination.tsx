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
    <div className="flex justify-center mt-8 space-x-2 bg-slate-400 text-white rounded-full">
      <Button onClick={onPreviousAction} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="self-center">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={onNextAction} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
}
