import React, { useEffect, useState, useMemo } from "react";
import { MDBDataTableV5 } from "mdbreact";

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
    ],
    []
  );
  const [datatable, setDatatable] = useState({ columns, rows: [] });

  useEffect(() => {
    const rows = [];
    for (let i in transactions) {
      const {
        hubId,
        transactionType,
        energyAmount,
        status,
        dateCreated,
        dateCompleted,
        cost,
        creditsEarned,
      } = transactions[i];
      const type = transactionType === 0 ? "Buy" : "Sell"
      rows.push({
        hubid: hubId,
        type: type,
        energyamount: energyAmount,
        status: status,
        datecreated: dateCreated.toDate().toString(),
        datecompleted: dateCompleted.toDate().toString(),
        cost: cost,
        creditsearned: creditsEarned,
      });
    }
    setDatatable({columns, rows});
  }, [transactions, columns]);

  return (
    <MDBDataTableV5
      hover
      entries={10}
      pagesAmount={4}
      data={datatable}
      searchTop
      searchBottom={false}
    />
  );
}

export default TransactionsTable;