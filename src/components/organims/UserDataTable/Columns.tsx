import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const TableColumns: ColumnDef<User>[] = [
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
          {/* <img
            src={row.original.tourist_profilepicture}
            alt="image"
            className="w-full h-full"
          /> */}
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
    cell: () => (
      <div>
        {dayjs().format("HH:mm D MMMM YYYY")}
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
            <Eye className="w-5 h-5" />
          </Link>
          <Link to={`/user/edit/${user.id}`}>
            <Pencil className="w-5 h-5" />
          </Link>
          <button>
            <Trash className="w-5 h-5" />
          </button>
        </div>
      );
    },
  },
]

export default TableColumns