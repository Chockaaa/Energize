import React, { useEffect, useState, useMemo } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Button } from "react-bootstrap";
import { cancelTransaction } from "../db/TransactionsDB";

const TransactionsTable = ({ transactions }) => {
  const columns = useMemo(
    () => [
      {
        label: "Hub Id",
        field: "hubid",
        width: 100,
      },
      {
        label: "Type",
        field: "type",
        width: 100,
      },
      {
        label: "Energy Amount",
        field: "energyamount",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        width: 100,
      },
      {
        label: "Date Created",
        field: "datecreated",
        width: 100,
      },
      {
        label: "Date Completed",
        field: "datecompleted",
        width: 100,
      },
      {
        label: "Cost ($)",
        field: "cost",
        width: 100,
      },
      {
        label: "Credits Earned",
        field: "creditsearned",
        width: 100,
      },
      {
        label: "Actions",
        field: "actions",
        width: 100,
      },
    ],
    []
  );
  const [datatable, setDatatable] = useState({ columns, rows: [] });

  function handleCancel(id) {
    cancelTransaction(id).then((_) => window.location.reload(false));
  }

  useEffect(() => {
    const rows = [];
    for (let i in transactions) {
      const {
        id,
        hubId,
        transactionType,
        energyAmount,
        status,
        dateCreated,
        dateCompleted,
        cost,
        creditsEarned,
      } = transactions[i];
      const type = transactionType === 0 ? "Buy" : "Sell";
      rows.push({
        hubid: hubId,
        type: type,
        energyamount: energyAmount,
        status: status,
        datecreated: dateCreated.toDate().toLocaleString(),
        datecompleted: dateCompleted.toDate().toLocaleString(),
        cost: cost,
        creditsearned: creditsEarned || "-",
        actions: status === "Pending" && (
          <Button
            variant="danger"
            size="sm"
            className="m-0"
            onClick={(e) => handleCancel(id)}
          >
            Cancel
          </Button>
        ),
      });
    }
    setDatatable({ columns, rows });
  }, [transactions, columns]);

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 10]}
      entries={10}
      pagesAmount={4}
      data={datatable}
      searchTop
      searchBottom={false}
    />
  );
};

export default TransactionsTable;
