import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

const AdminSideBar = () => {
  return (
    <Card>
      <CardTitle>Admin Dashboard</CardTitle>
      <CardContent>
        <ul>
          <li>Users</li>
          <li>Works</li>
          <li>Categories</li>
          <li>Settings</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AdminSideBar;
