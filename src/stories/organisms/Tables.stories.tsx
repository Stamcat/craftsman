import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useRef, useState } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz, type ColDef, type GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { width } from "../../styles/utilities/layout";

// AG Grid Community is modular: register only the Community feature set. Enterprise modules are not registered here.
ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
    title: "Organisms/Tables",
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    'Craftsman does not wrap ag-grid-community with a custom component. We use ag-grid-community (and ag-grid-react) directly, exactly as documented upstream at https://www.ag-grid.com/react-data-grid/ — for advanced data visualization tables such as large sortable/filterable datasets.<br /><br />These stories showcase only the free Community feature set (client-side sorting, filtering, pagination, row selection, cell rendering, CSV export). AG Grid also offers Enterprise-only features (row grouping, pivoting, master/detail, server-side row model, Excel export, etc.) — those require a separate commercial license from AG Grid. It is the consumer\'s responsibility to obtain and configure an Enterprise license before enabling any Enterprise module.',
            },
        },
    },
};

export default meta;
type Story = StoryObj;

const pageStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter", 2),
    maxWidth: width("column", 12),
};

const sectionStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter", 0.5),
};

const gridWrapperStyle: React.CSSProperties = {
    height: 360,
};

type DemoProps = {
    readonly title: string;
    readonly code: string;
    readonly children: React.ReactNode;
};

function TableDemo({ title, code, children }: DemoProps) {
    return (
        <section style={sectionStyle}>
            <h3>{title}</h3>
            <div style={gridWrapperStyle}>{children}</div>
            <code><pre>{code}</pre></code>
        </section>
    );
}

type Product = {
    readonly id: number;
    readonly name: string;
    readonly category: string;
    readonly price: number;
    readonly inStock: boolean;
};

const rowData: Product[] = [
    { id: 1, name: "Trail Runner Jacket", category: "Outerwear", price: 129, inStock: true },
    { id: 2, name: "Insulated Water Bottle", category: "Accessories", price: 32, inStock: true },
    { id: 3, name: "Alpine Trekking Poles", category: "Gear", price: 68, inStock: false },
    { id: 4, name: "Merino Wool Socks", category: "Apparel", price: 18, inStock: true },
    { id: 5, name: "Compact Camp Stove", category: "Gear", price: 74, inStock: false },
    { id: 6, name: "Headlamp Pro", category: "Accessories", price: 45, inStock: true },
    { id: 7, name: "Rain Shell", category: "Outerwear", price: 159, inStock: true },
    { id: 8, name: "Sleeping Bag Liner", category: "Gear", price: 39, inStock: true },
];

// ---- Basic Grid (sorting + filtering + pagination) ----

const basicColumnDefs: ColDef<Product>[] = [
    { field: "name", filter: true },
    { field: "category", filter: true },
    { field: "price", filter: "agNumberColumnFilter" },
    { field: "inStock" },
];

const basicCode = `import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

<div style={{ height: 360 }}>
    <AgGridReact
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={[
            { field: "name", filter: true },
            { field: "category", filter: true },
            { field: "price", filter: "agNumberColumnFilter" },
            { field: "inStock" },
        ]}
        pagination
        paginationPageSize={5}
    />
</div>`;

function BasicGridDemo() {
    return (
        <AgGridReact<Product>
            theme={themeQuartz}
            rowData={rowData}
            columnDefs={basicColumnDefs}
            pagination
            paginationPageSize={5}
        />
    );
}

// ---- Row Selection ----

const selectionColumnDefs: ColDef<Product>[] = [
    { field: "name" },
    { field: "category" },
    { field: "price" },
];

const selectionCode = `<AgGridReact
    theme={themeQuartz}
    rowData={rowData}
    columnDefs={[{ field: "name" }, { field: "category" }, { field: "price" }]}
    rowSelection={{ mode: "multiRow", checkboxes: true }}
/>`;

function RowSelectionDemo() {
    return (
        <AgGridReact<Product>
            theme={themeQuartz}
            rowData={rowData}
            columnDefs={selectionColumnDefs}
            rowSelection={{ mode: "multiRow", checkboxes: true }}
        />
    );
}

