"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {Plus} from 'lucide-react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { fetchUsers } from "../../../../../Api/AdminApi"
import { AlertDialogDemo } from './DeleteDialgo'
import ViewUser  from './ViewUser'

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CircularProgress from '@mui/material/CircularProgress';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserRoleTabs } from "./UserRoleTabs"

export type Users = {
  id: string
  username: string
  email: string
  image: string
  role : "user" | "restaurant" | "delivery"
  age: number
  clientAddress: string
  createdAt: string
  phoneNumber: number
  verified: boolean
}

export const columns :ColumnDef<Users>[] = [
  {
    accessorKey: "_id",
    header: "Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: "avatar",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("image") || 'https://res.cloudinary.com/dq3nhwzzl/image/upload/v1715898607/user_profile_pic/Luca-Profile-Avatars-3-1685801870_kxsh6r.png'} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )
    }, 
  },
  {
    accessorKey: "username",
    header: "username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "role",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <div>{row.getValue("age")}</div>
    ),
  },
  {
    accessorKey: "clientAddress",
    header: "Client Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("clientAddress")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div>{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "verified",
    header: "Verified",
    cell: ({ row }) => (
      <div>{row.getValue("verified") ? "Yes" : "No"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.getValue("_id"))}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ViewUser id={row.getValue("_id")} image={row.getValue("image")} role={row.getValue("role")} username={row.getValue("username")} email={row.getValue("email")} age={row.getValue("age")} clientAddress={row.getValue("clientAddress")} phoneNumber={row.getValue("phoneNumber")} createdAt={new Date(row.getValue("createdAt")).toLocaleString()} verified={row.getValue("verified")}  />
            <AlertDialogDemo title={'Delete'} id={row.getValue("_id")} role={row.getValue("role")}/>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [data, setData] = React.useState<Users[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [loading, setLoading] = React.useState(false)
  const [disableNext, setDisableNext] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(5);
  const [role, setRole] = React.useState<"user" | "restaurant" | "delivery">("user");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const handleNext = () => {
    setStartIndex(prevStartIndex => prevStartIndex + 5);
    setEndIndex(prevEndIndex => prevEndIndex + 5);
  };

  const handlePrevious = () => {
    setStartIndex(prevStartIndex => prevStartIndex - 5);
    setEndIndex(prevEndIndex => prevEndIndex - 5);
  };
  React.useEffect(() => {
    setStartIndex(0);
    setEndIndex(5);
  }, [role]);

  React.useEffect(() => {
    setLoading(true);
    fetchUsers(role)
      .then((response) => {
        
        if (response.data.length < endIndex) {
          setDisableNext(true);
        }else {
          setDisableNext(false);
        }
        const slicedData = response.data.slice(startIndex, endIndex);
        setData(slicedData);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => setLoading(false), 300);
      });
  }, [role,startIndex,endIndex]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      age : false ,
      clientAddress: false,
      createdAt: false,
      phoneNumber: false,
    })
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-center py-2 gap-4">
      <UserRoleTabs onChange={setRole} />

        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-xs w-full"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
          {loading ? <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <CircularProgress size={24} style={{color : '#84cc16'}}  />
                </TableCell>
              </TableRow>   :(
            <>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
            </>
          )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
        <div className="flex justify-center items-center gap-4">
          <button onClick={handlePrevious} disabled={startIndex == 0}   className={` p-2 rounded-lg w-[60px]  ${startIndex == 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>Previous</button>
          <button onClick={handleNext}  disabled={disableNext} className={` px-4 py-2 rounded-lg w-[60px] ${ disableNext ? 'bg-gray-100' : 'bg-gray-200'} `}>Next</button>
        </div>
        </div>
      </div>
    </div>
  )
}
