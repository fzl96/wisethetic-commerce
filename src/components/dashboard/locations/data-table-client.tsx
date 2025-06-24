"use client";

import Link from "next/link";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { format } from "date-fns";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconPlus,
  IconLocation,
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
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
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
import { UpdateLocationForm as UpdateForm } from "./update-form";
import { CreateLocationForm as CreateForm } from "./create-form";
import { deleteLocation as deleteAction } from "@/lib/actions/location.actions";
import { locationSchema as schema } from "@/lib/schema/location";

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="lg:w-32">{row.original.address}</div>,
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <>
        {row.original.link ? (
          <Link href={row.original.link} target="_blank">
            <Badge
              variant="outline"
              className="text-muted-foreground px-1.5 flex items-center"
            >
              <IconLocation className="" />
              Open maps
            </Badge>
          </Link>
        ) : (
          "No link provided"
        )}
      </>
    ),
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => (
  //     <div className="w-32">
  //       {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ row }) => (
  //     <div className="w-32">
  //       {format(new Date(row.original.updatedAt), "MMM dd, yyyy")}
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu item={row.original} />,
  },
];

export function DataTable({
  studioId,
  data: initialData,
  page,
  totalPages,
}: {
  studioId: string;
  data: z.infer<typeof schema>[];
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
        <div className="flex items-center gap-2">
          <CreateDrawer studioId={studioId} />
        </div>
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

function CreateDrawer({ studioId }: { studioId: string }) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="">Add location</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Create a new location</DrawerTitle>
        </DrawerHeader>
        <CreateForm setOpen={setOpen} studioId={studioId} />
      </DrawerContent>
    </Drawer>
  );
}

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
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
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
        </DrawerHeader>
        <UpdateForm item={item} setOpen={setUpdateDrawerOpen} />
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
        Submit
      </Button>
      <DrawerClose asChild>
        <Button variant="outline">Done</Button>
      </DrawerClose>
    </DrawerFooter>
  );
}

export function ActionMenu({ item }: { item: z.infer<typeof schema> }) {
  const [showUpdateForm, setShowUpdateForm] = React.useState(false);
  const [showDeleteForm, setShowDeleteForm] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const isMobile = useIsMobile();

  const deleteCategoryAction = async () => {
    setDeleting(true);
    await deleteAction(item.id);
    setShowDeleteForm(false);
    setDeleting(false);
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
            <DrawerTitle>{item.name}</DrawerTitle>
          </DrawerHeader>
          <UpdateForm item={item} setOpen={setShowUpdateForm} />
        </DrawerContent>
      </Drawer>
      <Drawer
        direction={isMobile ? "bottom" : "right"}
        open={showDeleteForm}
        onOpenChange={setShowDeleteForm}
      >
        <DrawerContent>
          <DrawerHeader className="gap-1">
            <DrawerTitle>{item.name}</DrawerTitle>
          </DrawerHeader>
          <p className="px-4">Are you sure to you want to delete this item?</p>
          <DrawerFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={deleteCategoryAction}
              disabled={deleting}
              className="cursor-pointer"
            >
              Delete
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Done</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
