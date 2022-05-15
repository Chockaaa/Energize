import React, { useEffect, useState, useMemo } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Button, Modal } from "react-bootstrap";
import { cancelTransaction } from "../db/TransactionsDB";

const TransactionsTable = ({ transactions }) => {
  const [show, setShow] = useState(false);
  const [cancelTransactionId, setCancelTransactionId] = useState(null);

  const handleClose = () => {
    setShow(false);
    setCancelTransactionId(null);
  };
  const handleShow = (id) => {
    setShow(true);
    setCancelTransactionId(id);
  };

  function handleCancel(id) {
    cancelTransaction(id).then((_) => window.location.reload(false));
  }

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
      rows.push({
        hubid: hubId,
        type: transactionType === 0 ? "Buy" : "Sell",
        energyamount: energyAmount,
        status: status,
        datecreated: dateCreated.toDate().toLocaleString(),
        datecompleted: dateCompleted ? dateCompleted.toDate().toLocaleString() : "",
        cost: cost,
        creditsearned: creditsEarned || "-",
        actions: status === "Pending" && (
          <Button
            variant="danger"
            size="sm"
            className="m-0"
            onClick={() => handleShow(id)}
          >
            Cancel
          </Button>
        ),
      });
    }
    setDatatable({ columns, rows });
  }, [transactions, columns]);

  return (
    <>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 10]}
        entries={10}
        pagesAmount={4}
        data={datatable}
        searchTop
        searchBottom={false}
      />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel the transaction?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleCancel(cancelTransactionId)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionsTable;
