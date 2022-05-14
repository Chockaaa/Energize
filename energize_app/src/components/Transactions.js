import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { getTransactionsByEmail } from "../db/TransactionsDB";
import TransactionsGraph from "./TransactionsGraph"
import TransactionsTable from "./TransactionsTable";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    getTransactionsByEmail(currentUser.email).then((res) => {
      const transactionsArray = [];
      for (let i in res) {
        const doc = res[i].data();
        doc.id = res[i].id;
        transactionsArray.push(doc);
      }
      setTransactions([...transactionsArray]);
    });
  }, [currentUser.email]);

  return (
    <>
      <NavigationBar />
      <Container>
        <div style={{height: '300px'}}><TransactionsGraph transactions={transactions} /></div>
        <TransactionsTable transactions={transactions} />
      </Container>
    </>
  );
};

export default Transactions;
