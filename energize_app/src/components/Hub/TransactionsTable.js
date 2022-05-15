import React, { useEffect, useState, useMemo } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Button, Modal } from "react-bootstrap";
import { updateTransaction } from "../../db/TransactionsDB";
import { updateUserCreditBalance } from "../../db/UsersDB";
import { useAuth } from "../../contexts/AuthContext";
import {updateHubEnergyCapacity} from "../../db/HubsDB";


const TransactionsTable = ({ transactions }) => {
  const [show, setShow] = useState(false);
  const [cancelTransactionId, setCancelTransactionId] = useState(null);
  const [creditsToRemove,setCreditsToRemove]=useState(null);
  const [energyToRemove,setenergyToRemove]=useState(null);
  const [hubId,sethubId]=useState(null);
  const { currentUser } = useAuth();

  const handleClose = () => {
    setShow(false);
    setCancelTransactionId(null);
  };
  const handleShow = (id,credits,energy,hubId) => {
    setShow(true);
    setCancelTransactionId(id);
    setCreditsToRemove(credits);
    setenergyToRemove(energy);
    sethubId(hubId)
  };


  function completeBuyTransaction(transactionId) {
    updateTransaction(transactionId)
    .then((_)=>updateUserCreditBalance(currentUser.email,creditsToRemove))
    .then((_)=>updateHubEnergyCapacity(energyToRemove,hubId))
    .then((_) => window.location.reload(false));
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
      console.log(creditsEarned)
      rows.push({
        hubid: hubId,
        type: transactionType === 0 ? "Buy" : "Sell",
        energyamount: energyAmount,
        status: status,
        datecreated: dateCreated.toDate().toLocaleString(),
        datecompleted: dateCompleted ? dateCompleted.toDate().toLocaleString() : "",
        cost: cost,
        creditsearned: creditsEarned,
        actions: status === "Pending" && (
          <Button
            variant="success"
            size="sm"
            className="m-0"
            onClick={() => handleShow(id,creditsEarned,energyAmount,hubId)}
          >
            START
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
        className="mt-3 px-3"
      />
      <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Start Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to Start Charging?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => completeBuyTransaction(cancelTransactionId)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionsTable;
