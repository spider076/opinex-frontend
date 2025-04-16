import { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { WalletContext } from "../context/walletContext";
import { ethers } from "ethers";

const HistoryTable = () => {
  const { contract } = useContext(WalletContext);
  const [questions, setQuestions] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("timestamp");

  useEffect(() => {
    if (contract) {
      fetchQuestions();
    }
  }, [contract]);

  const fetchQuestions = async () => {
    try {
      const questionCount = await contract.getQuestionsCount();
      const questionPromises = [];
      for (let i = 0; i < questionCount; i++) {
        questionPromises.push(contract.getQuestion(i));
      }
      const results = await Promise.all(questionPromises);
      const formattedQuestions = results.map(
        (
          [
            topic,
            question,
            options,
            timestamp,
            isActive,
            totalPool,
            winningOption,
          ],
          index
        ) => ({
          id: index,
          topic,
          question,
          winningOption: winningOption || "N/A",
          totalPool: ethers.formatEther(totalPool),
          timestamp: Number(timestamp) * 1000,
        })
      );
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (orderBy === "timestamp") {
      return order === "asc"
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp;
    } else if (orderBy === "totalPool") {
      return order === "asc"
        ? a.totalPool - b.totalPool
        : b.totalPool - a.totalPool;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper} className="w-full">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "id"}
                direction={orderBy === "id" ? order : "asc"}
                onClick={() => handleSort("id")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Winning Option</TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "totalPool"}
                direction={orderBy === "totalPool" ? order : "asc"}
                onClick={() => handleSort("totalPool")}
              >
                Total Pool (ETH)
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "timestamp"}
                direction={orderBy === "timestamp" ? order : "asc"}
                onClick={() => handleSort("timestamp")}
              >
                Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedQuestions.map((q) => (
            <TableRow
              key={q.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <TableCell>{q.id}</TableCell>
              <TableCell>{q.topic}</TableCell>
              <TableCell>{q.question}</TableCell>
              <TableCell>{q.winningOption}</TableCell>
              <TableCell>{parseFloat(q.totalPool).toFixed(2)}</TableCell>
              <TableCell>
                {new Date(q.timestamp).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
