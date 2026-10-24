// src/components/UsersList.tsx
import type { User } from "../types/User";
import useFetch from "../hooks/useFetch";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import type { Column } from "../components/List";
import List from "../components/List";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Loading from "../components/Loading";

function UsersList() {
  const usersUrl = "/user/all";

  const { data: users, loading, error } = useFetch<User>(usersUrl);

  const [listColumns, setListColumns] = useState<Column[]>([]);
  const [listData, setListData] = useState<Record<string, any>[]>([]);

  const handleSearchChange = (_filters: Record<string, string>) => {
    // Search filter handling
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!users || users.length === 0) return;

    const columns = Object.keys(users[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
    const rows = users.map((user) => ({ ...user }));

    setListColumns(columns);
    setListData(rows);
  }, [users]);

  const handleRowClick = (row: Record<string, any>) => {
    // You can navigate to user details page or perform any other action here
    navigate(`/user-details/${row.id}`);
  };

  const handleAddUserClick = () => {
    navigate("/add-user");
  };

  return (
    <div className="p-6">
      {/* Header + search */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Users</h1>
          <p className="text-sm text-[#8b93a7]">{users.length} total users</p>
        </div>

        <div className="inline-flex gap-2 items-center">
          <div className="relative w-64">
            <Filter
              placeholder="search by name,email..."
              onFilterChange={handleSearchChange}
            />
          </div>

          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#3b6ef5] text-white hover:bg-[#5580f7] transition-colors cursor-pointer"
            onClick={handleAddUserClick}
          >
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Table */}

      {loading && <Loading label="loading users..." />}
      {error && (
        <Error
          message="Failed to load users."
          onRetry={() => window.location.reload()}
        />
      )}
      {!loading && !error && (
        <div className="bg-[#0d1424] rounded-2xl border border-white/10 overflow-hidden">
          <List
            columns={listColumns}
            rows={listData}
            onRowClick={handleRowClick}
          />

          {users.length === 0 && (
            <p className="text-center text-[#8b93a7] py-10 text-sm">
              No users found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default UsersList;
