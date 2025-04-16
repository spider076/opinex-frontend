import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Box,
} from "@mui/material";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { WalletContext } from "../context/walletContext";

const QuestionCard = ({ questionData, questionId, fetchStakes }) => {
  const { contract, account, isConnected } = useContext(WalletContext);
  const [betAmount, setBetAmount] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [stakes, setStakes] = useState({ option1: 0, option2: 0 });
  const [userBet, setUserBet] = useState({ amount: 0, option: "" });

  const { topic, question, options, totalPool, isActive } = questionData;

  useEffect(() => {
    if (contract && isActive) {
      fetchStakesData();
      fetchUserBet();
    }
  }, [contract, isActive]);

  const fetchStakesData = async () => {
    try {
      const stake1 = await contract.getOptionStakes(questionId, options[0]);
      const stake2 = await contract.getOptionStakes(questionId, options[1]);
      setStakes({
        option1: Number(ethers.formatEther(stake1)),
        option2: Number(ethers.formatEther(stake2)),
      });
    } catch (error) {
      console.error("Error fetching stakes:", error);
    }
  };

  const fetchUserBet = async () => {
    if (account) {
      try {
        const [amount, option] = await contract.getUserBet(questionId, account);
        setUserBet({
          amount: Number(ethers.formatEther(amount)),
          option,
        });
      } catch (error) {
        console.error("Error fetching user bet:", error);
      }
    }
  };

  const handleBet = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    if (!betAmount || Number(betAmount) <= 0) {
      toast.error("Enter a valid bet amount");
      return;
    }

    try {
      const tx = await contract.placeBet(questionId, selectedOption, {
        value: ethers.parseEther(betAmount),
      });
      await tx.wait();
      toast.success("Bet placed successfully!");
      setBetAmount("");
      setSelectedOption("");
      fetchStakesData();
      fetchUserBet();
    } catch (error) {
      console.error("Bet error:", error);
      toast.error("Failed to place bet");
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet");
      return;
    }

    try {
      const tx = await contract.withdraw(questionId);
      await tx.wait();
      toast.success("Withdrawal successful!");
      fetchStakesData();
      fetchUserBet();
    } catch (error) {
      console.error("Withdraw error:", error);
      toast.error("Failed to withdraw");
    }
  };

  const totalStakes = stakes.option1 + stakes.option2;
  const option1Percent =
    totalStakes > 0 ? (stakes.option1 / totalStakes) * 100 : 50;
  const option2Percent =
    totalStakes > 0 ? (stakes.option2 / totalStakes) * 100 : 50;

  return (
    <Card className="max-w-2xl mx-auto mb-6 transition-transform hover:scale-[1.02]">
      <CardContent>
        <Typography variant="h6" className="text-blue-600 dark:text-blue-400">
          {topic}
        </Typography>
        <Typography variant="h5" className="mt-2 font-bold">
          {question}
        </Typography>
        <Typography variant="body2" className="mt-2">
          Total Pool: {ethers.formatEther(totalPool)} ETH
        </Typography>
        {isActive ? (
          <>
            <Box className="mt-4">
              <Typography variant="subtitle1">Option Stakes</Typography>
              <Box className="mt-2">
                <Typography>
                  {options[0]}: {option1Percent.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={option1Percent}
                  className="h-2 rounded"
                  sx={{
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#0052cc" },
                  }}
                />
              </Box>
              <Box className="mt-2">
                <Typography>
                  {options[1]}: {option2Percent.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={option2Percent}
                  className="h-2 rounded"
                  sx={{
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#00cc88" },
                  }}
                />
              </Box>
            </Box>
            <Box className="mt-4">
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              <TextField
                label="Bet Amount (ETH)"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="mt-2 w-full"
                inputProps={{ min: "0", step: "0.01" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleBet}
                className="mt-4 w-full"
                disabled={!isActive}
              >
                Place Bet
              </Button>
            </Box>
            {userBet.amount > 0 && (
              <Box className="mt-4">
                <Typography>
                  Your Bet: {userBet.amount} ETH on "{userBet.option}"
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleWithdraw}
                  className="mt-2 w-full"
                  disabled={
                    userBet.option !==
                    (option1Percent > option2Percent ? options[0] : options[1])
                  }
                >
                  Withdraw
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Typography className="mt-4 text-gray-500">
            This question is no longer active.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
