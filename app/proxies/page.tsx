"use client";

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tab, Tabs } from "@nextui-org/tabs";
import { AsyncListData, useAsyncList } from "@react-stately/data";
import { Key, useState } from "react";

import {
  Column,
  getReverseProxies,
  getStreams,
  ReverseProxy,
  ReverseProxyColumns,
  Stream,
  StreamColumns,
} from "@/types/proxy";

async function sort({ items, sortDescriptor }: any) {
  return {
    items: (items as Record<string, any>[]).sort((a, b) => {
      let first = a[sortDescriptor.column!];
      let second = b[sortDescriptor.column!];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    }),
  };
}

export default function ProxiesPage() {
  const streams = useAsyncList({
    load: async ({ signal }) => ({ items: await getStreams(signal) }),
    sort,
  });

  const rps = useAsyncList({
    load: async ({ signal }) => ({ items: await getReverseProxies(signal) }),
    sort,
  });

  const [activeList, setActiveList] = useState(rps);
  const [selectedKey, setSelectedKey] = useState<Key>("reverse_proxies");

  function table(
    key_prefix: string,
    columns: Column[],
    list: AsyncListData<Stream | ReverseProxy>,
  ) {
    return (
      <Table
        aria-label="reverse proxies"
        className="w-full"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader columns={columns}>
          {(col) => (
            <TableColumn key={col.key} allowsSorting>
              {col.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No rows to display."}
          isLoading={list.isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={`${key_prefix}_${item.alias}_${item.path_pattern}`}>
              {(colKey) => <TableCell>{item[colKey]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <div>
      <Tabs
        aria-label="tabs"
        selectedKey={selectedKey}
        variant="light"
        onSelectionChange={(key) => {
          if (key !== "reload") {
            setActiveList(key === "reverse_proxies" ? rps : streams);
            setSelectedKey(key);
          }
        }}
      >
        <Tab key="reverse_proxies" title="Reverse Proxies">
          {table("reverse_proxies", ReverseProxyColumns, rps)}
        </Tab>
        <Tab key="streams" title="Streams">
          {table("streams", StreamColumns, streams)}
        </Tab>
        <Tab
          key="reload"
          title={
            <FontAwesomeIcon icon={faRefresh} onClick={activeList.reload} />
          }
        />
      </Tabs>
    </div>
  );
}
