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
  Grid,
  Stack,
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
  const predefinedAmounts = [0.1, 0.2, 0.5, 1];

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

      // Try to extract the "reason" field from the error
      const errorMessage =
        error?.reason || // Standard reason (like "Betting period ended")
        error?.error?.message || // If it's nested
        error?.message || // Fallback to general message
        "Transaction failed";

      toast.error(`Bet failed: ${errorMessage}`);
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
    <Stack direction="row" spacing={2} className="!shadow-none">
      <Card className="w-full !bg-transparent pl-20 !shadow-none mx-auto mb-6">
        <Typography variant="h4" className="mt-2 font-bold text-white">
          {question}
        </Typography>
        <Typography variant="h6" className="text-blue-600 dark:text-blue-400">
          {topic}
        </Typography>

        <Typography
          variant="body2"
          className="mt-2 pb-4 text-gray-300 float-right"
        >
          <span className="text-gray-200">Total Pool:</span>{" "}
          {ethers.formatEther(totalPool)} ETH
        </Typography>
        {isActive ? (
          <Stack className="mt-4 bg-[#1a2232] w-full rounded-xl py-20 px-10">
            <Box>
              {/* <Typography variant="subtitle1">Option Stakes</Typography> */}
              <Box className="mt-0">
                <Typography className="text-blue-100 !text-[1.4rem]">
                  {options[0]}: {option1Percent.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={option1Percent}
                  className="h-2 rounded mt-2"
                  sx={{
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#0052cc" },
                  }}
                />
              </Box>
              <Box className="mt-20">
                <Typography className="text-blue-100 !text-[1.4rem]">
                  {options[1]}: {option2Percent.toFixed(1)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={option2Percent}
                  className="h-2 rounded mt-2"
                  sx={{
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { backgroundColor: "#00cc88" },
                  }}
                />
              </Box>
            </Box>
            {/* <Box className="mt-4">
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
            )} */}
          </Stack>
        ) : (
          <Typography className="mt-4 text-gray-500">
            This question is no longer active.
          </Typography>
        )}
      </Card>

      {/* {isActive ? ( */}
      <>
        <Box className="mt-4 bg-transparent rounded-xl py-8 px-4">
          <Grid container spacing={2} className="mb-6">
            {options.map((option, index) => (
              <Grid item xs={options.length > 2 ? 12 : 6} key={option}>
                <Button
                  fullWidth
                  variant="contained"
                  className="!px-[40px] !py-6 !h-0"
                  onClick={() => setSelectedOption(option)}
                  sx={{
                    backgroundColor:
                      selectedOption === option ? "#00a862" : "#2d3348",
                    color: "white",
                    py: 2,
                    "&:hover": {
                      backgroundColor:
                        selectedOption === option ? "#00915a" : "#363d54",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="h6" className="font-bold">
                      {option}
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>

          <Box className="mt-8">
            <Typography className="text-gray-300 mb-2">Amount</Typography>
            <Grid container spacing={2} className="mb-4">
              {predefinedAmounts.map((amount) => (
                <Grid item xs={3} key={amount}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setBetAmount(amount.toString())}
                    sx={{
                      borderColor:
                        betAmount === amount.toString() ? "#00a862" : "#2d3348",
                      color:
                        betAmount === amount.toString() ? "#00a862" : "white",
                      "&:hover": {
                        borderColor: "#00a862",
                        backgroundColor: "rgba(0, 168, 98, 0.1)",
                      },
                    }}
                  >
                    {amount} ETH
                  </Button>
                </Grid>
              ))}
            </Grid>

            <TextField
              label="Custom Amount (ETH)"
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="mt-2 w-full"
              inputProps={{ min: "0", step: "0.01" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#2d3348",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00a862",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00a862",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#6b7280",
                },
                "& input": {
                  color: "white",
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleBet}
              className="mt-4 w-full !bg-green-600 !text-white"
              disabled={!isActive || !selectedOption || !betAmount}
              sx={{
                backgroundColor: "#00a862",
                "&:hover": {
                  backgroundColor: "#00915a",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#2d3348",
                  color: "#6b7280",
                },
                py: 1.5,
              }}
            >
              Trade
            </Button>
          </Box>
        </Box>

        {userBet.amount > 0 && (
          <Box className="mt-4 p-4 bg-[#1e2235] rounded-xl">
            <Typography className="text-gray-300">
              Your Bet: {userBet.amount} ETH on "{userBet.option}"
            </Typography>
            <Button
              variant="contained"
              onClick={handleWithdraw}
              className="mt-2 w-full"
              disabled={
                userBet.option !==
                (option1Percent > option2Percent ? options[0] : options[1])
              }
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
          </Box>
        )}
      </>
    </Stack>
  );
};

export default QuestionCard;
