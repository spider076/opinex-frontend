import React from "react";
import { useGetUserTrades } from "../hooks/useBets";
import { useGetQuestionById } from "../hooks/useQuestion";
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { ethers } from "ethers";
import { useContext } from "react";
import { WalletContext } from "../context/wallet-states";
import { toast } from "react-toastify";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const TradeCard = ({ trade }) => {
  const { contract } = useContext(WalletContext);
  const question = useGetQuestionById(trade.questionId);

  const handleWithdraw = async () => {
    try {
      const tx = await contract.withdraw(trade.questionId);
      await tx.wait();
      toast.success("Withdrawal successful!");
    } catch (error) {
      console.error("Withdraw error:", error);
      const errorMessage =
        error?.reason || error?.message || "Failed to withdraw";
      toast.error(`Withdrawal failed: ${errorMessage}`);
    }
  };

  if (!question) return null;

  const canWithdraw = question.isActive && trade.amount > 0;

  return (
    <Card className="w-full !bg-[#1a2232] p-4 rounded-xl mb-4">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" className="text-white font-bold mb-2">
            {question.question}
          </Typography>
          <Typography variant="subtitle2" className="text-blue-400 mb-4">
            {question.topic}
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={3} className="mb-4">
            <Box>
              <Typography
                variant="body2"
                className="text-gray-400 flex items-center gap-2"
              >
                <AccountBalanceWalletIcon fontSize="small" />
                Amount
              </Typography>
              <Typography variant="h6" className="text-white">
                {trade.amount} ETH
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                className="text-gray-400 flex items-center gap-2"
              >
                <HowToVoteIcon fontSize="small" />
                Your Vote
              </Typography>
              <Chip
                label={trade.option ? trade.option : "N/A"}
                color={
                  trade.option === question.options[0] ? "primary" : "success"
                }
                className="mt-1"
              />
            </Box>

            <Box>
              <Typography
                variant="body2"
                className="text-gray-400 flex items-center gap-2"
              >
                <AccessTimeIcon fontSize="small" />
                Status
              </Typography>
              <Chip
                label={question.isActive ? "Active" : "Ended"}
                color={question.isActive ? "warning" : "error"}
                className="mt-1"
              />
            </Box>
          </Stack>

          <Divider className="!border-gray-700 mt-2 !mb-4" />

          <Typography variant="body2" className="text-gray-300">
            Current Pool: {ethers.formatEther(question.totalPool)} ETH
          </Typography>
          <Box className="mt-2">
            <Typography variant="body2" className="text-gray-300">
              {question.options[0]}: {question.option1Percent?.toFixed(1)}%
            </Typography>
            <Typography variant="body2" className="text-gray-300">
              {question.options[1]}: {question.option2Percent?.toFixed(1)}%
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} className="flex items-center justify-end">
          {question.isActive && (
            <Button
              variant="contained"
              onClick={handleWithdraw}
              disabled={!canWithdraw}
              fullWidth
              sx={{
                backgroundColor: "#2d3348",
                "&:hover": {
                  backgroundColor: "#363d54",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#1e2235",
                  color: "#6b7280",
                },
              }}
            >
              Withdraw
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

const Trades = () => {
  const trades = useGetUserTrades();

  return (
    <Box className="mx-auto px-10 py-2">
      {/* <Typography variant="h4" className="text-white font-bold mb-6">
        Your Trades
      </Typography> */}

      {trades.length === 0 ? (
        <Card className="w-full bg-[#1a2232] p-8 !rounded-xl text-center">
          <Typography variant="h6" className="text-gray-400">
            You haven't made any trades yet
          </Typography>
        </Card>
      ) : (
        <Stack spacing={3}>
          {trades.map((trade) => (
            <TradeCard key={trade.questionId} trade={trade} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Trades;
