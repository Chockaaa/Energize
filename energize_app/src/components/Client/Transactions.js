import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { getTransactionsByEmail } from "../../db/TransactionsDB";
import TransactionsGraph from "./TransactionsGraph"
import TransactionsTable from "./TransactionsTable";
import { Container ,Row,Card} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

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
       
          <Card className="m-1 p-2">
          <div style={{ height: '300px' }}><TransactionsGraph transactions={transactions} /></div>
          </Card>
          <Card className="m-1">
            <Card.Header>Transactions by User</Card.Header>
            <TransactionsTable transactions={transactions} />
          </Card>
        
      </Container>
    </>
  );
};

export default Transactions;
