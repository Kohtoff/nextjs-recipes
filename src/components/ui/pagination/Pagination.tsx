'use client';
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { PaginationArrow } from "./PaginationArrow";
import { generatePagination } from "@/lib/utils";
import { PaginationNumber } from "./PaginationNumber";

type Props = {
    totalPages: number
};

export const Pagination = ({totalPages}: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);
  return <div className="inline-flex">
    <PaginationArrow
      direction="left"
      href={createPageURL(currentPage - 1)}
      isDisabled={currentPage <= 1}
    />

    <div className="flex -space-x-px">
      {allPages.map((page, index) => {
        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

        if (index === 0) position = 'first';
        if (index === allPages.length - 1) position = 'last';
        if (allPages.length === 1) position = 'single';
        if (page === '...') position = 'middle';

        return (
          <PaginationNumber
            key={`${page}-${index}`}
            href={createPageURL(page)}
            page={page}
            position={position}
            isActive={currentPage === page}
          />
        );
      })}
    </div>

    <PaginationArrow
      direction="right"
      href={createPageURL(currentPage + 1)}
      isDisabled={currentPage >= totalPages}
    />
  </div>;
};

export default Pagination;
