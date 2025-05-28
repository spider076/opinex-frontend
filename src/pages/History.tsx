import HistoryTable from "../components/HistoryTable.tsx"; // Ensure .tsx or resolved

const History = () => {
  return (
    <div className="container mx-auto py-6 lg:py-10"> 
      {/* Added container and padding for better spacing, consistent with other pages */}
      <h1 className="text-3xl font-bold mb-6 lg:mb-8 text-center text-foreground">
        Questions History
      </h1>
      <HistoryTable />
    </div>
  );
};

export default History;
