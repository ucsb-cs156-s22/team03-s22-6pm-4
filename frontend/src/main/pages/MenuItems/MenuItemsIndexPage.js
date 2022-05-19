import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import MenuItemsTable from 'main/components/MenuItems/MenuItemsTable';
import { useCurrentUser } from 'main/utils/currentUser';


export default function MenuItemsIndexPage() {

  const currentUser = useCurrentUser();
  
  const { data: menuItems, error: _error, status: _status} =
  useBackend(
   [ "/api/UCSBDiningCommonsMenuItem/all"],
   { method: "GET", url: "/api/UCSBDiningCommonsMenuItem/all" },
   []
  );
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSB Menu Items</h1>
        <MenuItemsTable menuItems={menuItems} currentUser={currentUser} />

      </div>
    </BasicLayout>
  )
}