// ---- Custom Cell Renderer ----

function StockCellRenderer({ value }: { readonly value: boolean }) {
    return <span>{value ? "✅ In stock" : "⛔ Out of stock"}</span>;
}

const rendererColumnDefs: ColDef<Product>[] = [
    { field: "name" },
    { field: "price", valueFormatter: ({ value }) => `$${value}` },
    { field: "inStock", headerName: "Availability", cellRenderer: StockCellRenderer },
];

const rendererCode = `function StockCellRenderer({ value }: { readonly value: boolean }) {
    return <span>{value ? "✅ In stock" : "⛔ Out of stock"}</span>;
}

<AgGridReact
    theme={themeQuartz}
    rowData={rowData}
    columnDefs={[
        { field: "name" },
        { field: "price", valueFormatter: ({ value }) => \`$\${value}\` },
        { field: "inStock", headerName: "Availability", cellRenderer: StockCellRenderer },
    ]}
/>`;

function CellRendererDemo() {
    return <AgGridReact<Product> theme={themeQuartz} rowData={rowData} columnDefs={rendererColumnDefs} />;
}

// ---- Quick Filter + CSV Export ----

const exportColumnDefs: ColDef<Product>[] = [
    { field: "name" },
    { field: "category" },
    { field: "price" },
    { field: "inStock" },
];

const exportCode = `const gridApiRef = useRef<GridApi<Product> | null>(null);
const [quickFilterText, setQuickFilterText] = useState("");

<input
    value={quickFilterText}
    onChange={(event) => setQuickFilterText(event.target.value)}
    placeholder="Quick filter…"
/>
<button onClick={() => gridApiRef.current?.exportDataAsCsv()}>Export CSV</button>

<AgGridReact
    theme={themeQuartz}
    rowData={rowData}
    columnDefs={columnDefs}
    quickFilterText={quickFilterText}
    onGridReady={(params) => { gridApiRef.current = params.api; }}
/>`;

function QuickFilterExportDemo() {
    const gridApiRef = useRef<GridApi<Product> | null>(null);
    const [quickFilterText, setQuickFilterText] = useState("");
    const wrapperStyle = useMemo<React.CSSProperties>(() => ({ display: "grid", gap: width("gutter", 0.5) }), []);

    return (
        <div style={wrapperStyle}>
            <div style={{ display: "flex", gap: width("gutter", 0.5) }}>
                <input
                    value={quickFilterText}
                    onChange={(event) => setQuickFilterText(event.target.value)}
                    placeholder="Quick filter…"
                />
                <button type="button" onClick={() => gridApiRef.current?.exportDataAsCsv()}>
                    Export CSV
                </button>
            </div>
            <div style={gridWrapperStyle}>
                <AgGridReact<Product>
                    theme={themeQuartz}
                    rowData={rowData}
                    columnDefs={exportColumnDefs}
                    quickFilterText={quickFilterText}
                    onGridReady={(params) => {
                        gridApiRef.current = params.api;
                    }}
                />
            </div>
        </div>
    );
}

export const BasicGrid: Story = {
    render: () => (
        <div style={pageStyle}>
            <TableDemo title="Basic Grid (sorting, filtering, pagination)" code={basicCode}>
                <BasicGridDemo />
            </TableDemo>
        </div>
    ),
};

export const RowSelectionExample: Story = {
    render: () => (
        <div style={pageStyle}>
            <TableDemo title="Row Selection" code={selectionCode}>
                <RowSelectionDemo />
            </TableDemo>
        </div>
    ),
};

export const CustomCellRenderer: Story = {
    render: () => (
        <div style={pageStyle}>
            <TableDemo title="Custom Cell Renderer" code={rendererCode}>
                <CellRendererDemo />
            </TableDemo>
        </div>
    ),
};

export const QuickFilterAndExport: Story = {
    render: () => (
        <div style={pageStyle}>
            <TableDemo title="Quick Filter + CSV Export" code={exportCode}>
                <QuickFilterExportDemo />
            </TableDemo>
        </div>
    ),
};
