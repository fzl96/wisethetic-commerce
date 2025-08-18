"use client";

import * as React from "react";
import type { Order } from "@/lib/schema/order";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconClockHour3,
  IconLoader,
  IconCircleCheckFilled,
  IconCircleX,
  IconCreditCardRefund,
} from "@tabler/icons-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateOrderForm } from "./update-form";
import { deleteOrder } from "@/lib/actions/order.actions";

function getIcon(
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "CANCEL" | "REFUNDED",
) {
  switch (status) {
    case "PENDING":
      return <IconClockHour3 />;
    case "PROCESSING":
      return <IconLoader />;
    case "SUCCESS":
      return (
        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
      );
    case "CANCEL":
      return <IconCircleX className="fill-red-500 dark:fill-red-400" />;
    case "REFUNDED":
      return (
        <IconCreditCardRefund className="fill-purple-500 dark:fill-purple-400" />
      );
    default:
      return null;
  }
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return <div></div>;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p>{format(row.original.date, "EEEE, dd MMMM yyyy HH:mm")}</p>
    ),
  },
  {
    accessorKey: "packageName",
    header: "Package",
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="capitalize text-muted-foreground px-1.5"
      >
        {getIcon(row.original.status)}
        {row.original.status.toLowerCase()}
      </Badge>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="capitalize text-muted-foreground px-1.5"
      >
        {row.original.paymentStatus === "SUCCESS" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.paymentStatus.toLowerCase()}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoryMenu item={row.original} />,
  },
];

export function DataTable({
  // studioId,
  data: initialData,
  page,
  totalPages,
}: {
  studioId: string;
  data: Order[];
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = initialData;
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2"></div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex"></div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {page} of {totalPages}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => goToPage(1)}
              disabled={page === 1}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => goToPage(totalPages)}
              disabled={page === totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCellViewer({ item }: { item: Order }) {
  const [updateDrawerOpen, setUpdateDrawerOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={updateDrawerOpen}
      onOpenChange={setUpdateDrawerOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.customerName}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle className="capitalize">
            #{item.id.toUpperCase()}
          </DrawerTitle>
        </DrawerHeader>
        <UpdateOrderForm order={item} setOpen={setUpdateDrawerOpen} />
      </DrawerContent>
    </Drawer>
  );
}

export function SubmitButton({
  isDirty,
  isSubmitting,
  formId,
}: {
  isDirty: boolean;
  isSubmitting: boolean;
  formId: string;
}) {
  return (
    <DrawerFooter>
      <Button
        className="cursor-pointer"
        type="submit"
        form={formId}
        disabled={!isDirty || isSubmitting}
      >
        {isSubmitting && (
          <span>
            <IconLoader className="animate-spin" />
          </span>
        )}
        Submit
      </Button>
      <DrawerClose asChild>
        <Button className="cursor-pointer" variant="outline">
          Cancel
        </Button>
      </DrawerClose>
    </DrawerFooter>
  );
}

export function CategoryMenu({ item }: { item: Order }) {
  const router = useRouter();
  const [showUpdateForm, setShowUpdateForm] = React.useState(false);
  const [showDeleteForm, setShowDeleteForm] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const isMobile = useIsMobile();

  const deleteOrderAction = async () => {
    setDeleting(true);
    await deleteOrder(item.id);
    // await deleteCategory(item.id);
    setShowDeleteForm(false);
    setDeleting(false);
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setShowUpdateForm(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteForm(true)}
            variant="destructive"
            className="cursor-pointer"
          >
            {deleting && (
              <span className="animate-spin">
                <IconLoader />
              </span>
            )}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={showUpdateForm}
        onOpenChange={setShowUpdateForm}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>#{item.id.toUpperCase()}</DrawerTitle>
          </DrawerHeader>
          <UpdateOrderForm order={item} setOpen={setShowUpdateForm} />
        </DrawerContent>
      </Drawer>
      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={showDeleteForm}
        onOpenChange={setShowDeleteForm}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>{item.customerName}</DrawerTitle>
          </DrawerHeader>
          <p className="px-4">Are you sure to you want to delete this item?</p>
          <DrawerFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={deleteOrderAction}
              disabled={deleting}
              className="cursor-pointer"
            >
              {deleting && (
                <span className="animate-spin">
                  <IconLoader />
                </span>
              )}
              Delete
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
