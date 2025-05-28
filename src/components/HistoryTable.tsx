import { useState, useEffect, useContext, FC, useMemo } from "react";
import { WalletContext } from "../context/walletContext";
import { ethers } from "ethers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"; // Assuming path to shadcn/ui components
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";

interface FormattedQuestion {
  id: number;
  topic: string;
  question: string;
  options?: string[]; // Added options to determine badge color for winningOption
  winningOption: string;
  totalPool: string; // Keep as string, as it's already formatted
  timestamp: number; // Keep as number for sorting
}

type SortOrder = "asc" | "desc";
type OrderBy = keyof FormattedQuestion | "";

const HistoryTable: FC = () => {
  const { contract } = useContext(WalletContext);
  const [questions, setQuestions] = useState<FormattedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<SortOrder>("desc");
  const [orderBy, setOrderBy] = useState<OrderBy>("timestamp");

  useEffect(() => {
    if (contract) {
      fetchQuestions();
    }
  }, [contract]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const questionCountBigInt = await contract.getQuestionsCount();
      const questionCount = Number(questionCountBigInt);
      const questionPromises = [];
      for (let i = 0; i < questionCount; i++) {
        // Fetching raw question data which might include the options array
        questionPromises.push(contract.getQuestion(i).then((qData: any) => ({ ...qData, originalIndex: i })));
      }
      const results = await Promise.all(questionPromises);
      
      const formattedQuestions: FormattedQuestion[] = results.map(
        (rawQuestionData) => {
          // Destructure with explicit indexing for clarity if structure is fixed
          const topic = rawQuestionData[0];
          const question = rawQuestionData[1];
          const options = rawQuestionData[2]; // Array of strings
          const timestamp = rawQuestionData[3];
          // const isActive = rawQuestionData[4]; // Not used in this table
          const totalPool = rawQuestionData[5];
          let winningOption = rawQuestionData[6];
          const originalIndex = rawQuestionData.originalIndex;

          if (winningOption === "" || winningOption === undefined || winningOption === "0x0000000000000000000000000000000000000000") {
            winningOption = "N/A"; // Or "Pending", "Not resolved"
          }
          
          return {
            id: originalIndex,
            topic,
            question,
            options, // Store options to help determine badge color
            winningOption: winningOption,
            totalPool: ethers.formatEther(totalPool),
            timestamp: Number(timestamp) * 1000,
          };
        }
      );
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Optionally set an error state here to display in the UI
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (property: OrderBy) => {
    if (!property) return;
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => {
      if (!orderBy) return 0;

      let comparison = 0;
      const valA = a[orderBy];
      const valB = b[orderBy];

      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        comparison = valA.localeCompare(valB);
      }
      // Add more type comparisons if needed

      return order === "asc" ? comparison : -comparison;
    });
  }, [questions, order, orderBy]);

  const SortableHeader = ({ children, column }: { children: React.ReactNode, column: OrderBy }) => {
    const Icon = orderBy === column 
      ? (order === "asc" ? ArrowUp : ArrowDown) 
      : ArrowUpDown;
    return (
      <Button
        variant="ghost"
        onClick={() => handleSort(column)}
        className="px-2 py-1 h-auto hover:bg-muted/50"
      >
        {children}
        <Icon className="ml-2 h-4 w-4" />
      </Button>
    );
  };
  
  const getWinningOptionBadgeVariant = (winningOption: string, options?: string[]): "default" | "secondary" | "destructive" | "outline" => {
    if (winningOption === "N/A") return "outline";
    if (options && options.length > 0 && winningOption === options[0]) return "default"; // e.g. Blue for Yes
    if (options && options.length > 1 && winningOption === options[1]) return "secondary"; // e.g. Green for No
    return "outline"; // Fallback
  };


  return (
    <div className="rounded-md border bg-card shadow-lg mx-auto w-[96%] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/60">
            <TableHead className="w-[80px]">
              <SortableHeader column="id">ID</SortableHeader>
            </TableHead>
            <TableHead className="w-[150px]">Topic</TableHead>
            <TableHead>Question</TableHead>
            <TableHead className="w-[180px]">Winning Option</TableHead>
            <TableHead className="w-[180px] text-right">
              <SortableHeader column="totalPool">Total Pool (ETH)</SortableHeader>
            </TableHead>
            <TableHead className="w-[150px] text-right">
              <SortableHeader column="timestamp">Date</SortableHeader>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-5 w-full" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-5 w-full" /></TableCell>
              </TableRow>
            ))
          ) : sortedQuestions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No questions found.
              </TableCell>
            </TableRow>
          ) : (
            sortedQuestions.map((q) => (
              <TableRow key={q.id} className="hover:bg-muted/30 transition-colors duration-150">
                <TableCell className="font-medium">#{q.id}</TableCell>
                <TableCell>
                  <Badge variant="outline">{q.topic}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{q.question}</TableCell>
                <TableCell>
                  <Badge variant={getWinningOptionBadgeVariant(q.winningOption, q.options)}>
                    {q.winningOption}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{parseFloat(q.totalPool).toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  {new Date(q.timestamp).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
