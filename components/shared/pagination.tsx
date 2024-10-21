"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams as unknown as string);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {currentPage > 2 && (
        <button
          onClick={() => changePage(1)}
          className="px-3 py-1 border rounded-md hover:bg-gray-200"
        >
          First page
        </button>
      )}

      <button
        disabled={isFirstPage}
        onClick={() => changePage(currentPage - 1)}
        className={`flex gap-1 items-center px-3 py-1 border rounded-md ${
          isFirstPage ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        <ArrowLeft size={16} /> Previous
      </button>

      {pages.map((page) => (
        <button
          disabled={currentPage === page}
          onClick={() => changePage(page)}
          key={page}
          className={`px-3 py-1 border rounded-md ${
            currentPage === page ? "bg-primary text-white" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={isLastPage}
        onClick={() => changePage(currentPage + 1)}
        className={`flex gap-1 items-center px-3 py-1 border rounded-md ${
          isLastPage ? "cursor-not-allowed text-gray-400" : "hover:bg-gray-200"
        }`}
      >
        Next <ArrowRight size={16} />
      </button>

      {currentPage < totalPages - 1 && (
        <button
          onClick={() => changePage(totalPages)}
          className="px-3 py-1 border rounded-md hover:bg-gray-200"
        >
          Last page
        </button>
      )}
    </div>
  );
};
