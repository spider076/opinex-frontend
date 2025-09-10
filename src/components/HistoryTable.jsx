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
  Chip,
  Typography,
} from "@mui/material";
import { WalletContext } from "../context/wallet-states";
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
    <TableContainer
      component={Paper}
      className="mx-auto !w-[96%] !bg-[#1a2232] !rounded-xl overflow-hidden"
    >
      <Table>
        <TableHead>
          <TableRow className="!bg-[#1e2235]">
            <TableCell className="!border-gray-700">
              <TableSortLabel
                active={orderBy === "id"}
                direction={orderBy === "id" ? order : "asc"}
                onClick={() => handleSort("id")}
                sx={{
                  color: "white",
                  "&.MuiTableSortLabel-active": {
                    color: "#3b82f6",
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "#3b82f6 !important",
                  },
                }}
              >
                <Typography className="font-semibold text-gray-300">
                  ID
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell className="!border-gray-700">
              <Typography className="font-semibold text-gray-300">
                Topic
              </Typography>
            </TableCell>
            <TableCell className="!border-gray-700">
              <Typography className="font-semibold text-gray-300">
                Question
              </Typography>
            </TableCell>
            <TableCell className="!border-gray-700">
              <Typography className="font-semibold text-gray-300">
                Winning Option
              </Typography>
            </TableCell>
            <TableCell className="!border-gray-700">
              <TableSortLabel
                active={orderBy === "totalPool"}
                direction={orderBy === "totalPool" ? order : "asc"}
                onClick={() => handleSort("totalPool")}
                sx={{
                  color: "white",
                  "&.MuiTableSortLabel-active": {
                    color: "#3b82f6",
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "#3b82f6 !important",
                  },
                }}
              >
                <Typography className="font-semibold text-gray-300">
                  Total Pool (ETH)
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell className="!border-gray-700">
              <TableSortLabel
                active={orderBy === "timestamp"}
                direction={orderBy === "timestamp" ? order : "asc"}
                onClick={() => handleSort("timestamp")}
                sx={{
                  color: "white",
                  "&.MuiTableSortLabel-active": {
                    color: "#3b82f6",
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "#3b82f6 !important",
                  },
                }}
              >
                <Typography className="font-semibold text-gray-300">
                  Date
                </Typography>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedQuestions.map((q) => (
            <TableRow
              key={q.id}
              className="hover:!bg-[#1e2235] transition-colors duration-150"
            >
              <TableCell className="!border-gray-700 !text-gray-300">
                #{q.id}
              </TableCell>
              <TableCell className="!border-gray-700">
                <Chip
                  label={q.topic}
                  size="small"
                  className="!bg-blue-500/10 !text-blue-400"
                />
              </TableCell>
              <TableCell className="!border-gray-700 !text-gray-300">
                {q.question}
              </TableCell>
              <TableCell className="!border-gray-700">
                <Chip
                  label={q.winningOption}
                  size="small"
                  className={
                    q.winningOption === q.options?.[0]
                      ? "!bg-green-500/10 !text-green-400"
                      : "!bg-purple-500/10 !text-purple-400"
                  }
                />
              </TableCell>
              <TableCell className="!border-gray-700 !text-gray-300">
                {parseFloat(q.totalPool).toFixed(2)}
              </TableCell>
              <TableCell className="!border-gray-700 !text-gray-300">
                {new Date(q.timestamp).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
