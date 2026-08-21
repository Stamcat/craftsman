"use client";
import React from "react";
import clsx from "clsx";
import "./Pagination.scss";

export type PaginationProps = {
    total: number;
    current: number;
    showPages?: number;
    onChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    style?: React.CSSProperties;
};
/**
 * Basic pagination by number, you can configure how many pages to show, 
 * you can also skip by that number to jump to a specific page. Also has first and last.
 * This component is zero-based, meaning you can pass in array.length and it will display page 1.
 */
export const Pagination: React.FC<PaginationProps> = ({ total, current, onChange, className, style, showPages = 5 }) => {

    function getPageWindow(current: number, total: number): number[] {
        const half = Math.floor(showPages / 2);
        let start = Math.max(0, current - half);
        const end = Math.min(total - 1, start + showPages - 1);
        start = Math.max(0, end - showPages + 1);

        const pages: number[] = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    const pages = getPageWindow(current, total);
    const currentGroup = Math.floor(current / showPages);
    const canJumpBack = currentGroup > 0;
    const canJumpForward = (currentGroup + 1) * showPages < total;
    const jumpBackIndex = (currentGroup - 1) * showPages;
    const jumpForwardIndex = (currentGroup + 1) * showPages;

    return (
        <nav className={clsx("pagination", className)} style={style} aria-label="Pagination">
            <button className="text" value={0} onClick={onChange} disabled={current === 0} aria-label="First page">
                «
            </button>
            {canJumpBack && (
                <button className="text" value={jumpBackIndex} onClick={onChange} aria-label={`Back ${showPages} pages`}>
                    ‹‹
                </button>
            )}
            {pages.map((page) => (
                <button
                    key={page}
                    value={page}
                    onClick={onChange}
                    disabled={page === current}
                    aria-label={`Page ${page + 1}`}
                    aria-current={page === current ? "page" : undefined}
                    className={clsx("text", page === current ? "active" : undefined)}
                >
                    {page + 1}
                </button>
            ))}
            {canJumpForward && (
                <button className="text" value={jumpForwardIndex} onClick={onChange} aria-label={`Forward ${showPages} pages`}>
                    ››
                </button>
            )}
            <button className="text" value={total - 1} onClick={onChange} disabled={current === total - 1} aria-label="Last page">
                »
            </button>
        </nav>
    );
};
