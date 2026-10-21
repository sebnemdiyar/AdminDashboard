import { getUsers } from "@/utils/service";
import TableWrapper from "./table-wrapper";
import BanButton from "../buttons/ban-button";
import { BsEye } from "react-icons/bs";
import Link from "next/link";

const UserTable = async () => {
  const users = await getUsers(); // kullanıcı verilerini al

  return (
    <TableWrapper>
      <thead>
        <tr className="border-b border-zinc-300 shadow">
          <th className="py-4">No</th>
          <th className=" px-4 py-2">İsim</th>
          <th className=" px-4 py-2">Eposta</th>
          <th className=" px-4 py-2">Ülke</th>
          <th className=" px-4 py-2">Şehir</th>
          <th className=" px-4 py-2">Sipariş Sayısı</th>
          <th className=" px-4 py-2">Eylem</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, key) => (
          <tr key={key} className="border-b border-zinc-300">
            <td>{key + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address.country}</td>
            <td>{user.address.city}</td>
            <td>{user.orders.length}</td>
            <td className="flex gap-3">
              <Link
                href={`?userId=${user.id}`}
                className="button hover:bg-gray-200 cursor-pointer"
              >
                <BsEye />
              </Link>

              <BanButton id={user.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
};

export default UserTable;
