import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for users and amounts
const userData = [
  { id: 1, name: "אלה כהן", amount: 1000 },
  { id: 2, name: "דוד לוי", amount: 1500 },
  { id: 3, name: "מיכל גולן", amount: 750 },
  { id: 4, name: "יוסף אברהם", amount: 2000 },
  { id: 5, name: "רחל ברק", amount: 1250 },
];

const BuyinTable = () => {
  return (
    <div dir="rtl" lang="he" className="font-sans">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">משתמש</TableHead>
            <TableHead className="text-left">סכום</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium text-right">
                {user.name}
              </TableCell>
              <TableCell className="text-left">{user.amount} ₪</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BuyinTable;
