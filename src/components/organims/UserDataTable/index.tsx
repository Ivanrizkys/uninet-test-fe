import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";
import { User } from "@/types/users";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import DialogConfirmation from "@/components/molecules/DialogConfirmation";

interface UserDataTableProps {
  data: User[];
  dialogDelete: boolean;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  setDialogDelete: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUser: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

function UserDataTable(props: UserDataTableProps) {
  const { data, dialogDelete, setDialogDelete, setDeleteId, handleDeleteUser } =
    props;

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => <p>{row.getValue("id")}</p>,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="basis-6 h-6 grow-0 shrink-0 bg-slate-700 rounded-full overflow-hidden relative">
              <img
                src="https://source.unsplash.com/random/208×208/?profile"
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            <p>{row.original.name}</p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="lowercase">{row.original.email}</div>
        ),
      },
      {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.username}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Createdat",
        cell: ({ row }) => (
          <div>
            {dayjs(row.original.createdAt.toDate()).format(
              "HH:mm - D MMMM YYYY"
            )}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-2">
              <Link to={`/user/${user.id}`}>
                <Eye className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Link to={`/user/edit/${user.id}`}>
                <Pencil className="w-5 h-5 text-muted-foreground" />
              </Link>
              <DialogConfirmation
                title="Delete User"
                description="Are you sure to delete this user? Be careful, this action cannot be reversed"
                handleConfirmation={handleDeleteUser}
                triger={
                  <button onClick={() => setDeleteId(user.id)}>
                    <Trash2 className="w-5 h-5 text-muted-foreground" />
                  </button>
                }
                dialogConfirmation={dialogDelete}
                setDialogConfirmation={setDialogDelete}
              />
            </div>
          );
        },
      },
    ],
    [dialogDelete, handleDeleteUser, setDeleteId, setDialogDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <>
      <div className="pb-4 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/user/create">
          <Button variant="outline">Create User</Button>
        </Link>
      </div>
      <div className="rounded-md border">
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  There are no user available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default UserDataTable;
